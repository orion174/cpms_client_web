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
  Col, InputGroupText, InputGroupAddon,
  InputGroup
} from "reactstrap";

import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/view/layout/Headers/Header.jsx";
import useModalHook from "@/hook/useModal";
import FileUpload from "@/components/Module/FileUpload.tsx";
import ComCodeSelect from "@/components/Module/ComCodeSelect.tsx";
import LitePicker from "@/components/Module/LitePicker.tsx";
import { getEditorContent, initializeSmartEditor } from "@/utils/smartEditor.js";
import { FileItem, NewFileItem } from "@/definition/type.ts";
import { callAPI } from "@/auth/interceptor.ts";
import CpmsProjectSelect from "@/components/Module/CpmsProjectSelect.tsx";

interface FormType {
  formType: "insert" | "update";
}

const SuportForm: React.FC = () => {
  const location = useLocation();
  const { formType } = location.state as FormType;

  const { openCustomModal } = useModalHook();

  const [fileList, setFileList] = useState<FileItem[]>([]);

  // 저장할 데이터
  const [formData, setFormData] = useState({
    reqCompanyId: 1,
    reqProjectId: 0,
    requestCd: 0,
    statusCd: 3,
    suportTitle: "",
    reqDate: "",
  });

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  /* 스마트 에디터 관련 */
  const oEditors = useRef<never[]>([]);
  useEffect(() => {
    const loadScripts = () => {
      const script = document.createElement("script");
      script.src = "/smarteditor/js/HuskyEZCreator.js";
      script.type = "text/javascript";
      script.charset = "utf-8";

      script.onload = () => {
        initializeSmartEditor("editorTxt", oEditors.current)
          .then(() => console.log("SmartEditor initialized."))
          .catch((error) => console.error("SmartEditor error:", error));
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    };

    loadScripts();
  }, []);

  // 저장버튼 클릭
  const handleSave = () => {
      let message = "";

      // if (!formData.reqCompanyId) {
      //     message = "업체를 선택하세요.";
      //
      // }
      if (!formData.reqProjectId) {
          message = "프로젝트를 선택하세요.";

      } else if (!formData.requestCd) {
          message = "요청 유형을 선택하세요.";

      } else if (!formData.suportTitle) {
          message = "제목을 입력하세요.";

      } else if (!formData.statusCd) {
          message = "처리 상태를 선택하세요.";

      } else if (!formData.reqDate) {
          message = "처리 기한을 선택하세요.";
      }

      if (message) {
          openCustomModal({ title: "알림", message, isConfirm: false });
          return;

      } else {
        openCustomModal({
          title: "확인",
          message: "저장하시겠습니까?",
          isConfirm: true,
          onConfirm: () => {
            if (formType === "insert") {
              saveSuportReq();
            }
          },
        });
      }
  };

  // 프로젝트 문의 저장 API
  const saveSuportReq = async () => {
    const data = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value.toString());
    });

    // 에디터 내용
    data.append("suportEditor", getEditorContent(oEditors.current));

    // 문의 첨부파일
    fileList.filter((file): file is NewFileItem => file.isNew && !!file.file)
        .forEach((file) => {
            if (file.file) {
              data.append("suportFile", file.file);
            }
        });

    const res
        = await callAPI.post("/api/suport/insert", data, {
            headers: { "Content-Type": "multipart/form-data" },
          });

    if (res.status === 200) {
        openCustomModal({
            title: "알림",
            message: "저장이 완료되었습니다.",
            isConfirm: false,
            redirectUrl: "/admin/suport/index",
        });
    }
  };

  // 목록으로 돌아가기
  const handleList = () => {
    openCustomModal({
      title: "알림",
      message: "목록으로 돌아가겠습니까?",
      isConfirm: true,
      redirectUrl: "/admin/suport/index",
    });
  };

  return (
    <>
      <Header/>
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="card-profile shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    {formType === "insert" && <h2 className="mb-0">프로젝트 문의</h2>}
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button color="default" onClick={handleList}>목록</Button>
                    <Button color="success" onClick={handleSave}>저장</Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="pl-lg-4">
                    <h3 className="heading mb-4">문의 정보</h3>
                    <div className="my-div-custom">
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label className="form-control-label">요청 업체</label>
                            {/* TODO 업체 리스트 선택 컴포넌트 구현 */}
                            <Input
                                type="select"
                                className="my-input-text"
                                value={formData.reqCompanyId}
                                onChange={(e) =>
                                    handleInputChange("reqCompanyId", e.target.value)
                                }
                            >
                              <option value="1">CODEIDEA</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label className="form-control-label">문의 프로젝트</label>
                            <CpmsProjectSelect
                                selectId="reqProjectId"
                                value={formData.reqProjectId}
                                onChange={(e) => handleInputChange("reqProjectId", e.target.value)}
                                classNm="my-input-text form-control"
                                initText="프로젝트 선택"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label className="form-control-label">요청 유형</label>
                            <ComCodeSelect
                                groupId="10"
                                selectId="requestCd"
                                value={formData.requestCd}
                                onChange={(e) => handleInputChange("requestCd", e.target.value)}
                                classNm="my-input-text form-control"
                                initText="요청 유형 선택"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <label className="form-control-label">처리 기한</label>
                          <FormGroup>
                            <InputGroup>
                              <LitePicker
                                  inputId="reqDate"
                                  placeholder="처리 기한 선택"
                                  onDateChange={(startDate) => handleInputChange("reqDate", startDate)}
                              />
                              <InputGroupAddon addonType="append">
                                <InputGroupText>
                                  <i className="ni ni-calendar-grid-58 text-primary" />
                                </InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label className="form-control-label">처리 상태</label>
                            <ComCodeSelect
                                groupId="20"
                                selectId="statusCd"
                                value={formData.statusCd}
                                onChange={(e) => handleInputChange("statusCd", e.target.value)}
                                classNm="my-input-text form-control"
                                initText="처리 상태 선택"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <div className="pl-lg-4 section-space">
                    <h3 className="heading mb-4">상세 요청 내용</h3>
                    <div className="my-div-custom">
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label className="form-control-label">요청 제목</label>
                            <Input
                                type="text"
                                className="my-input-text"
                                placeholder="문의하실 글의 제목을 입력하세요."
                                value={formData.suportTitle}
                                onChange={(e) => handleInputChange("suportTitle", e.target.value)}
                                maxLength={50}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label className="form-control-label">상세 내용</label>
                            <div id="smarteditor">
                              <textarea
                                  name="editorTxt"
                                  id="editorTxt"
                                  rows={20}
                                  style={{width: "100%"}}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </div>

                  <div className="section-space">
                    <FileUpload
                        formType={formType}
                        onFileChange={setFileList}
                        initFiles={fileList}
                    />
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
