import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import useModalHook from "@/hooks/useModal.ts";
import { useCancelNavigation } from "@/hooks/customHook.ts";

import { saveUser } from "@/core/api/setting/userService.ts";
import type { ReqUserDTO } from "@/pages/admin/setting/user/types.ts";

interface UserFormButtonPrps {
    reqUserDTO: ReqUserDTO;
    isEditMode: boolean;
};

const UserFormButton:React.FC<UserFormButtonPrps> = ({ isEditMode, reqUserDTO }) => {

    const { openCustomModal } = useModalHook();
    const confirmCancel = useCancelNavigation();
    const navigate = useNavigate();

    const validate = (): string => {
        if (!reqUserDTO.loginId) return "로그인 ID를 입력하세요.";
        if (!reqUserDTO.userNm) return "이름을 입력하세요.";
        if (!reqUserDTO.authType) return "시스템 권한을 선택하세요.";
        if (!reqUserDTO.companyId) return "소속업체를 선택하세요.";
        return "";
    };

    // 계정 정보 저장
    const handSave = (): void => {
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
                if (!isEditMode) await saveUser(reqUserDTO);

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
            <Button color="default" onClick={confirmCancel}>
                등록 취소
            </Button>
            <Button color="success" onClick={handSave}>
                {isEditMode ? "수정 완료" : "사용자 등록"}
            </Button>
        </>
    );
};

export default UserFormButton;