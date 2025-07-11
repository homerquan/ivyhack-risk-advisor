# LangGraph Agent Pipeline

This directory contains an experimental pipeline that reimplements the original Node.js workflow using the [LangGraph](https://github.com/langchain-ai/langgraph) agent framework.

The pipeline mirrors the original steps:

1. **Create tasks** – parse user input into a set of actions.
2. **Fetch data** – gather stock prices and annual report data for each action.
3. **Generate report** – use the collected evidence to produce a risk summary.

To run the pipeline you will need to install the following packages:

```bash
pip install langgraph openai requests
```

Environment variables required:

- `OPENAI_API_KEY` – for calls to OpenAI.
- `FMP_API_KEY` – API key for financial data.

Run the pipeline with:

```bash
python pipeline.py "I want to invest $5000 in AAPL for 6 months" --context "cash reserves 100k"
```

The script outputs a JSON risk report similar to the original system.
