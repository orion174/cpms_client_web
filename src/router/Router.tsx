import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/view/page/login/Login.tsx';
import Test from '@/test/Test.jsx';
import Admin from "@/view/layout/Admin.jsx";
import Auth from "@/view/layout/Auth.jsx";

/* CPMS 라우터 */
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 기본 경로 리다이렉트 */}
                <Route path="/" element={<Navigate to="/auth/login" />} />

                {/* 로그인 페이지 */}
                <Route path="/login" element={<Login />} />

                {/* 테스트 페이지 */}
                <Route path="/test" element={<Test />} />

                {/* 템플릿의 Admin 레이아웃 */}
                <Route path="/admin/*" element={<Admin />} />

                {/* 템플릿의 Auth 레이아웃 */}
                <Route path="/auth/*" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;