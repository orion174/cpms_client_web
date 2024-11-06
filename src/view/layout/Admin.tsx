import React, { useEffect, useRef } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { Container } from "reactstrap";
import AdminNavbar from "@/components/Navbars/AdminNavbar.tsx";
import AdminFooter from "@/components/Footers/AdminFooter.tsx";
import Sidebar from "@/components/Sidebar/Sidebar.tsx";

import logoImage from '@/assets/img/brand/argon-react.png';

interface Route {
    path: string;
    layout: string;
    name: string;
    icon: string;
}

interface AdminProps {
    brandText: string;
    routes: Route[];
    [key: string]: unknown;
}

const Admin: React.FC<AdminProps> = ({ brandText, routes }) => {
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
            <Sidebar
                routes={routes}
                logo={{
                    innerLink: "/admin/index",
                    imgSrc: logoImage,
                    imgAlt: "...",
                }}
            />
            <div className="main-content" ref={mainContent}>
                <AdminNavbar brandText={brandText} />
                {/* 하위 라우트 렌더링 */}
                <Outlet />
                <Container fluid>
                    <AdminFooter />
                </Container>
            </div>
        </>
    );
};

export default Admin;