import {
    Button, Card, CardBody, FormGroup, Input,
    InputGroupAddon, InputGroupText, InputGroup, Col
} from "reactstrap";
import { useEffect, useRef } from "react";

interface LoginFormProps {
    loginId: string;
    loginPw: string;
    onChangeId: (v: string) => void;
    onChangePw: (v: string) => void;
    onSubmit: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
    loginId,
    loginPw,
    onChangeId,
    onChangePw,
    onSubmit
}) => {
    const idInputRef = useRef<HTMLInputElement>(null);

    useEffect((): void => {
        idInputRef.current?.focus();
    }, []);

    return (
        <Col lg="6" md="8">
            <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                    <div className="mb-4" style={{minHeight: "10px"}}/>

                    <div className="text-center text-muted mb-4">
                        <span className="custom-text">CPMS</span>
                    </div>

                    <div className="mb-4" style={{minHeight: "10px"}}/>

                    <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="ni ni-circle-08"/></InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type="text"
                                value={loginId}
                                placeholder="아이디"
                                onChange={(e) => onChangeId(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
                                innerRef={idInputRef}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="ni ni-lock-circle-open"/></InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type="password"
                                value={loginPw}
                                placeholder="비밀번호"
                                onChange={(e) => onChangePw(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
                            />
                        </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                        <Button
                            onClick={onSubmit}
                            className="my-4 w-100"
                            color="primary"
                            type="button"
                            style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
                        >
                            로그인
                        </Button>

                        <div className="mb-4" style={{minHeight: "40px"}}/>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default LoginForm;
