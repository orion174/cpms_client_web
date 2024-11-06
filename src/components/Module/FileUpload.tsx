import React, { useState, ChangeEvent } from "react";
import { Button } from "reactstrap";

import excelIcon from "@/assets/img/icons/excel_icon.png";
import hwpIcon from "@/assets/img/icons/hwp_icon.png";
import jpgIcon from "@/assets/img/icons/jpg_icon.png";
import pdfIcon from "@/assets/img/icons/pdf_icon.png";
import pngIcon from "@/assets/img/icons/png_icon.png";
import pptIcon from "@/assets/img/icons/ppt_icon.png";
import wordIcon from "@/assets/img/icons/word_icon.png";

// 파일 아이템에 대한 타입 정의
interface FileItem {
    id: number;
    file: File;
    name: string;
}

// Props 타입 정의
interface FileUploadProps {
    formType: string;
}

// 허용할 파일 확장자 배열
const ALLOWED_EXTENSIONS = ['xlsx', 'xls', 'hwp', 'jpg', 'jpeg', 'pdf', 'png', 'ppt', 'pptx', 'doc', 'docx'];

// 파일 확장자에 따른 아이콘 반환 함수
const getIconByExtension = (extension: string) => {
    switch (extension) {
        case "xlsx":
            return excelIcon;
        case "xls":
            return excelIcon;
        case "hwp":
            return hwpIcon;
        case "jpg":
            return jpgIcon;
        case "jpeg":
            return jpgIcon;
        case "pdf":
            return pdfIcon;
        case "png":
            return pngIcon;
        case "ppt":
            return pptIcon;
        case "pptx":
            return pptIcon;
        case "doc":
            return wordIcon;
        case "docx":
            return wordIcon;
        default:
            return "";
    }
};

const FileUpload: React.FC<FileUploadProps> = ({ formType }) => {
    // 파일 리스트를 관리하는 상태
    const [fileList, setFileList] = useState<FileItem[]>([]);

    // 파일 추가 이벤트 핸들러
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []).filter((file) => {
            const extension = file.name.split(".").pop()?.toLowerCase() || "";
            return ALLOWED_EXTENSIONS.includes(extension);
        });

        const newFiles = files.slice(0, 5 - fileList.length); // 최대 5개 제한

        if (fileList.length + files.length > 5) {
            alert("파일은 5개까지만 첨부 가능합니다.");
        }

        const updatedFileList = [
            ...fileList,
            ...newFiles.map((file, index) => ({
                id: Date.now() + index,
                file,
                name: file.name,
            })),
        ];

        setFileList(updatedFileList);
        e.target.value = ""; // 선택 초기화
    };

    // 파일 삭제 이벤트 핸들러
    const handleDeleteFile = (fileId: number) => {
        setFileList(fileList.filter((file) => file.id !== fileId));
    };

    return (
        <div className="pl-lg-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="heading text-muted mb-0">첨부 파일</h3>
                <Button
                    className="btn-icon btn-3"
                    size="sm"
                    color="primary"
                    type="button"
                    onClick={() => document.getElementById("fileInput")?.click()}
                >
                    <span className="btn-inner--icon">
                        <i className="ni ni-fat-add" />
                    </span>
                    <span className="btn-inner--text">첨부파일 등록</span>
                </Button>
                <input
                    id="fileInput"
                    type="file"
                    multiple
                    accept={ALLOWED_EXTENSIONS.map(ext => `.${ext}`).join(",")} // 허용된 확장자만 설정
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
            </div>
            <div>
                <ul id="file-list" className="list-unstyled mb-0">
                    {fileList.length === 0 ? (
                        <li className="text-muted">
                            {formType === 'insert' ? "첨부파일 등록" : "첨부된 파일이 없습니다."}
                        </li>
                    ) : (
                        fileList.map((file) => {
                            const extension = file.name.split(".").pop()?.toLowerCase() || "";
                            return (
                                <li key={file.id} className="mb-1 d-flex align-items-center">
                                    <Button
                                        className="btn-icon btn-3 mr-2"
                                        size="sm"
                                        color="danger"
                                        type="button"
                                        onClick={() => handleDeleteFile(file.id)}
                                    >
                                        <i className="ni ni-basket"/>
                                    </Button>
                                    <img
                                        alt="..."
                                        src={getIconByExtension(extension)}
                                        className="my-file-icon"
                                    />
                                    {file.name}
                                </li>
                            );
                        })
                    )}
                </ul>
            </div>
        </div>
    );
};

export default FileUpload;