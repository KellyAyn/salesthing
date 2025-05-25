"use client";

import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { processExcel } from "~/app/actions/excel-processor";

export function ExcelUploader() {

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;
        const selectedFile = files[0];
        if (!selectedFile) return;
        const result = await processExcel(selectedFile);
        console.log(result);
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
    );
}
