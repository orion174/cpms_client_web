import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Today: React.FC = () => {
    const [ currentDate, setCurrentDate ] = useState("");
    const [ currentDay, setCurrentDay ] = useState(""); // 요일만 저장

    useEffect(() => {
        const updateDate = () => {
            const date = new Date();
            const days = ["[일요일]", "[월요일]", "[화요일]", "[수요일]", "[목요일]", "[금요일]", "[토요일]"];
            const dayIndex = date.getDay(); // 요일 인덱스 (0: 일요일, ..., 6: 토요일)
            const formattedDate = `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, "0")}월 ${String(date.getDate()).padStart(2, "0")}일`;

            setCurrentDate(formattedDate);
            setCurrentDay(days[dayIndex]); // 요일만 설정
        };

        updateDate();
    }, []);

    return (
        <Link className="h4 mb-0 text-white d-none d-lg-inline-block" to="/admin/support/list">
            <i className="ni ni-calendar-grid-58" />
            <span className="form-control-today">&nbsp;{currentDate}{" "}{currentDay}</span>
        </Link>
    );
};

export default Today;
