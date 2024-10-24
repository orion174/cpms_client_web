import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Test from '@/test/Test.jsx';
import Admin from "@/view/layout/Admin.jsx";
import Auth from "@/view/layout/Auth.jsx";

import Index from "@/view/Index.jsx";
import Profile from "@/view/examples/Profile.jsx";
import Maps from "@/view/examples/Maps.jsx";
import Register from "@/view/examples/Register.jsx";
import Login from "@/view/examples/Login.tsx";
import Tables from "@/view/examples/Tables.jsx";
import Icons from "@/view/examples/Icons.jsx";

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
                <Route path="/admin/*" element={<Admin />}>
                    <Route path="index" element={<Index />} />
                    <Route path="icons" element={<Icons />} />
                    <Route path="maps" element={<Maps />} />
                    <Route path="user-profile" element={<Profile />} />
                    <Route path="tables" element={<Tables />} />
                    {/* 추가적인 Admin 하위 라우트들 */}
                </Route>

                <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;