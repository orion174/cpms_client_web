let isPostcodeOpen = false;

export const loadDaumPostCodeModal = (
    setZoneCode: (value: string) => void,
    setAddress: (value: string) => void
) => {
    if (!window.daum?.Postcode) {
        return;
    }

    if (isPostcodeOpen) {
        return;
    }

    isPostcodeOpen = true;

    new window.daum.Postcode({
        oncomplete: (data: AddressData) => {
            setZoneCode(data.zonecode);
            setAddress(data.address);
            isPostcodeOpen = false;
        },
        onclose: () => {
            isPostcodeOpen = false;
        },
    }).open();
};
