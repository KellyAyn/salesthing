"use server";

import * as XLSX from "xlsx";

export async function processExcel(file: File) {
    const workbook = XLSX.read(file, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    if (!sheetName) return "No sheet found" //implement proper toast message;
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) return "No sheet found" //implement proper toast message;
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    return jsonData;
}
