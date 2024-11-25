import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Row} from "reactstrap";
import { useEffect, useRef, useState } from "react";
import { getEditorContent, initializeSmartEditor } from "@/utils/smartEditor.js";
import FileUpload from "@/components/Module/FileUpload.tsx";
import useModalHook from "@/hook/useModal.ts";
import ComCodeSelect from "@/components/Module/ComCodeSelect.tsx";
import {callAPI} from "@/utils/interceptor.ts";
import { useSearchParams } from "react-router-dom";
import {base64ToUtf8} from "@/utils/common.ts";

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

    const [formData, setFormData] = useState({
        resStatusCd: ""
    });

    const handleResInputChange = (key: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

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

    // 저장버튼 클릭 이벤트
    const handleResSave = () => {
        let message = ``;

        if(!formData.resStatusCd) {
            message = `처리 상태를 선택하세요.`;
        }

        if(message) {
            openCustomModal({ title: "알림", message, isConfirm: false });
        } else {
            openCustomModal({
                title: "확인",
                message: "저장하시겠습니까?",
                isConfirm: true,
                onConfirm: () => {
                    saveSuportRes();
                }
            });
        }
    }

    // 프로젝트 문의 응대 데이터 저장
    const saveSuportRes = async () => {
        const [searchParams] = useSearchParams();
        const encodedId = searchParams.get("suport_page");

        if (!encodedId) {
            console.error('suport_page parameter NaN');
            return;
        }

        const decodedId = parseInt(base64ToUtf8(encodedId), 10);

        const data = new FormData();

        data.append("suportReqId", decodedId.toString());
        data.append("resEditor", getEditorContent(oEditorsRes.current));

        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        fileList.forEach(
            (file) => data.append("resFile", file.file)
        );
        
        // 임시 데이터 확인
        for (const pair of data.entries()) {
            console.log(`${pair[0]}: ${pair[1] instanceof File ? pair[1].name : pair[1]}`);
        }

        const res
            = await callAPI.post("/api/suport/resInsert", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

        if (res.status === 200) {
            openCustomModal({
                title: "알림",
                message: "저장이 완료되었습니다.",
                isConfirm: false,
                redirectUrl: `/admin/suport/detail?suport_page=${encodedId}`,
            });
        }
    }

    return (
        <>
            <div className="res-form-container">
                <Row>
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
                        <Card className="card-profile">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="10">
                                        <h2 className="mb-0">프로젝트 답변</h2>
                                    </Col>
                                    <Col xs="2">
                                        <ComCodeSelect
                                            masterCodeId="20"
                                            selectId="resStatusCd"
                                            value={formData.resStatusCd}
                                            initText="처리 상태 선택"
                                            onChange={(e) => handleResInputChange("resStatusCd", e.target.value)}
                                        />
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody className="pt-0 pt-md-4">
                                <Form>
                                    <div className="pl-lg-4">
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
                                            <Button color="info" onClick={handleResSave}>답변저장</Button>
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