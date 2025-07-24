import { Button } from "reactstrap";
import useModalHook from "@/hook/useModal";

const ExcelDownloadButton: React.FC = () => {

    const { openCustomModal } = useModalHook();

    const handleExcelDownload = () => {
        openCustomModal({
            title: "알림",
            message: "해당 기능은 준비 중입니다.",
            isConfirm: false,
        });
    };

    return (
        <Button type="button" onClick={handleExcelDownload} color="success">
            엑셀
        </Button>
    );
};

export default ExcelDownloadButton;