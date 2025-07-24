import React, { useEffect, useRef } from "react";
import { Container } from "reactstrap";
import { useLocation, Outlet } from "react-router-dom";

import Sidebar from "@/pages/layout/Sidebar/Sidebar.tsx";
import AdminHeader from "@/pages/layout/Header/AdminHeader.tsx";
import AdminFooter from "@/pages/layout/Footers/AdminFooter.tsx";

import logoImage from '@/assets/img/brand/main_logo.png';

interface Route {
    path: string;
    layout: string;
    name: string;
    icon: string;
}

interface AdminProps {
    routes: Route[];
    [key: string]: unknown;
}

const Admin: React.FC<AdminProps> = ({ routes }) => {

    const mainContent = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        document.documentElement.scrollTop = 0;

        if (mainContent.current) {
            mainContent.current.scrollTop = 0;
        }
    }, [location]);

    return (
        <>
            <Sidebar routes={routes}
                logo={{
                    innerLink: "/admin/support/list",
                    imgSrc: logoImage,
                    imgAlt: "...",
                }}
            />

            <div className="main-content" ref={mainContent}>
                <AdminHeader />

                <Outlet />

                <Container fluid>
                    <AdminFooter />
                </Container>
            </div>
        </>
    );
};

export default Admin;