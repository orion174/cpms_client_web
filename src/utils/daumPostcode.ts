type AddressData = {
    zonecode: string;
    address: string;
};

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