How to Use
Save the provided code in a file named tasks_executor.js.
In your terminal, navigate to the directory containing tasks_executor.js.
Make the script executable (optional for Windows): chmod +x tasks_executor.js.
Run the tool by passing the tasks JSON string as an argument. For example:
sh
Copy code
node index.js --input '[{"action": "LOOK_REPORT","data": {"symbol": "AAPL","range":{"from": "2023-03-23","to":"2024-03-23"}}},{"action": "LOOK_STOCK_PRICE","data": {"symbol": "AAPL","range": {"from": "2023-03-23","to": "2024-03-23"}}}]'