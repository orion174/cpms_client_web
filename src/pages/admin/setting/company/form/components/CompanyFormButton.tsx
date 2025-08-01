import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import useModalHook from "@/hooks/useModal.ts";
import { useCancelNavigation } from "@/hooks/customHook.ts";

import { saveCompany } from "@/core/api/setting/companyService.ts";
import type { ReqCompanyDTO } from "@/types/admin/companyTypes.ts";

interface CompanyFormButtonPrps {
    reqCompanyDTO: ReqCompanyDTO
    isEditMode: boolean;
};

const CompanyFormButton: React.FC<CompanyFormButtonPrps> = ({ isEditMode, reqCompanyDTO }) => {

    const { openCustomModal } = useModalHook();
    const confirmCancel = useCancelNavigation();
    const navigate = useNavigate();

    const validate = (): string => {
        if (!reqCompanyDTO.authType) return "업체의 등급을 선택하세요.";
        if (!reqCompanyDTO.companyNm) return "업체 이름을 입력하세요.";

        return "";
    };

    // 계정 정보 저장
    const handSave = () => {
        const message = validate();

        if (message) {
            openCustomModal({
                title: "알림",
                message,
                isConfirm: false
            });

            return;
        }

        openCustomModal({
            title: "확인",
            message: "저장하시겠습니까?",
            isConfirm: true,
            onConfirm: async () => {
                if (!isEditMode) await saveCompany(reqCompanyDTO);

                openCustomModal({
                    title: "알림",
                    message: "저장이 완료되었습니다.",
                    isConfirm: true,
                    onConfirm: () => navigate(-1)
                });
            },
        });
    };

    return (
        <>
            <Button type="button" color="default" onClick={confirmCancel}>
                등록 취소
            </Button>
            <Button type="button" color="success" onClick={handSave}>
                {isEditMode ? "수정 완료" : "업체 등록"}
            </Button>
        </>
    );
};

export default CompanyFormButton;