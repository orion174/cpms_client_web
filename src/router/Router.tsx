import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Test from '@/test/Test.jsx';
import Auth from "@/view/layout/Auth.tsx";
import Admin from "@/view/layout/Admin.tsx";

import Login from "@/view/page/login/index.tsx";
import Suport from "@/view/page/suport/index.tsx";
import SuportForm from '@/view/page/suport/form';

import Index from "@/view/Index.jsx";
import Profile from "@/view/examples/Profile.jsx";
import Maps from "@/view/examples/Maps.jsx";
import Register from "@/view/examples/Register.jsx";
import Icons from "@/view/examples/Icons.jsx";


const adminRoutes = [
    { path: "/dashboard", layout: "/admin", name: "Dashboard", icon: "ni ni-tv-2 text-primary" },
    { path: "/suport", layout: "/admin", name: "Suport", icon: "ni ni-bullet-list-67 text-red" },
    { path: "/user-profile", layout: "/admin", name: "User Profile", icon: "ni ni-single-02 text-yellow" },
    { path: "/maps", layout: "/admin", name: "Maps", icon: "ni ni-pin-3 text-orange" },
    { path: "/icons", layout: "/admin", name: "Icons", icon: "ni ni-planet text-blue" },
];

/* CPMS 라우터 */
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 기본 경로 리다이렉트 */}
                <Route path="/" element={<Navigate to="/auth/login" />} />

                {/* 테스트 회원가입 페이지 */}
                <Route path="/test" element={<Test />} />

                {/* Auth 레이아웃 하위 라우트 */}
                <Route path="/auth/*" element={<Auth />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>

                {/* Admin 레이아웃 하위 라우트 */}
                <Route path="/admin/*" element={<Admin brandText="CPMS" routes={adminRoutes} />}>
                    <Route path="suport" element={<Suport />} />
                    <Route path="suportForm" element={<SuportForm />} />
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