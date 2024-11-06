import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col, InputGroupText, InputGroupAddon, InputGroup,
} from "reactstrap";

import Header from "@/components/Headers/Header.jsx";

import { useEffect, useRef } from "react";
import Litepicker from "litepicker";

import { initializeSmartEditor} from "@/utils/smartEditor.js";
import FileUpload from "@/components/Module/FileUpload.tsx";
import ComCodeSelect  from "@/components/Module/ComCodeSelect.tsx";

const SuportForm: React.FC = () => {

    const pickerRef = useRef(null);
    const oEditors = useRef<never[]>([]);

    useEffect(() => {
        if (pickerRef.current) {
            new Litepicker({
                element: pickerRef.current,
                singleMode: true,
                format: "YYYY-MM-DD",
            });
        }
    }, []);

    useEffect(() => {
        const loadScripts = () => {
            const editorScript = document.createElement('script');

            editorScript.src = '/smarteditor/js/HuskyEZCreator.js';
            editorScript.type = 'text/javascript';
            editorScript.charset = 'utf-8';

            editorScript.onload = () => {
                initializeSmartEditor('editorTxt', oEditors.current)
                    .then(() => {
                        console.log("SmartEditor가 성공적으로 초기화되었습니다.");
                    })
                    .catch((error: Error) => {
                        console.error('SmartEditor 초기화 중 오류 발생:', error);
                    });
            };

            document.body.appendChild(editorScript);

            return () => {
                document.body.removeChild(editorScript);
            };
        };

        loadScripts();
    }, []);

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
                    <h2 className="mb-0">작성</h2>
                  </Col>
                  <Col className="text-right" xs="4">
                      <Button
                          color="info" outline
                          onClick={(e) => e.preventDefault()}
                      >임시저장
                      </Button>
                      <Button
                          color="info"
                          onClick={(e) => e.preventDefault()}
                      >저장
                      </Button>
                      <Button
                          color="default"
                          onClick={(e) => e.preventDefault()}
                      >취소
                      </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                    <div className="pl-lg-4">
                        <h3 className="heading text-muted mb-4">기본 정보</h3>
                        <Row>
                            <Col lg="4">
                                <FormGroup>
                                    <label className="form-control-label" htmlFor="">업체 선택</label>
                                    <Input id="companyId" type="select">
                                        <option value="">선택</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col lg="4">
                                <FormGroup>
                                    <label className="form-control-label" htmlFor="">프로젝트 선택</label>
                                    <Input id="projectId" type="select">
                                        <option value="">선택</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col lg="4">
                                <FormGroup>
                                    <label className="form-control-label" htmlFor="">요청유형 선택</label>
                                    <ComCodeSelect masterCodeId="10" selectId="requestCd" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="4">
                                <FormGroup>
                                    <label className="form-control-label" htmlFor="">처리 기한</label>
                                    <InputGroup>
                                        <Input
                                            type="text"
                                            className="my-input-text"
                                            placeholder="Select Date Range"
                                            innerRef={pickerRef}
                                        />
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText>
                                                <i className="ni ni-calendar-grid-58 text-primary"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col lg="4">
                                <FormGroup>
                                    <label className="form-control-label" htmlFor="">담당자</label>
                                    <Input id="userId" type="select">
                                        <option value="">선택</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col lg="4">
                                <FormGroup>
                                    <label className="form-control-label" htmlFor="">처리상태</label>
                                    <ComCodeSelect masterCodeId="20" selectId="statusCd" />
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                    <div className="pl-lg-4">
                        <h3 className="heading text-muted mb-4">요청 상세 작성</h3>
                        <Row>
                            <Col lg="12">
                                <FormGroup>
                                    <label className="form-control-label" htmlFor="">요청 제목</label>
                                    <Input
                                        type="text"
                                        id="suportTitle"
                                        className="my-input-text"
                                        placeholder="문의하실 글의 제목을 입력하세요."
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12">
                                <FormGroup>
                                    <label className="form-control-label" htmlFor="">상세 내용</label>
                                    <div id="smarteditor">
                                          <textarea
                                              name="editorTxt"
                                              id="editorTxt"
                                              rows={20}
                                              cols={10}
                                              style={{width: '100%'}}
                                          />
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                    <div className="App">
                        <FileUpload formType="insert"/>
                    </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SuportForm;
