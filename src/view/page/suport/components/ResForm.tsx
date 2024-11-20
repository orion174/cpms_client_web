import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Row} from "reactstrap";
import {useEffect, useRef, useState} from "react";
import {initializeSmartEditor} from "@/utils/smartEditor.js";
import FileUpload from "@/components/Module/FileUpload.tsx";
import useModalHook from "@/hook/useModal.ts";
import ComCodeSelect from "@/components/Module/ComCodeSelect.tsx";

// interface FormType {
//     formType: "insert" | "update";
// }

interface FileItem {
    id: number;
    file: File;
    name: string;
}

/**
 * 응답 폼
 * @constructor
 */
const ResForm: React.FC = () => {
    //const location = useLocation();
    //const { formType } = location.state as FormType;
    const { openCustomModal } = useModalHook();

    const [fileList, setFileList] = useState<FileItem[]>([]);

    console.log(fileList);

    // 응답을 취소한다.
    const handleResCancle = () => {
        openCustomModal({
            title: "알림",
            message: "목록으로 돌아가겠습니까?",
            isConfirm: false,
            redirectUrl: "/admin/suport/index",
        });
    }

    const oEditorsRes = useRef<never[]>([]);
    useEffect(() => {
        const loadScripts = () => {
            const script = document.createElement("script");
            script.src = "/smarteditor/js/HuskyEZCreator.js";
            script.type = "text/javascript";
            script.charset = "utf-8";

            script.onload = () => {
                initializeSmartEditor("resEditorTxt", oEditorsRes.current)
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

    return (
        <>
            <div className="res-form-container">
                <Row>
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
                        <Card className="card-profile">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="9">
                                        <h2 className="mb-0">프로젝트 답변</h2>
                                    </Col>
                                    <Col xs="1">
                                        <label className="form-control-label">처리 상태</label>
                                    </Col>
                                    <Col xs="2">
                                        <ComCodeSelect
                                            masterCodeId="20"
                                            selectId="statusCd"
                                            value="10"
                                            initText="처리 상태 선택"
                                            onChange={(e) => (e.target.value)}
                                        />
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody className="pt-0 pt-md-4">
                                <Form>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col xl="4">

                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xl="12">
                                                <FormGroup>
                                                    <div id="smarteditor">
                                                        <textarea
                                                            name="resEditorTxt"
                                                            id="resEditorTxt"
                                                            rows={10}
                                                            style={{width: "100%"}}
                                                        />
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col xl="12">
                                                <FileUpload formType="insert" onFileChange={setFileList}/>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="pl-lg-4">
                                        <Col className="text-right" xs="12">
                                            <Button color="danger" onClick={handleResCancle}>취소</Button>
                                            <Button color="info">답변저장</Button>
                                        </Col>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ResForm;