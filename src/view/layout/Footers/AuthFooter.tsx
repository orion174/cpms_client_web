import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";

import githubIcon from "@/assets/img/icons/common/github.svg";

const AuthFooter = () => {
  return (
    <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {new Date().getFullYear()}{""}
                <a
                  className="font-weight-bold ml-1"
                  href="https://github.com/orion174"
                  target="_blank"
                >ParkBumJin
                </a>
              </div>
            </Col>
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink
                      href="https://github.com/orion174"
                      target="_blank"
                  >
                    GitHub
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="https://orion174.github.io/"
                    target="_blank"
                  >
                    About me
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default AuthFooter;
