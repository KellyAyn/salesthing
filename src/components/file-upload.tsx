"use client";

import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { processExcel } from "~/app/actions/excel-processor";   
import { toast } from "sonner";


export function ExcelUploader() {
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;
        const selectedFile = files[0];
        if (!selectedFile) return;
        const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
        console.log(fileExtension);
        if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
            toast.error('Please upload an Excel file (.xlsx or .xls)', {
                icon: '🤦‍♂️',
                description: 'You fucking idiot, kys',
                duration: 5000,
                richColors: true,
            });
            return;
        }
        const reader = new FileReader();
        reader.onload = async (e) => {
            const arrayBuffer = e.target?.result;
            if (!arrayBuffer) return;
            const result = await processExcel(arrayBuffer as ArrayBuffer);
            console.log(result);
        }
        reader.readAsArrayBuffer(selectedFile);

        toast.success('Successfully processed the excel file.', {
            icon: '👍',
            duration: 5000,
            richColors: true,
        });
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
