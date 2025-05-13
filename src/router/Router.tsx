import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Auth from "@/view/layout/Auth.tsx";
import Admin from "@/view/layout/Admin.tsx";

import Login from "@/view/page/main/Login.tsx";

import SupportList from "@/view/page/support/list/RequestList.tsx";
import SupportForm from '@/view/page/support/form/RequestForm.tsx';
import SupportDetail from '@/view/page/support/detail/RequestDetail.tsx';

import Index from "@/view/examples/Index.jsx";
import Profile from "@/view/examples/Profile.jsx";
import Maps from "@/view/examples/Maps.jsx";
import Icons from "@/view/examples/Icons.jsx";

const adminRoutes = [
    // { path: "/dashboard", layout: "/admin", name: "Dashboard", icon: "ni ni-tv-2 text-primary" },
    { path: "/support/list", layout: "/admin", name: "Support", icon: "ni ni-bullet-list-67 text-red" },
    // { path: "/company", layout: "/admin", name: "Company", icon: "ni ni-building text-yellow" },
    // { path: "/user-profile", layout: "/admin", name: "User", icon: "ni ni-badge text-blue" },
    // { path: "/setting", layout: "/admin", name: "Settings", icon: "ni ni-settings-gear-65 text-orange" },
];

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Navigate to="/auth/login" />} />

                <Route path="/auth/*" element={<Auth/>}>
                    <Route path="login" element={<Login/>} />
                </Route>

                <Route path="/admin/*" element={<Admin routes={adminRoutes} />}>
                    <Route path="support/list" element={<SupportList/>} />
                    <Route path="support/form" element={<SupportForm/>} />
                    <Route path="support/detail" element={<SupportDetail/>} />

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