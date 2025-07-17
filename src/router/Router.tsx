import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthGuard from "@/core/auth/AuthGuard.tsx";

/* 로그인 및 회원가입 */
import Auth from "@/view/layout/Auth.tsx";
import Login from "@/view/page/main/Login.tsx";
import CpmsRegister from "@/view/page/main/register/CpmsRegister.tsx";
/* CPMS 주요 기능 */
import Admin from "@/view/layout/Admin.tsx";
import SupportList from "@/view/page/support/list/RequestList.tsx";
import SupportForm from '@/view/page/support/form/RequestForm.tsx';
import SupportView from '@/view/page/support/view/RequestView.tsx';
import SettingPage from '@/view/page/setting/SettingPage.tsx';
import UserForm from '@/view/page/setting/user/form/UserForm';
import CompanyForm from '@/view/page/setting/company/form/CompanyForm';
/* 템플릿 임시 페이지 */
import Index from "@/view/examples/Index.jsx";
import Profile from "@/view/examples/Profile.jsx";
import Maps from "@/view/examples/Maps.jsx";
import Icons from "@/view/examples/Icons.jsx";

const adminRoutes = [
    { path: "/support/list", layout: "/admin", name: "Support", icon: "ni ni-bullet-list-67 text-red" },
    { path: "/setting/user/list", layout: "/admin", name: "Admin Setting", icon: "ni ni-settings-gear-65 text-yellow" },
    { path: "/my/home", layout: "/admin", name: "My Page", icon: "ni ni-circle-08 text-primary" },
    // { path: "/dashboard", layout: "/admin", name: "Dashboard", icon: "ni ni-tv-2 text-primary" },
    // { path: "/company", layout: "/admin", name: "Company", icon: "ni ni-building text-yellow" },
    // { path: "/user-profile", layout: "/admin", name: "Admin Setting", icon: "ni ni-settings-gear-65 text-yellow" },
    // { path: "/setting", layout: "/admin", name: "Settings", icon: "ni ni-settings-gear-65 text-orange" },
];

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Navigate to="/auth/login" />} />

                <Route path="/auth/*" element={<Auth/>}>
                    <Route path="login" element={<Login/>} />
                    <Route path="register" element={<CpmsRegister />} />
                </Route>

                <Route path="/admin/*"
                    element={
                        <AuthGuard>
                            <Admin routes={adminRoutes} />
                        </AuthGuard>
                    }
                >

                    <Route path="support/list" element={<SupportList/>} />
                    <Route path="support/form" element={<SupportForm/>} />
                    <Route path="support/view" element={<SupportView/>} />

                    <Route path="setting/*" element={<SettingPage />} />
                    <Route path="setting/user/form" element={<UserForm />} />
                    <Route path="setting/company/form" element={<CompanyForm />} />

                    <Route path="index" element={<Index />} />
                    <Route path="icons" element={<Icons />} />
                    <Route path="maps" element={<Maps />} />
                    <Route path="user-profile" element={<Profile />} />
                </Route>

                <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;