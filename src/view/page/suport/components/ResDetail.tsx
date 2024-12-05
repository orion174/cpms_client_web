import React from "react";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    FormGroup
} from "reactstrap";

import FileDown from "@/components/Module/FileDownload";
import { suportRes, suportFileList } from "@/definition/type.ts";
import { isValidHtmlContent } from "@/utils/common.ts";

interface ResDetailProps {
    suportRes: suportRes;
    resFileList: suportFileList[];
    onResDelete: () => void;
    onResUpdate: () => void;
}

const ResDetail: React.FC<ResDetailProps> = ({ suportRes, resFileList, onResDelete, onResUpdate }) => {
    const hasValidTitle = suportRes.resTitle && suportRes.resTitle.trim() !== "";
    const hasValidEditor = isValidHtmlContent(suportRes.resEditor);
    const hasFiles = resFileList && resFileList.length > 0;

    return (
        <div className="res-form-container">
            <Row>
                <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
                    <Card className="card-profile shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="10">
                                    <h2 className="mb-0">처리내역</h2>
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
                                                    <label className="form-control-label-custom">답변</label>
                                                    <div className="my-detail-text">{suportRes.resTitle}</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    )}
                                    {hasFiles && (
                                        <Row>
                                            <Col xl="12">
                                                <label className="form-control-label-custom">관련 첨부파일</label>
                                                <FileDown fileList={resFileList} idKey="suportFileId" />
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
                                                    <label className="form-control-label-custom">처리상세 내역</label>
                                                    <div className="text-editor__wrapper_res">
                                                        <div
                                                            className="my-detail-text-editor"
                                                            dangerouslySetInnerHTML={{
                                                                __html: suportRes.resEditor || "",
                                                            }}
                                                        ></div>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        )}
                                        <Col className="text-right" xs="12">
                                            <Button onClick={onResDelete} color="danger" outline>답변삭제</Button>
                                            <Button onClick={onResUpdate} color="info" outline>답변수정</Button>
                                        </Col>
                                    </Row>
                                </div>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ResDetail;