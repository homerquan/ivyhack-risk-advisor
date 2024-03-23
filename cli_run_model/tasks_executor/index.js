#!/usr/bin/env node

const { program } = require('commander');
const moment = require('moment');
const process = require('process');

program
  .description('CLI tool to execute tasks and generate output')
  .requiredOption('-i, --input <string>', 'Input JSON string with a list of tasks');

program.parse(process.argv);

const options = program.opts();

if (options.input) {
  const tasks = JSON.parse(options.input);
  const results = executeTasks(tasks);
  console.log(JSON.stringify(results, null, 2));
}

function executeTasks(tasks) {
  // Mock function to execute tasks and return results
  const results = tasks.map(task => {
    switch (task.action) {
      case "LOOK_ANNUAL_REPORT":
        return mockLookupAnnualReport(task.data);
      case "LOOK_STOCK_PRICE":
        return mockLookupStockPrice(task.data);
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
        "2023-12-31T00:00:00": {}
      }
    }
  };
}

function mockLookupStockPrice(data) {
  // Mock data for stock price lookup
  return {
    type: "STOCK_PRICE",
    data: {
      symbol: data.symbol,
      close_prices: {
        "2023-09-30T00:00:00": 40,
        "2023-12-31T00:00:00": 50
      }
    }
  };
}