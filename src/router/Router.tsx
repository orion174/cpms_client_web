import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Auth from "@/view/layout/Auth.tsx";
import Admin from "@/view/layout/Admin.tsx";

import Login from "@/view/page/main/Login.tsx";
import CpmsRegister from "@/view/page/main/register/CpmsRegister.tsx";

import SupportList from "@/view/page/support/list/RequestList.tsx";
import SupportForm from '@/view/page/support/form/RequestForm.tsx';
import SupportDetail from '@/view/page/support/detail/RequestDetail.tsx';

import UserList from '@/view/page/setting/user/list/UserList.tsx';
import UserInfo from '@/view/page/setting/user/form/UserInfo.tsx';

import Index from "@/view/examples/Index.jsx";
import Profile from "@/view/examples/Profile.jsx";
import Maps from "@/view/examples/Maps.jsx";
import Icons from "@/view/examples/Icons.jsx";

const adminRoutes = [
    { path: "/support/list", layout: "/admin", name: "Support", icon: "ni ni-bullet-list-67 text-red" },
    { path: "/setting/user/list", layout: "/admin", name: "Admin Setting", icon: "ni ni-settings-gear-65 text-yellow" },
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

                <Route path="/admin/*" element={<Admin routes={adminRoutes} />}>
                    <Route path="support/list" element={<SupportList/>} />
                    <Route path="support/form" element={<SupportForm/>} />
                    <Route path="support/detail" element={<SupportDetail/>} />

                    <Route path="setting/user/list" element={<UserList />} />
                    <Route path="setting/user/info" element={<UserInfo />} />

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