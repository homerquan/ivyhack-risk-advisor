First, ensure you have Node.js installed on your machine. Then, you'll need to install the commander package, which is used to build command-line interfaces in Node.js. You can install it using npm or yarn:

sh
Copy code
npm install commander
Here's the basic structure of tasks_creator.js:

javascript
Copy code
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
How to Use
Save the code in a file named tasks_creator.js.
Make sure you're in the directory containing tasks_creator.js in your terminal.
Make the script executable (optional for Windows users): chmod +x tasks_creator.js.
Run the tool by passing the input JSON string as an argument. Here's an example:
sh
Copy code
./tasks_creator.js --input '{"goal":"I want to invest $5000 on Boeing for 6 months right now","context": {"timestamp":"2024-03-23", "text":"the Boeing performance report"}}'
This command outputs the generated tasks in the specified format. Adjust the generateTasks function as necessary to handle different input cases and generate appropriate tasks.