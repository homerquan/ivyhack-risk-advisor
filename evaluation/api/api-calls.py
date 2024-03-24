import step2
import requests
import json

#file that contains all the neccessary api calls and their apropriate responses, and their output is saved within the Data directory

stock_ticker = step2.stock_ticker
start_date = step2.start_date   # modify this value as needed
end_date = step2.end_date

print(stock_ticker)

url = f"https://api.polygon.io/v2/aggs/ticker/{stock_ticker}/range/1/day/{start_date}/{end_date}?adjusted=true&sort=asc&limit=120&apiKey=kpfx5ixgOD4mMMy8cRrR_vYAJgWOKWk8"

response = requests.get(url)
print("\nAggregate-Bars Response:")
print(response.content)
with open('/Users/ayandas/Desktop/VS_Code_Projects/ivyhacks-backend/evaluation/Data/aggregate-bars.json', 'w') as file:
    json.dump(json.loads(response.content), file, indent=4)


#get the daily open, high, low, close, and volume data 
url2 = f"https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/{start_date}?adjusted=true&apiKey=kpfx5ixgOD4mMMy8cRrR_vYAJgWOKWk8"
print("\nGrouped-Daily Response:")
response2 = requests.get(url2)
print(response2.content)
with open('/Users/ayandas/Desktop/VS_Code_Projects/ivyhacks-backend/evaluation/Data/grouped-daily.json', 'w') as file:
    json.dump(json.loads(response2.content), file, indent=4)
'''
#get the open,close and afterhours prices of a stock symbol on a certain date
url3 = f"https://api.polygon.io/v1/open-close/{stock_ticker}/{start_date}?adjusted=true&apiKey=kpfx5ixgOD4mMMy8cRrR_vYAJgWOKWk8"
print("\nOpen-Close Response:")
response3 = requests.get(url3)
print(response3.content)
with open('/Users/ayandas/Desktop/VS_Code_Projects/ivyhacks-backend/evaluation/Data/open-close.json', 'w') as file:
    json.dump(json.loads(response3.content), file, indent=4)

url4 = f"https://api.polygon.io/v2/aggs/ticker/{stock_ticker}/prev?adjusted=true&apiKey=kpfx5ixgOD4mMMy8cRrR_vYAJgWOKWk8"
print("\nPrevious Close Response:")
with open('/Users/ayandas/Desktop/VS_Code_Projects/ivyhacks-backend/evaluation/Data/previous-close.json', 'w') as file:
    response4 = requests.get(url4)
    print(response4.content)
'''
#get trades for a ticker symbol in a given time range
url5 = f"https://api.polygon.io/v3/trades/{stock_ticker}?{start_date}&apiKey=kpfx5ixgOD4mMMy8cRrR_vYAJgWOKWk8"
print("\nTrades Response:")
with open('/Users/ayandas/Desktop/VS_Code_Projects/ivyhacks-backend/evaluation/Data/trades.json', 'w') as file:
    response5 = requests.get(url5)
    print(response5.content)





    #the file saves the data twice
'''
with open('/Users/ayandas/Desktop/VS_Code_Projects/ivyhacks-backend/data/aggregate-bars.json', 'w') as file:
    file.write(response.content.decode('utf-8'))
'''