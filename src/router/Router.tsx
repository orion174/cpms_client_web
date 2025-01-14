import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Auth from "@/view/layout/Auth.tsx";
import Admin from "@/view/layout/Admin.tsx";

import Login from "@/view/page/login/Login.tsx";

import SuportHome from "@/view/page/suport/SuportHome.tsx";
import SuportForm from '@/view/page/suport/SuportForm.tsx';
import SuportDetail from '@/view/page/suport/SuportDetail.tsx';

import Index from "@/view/examples/Index.jsx";
import Profile from "@/view/examples/Profile.jsx";
import Maps from "@/view/examples/Maps.jsx";
import Register from "@/view/examples/Register.jsx";
import Icons from "@/view/examples/Icons.jsx";

const adminRoutes = [
    { path: "/dashboard", layout: "/admin", name: "Dashboard", icon: "ni ni-tv-2 text-primary" },
    { path: "/suport/index", layout: "/admin", name: "Suport", icon: "ni ni-bullet-list-67 text-red" },
    { path: "/company", layout: "/admin", name: "Company", icon: "ni ni-building text-yellow" },
    { path: "/user-profile", layout: "/admin", name: "User", icon: "ni ni-badge text-blue" },
    { path: "/setting", layout: "/admin", name: "Settings", icon: "ni ni-settings-gear-65 text-orange" },
];

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Navigate to="/auth/login" />} />

                <Route path="/auth/*" element={<Auth />}>
                    <Route path="login" element={<Login />} />

                    <Route path="register" element={<Register />} />
                </Route>

                <Route path="/admin/*" element={<Admin routes={adminRoutes} />}>
                    <Route path="suport/index" element={<SuportHome />} />
                    <Route path="suport/form" element={<SuportForm />} />
                    <Route path="suport/detail" element={<SuportDetail />} />

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