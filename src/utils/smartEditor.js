/*
 * 에디터 초기화
 * @param elemId
 * @param oEditors
 * @param onLoadCallback
 * @returns {Promise<unknown>}
 */
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

/*
 * 에디터 수정 폼을 세팅한다.
 * @param content
 * @param oEditors
 */
export const setEditorContent = (content, oEditors) => {
    if (oEditors.length > 0) {
        oEditors[0].exec("SET_IR", [content]);
    } else {
        console.error("에디터가 초기화되지 않았습니다.", error);
    }
};

/*
 * 에디터 textarea의 값을 할당한다.
 * @param oEditors
 * @returns {*|string}
 */
export const getEditorContent = (oEditors) => {
    if (oEditors.length > 0) {
        oEditors[0].exec("UPDATE_CONTENTS_FIELD", []);

        const elemId = oEditors[0].elPlaceHolder;
        let elem = oEditors[0].elPlaceHolder;

        if (typeof elem === 'string') {
            elem = document.getElementById(elem);
        }

        if (elem) {
            return elem.value;
        } else {
            console.error('에디터의 elPlaceHolder에 해당하는 DOM 요소를 찾을 수 없습니다.', error);
            return '';
        }
    } else {
        console.error("에디터가 초기화되지 않았습니다.", error);
        return '';
    }
};