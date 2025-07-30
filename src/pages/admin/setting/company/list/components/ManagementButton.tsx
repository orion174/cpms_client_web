import { Button } from "reactstrap";
import React from "react";
import { useNavigate } from "react-router-dom";

const ManagementButton: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="d-flex justify-content-end align-items-center gap-2">
                <Button
                    type="button"
                    color="secondary"
                    className="px-3 py-2"
                    onClick={
                        () => navigate("/admin/setting/company/form")
                    }
                >
                    <span className="btn-inner--icon">
                        <i className="ni ni-fat-add" />
                    </span>
                    <span>업체추가</span>
                </Button>
            </div>
        </>
    );
};

export default ManagementButton;