import React, { useState } from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

import useModalHook from "@/hooks/useModal.ts";
import { useFormState } from "@/hooks/customHook.ts";
import { saveProject } from "@/core/api/setting/projectService.ts";
import CreateProject from "../../modal/CreateProject.tsx";
import FormModal from "@/components/ModalModule/FormModal.tsx";

import type { ReqProjectDTO } from "@/types/admin/projectTypes.ts";

const ManagementButton: React.FC = () => {
    const { openCustomModal } = useModalHook();
    const navigate = useNavigate();

    const [ isOpen, setIsOpen ] = useState(false);
    const { formState, handleChange, resetForm } = useFormState<ReqProjectDTO>(getInitProject());

    const handleOpen = (): void => {
        setIsOpen(true);
    };

    const handleClose = (): void => {
        setIsOpen(false);
        resetForm();
    };

    const validate = (): string => {
        if (!formState.companyId) return "프로젝트 소속 업체를 선택하세요.";
        if (!formState.projectNm) return "프로젝트 명을 입력하세요.";

        return "";
    };

    const handleSubmit = async (): Promise<void> => {
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
            onConfirm: async (): Promise<void> => {
                await saveProject(formState);
                handleClose();

                openCustomModal({
                    title: "알림",
                    message: "저장이 완료되었습니다.",
                    isConfirm: true,
                    onConfirm: () => navigate(
                        '/admin/setting/project/list'
                        , { state: { reload: true } }
                    )
                });
            },
        });
    };

    return (
        <>
            <div className="d-flex justify-content-end align-items-center gap-2">
                <Button type="button" color="secondary" className="px-3 py-2" onClick={handleOpen}>
                    <span className="btn-inner--icon">
                        <i className="ni ni-fat-add"/>
                    </span>
                    <span>신규 프로젝트</span>
                </Button>
            </div>

            <FormModal
                isOpen={isOpen}
                title="신규 프로젝트 추가"
                onConfirm={handleSubmit}
                onClose={handleClose}
            >
                <CreateProject
                    formState={formState}
                    handleChange={handleChange}
                />
            </FormModal>
        </>
    );
};

const getInitProject = (): ReqProjectDTO => ({
    companyId: 0
    , projectNm: ''
    , projectInfo: ''
});

export default ManagementButton;
