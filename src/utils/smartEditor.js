// 에디터 초기화
export const initializeSmartEditor = (elemId, oEditors, onLoadCallback) => {
    return new Promise((resolve, reject) => {
        window.nhn.husky.EZCreator.createInIFrame({
            oAppRef: oEditors,
            elPlaceHolder: elemId,
            sSkinURI: "/smarteditor/SmartEditor2Skin.html",
            fCreator: "createSEditor2",
            htParams: {
                bUseVerticalResizer: false,
                aAdditionalFontList : [['Pretendard Variable', 'Pretendard']],
                fOnBeforeUnload: () => {}
            },
            fOnAppLoad: () => {
                // 수정시 사용
                if (typeof onLoadCallback === 'function') {
                    onLoadCallback();
                }
                
                resolve();
            },
            fOnError: (error) => {
                console.error("SmartEditor 초기화 실패:", error);
                reject(error);
            }
        });
    });
};