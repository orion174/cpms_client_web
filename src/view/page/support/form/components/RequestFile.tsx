import React from 'react';
import FileUpload from "@/components/Module/FileUpload.tsx";
import { FileItem } from "@/definition/common.types.ts";

interface RequestFile {
    formType: "insert" | "update";
    fileList: FileItem[];
    setFileList: React.Dispatch<React.SetStateAction<FileItem[]>>;
}

const File: React.FC<FileSectionProps> = ({ formType, fileList, setFileList }) => {
    return (
        <div className="section-space">
            <FileUpload
                formType={formType}
                onFileChange={setFileList}
                initFiles={fileList}
            />
        </div>
    );
};

export default File;