import { Input } from "reactstrap";
import React, { useEffect, useRef } from "react";
import Litepicker from "litepicker";

interface LitePickerProps {
    initDay?: number; // 초기 날짜 값
    inputId: string;
    onDateChange?: (date: string) => void; // 날짜선택 콜백
}

/**
 * 날짜선택 LitePicker Input Element
 * @param initDay
 * @param onDateChange
 * @constructor
 */
const LitePicker: React.FC<LitePickerProps> = ({initDay= 0, inputId, onDateChange}) => {
    const pickerRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (pickerRef.current) {
            const currentDate = new Date();
            const defaultDate = new Date();

            defaultDate.setDate(currentDate.getDate() + initDay);

            const picker = new Litepicker({
                element: pickerRef.current,
                singleMode: true,
                format: "YYYY-MM-DD",
                startDate: defaultDate
            });

            return () => {
                picker.destroy(); // 컴포넌트 언마운트 시 Litepicker 인스턴스 제거
            };
        }
    }, [initDay, onDateChange]);

    return (
        <Input
            id={inputId}
            type="text"
            className="my-input-text"
            placeholder="날짜를 선택하세요."
            innerRef={pickerRef}
            style={{ backgroundColor: "white" }}
            readOnly
        />
    );
}

export default LitePicker;