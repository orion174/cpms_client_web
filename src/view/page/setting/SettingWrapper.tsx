import { useState } from "react";

import TempHeader from "@/view/layout/Headers/TempHeader.tsx";
import SettingSelectBar from "@/view/page/setting/SettingSelectBar.tsx";

const SettingWrapper = () => {
    const [ activeTab, setaActiveTab ] = useState<number>(1);

    const renderContent = () => {
        switch (activeTab) {
            case 1: return
        }
    };
};

export default SettingWrapper;