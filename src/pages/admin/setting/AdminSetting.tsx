import { Container, Row, Card } from "reactstrap";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import TempHeader from "@/layout/StatusArea/Status.tsx";
import SettingSelectBar from "@/pages/admin/setting/SettingSelectBar.tsx";
import UserList from "@/pages/admin/setting/user/list/UserList.tsx";
import CompanyList from "@/pages/admin/setting/company/list/CompanyList.tsx";
import ProjectList from "@/pages/admin/setting/project/list/ProjectList.tsx";

const tabRoutes = [
    "/admin/setting/user/list"
    , "/admin/setting/company/list"
    , "/admin/setting/project/list"
];

/* 📁 Admin Setting 공통 레이아웃  */
const AdminSetting: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // URL에 따라 탭 결정
    const activeTab = useMemo((): number => {
        const index = tabRoutes.findIndex(path => location.pathname.startsWith(path));
        return index !== -1 ? index + 1 : 1; // default: 1
    }, [location.pathname]);

    const handleTabChange = (index: number): void => {
        navigate(tabRoutes[index - 1]);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 1:
                return <UserList />;
            case 2:
                return <CompanyList />;
            case 3:
                return <ProjectList />;
            default:
                return null;
        }
    };

    return (
        <>
            <TempHeader />

            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <Row>
                                <div className="col">
                                    {/* 메뉴 선택 */}
                                    <SettingSelectBar
                                        activeTab={activeTab}
                                        onChangeTab={handleTabChange}
                                    />
                                    {/* 선택한 메뉴 컴포넌트 */}
                                    {renderContent()}
                                </div>
                            </Row>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default AdminSetting;