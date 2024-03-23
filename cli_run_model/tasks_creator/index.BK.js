#!/usr/bin/env node

const { program } = require('commander');
const process = require('process');

program
  .description('CLI tool to generate tasks based on input goals and contexts')
  .requiredOption('-i, --input <string>', 'Input JSON string with goal and context');

program.parse(process.argv);

const options = program.opts();

if (options.input) {
  const input = JSON.parse(options.input);
  const tasks = generateTasks(input);
  console.log(JSON.stringify(tasks, null, 2));
}

function generateTasks(input) {
  // Example task generation logic based on input
  const tasks = [];

  if (input.goal.includes("invest") && input.goal.includes("Boeing")) {
    // Adding task to look at the annual report
    tasks.push({
      action: "LOOK_ANNUAL_REPORT",
      data: {
        company: "boeing",
        year: new Date(input.context.timestamp).getFullYear() - 1 // Assuming the report is for the previous year
      }
    });

    // Adding task to look at stock price
    tasks.push({
      action: "LOOK_STOCK_PRICE",
      data: {
        symbol: "BA",
        range: {
          from: new Date(new Date(input.context.timestamp).setFullYear(new Date(input.context.timestamp).getFullYear() - 1)).toISOString().split('T')[0],
          to: input.context.timestamp
        }
      }
    });
  }

  return tasks;
}
