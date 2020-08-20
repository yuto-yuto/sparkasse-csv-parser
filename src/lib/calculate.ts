import * as fs from "fs";
import * as path from "path";

interface Payment {
    cost: number;
    company: string;
    date: { year: string, month: string };
}
const costKey = '"Betrag"';
const dateKey = '"Buchungstag"';
const companyKey = '"Beguenstigter/Zahlungspflichtiger"';

export function extractNecessaryInfo(): Payment[] {
    // const filePath = "/src/data.csv";
    const filePath = path.join(__dirname, "data.csv");
    const data = fs.readFileSync(filePath, { encoding: "utf8" });
    const rows = data.split("\n");
    const delimiter = ";"
    const columns = rows.shift()?.split(delimiter);
    const indexes = {
        cost: columns!.indexOf(costKey),
        date: columns!.indexOf(dateKey),
        company: columns!.indexOf(companyKey),
    }

    console.log("index number");
    console.log(
        `cost (${costKey}): ${indexes.cost}\n` +
        `date (${dateKey}): ${indexes.date}\n` +
        `company (${companyKey}): ${indexes.company}`
    );

    return rows.filter((value: string) => value.length > 20)
        .map((value: string) => {
            const entries = value.split(delimiter);
            const costString = entries[indexes.cost].replace(/\"/g, "").replace(/,/g, ".");
            const company = entries[indexes.company].replace(/\s+/g, " ").replace(/['"]/g, "");
            const dateString = entries[indexes.date].replace(/\"/g, "");
            const dateArray = dateString.split(".");
            return {
                date: {
                    year: dateArray[2],
                    month: dateArray[1]
                },
                company,
                cost: parseFloat(costString)
            };
        })
}
