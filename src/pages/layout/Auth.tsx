import { Container, Row } from "reactstrap";
import React, { useRef, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";

import AuthHeader from "@/pages/layout/Header/AuthHeader.tsx";
import AuthFooter from "@/pages/layout/Footers/AuthFooter.tsx";

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
                <AuthHeader/>

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
                <Container className="mt--9 pb-6">
                    <Row className="justify-content-center">
                        <Outlet/>
                    </Row>
                </Container>
            </div>

            <AuthFooter/>
        </>
    );
};

export default Auth;
