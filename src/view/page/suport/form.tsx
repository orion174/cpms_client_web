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
  Col
} from "reactstrap";

import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import Header from "@/view/layout/Headers/Header.jsx";
import FileUpload from "@/components/Module/FileUpload.tsx";
import ComCodeSelect from "@/components/Module/ComCodeSelect.tsx";
import LitePicker from "@/components/Module/LitePicker.tsx";
import { getEditorContent, initializeSmartEditor } from "@/utils/smartEditor.js";
import useModalHook from "@/hook/useModal";

import { callAPI } from "@/utils/interceptor";

interface FormType {
  formType: "insert" | "update";
}

interface FileItem {
  id: number;
  file: File;
  name: string;
}

/**
 * 유지보수 문의 폼
 * @constructor
 */
const SuportForm: React.FC = () => {
  const location = useLocation();
  const { formType } = location.state as FormType;

  const { openCustomModal } = useModalHook();

  const [fileList, setFileList] = useState<FileItem[]>([]);

  const [formData, setFormData] = useState({
    reqCompanyId: "",
    reqProjectId: "",
    requestCd: "10",
    statusCd: "10",
    suportTitle: "",
    reqDate: "",
  });

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

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

  const handleSave = () => {
      let message = "";

      if (!formData.reqCompanyId) {
          message = "업체를 선택해주세요.";

      } else if (!formData.reqProjectId) {
          message = "프로젝트를 선택해주세요.";

      } else if (!formData.requestCd) {
          message = "요청 유형을 선택해주세요.";

      } else if (!formData.statusCd) {
          message = "처리 상태를 선택해주세요.";

      } else if (!formData.suportTitle) {
          message = "제목을 입력해주세요.";

      } else if (!formData.reqDate) {
          message = "처리 기한을 선택해주세요.";
      }

      if (message) {
          openCustomModal({ title: "알림", message, isConfirm: false });
          return;
      }

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
  };

  const saveSuportReq = async () => {
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    data.append("suportEditor", getEditorContent(oEditors.current));

    fileList.forEach((file) => data.append("suportFile", file.file));

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

  const handleList = () => {
    openCustomModal({
      title: "알림",
      message: "목록으로 돌아가겠습니까?",
      isConfirm: false,
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
                    <Button color="info" onClick={handleSave}>저장</Button>
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
                            <label className="form-control-label">업체 선택</label>
                            <Input
                                type="select"
                                className="my-input-text"
                                value={formData.reqCompanyId}
                                onChange={(e) => handleInputChange("reqCompanyId", e.target.value)}
                            >
                              <option value="">선택</option>
                              <option value="1">CODEIDEA</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label className="form-control-label">프로젝트 선택</label>
                            <Input
                                type="select"
                                className="my-input-text"
                                value={formData.reqProjectId}
                                onChange={(e) => handleInputChange("reqProjectId", e.target.value)}
                            >
                              <option value="">선택</option>
                              <option value="1">강남구청 행정포털</option>
                              <option value="2">중랑구청 행정포털</option>
                              <option value="2">중랑구청 게시판</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label className="form-control-label">요청 유형</label>
                            <ComCodeSelect
                                masterCodeId="10"
                                selectId="requestCd"
                                value={formData.requestCd}
                                initText="요청 유형 선택"
                                onChange={(e) => handleInputChange("requestCd", e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label className="form-control-label">처리 기한</label>
                            <LitePicker
                                inputId="reqDate"
                                placeholder="처리 기한 선택"
                                onDateChange={(startDate) => handleInputChange("reqDate", startDate)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label className="form-control-label">처리 상태</label>
                            <ComCodeSelect
                                masterCodeId="20"
                                selectId="statusCd"
                                value={formData.statusCd}
                                initText="처리 상태 선택"
                                onChange={(e) => handleInputChange("statusCd", e.target.value)}
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
                    <FileUpload formType="insert" onFileChange={setFileList}/>
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
