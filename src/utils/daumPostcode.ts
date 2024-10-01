/* 주소 데이터 */
type AddressData = {
    zonecode: string;
    address: string;
};

/*
 * 다음 주소검색 모달을 로드한다.
 * @param setZoneCode
 * @param setAddress
 */
export const loadDaumPostCodeModal = (
    setZoneCode: React.Dispatch<React.SetStateAction<string>>
    , setAddress: React.Dispatch<React.SetStateAction<string>>
) => {
    new window.daum.Postcode({
        oncomplete: (data: AddressData) => {
            setZoneCode(data.zonecode);
            setAddress(data.address);
        },
    }).open();
};