import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import useModalHook from "@/hook/useModal.ts";

export const useCancelNavigation = () => {
    const navigate = useNavigate();
    const { openCustomModal } = useModalHook();

    const confirmCancel = () => {
        openCustomModal({
            title: "알림",
            message: "목록으로 돌아가겠습니까?\n작성 중인 정보는 저장되지 않습니다.",
            isConfirm: true,
            onConfirm: () => navigate(-1),
        });
    };

    return confirmCancel;
};

// 제네릭 타입을 통해 유연하게 사용 가능
export const useSearchParams = <T extends object>(
    setSearchParams: React.Dispatch<React.SetStateAction<T>>
    , defaultParams: T
) => {

    const updateSearchParams = useCallback(
        (key: keyof T, value: string) => {
            setSearchParams((prev) => ({
                ...prev,
                [key]: value,
            }));
        }, [setSearchParams]
    );

    // 초기화
    const resetSearchParams = useCallback(() => {
        setSearchParams(defaultParams);
    }, [setSearchParams, defaultParams]);

    return { updateSearchParams, resetSearchParams };
};

export function useFormState<T extends object>(initialState: T) {

    const [formState, setFormState] = useState<T>(initialState);

    const handleChange = (field: keyof T, value: any) => {
        setFormState(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const resetForm = () => setFormState(initialState);

    return { formState, setFormState, handleChange, resetForm };
};


