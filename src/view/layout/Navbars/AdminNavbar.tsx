import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  // Form,
  // FormGroup,
  // InputGroupAddon,
  // InputGroupText,
  // Input,
  // InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import React from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { useEffect, useState  } from "react";

import tempUser from "@/assets/img/icons/temp_user.png";
// import argonReact from "@/assets/img/brand/argon-react.png";
import useModalHook from "@/hook/useModal.ts";
import Today from "@/components/Today.tsx";

interface AdminNavbarProps {
  onLogout?: () => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = () => {
  const navigate = useNavigate();
  const { openCustomModal } = useModalHook();

  const handleTempAlert = () => {
    openCustomModal({ title: "알림", message: "해당 기능은 준비 중입니다.", isConfirm: false });
    return;
  };

  const handleLogOut = () => {
    navigate(`/auth/login`);
  };

  return (
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>

          <Today />

          {/* TODO 전체 헤더 검색 기능 구현 */}
          {/*<RequestForm className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">*/}
          {/*  <FormGroup className="mb-0">*/}
          {/*    <InputGroup className="input-group-alternative">*/}
          {/*      <InputGroupAddon addonType="prepend">*/}
          {/*        <InputGroupText>*/}
          {/*          <i className="fas fa-search" />*/}
          {/*        </InputGroupText>*/}
          {/*      </InputGroupAddon>*/}
          {/*      <Input placeholder="Search" type="text" />*/}
          {/*    </InputGroup>*/}
          {/*  </FormGroup>*/}
          {/*</RequestForm>*/}

          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>

              {/* TODO 사용자 계정 별 정보 세팅 */}
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                     <img src={tempUser} />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      CPMS Admin
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>

              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem onClick={handleTempAlert}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem onClick={handleTempAlert}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={handleLogOut}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

        </Container>
      </Navbar>
  );
};

export default AdminNavbar;