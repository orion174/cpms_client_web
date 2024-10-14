/*!
=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { useLocation, Outlet } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "@/components/Navbars/AdminNavbar.jsx";
import AdminFooter from "@/components/Footers/AdminFooter.jsx";
import Sidebar from "@/components/Sidebar/Sidebar.jsx";

import logoImage from '@/assets/img/brand/argon-react.png';

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainContent.current) {
      mainContent.current.scrollTop = 0;
    }
  }, [location]);

  return (
      <>
        <Sidebar
            {...props}
            routes={[]} // routes prop 제거 또는 빈 배열로 설정 (필요 시 수정)
            logo={{
              innerLink: "/admin/index",
              imgSrc: logoImage,
              imgAlt: "...",
            }}
        />
        <div className="main-content" ref={mainContent}>
          <AdminNavbar {...props} />
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
