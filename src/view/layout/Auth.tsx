import React, { useRef, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { Container, Row } from "reactstrap";

import AuthNavbar from "@/components/Navbars/AuthNavbar.tsx";
import AuthFooter from "@/components/Footers/AuthFooter.tsx";

const Auth: React.FC = () => {
  const mainContent = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
    if (mainContent.current) {
      mainContent.current.scrollTop = 0;
    }
  }, [location]);

  return (
      <>
        <div className="main-content" ref={mainContent}>
          <AuthNavbar />
          <div className="header bg-gradient-info py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-7"></div>
            </Container>
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
              >
                <polygon className="fill-default" points="2560 0 2560 100 0 100"/>
              </svg>
            </div>
          </div>
          {/* Page content */}
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              {/* 하위 라우트 렌더링 */}
              <Outlet />
            </Row>
          </Container>
        </div>
        <AuthFooter />
      </>
  );
};

export default Auth;
