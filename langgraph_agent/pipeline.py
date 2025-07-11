"""LangGraph-based risk advisor pipeline.

This module reimplements the Node.js CLI workflow using the LangGraph agent
system. It defines a simple graph with three stages:

1. Create tasks based on user input.
2. Fetch data for each task.
3. Generate a final risk report.

Note: The script requires the `langgraph`, `openai` and `requests` packages.
Calls to external services will fail in restricted environments.
"""

from __future__ import annotations

import json
import os
from dataclasses import dataclass
from typing import Any, Dict, List

import openai  # type: ignore
import requests  # type: ignore
from langgraph.graph import Graph
from langgraph.node import Node

# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------

def _openai_chat(messages: List[Dict[str, str]], model: str = "gpt-3.5-turbo") -> str:
    """Call OpenAI chat completion and return the response content."""
    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        max_tokens=500,
        temperature=0.1,
        response_format={"type": "json_object"},
    )
    return response.choices[0].message.content or ""


def create_tasks(state: Dict[str, Any]) -> Dict[str, Any]:
    goal = state["goal"]
    context = state.get("context", "")
    prompt = f"""
Assuming you have to analyse one year of historical data to evaluate investment risks.
Input goal: {goal}
Context: {context}
Output two actions LOOK_REPORT and LOOK_STOCK_PRICE in JSON.
"""
    content = _openai_chat([{"role": "system", "content": prompt}])
    state["tasks"] = json.loads(content)
    return state


def _fetch_report(symbol: str, start: str, end: str) -> Any:
    key = os.getenv("FMP_API_KEY")
    url = (
        f"https://financialmodelingprep.com/api/v3/financial-statement-full-as-reported/"
        f"{symbol}?period=annual&limit=5&apikey={key}"
    )
    params = {"from": start, "to": end}
    response = requests.get(url, params=params, timeout=30)
    return response.json()


def _fetch_price(symbol: str, start: str, end: str) -> Any:
    url = "https://query1.finance.yahoo.com/v7/finance/download/{}".format(symbol)
    params = {"period1": start, "period2": end, "interval": "1mo"}
    response = requests.get(url, params=params, timeout=30)
    return response.text


def fetch_data(state: Dict[str, Any]) -> Dict[str, Any]:
    tasks = state["tasks"].get("actions", [])
    evidence: Dict[str, Any] = {}
    for task in tasks:
        symbol = task["data"]["symbol"]
        date_range = task["data"]["range"]
        if task["action"] == "LOOK_REPORT":
            evidence["report"] = _fetch_report(symbol, date_range["from"], date_range["to"])
        elif task["action"] == "LOOK_STOCK_PRICE":
            evidence["stock"] = _fetch_price(symbol, date_range["from"], date_range["to"])
    state["evidence"] = evidence
    return state


def generate_report(state: Dict[str, Any]) -> Dict[str, Any]:
    goal = state["goal"]
    context = state.get("context", "")
    evidence = json.dumps(state.get("evidence", {}))
    prompt = (
        f"assume an investor wants to {goal}. context: {context}\n"
        "Based on the following JSON data produce a risk summary:\n" + evidence
    )
    content = _openai_chat([{"role": "system", "content": prompt}])
    state["report"] = json.loads(content)
    return state

# ---------------------------------------------------------------------------
# Graph definition
# ---------------------------------------------------------------------------

def build_graph() -> Graph:
    graph = Graph()
    graph.add_node("create_tasks", Node(create_tasks))
    graph.add_node("fetch_data", Node(fetch_data))
    graph.add_node("generate_report", Node(generate_report))

    graph.add_edge("/start", "create_tasks")
    graph.add_edge("create_tasks", "fetch_data")
    graph.add_edge("fetch_data", "generate_report")
    graph.set_entrypoint("/start")
    graph.set_finishpoint("generate_report")
    return graph


@dataclass
class RunContext:
    goal: str
    context: str | None = None


def run(goal: str, context: str | None = None) -> Dict[str, Any]:
    graph = build_graph()
    state = {"goal": goal, "context": context}
    result = graph.run(state)
    return result["report"]


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Run LangGraph risk advisor")
    parser.add_argument("goal", help="Investment goal")
    parser.add_argument("--context", default="", help="Additional context")
    args = parser.parse_args()

    report = run(args.goal, args.context)
    print(json.dumps(report, indent=2))