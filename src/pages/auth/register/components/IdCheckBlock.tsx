import { Input, InputGroup, InputGroupAddon, InputGroupText, Col, Row, FormGroup } from 'reactstrap';
import React from 'react';

import IdCheckModule from "@/components/CmmnModule/IdCheckModule.tsx";

interface IdCheckBlockProps {
    loginId: string;
    setLoginId: (value: string) => void;
    onValid: () => void;
}

const IdCheckBlock: React.FC<IdCheckBlockProps> = ({ loginId, setLoginId, onValid }) => {

    const handleChange = (value: string): void => {
        setLoginId(value);
    };

    return (
        <FormGroup className="mb-3">
            <Row>
                <Col xs="8">
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-circle-08" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            placeholder="아이디"
                            type="text"
                            value={loginId}
                            maxLength={20}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col xs="4" className="pl-0">
                    <IdCheckModule
                        loginId={loginId}
                        classNm="w-100"
                        onValid={onValid}
                    />
                </Col>
            </Row>
        </FormGroup>
    );
};

export default IdCheckBlock;
