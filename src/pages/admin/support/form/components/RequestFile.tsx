import React from 'react';

import FileUpload from "@/components/CmmnModule/FileUpload.tsx";
import { FileItem } from "@/types/cmmn.ts";

interface RequestFileProps {
    formType: "insert" | "update";
    fileList: FileItem[];
    setFileList: React.Dispatch<React.SetStateAction<FileItem[]>>;
}

const RequestFile: React.FC<RequestFileProps> = ({ formType, fileList, setFileList }) => {
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

export default RequestFile;