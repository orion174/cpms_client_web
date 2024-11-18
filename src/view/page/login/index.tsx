import { ApiRes, ResLoginDTO} from "@/definition/type.ts";
import { handleInputKeyDown } from '@/utils/common.ts'
import { saveCookie } from "@/utils/cookieUtils.ts";
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react'
import useModalHook from '@/hook/useModal';

import axios from 'axios';

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  // Row,
  Col,
} from "reactstrap";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {openCustomModal} = useModalHook();

  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');

  const loginIdRef = useRef<HTMLInputElement>(null);
  const loginPwRef = useRef<HTMLInputElement>(null);

  /* CPMS 로그인 */
  const login = async(): Promise<void> => {

    // 아이디 공백 체크
    if(loginId.trim() === '') {
      alert('아이디를 입력해 주세요.');
      loginIdRef.current?.focus();
      return;
    }
    // 비빌번호 공백 체크
    if(loginPw.trim() === '') {
      alert('비밀번호를 입력해 주세요.');
      loginPwRef.current?.focus();
      return;
    }

    try {
      const jsonData = {
        loginId : loginId,
        loginPw : loginPw
      }

      const url = `${import.meta.env.VITE_API_URL}/auth/login`;

      const res
          = await axios.post<ApiRes<ResLoginDTO>>(url, jsonData, {
              headers: {
                'Content-Type': 'application/json',
              },
          });

      if(res.status == 200) {
        if(res.data.result) {
          await saveCookie(res.data.result);
          navigate('/admin/suport');
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            openCustomModal({
              title: '알림',
              message: '아이디 또는 비밀번호가 일치하지 않습니다.',
              isConfirm: false
            });
          } else {
            openCustomModal({
              title: '오류',
              message: '서버 오류가 발생했습니다. 관리자에게 문의하세요..',
              isConfirm: false
            });
          }
        } else if (error.request) {
          openCustomModal({
            title: '오류',
            message: '서버와의 연결이 원활하지 않습니다.',
            isConfirm: false
          });
        } else {
          openCustomModal({
            title: '오류',
            message: '요청 중 오류가 발생했습니다.',
            isConfirm: false
          });
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
      <>
        <Col lg="5" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small className="custom-text">CPMS</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-circle-08" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        type="text"
                        value={loginId}
                        placeholder="아이디"
                        onChange={(e) => {
                          setLoginId(e.target.value);
                        }}
                        onKeyDown={(event) => {
                          handleInputKeyDown(event, login);
                        }}
                        innerRef={loginIdRef}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        type="password"
                        placeholder="비밀번호"
                        onChange={(e) => {
                          setLoginPw(e.target.value);
                        }}
                        onKeyDown={(event) => {
                          handleInputKeyDown(event, login);
                        }}
                        innerRef={loginPwRef}
                    />
                  </InputGroup>
                </FormGroup>
                {/*<div className="custom-control custom-control-alternative custom-checkbox">*/}
                {/*  <input*/}
                {/*      className="custom-control-input"*/}
                {/*      id=" customCheckLogin"*/}
                {/*      type="checkbox"*/}
                {/*  />*/}
                {/*  <label*/}
                {/*      className="custom-control-label"*/}
                {/*      htmlFor="customCheckLogin"*/}
                {/*  >*/}
                {/*    <span className="text-muted">아이디 저장</span>*/}
                {/*  </label>*/}
                {/*</div>*/}
                <div className="text-center">
                  <Button onClick={login} className="my-4" color="primary" type="button">
                    로그인
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          {/*<Row className="mt-3">*/}
          {/*  <Col xs="6">*/}
          {/*    <a*/}
          {/*        className="text-light"*/}
          {/*        href="#pablo"*/}
          {/*        onClick={(e) => e.preventDefault()}*/}
          {/*    >*/}
          {/*      <small>Forgot password?</small>*/}
          {/*    </a>*/}
          {/*  </Col>*/}
          {/*  <Col className="text-right" xs="6">*/}
          {/*    <a*/}
          {/*        className="text-light"*/}
          {/*        href="#pablo"*/}
          {/*        onClick={(e) => e.preventDefault()}*/}
          {/*    >*/}
          {/*      <small>Create new account</small>*/}
          {/*    </a>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
        </Col>
      </>
  );
};

export default Login;
