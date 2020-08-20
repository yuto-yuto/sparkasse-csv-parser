# sparkasse-csv-parser
I created this module for personal use. This module parses CSV file created by sparkasse and outputs monthly expense report. 

## Result
* total - The result of adding all data (incomes + expenses)
* expense - The result of adding all expenses
* total without salary - The result of subtracting salary from total

## Configuration
Configurations are in config.env file. 
* SALARY_THRESHOLD - Valut to omit from `total without salary`