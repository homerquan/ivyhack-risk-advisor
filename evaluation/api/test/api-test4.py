import sys
# adding this ensures we can import files from other directories as well
sys.path.append('/Users/goofyahhgarv/Desktop/Projects/ivyhack-risk-advisor/evaluation/api')  
import api_calls

api_calls.stockSplitSpecific()  # test 16
api_calls.dividendList()   # test 17
api_calls.stockDividendSpecific()  # test 18
api_calls.stockConditions()  # test 19
api_calls.stockExchanges()  # test 20