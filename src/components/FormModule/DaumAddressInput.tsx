import React from "react";
import { Input, Button } from "reactstrap";
import { loadDaumPostCodeModal } from "@/utils/daumPostcode";

interface DaumAddressInputProps {
    zipCode: string;
    address: string;
    onChangeZipCode: (zip: string) => void;
    onChangeAddress: (addr: string) => void;
}

const DaumAddressInput: React.FC<DaumAddressInputProps> = ({
    zipCode, address, onChangeZipCode, onChangeAddress
}) => {

    const handleSearch = () => {
        loadDaumPostCodeModal(onChangeZipCode, onChangeAddress);
    };

    return (
        <div className="d-flex" style={{ gap: "1rem" }}>
            <Input
                type="text"
                className="form-control-alternative"
                placeholder="주소를 입력하세요."
                value={address}
                onChange={(e) => onChangeAddress(e.target.value)}
            />
            <Input type="hidden" value={zipCode} name="zipCode" />
            <Button
                type="button"
                color="primary"
                className="check-button"
                onClick={handleSearch}
            >
                주소 검색
            </Button>
        </div>
    );
};

export default DaumAddressInput;
