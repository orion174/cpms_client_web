import { Card, CardBody, CardHeader, Col, Container, Form, Row } from "reactstrap";

import { useFormState } from "@/hook/customHook";
import Header from "@/view/layout/Headers/Header.tsx";
import CompanyFormButton from "@/view/page/setting/company/form/components/CompanyFormButton.tsx";
import BasicInfoSection from "./components/BasicInfoSection.tsx";

import { getInitCompany, ReqCompanyDTO } from "@/definition/company.types.ts";
import EtcInfoSection from "@/view/page/setting/company/form/components/EtcInfoSection.tsx";

const CompanyForm: React.FC = () => {
    const isEditMode = new URLSearchParams(location.search).has("companyId");
    const { formState, handleChange } = useFormState<ReqCompanyDTO>(getInitCompany());

    return (
        <>
            <Header />

            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">{isEditMode ? '업체 정보 수정' : '신규 관리 업체 생성'}</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <CompanyFormButton
                                            reqCompanyDTO={formState}
                                            isEditMode={isEditMode}
                                        />
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody className="p-4">
                                <Form>
                                    {/* 기본 정보 입력 폼 */}
                                    <BasicInfoSection
                                        reqCompanyDTO={formState}
                                        handleChange={handleChange}
                                    />
                                    {/* 기타 정보 입력 폼 */}
                                    <EtcInfoSection
                                        reqCompanyDTO={formState}
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

export default CompanyForm;