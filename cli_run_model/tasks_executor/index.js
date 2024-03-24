#!/usr/bin/env node

const { program } = require("commander");
const moment = require("moment");
const process = require("process");
const yahooFinance = require("yahoo-finance");
const axios = require('axios');

const FMP_API_KEY = "f28c1df74c02fc9d574b79900a2d9147";

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
      case "LOOK_REPORT":
        return await getAnnualReport(
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

async function getAnnualReport(symbol, from, to) {
  const url = `https://financialmodelingprep.com/api/v3/financial-statement-full-as-reported/${symbol}?period=annual&limit=5&apikey=${FMP_API_KEY}`;

  try {
    console.log(url);
    const response = await axios.get(url);
    const reports = response.data;
    // Filter reports by the report release date
    const filteredReports = reports.filter(report => {
      const reportDate = new Date(report.date);
      const startDate = new Date(from);
      const endDate = new Date(to);

      return reportDate >= startDate && reportDate <= endDate;
    });
    
    console.log(filteredReports);
    return filteredReports;
  } catch (error) {
    console.error('Error fetching annual reports:', error);
  }
}



