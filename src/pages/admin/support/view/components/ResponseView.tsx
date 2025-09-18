import { Button, Card, CardHeader, CardBody, Row, Col, FormGroup } from "reactstrap";
import React from "react";

import { isValidHtmlContent } from "@/utils/cmmn.ts";
import FileDown from "@/components/CmmnModule/FileDownload.tsx";

import type { supportFileList, supportResponse } from '@/types/support/types.ts';

interface ResponseViewProps {
    authType: string;
    supportResponse: supportResponse;
    responseFileList: supportFileList[];
    onResponseDelete: () => void;
    onResponseUpdate: () => void;
}

const ResponseView: React.FC<ResponseViewProps> = ({
    supportResponse,
    authType,
    responseFileList,
    onResponseDelete,
    onResponseUpdate
}) => {
    const hasValidTitle = supportResponse.responseTitle && supportResponse.responseTitle.trim() !== "";
    const hasValidEditor = isValidHtmlContent(supportResponse.responseEditor);
    const hasFiles = responseFileList && responseFileList.length > 0;

    return (
        <div className="res-form-container">
            <Row>
                <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
                    <Card className="card-profile shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="10">
                                    <h2 className="mb-0">처리 내역</h2>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody className="pt-0 pt-md-4">
                            {hasValidTitle && (
                                <div className="pl-lg-4">
                                    {hasValidTitle && (
                                        <Row>
                                            <Col xl="12">
                                                <FormGroup>
                                                    <label className="form-control-label-custom">
                                                        처리 내역
                                                    </label>
                                                    <div className="my-detail-text">
                                                        {supportResponse.responseTitle}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    )}
                                    {hasFiles && (
                                        <Row>
                                            <Col xl="12">
                                                <label className="form-control-label-custom">
                                                    관련 첨부파일
                                                </label>
                                                <FileDown
                                                    content="support"
                                                    fileList={responseFileList}
                                                    idKey="supportFileId"
                                                />
                                            </Col>
                                        </Row>
                                    )}
                                </div>
                            )}

                            <div className="pl-lg-4 section-space">
                                <Row>
                                    {hasValidEditor && (
                                        <Col xl="12">
                                            <FormGroup>
                                                <label className="form-control-label-custom">
                                                    처리 상세 내역
                                                </label>
                                                <div className="text-editor__wrapper_res">
                                                    <div
                                                        className="my-detail-text-editor"
                                                        dangerouslySetInnerHTML={{
                                                            __html: supportResponse.responseEditor || ""
                                                        }}
                                                    />
                                                </div>
                                            </FormGroup>
                                        </Col>
                                    )}

                                    {authType == "ADMIN" && (
                                        <Col className="text-right" xs="12">
                                            <Button
                                                onClick={onResponseDelete}
                                                color="danger"
                                                outline
                                            >
                                                답변삭제
                                            </Button>
                                            <Button
                                                onClick={onResponseUpdate}
                                                color="info"
                                                outline
                                            >
                                                답변수정
                                            </Button>
                                        </Col>
                                    )}
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ResponseView;