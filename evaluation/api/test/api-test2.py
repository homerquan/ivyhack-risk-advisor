# adding this ensures we can import files from other directories as well
import sys
sys.path.append('/Users/goofyahhgarv/Desktop/Projects/ivyhack-risk-advisor/evaluation/api')  
import api_calls

api_calls.exponentialMovingAverage() # test 6
api_calls.movingAverageConvergenceDivergence()
api_calls.relativeStrengthIndex()  # test 8
api_calls.tickerSymbols()  # test 9
api_calls.tickerDetails()  # test 10
