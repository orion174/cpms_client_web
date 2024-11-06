declare module "@/utils/smartEditor.js" {
    type Editor = {
        exec: (command: string, params: never[]) => void;
        elPlaceHolder: string | HTMLElement;
    };

    export function initializeSmartEditor(
        elemId: string,
        oEditors: Editor[],
        onLoadCallback?: () => void
    ): Promise<void>;

    export function setEditorContent(content: string, oEditors: Editor[]): void;
    export function getEditorContent(oEditors: Editor[]): string;
}