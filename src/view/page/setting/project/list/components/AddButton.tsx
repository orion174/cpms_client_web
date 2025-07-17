import React, { useState } from "react";
import { Button } from "reactstrap";

import ProjectModalForm from "../../modal/ProjectModalForm";
import { useFormState } from "@/hook/customHook";
import { saveProject } from "@/core/api/setting/projectService";
import { getInitProject, ReqProjectDTO } from "@/definition/project.types";
import { useNavigate } from "react-router-dom";
import FormModal from "@/components/ModalModule/FormModal";
import useModalHook from "@/hook/useModal.ts";

const ManagementButton: React.FC = () => {
    const { openCustomModal } = useModalHook();
    const navigate = useNavigate();

    const [ isOpen, setIsOpen ] = useState(false);
    const { formState, handleChange, resetForm } = useFormState<ReqProjectDTO>(getInitProject());

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        resetForm();
    };

    const validate = (): string => {
        if (!formState.companyId) return "프로젝트 소속 업체를 선택하세요.";
        if (!formState.projectNm) return "프로젝트 명을 입력하세요.";
        return "";
    };

    const handleSubmit = async () => {

        const message = validate();

        if (message) {
            openCustomModal({ title: "알림", message, isConfirm: false });
            return;
        }

        openCustomModal({
            title: "확인",
            message: "저장하시겠습니까?",
            isConfirm: true,
            onConfirm: async () => {

                await saveProject(formState);

                handleClose();

                openCustomModal({
                    title: "알림",
                    message: "저장이 완료되었습니다.",
                    isConfirm: true,
                    onConfirm: () => navigate(
                        "/admin/setting/project/list"
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
                <ProjectModalForm
                    formState={formState}
                    handleChange={handleChange}
                />
            </FormModal>
        </>
    );
};

export default ManagementButton;
