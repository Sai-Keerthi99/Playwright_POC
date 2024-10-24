import * as ExcelJs from 'exceljs';

export class ReadAndWriteExcel {
    private sheetName: string;
    private path: string;

    constructor(sheetName: string, path: string) {
        this.sheetName = sheetName;
        this.path = path;
    }

    async readExcel() {
        const workbook = new ExcelJs.Workbook();
        
        try {
            await workbook.xlsx.readFile(this.path); // Wait for readFile to complete
        } catch (error) {
            console.error(`Error loading workbook from ${this.path}: ${error}`);
            throw error; // Throw the caught error to propagate it
        }

        const worksheet = workbook.getWorksheet(this.sheetName);
        if (!worksheet) {
            console.error(`Worksheet name '${this.sheetName}' not found in the workbook`);
            throw new Error(`Worksheet '${this.sheetName}' not found`);
        }

        return worksheet;
    }

    async readValue(searchText: string): Promise<string> {
        const worksheet = await this.readExcel();
        let output = { row: -1, column: -1 };

        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                if (cell.value === searchText) {
                    output.row = rowNumber;
                    output.column = colNumber + 1; // Adjusted column number to get value
                }
            });
        });

        if (output.row === -1 || output.column === -1) {
            throw new Error(`Value "${searchText}" not found in the worksheet`);
        }

        // Return the value found at the specified cell
        const vallue = worksheet.getCell(output.row, output.column).value;
        return (vallue !== null && vallue !== undefined ? vallue.toString() : 'not found');
        
    }

    async readAssertionValue(searchText: string): Promise<string> {
        const worksheet = await this.readExcel();
        let output = { row: -1, column: -1 };

        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                if (cell.value === searchText) {
                    output.row = rowNumber;
                    output.column = colNumber + 2; // Adjusted column number to get value
                }
            });
        });

        if (output.row === -1 || output.column === -1) {
            throw new Error(`Value "${searchText}" not found in the worksheet`);
        }

        // Return the value found at the specified cell
        const vallue = worksheet.getCell(output.row, output.column).value;
        return (vallue !== null && vallue !== undefined ? vallue.toString() : 'not found');
        
    }
}
