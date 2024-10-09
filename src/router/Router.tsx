import Login from '@/view/page/login/Login.tsx';
import Test from '@/test/Test.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

/* CPMS 라우터 */
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 기본 경로에서 /login으로 리다이렉트 */}
                <Route path="/" element={<Navigate to="/login" />} />

                {/* 로그인 페이지 */}
                <Route path="/login" element={<Login />} />

                {/* 테스트 페이지 */}
                <Route path="/test" element={<Test />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;