import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { initializeSmartEditor } from "@/utils/smartEditor.js";

interface SmartEditorProps {
    id: string;
    row: number;
    initValue?: string;
}

export interface SmartEditorHandle {
    getContent: () => string;
    setContent: (content: string) => void;
}

const SmartEditor = forwardRef<SmartEditorHandle, SmartEditorProps>((
    { id, row, initValue }, ref
) => {
    const oEditors = useRef<unknown[]>([]);

    // 부모 컴포넌트에서 사용할 함수 노출
    useImperativeHandle(ref, () => ({
        getContent: () => {
            if (!oEditors.current[0]) return "";
            // @ts-ignore: 네이버 에디터 JS 객체
            return oEditors.current[0].getIR();
        },
        setContent: (content: string) => {
            if (!oEditors.current[0]) return;
            // @ts-ignore: 네이버 에디터 JS 객체
            oEditors.current[0].setIR(content);
        },
    }));

    // 네이버 에디터 스크립트 로드 및 초기화
    useEffect(() => {
        const script = document.createElement("script");

        script.src = "/smarteditor/js/HuskyEZCreator.js";
        script.type = "text/javascript";
        script.onload = () => {
            initializeSmartEditor(id, oEditors.current as any[])
                .then(():void => {
                    console.log("SmartEditor initialized.");

                    if (initValue) {
                        // @ts-ignore: 네이버 에디터 JS 객체
                        oEditors.current[0]?.setIR(initValue);
                    }
                })
                .catch((error: unknown) => console.error("SmartEditor error:", error));
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [id, initValue]);

    return <textarea id={id} rows={row} style={{ width: '100%' }}></textarea>;
});

export default SmartEditor;
