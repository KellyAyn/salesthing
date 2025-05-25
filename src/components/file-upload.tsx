"use client";

import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "sonner";

export function ExcelUploader() {

    const [file, setFile] = useState<File | null>(null);
    const [jsonData, setJsonData] = useState<unknown[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;
        
        const selectedFile = files[0];
        if (!selectedFile) return;
        
        setFile(selectedFile);
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target?.result;
            if (data) {
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                if (!sheetName) {
                    toast.error("No sheet found in the uploaded file", {
                        duration: 3000,
                    });
                    return;
                }
                const sheet = workbook.Sheets[sheetName];
                if (!sheet) {
                    toast.error("Could not read sheet data", {
                        duration: 3000,
                    });
                    return;
                } else {
                    toast.success("Sheet data read successfully", {
                        duration: 3000,
                    });
                }
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                setJsonData(jsonData);
                console.log(jsonData);
            }
        };
        reader.readAsArrayBuffer(selectedFile);
    }

    return (
        <Button size="sm" asChild>
        <label htmlFor="file">
            Upload
            <Upload className="w-4 h-4" />
            <Input
                type="file"
                id="file"
                className="hidden"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
            />
        </label>
    </Button> 
    )
}
