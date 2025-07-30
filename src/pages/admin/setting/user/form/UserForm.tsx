import {
    Card,
    CardHeader,
    CardBody,
    Form,
    Container,
    Row,
    Col,
} from "reactstrap";
import { useLocation } from "react-router-dom";
import { useState } from "react";

import { useFormState } from "@/hooks/customHook.ts";
import Empty from "@/pages/layout/StatusArea/Empty.tsx";
import SideInfoForm from "@/pages/admin/setting/user/view/components/SideInfoForm.tsx";
import UserFormButton from "@/pages/admin/setting/user/form/components/UserFormButton.tsx";
import BasicInfoSection from "@/pages/admin/setting/user/form/components/BasicInfoSection.tsx";
import CompanyInfoSection from "@/pages/admin/setting/user/form/components/CompanyInfoSection.tsx";
import EtcInfoSection from "@/pages/admin/setting/user/form/components/EtcInfoSection.tsx";

import type { ReqUserDTO } from "@/types/user/userTypes.ts";

const UserForm:React.FC = () => {
    const location = useLocation();
    const isEditMode = new URLSearchParams(location.search).has("userId");

    // 아아디 중복검사 통과여부
    const [ isIdVerified, setIsIdVerified ] = useState<boolean>(false);
    const { formState, handleChange } = useFormState<ReqUserDTO>(getInitUser());

    return (
        <>
            <Empty />

            <Container className={isEditMode ? "mt--5" : "mt--7"} fluid>
                <Row>
                    {/* 오른쪽 기타 정보 표시 영역 */}
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                        {isEditMode && (
                            <SideInfoForm />
                        )}
                    </Col>

                    {/* 계정 생성 입력 폼 */}
                    <Col className="order-xl-1" xl={isEditMode ? 8 : 12}>
                        <Card className="bg-secondary shadow">

                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">{isEditMode ? '계정 정보 수정' : '계정 생성'}</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        {/* 폼 버튼 */}
                                        <UserFormButton
                                            reqUserDTO={formState}
                                            isEditMode={isEditMode}
                                        />
                                    </Col>
                                </Row>
                            </CardHeader>

                            <CardBody>
                                <Form>
                                    {/* 기본 정보 입력 폼 */}
                                    <BasicInfoSection
                                        reqUserDTO={formState}
                                        handleChange={handleChange}
                                        isIdVerified={isIdVerified}
                                        setIsIdVerified={setIsIdVerified}
                                    />

                                    {/* 회사 정보 입력 폼 */}
                                    <CompanyInfoSection
                                        reqUserDTO={formState}
                                        handleChange={handleChange}
                                    />

                                    {/* 기타 정보 입력 폼 */}
                                    <EtcInfoSection
                                        reqUserDTO={formState}
                                        handleChange={handleChange}
                                    />
                                </Form>
                            </CardBody>

                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

const getInitUser = (): ReqUserDTO => ({
    loginId: '',
    userNm: '',
    authType: '',
    userPhone: '',
    userEmail: '',
    companyId: 0,
    userDept: '',
    userPos: '',
    userInfo: '',
    userNote: '',
});

export default UserForm;
