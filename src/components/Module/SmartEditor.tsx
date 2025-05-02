/* 📁 SmartEditor.tsx */
import { useEffect } from "react";
import { initializeSmartEditor } from "@/utils/smartEditor.js";

interface SmartEditorProps {
    editorRef: React.MutableRefObject<never[]>;
    editorId?: string; // 기본값: "editorTxt"
}

const SmartEditor: React.FC<SmartEditorProps> = ({ editorRef, editorId = "editorTxt" }) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/smarteditor/js/HuskyEZCreator.js";
        script.type = "text/javascript";
        script.charset = "utf-8";

        script.onload = () => {
            initializeSmartEditor(editorId, editorRef.current)
                .then(() => console.log("SmartEditor initialized."))
                .catch((error) => console.error("SmartEditor error:", error));
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [editorRef, editorId]);

    return (
        <div id={editorId}>
            <textarea name={editorId} id={editorId} rows={20} style={{ width: "100%" }} />
        </div>
    );
};

export default SmartEditor;