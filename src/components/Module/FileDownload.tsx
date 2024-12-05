import { getCookie } from "@/utils/cookieUtils.ts";
import { getAccessToken } from "@/utils/jwtTokenUtils.ts";

import excelIcon from "@/assets/img/icons/excel_icon.png";
import hwpIcon from "@/assets/img/icons/hwp_icon.png";
import jpgIcon from "@/assets/img/icons/jpg_icon.png";
import pdfIcon from "@/assets/img/icons/pdf_icon.png";
import pngIcon from "@/assets/img/icons/png_icon.png";
import pptIcon from "@/assets/img/icons/ppt_icon.png";
import wordIcon from "@/assets/img/icons/word_icon.png";

interface FileList {
    [key: string]: any; // 동적 키를 허용
    fileType: string;
    filePath: string;
    fileNm: string;
    fileOgNm: string;
}

interface FileDownProps<T extends keyof FileList> {
    fileList: FileList[];
    idKey: T; // 동적 필드 이름을 지정
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

    // 파일 다운로드
    const handleFileDownload = async (fileId: any, fileOgNm: string) => {
        if(fileId > 0) {
            const cookies = await getCookie() as Record<string, string | undefined>;
            const token = await getAccessToken(cookies);

            const apiUrl = `${import.meta.env.VITE_API_URL}/api/suport/fileDownload/${fileId}`;

            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : "",
                }
            });

            if (!response.ok) {
                throw new Error("첨부파일 다운로드 에러");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;
            link.download = fileOgNm;

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }
    };

    // 파일 리스트가 없으면 렌더링하지 않음
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
                        key={file[idKey]} // 동적으로 지정된 ID 키 사용
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