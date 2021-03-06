import { extractNecessaryInfo } from "./calculate";
import { writeFileSync } from "fs";
import { config } from "./config";

console.log(`Threshold to exclude salary for total without salary: ${config.threshold}`);
const totalKey = "total";
const withoutSalaryKey = "totalWithoutSalary";
const expenseKey = "expense";
const payments = extractNecessaryInfo()

const months = new Map<number, Map<string, number>>();

const retrieveMap = (currentKey: number) => {
    const existingMap = months.get(currentKey);
    if (!existingMap) {
        return new Map<string, number>();
    }
    return existingMap;
}
payments.forEach((value) => {
    const dateKey = parseInt(`20${value.date.year}${value.date.month}`, 10);
    const map = retrieveMap(dateKey);

    const update = (key: string, threshold?: number) => {
        let current = map.get(key) || 0;
        if ((threshold === undefined) || (threshold !== undefined && value.cost < threshold)) {
            current += value.cost;
        }
        map.set(key, current);
    }
    update(value.company);
    update(totalKey);
    update(withoutSalaryKey, config.threshold);
    update(expenseKey, 0);

    months.set(dateKey, map);
});

const sorted = Array.from(months).sort((a, b) => {
    return b[0] - a[0];
});

let detail = "";
let simple = "";
sorted.forEach((value) => {
    const total = value[1].get(totalKey);
    const expense = value[1].get(expenseKey);
    const totalWithoutSalary = value[1].get(withoutSalaryKey);
    value[1].delete(totalKey);
    value[1].delete(expenseKey);
    value[1].delete(withoutSalaryKey);
    const sortedCompanies = Array.from(value[1]).sort((a, b) => {
        return a[1] - b[1];
    });

    const monthString = `${value[0]}: \n`;
    const totalString = `\t${total!.toFixed(2)}\t: total\n`
        + `\t${expense!.toFixed(2)}\t: expense\n`;
    const withoutSalaryString = `\t${totalWithoutSalary?.toFixed(2)}\t: total without salary\n`;
    detail += monthString + totalString + withoutSalaryString;
    simple += monthString + totalString + withoutSalaryString;
    sortedCompanies.forEach((entry) => {
        detail += `\t${entry[1].toFixed(2)}\t: ${entry[0]}\n`;
    })
});

writeFileSync("_detailCost.txt", detail);
writeFileSync("_simpleCost.txt", simple);

console.log("finished")
