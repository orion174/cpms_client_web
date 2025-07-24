import React from "react";
import { Row, Col, FormGroup } from "reactstrap";

import SmartEditor from "@/components/CmmnModule/SmartEditor.tsx";

interface EditorSectionProps {
    editorRef: React.MutableRefObject<never[]>;
}

const RequestEditor: React.FC<EditorSectionProps> = ({ editorRef }) => {
    return (
        <Row>
            <Col lg="12">
                <FormGroup>
                    <label className="form-control-label">상세 내용</label>
                    <SmartEditor editorRef={editorRef} />
                </FormGroup>
            </Col>
        </Row>
    );
};

export default RequestEditor;