import { FormGroup, Input } from "reactstrap";

import SectionBorder from "@/components/FormModule/SectionBorder.tsx";
import type { ReqUserDTO } from "@/types/user/userTypes.ts";

interface EtcInfoSectionProps {
    reqUserDTO: ReqUserDTO;
    handleChange: (field: keyof ReqUserDTO, value: string | number) => void;
};

const EtcInfoSection: React.FC<EtcInfoSectionProps> = ({ reqUserDTO, handleChange }) => {

    return (
        <>
            <h6 className="heading-small text-muted mb-4">사용자 기타정보</h6>

            <div className="pl-lg-4">
                <FormGroup>
                    <Input
                        type="textarea"
                        className="form-control-alternative"
                        style={{ resize: "none" }}
                        maxLength={255}
                        rows={3} placeholder="기타정보를 입력합니다."
                        value={reqUserDTO.userInfo}
                        onChange={(e) => handleChange('userInfo', e.target.value)}
                    />
                </FormGroup>
            </div>

            <SectionBorder />

            <h6 className="heading-small text-muted mb-4">관리자 메모</h6>

            <div className="pl-lg-4">
                <FormGroup>
                    <Input
                        type="textarea"
                        className="form-control-alternative"
                        style={{ resize: "none" }}
                        maxLength={255}
                        rows={3}
                        placeholder="입력된 해당 정보는 관리자만 조회가능합니다."
                        value={reqUserDTO.userNote}
                        onChange={(e) => handleChange('userNote', e.target.value)}
                    />
                </FormGroup>
            </div>
        </>
    );
};

export default EtcInfoSection;