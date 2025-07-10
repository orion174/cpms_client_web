import { Container, Row, Card } from "reactstrap";
import { useState } from "react";

import TempHeader from "@/view/layout/Headers/TempHeader.tsx";
import SettingSelectBar from "@/view/page/setting/SettingSelectBar.tsx";
import UserPage from "@/view/page/setting/user/UserPage.tsx";
import CompanyPage from "@/view/page/setting/company/CompanyPage.tsx";
import ProjectPage from "@/view/page/setting/project/ProjectPage.tsx";

/* 📁 Admin Setting 공통 레이아웃  */
const SettingPage: React.FC = () => {
    const [ activeTab, setActiveTab ] = useState<number>(1); // 초기에는 사용자 관리

    // 선택한 메뉴의 리스트를 랜더링한다.
    const renderContent = () => {
        switch (activeTab) {
            case 1:
                return <UserPage />; // 사용자 관리
            case 2:
                return <CompanyPage />; // 업체 관리
            case 3:
                return <ProjectPage />; // 프로젝트 관리
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
                            {/* 메뉴 선택 버튼 */}
                            <SettingSelectBar activeTab={activeTab} onChangeTab={setActiveTab} />

                            <Row>
                                <div className="col">
                                    <Card className="shadow">
                                        {/* 선택한 관리메뉴 랜더링 */}
                                        {renderContent()}
                                    </Card>
                                </div>
                            </Row>
                        </Card>
                    </div>
                </Row>
            </Container>

        </>
    );
};

export default SettingPage;