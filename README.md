# sparkasse-csv-parser
I created this module for personal use. This module parses CSV file created by sparkasse and outputs monthly expense report. 

## Usage
Place the `data.csv` file in the same directory as app.js and run app.js

## Result
* total - The result of adding all data (incomes + expenses)
* expense - The result of adding all expenses
* total without salary - The result of subtracting salary from total. You may want to know this value when you want to add refund amount but don't want to include salary.
* other - Total amount spent in the shop for example

## Configuration
Configurations are in config.ts (config.js in release) file.
* threshold - Value to omit from `total` for `total without salary`

## Example Result
``` text
202008: 
	1000.70	: total
	-753.70	: expense
	-753.70: total without salary
	-55..12	: name 1
	-123.20	: name 2
    ...
202007: 
	1200.20	: total
	-800.00	: expense
	-753.70: total without salary
	-55..00	: name 1
	-100.00	: name 2
    ...
```