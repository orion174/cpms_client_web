import { rawAPI } from "@/core/api/client.ts";

import excelIcon from "@/assets/img/icons/excel_icon.png";
import hwpIcon from "@/assets/img/icons/hwp_icon.png";
import jpgIcon from "@/assets/img/icons/jpg_icon.png";
import pdfIcon from "@/assets/img/icons/pdf_icon.png";
import pngIcon from "@/assets/img/icons/png_icon.png";
import pptIcon from "@/assets/img/icons/ppt_icon.png";
import wordIcon from "@/assets/img/icons/word_icon.png";

interface FileList {
    [key: string]: any;
    fileType: string;
    filePath: string;
    fileNm: string;
    fileOgNm: string;
}

interface FileDownProps<T extends keyof FileList> {
    fileList: FileList[];
    idKey: T;
}

const getIconByExtension = (extension: string): string => {
    switch (extension.toLowerCase()) {
        case "xlsx":
        case "xls":
            return excelIcon;
        case "hwp":
            return hwpIcon;
        case "jpg":
        case "jpeg":
            return jpgIcon;
        case "pdf":
            return pdfIcon;
        case "png":
            return pngIcon;
        case "ppt":
        case "pptx":
            return pptIcon;
        case "doc":
        case "docx":
            return wordIcon;
        default:
            return "";
    }
};

const FileDown = <T extends keyof FileList>({ fileList, idKey }: FileDownProps<T>) => {
    // 버튼 클릭시, 파일 다운로드 이벤트
    const handleFileDownload = async (fileId: any, fileOgNm: string) => {
        if (!fileId) return;

        try {
            const endPoint = `/api/support/file/${fileId}/download`;
            const response = await rawAPI.get(endPoint, {
                responseType: 'blob',
            });

            const blob = response.data;
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = fileOgNm;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (err) {
            console.error("첨부파일 다운로드 에러", err);
        }
    };

    if (!fileList || fileList.length === 0) {
        return null;
    }

    return (
        <div className="file-down-wrapper" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {fileList.map((file) => {
                const extension = file.fileOgNm.split(".").pop()?.toLowerCase() || "";
                const icon = getIconByExtension(extension);

                return (
                    <div
                        key={file[idKey]}
                        style={{ display: "flex", alignItems: "center", gap: "5px" }}
                    >
                        {icon ? (
                            <img
                                alt={extension}
                                src={icon}
                                style={{ width: "24px", height: "24px", objectFit: "contain" }}
                            />
                        ) : (
                            <span style={{ fontSize: "14px", color: "#6c757d" }}>파일</span>
                        )}
                        <a
                            href={file.filePath}
                            onClick={(e) => {
                                e.preventDefault();
                                handleFileDownload(file[idKey], file.fileOgNm);
                            }}
                            className="file-link"
                            style={{
                                textDecoration: "none",
                                color: "#007BFF",
                                fontSize: "14px",
                                fontWeight: "500",
                            }}
                        >
                            {file.fileOgNm}
                        </a>
                    </div>
                );
            })}
        </div>
    );
};

export default FileDown;