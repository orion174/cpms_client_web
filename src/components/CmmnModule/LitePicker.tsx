import { Input } from "reactstrap";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Litepicker from "litepicker";

interface LitePickerProps {
    singleMode?: boolean;
    format?: string;
    delimiter?: string;
    placeholder?: string;
    onDateChange: (startDate: string, endDate?: string) => void;
}

const LitePicker = forwardRef(({
    singleMode = true
    , format = "YYYY-MM-DD"
    , delimiter = " ~ "
    , placeholder
    , onDateChange
}: LitePickerProps, ref) => {

    const pickerRef = useRef<HTMLInputElement | null>(null);
    const pickerInstanceRef = useRef<Litepicker | null>(null);

    useImperativeHandle(ref, () => ({
        clear: () => {
            if (pickerInstanceRef.current) {
                pickerInstanceRef.current.clearSelection(); // Litepicker 초기화
            }
            if (pickerRef.current) {
                pickerRef.current.value = ""; // 입력 필드 초기화
            }
        },
    }));

    useEffect(() => {
        if (pickerRef.current) {
            const picker = new Litepicker({
                element: pickerRef.current,
                singleMode: singleMode,
                format: format,
                delimiter: delimiter,
                setup: (picker) => {
                    picker.on("selected", (startDate, endDate) => {
                        onDateChange(
                            startDate.format(format),
                            endDate ? endDate.format(format) : undefined
                        );
                    });
                },
            });

            pickerInstanceRef.current = picker;

            return () => {
                picker.destroy(); // 컴포넌트 언마운트 시 Litepicker 제거
            };
        }
    }, [singleMode, format, delimiter, onDateChange]);

    return (
        <Input
            type="text"
            className="my-litepicker"
            placeholder={placeholder}
            innerRef={pickerRef}
            style={{backgroundColor: "white"}}
            readOnly
        />
    );
});

export default LitePicker;
