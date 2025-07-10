import { Routes, Route, useParams, useNavigate } from "react-router-dom";

import UserList from "@/view/page/setting/user/list/UserList.tsx";
import UserForm from "@/view/page/setting/user/form/UserForm.tsx";
import UserInfo from "@/view/page/setting/user/detail/UserInfo.tsx";

/* 📁 사용자 관리 레이아웃  */
const UserPage:React.FC = () => {
    return (
        <>
            <UserList />
            {/*<Routes>*/}
            {/*    <Route path="/list" element={} />*/}
            {/*    <Route path="/form/:id" element={<UserForm />} />*/}
            {/*    <Route path="/info/:id" element={<UserInfo />} />*/}
            {/*</Routes>*/}
        </>
    );
};

export default UserPage;