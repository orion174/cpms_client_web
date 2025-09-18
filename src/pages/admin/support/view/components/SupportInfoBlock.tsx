import { Row, Col, FormGroup } from "reactstrap";
import type { ResSupportViewDTO } from "@/types/support/types";

interface SupportInfoBlockProps {
    result: ResSupportViewDTO | null;
};

const SupportInfoBlock: React.FC<SupportInfoBlockProps> = ({ result }) => {
    if (!result) {
        return (
            <>
                <div className="pl-lg-4">
                    <div className="my-detail-text">조회된 데이터가 없습니다.</div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="pl-lg-4">
                <Row>
                    <Col lg="4">
                        <FormGroup>
                            <label className="form-control-label-custom">요청 업체</label>
                            <div className="my-detail-text">{result.requestCompanyNm}</div>
                        </FormGroup>
                    </Col>
                    <Col lg="4">
                        <FormGroup>
                            <label className="form-control-label-custom">프로젝트 명</label>
                            <div className="my-detail-text">{result.requestProjectNm}</div>
                        </FormGroup>
                    </Col>
                    <Col lg="4">
                        <FormGroup>
                            <label className="form-control-label-custom">요청 유형</label>
                            <div className="my-detail-text">{result.requestNm}</div>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg="4">
                        <FormGroup>
                            <label className="form-control-label-custom">처리 기한</label>
                            <div className="my-detail-text">{result.requestDate}</div>
                        </FormGroup>
                    </Col>
                    <Col lg="4">
                        <FormGroup>
                            <label className="form-control-label-custom">처리 담당자</label>
                            <div className="my-detail-text">{result.responseUserNm ?? "-"}</div>
                        </FormGroup>
                    </Col>
                    <Col lg="4">
                        <FormGroup>
                            <label className="form-control-label-custom">처리 상태</label>
                            <div className="my-detail-text">
                                {result.statusNm}
                                {result.statusCd === 7 && result.responseDate && (
                                    <span style={{marginLeft: "0.5rem"}}>({result.responseDate})</span>
                                )}
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default SupportInfoBlock;