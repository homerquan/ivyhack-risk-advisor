#!/usr/bin/env node

const { program } = require("commander");
const moment = require("moment");
const process = require("process");
const yahooFinance = require("yahoo-finance");

program
  .description("CLI tool to execute tasks and generate output")
  .requiredOption(
    "-i, --input <string>",
    "Input JSON string with a list of tasks"
  );

program.parse(process.argv);

const options = program.opts();

if (options.input) {
  const tasks = JSON.parse(options.input);
  const results = executeTasks(tasks);
  console.log(JSON.stringify(results, null, 2));
}

async function executeTasks(tasks) {
  // Mock function to execute tasks and return results
  const results = tasks.map(async (task) => {
    switch (task.action) {
      case "LOOK_ANNUAL_REPORT":
        return await getCashFlow(
          task.data.symbol,
          task.data.range.from,
          task.data.range.to
        );
      case "LOOK_STOCK_PRICE":
        return await getStockPrice(
          task.data.symbol,
          task.data.range.from,
          task.data.range.to
        );
      default:
        return {};
    }
  });

  return results;
}

function mockLookupAnnualReport(data) {
  // Mock data for an annual report lookup
  return {
    type: "ANNUAL_REPORT",
    data: {
      symbol: data.symbol,
      report: {
        "2023-09-30T00:00:00": {},
        "2023-12-31T00:00:00": {},
      },
    },
  };
}

async function getStockPrice(symbol, from, to) {
  const options = {
    // Include options such as period (daily, weekly, monthly)
    period: "m",
  };

  yahooFinance.historical(
    {

      symbol: symbol,
      from: from,
      to: to,
      ...options,
    },
    (err, quotes) => {
      if (err) {
        console.error(err);
      } else {
        console.log(quotes);
      }
    }
  );
}

async function getCashFlow(symbol, from, to) {
  const options = {
    // Include options such as period (daily, weekly, monthly)
    period: "q",
  };

  yahooFinance.cashFlow(
    {
      symbol: symbol,
      from: from,
      to: to,
      ...options,
    },
    (err, quotes) => {
      if (err) {
        console.error(err);
      } else {
        console.log(quotes);
      }
    }
  );
}


