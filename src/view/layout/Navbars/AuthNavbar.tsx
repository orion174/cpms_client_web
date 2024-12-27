import { Link } from "react-router-dom";
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  NavItem,
  NavLink
} from "reactstrap";

// import argonReactWhite from "@/assets/img/brand/argon-react-white.png";
import argonReact from "@/assets/img/brand/argon-react.png";

const AuthNavbar = () => {
  return (
      <>
        <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
          <Container className="px-4">
            <NavbarBrand to="/" tag={Link}>
              {/*<img src={argonReactWhite}/>*/}
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar-collapse-main">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img alt="..." src={argonReact} />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar-collapse-main">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="ml-auto" navbar>
                {/*<NavItem>*/}
                {/*  <NavLink*/}
                {/*      className="nav-link-icon"*/}
                {/*      to="/test"*/}
                {/*      tag={Link}*/}
                {/*  >*/}
                {/*    <i className="ni ni-align-left-2" />*/}
                {/*    <span className="nav-link-inner--text">사용문의</span>*/}
                {/*  </NavLink>*/}
                {/*</NavItem>*/}
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </>
  );
};

export default AuthNavbar;
