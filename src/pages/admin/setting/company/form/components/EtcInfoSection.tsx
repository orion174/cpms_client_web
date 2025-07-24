import { FormGroup, Input } from "reactstrap";
import SectionBorder from "@/components/FormModule/SectionBorder.tsx";

import { ReqCompanyDTO } from "@/pages/admin/setting/company/types.ts";

interface EtcInfoSectionProps {
    reqCompanyDTO: ReqCompanyDTO;
    handleChange: (field: keyof ReqCompanyDTO, value: string | number) => void;
};

const EtcInfoSection: React.FC<EtcInfoSectionProps> = ({ reqCompanyDTO, handleChange }) => {

    return (
        <>
            <h6 className="heading-small text-muted mb-4">회사 정보</h6>

            <div className="pl-lg-4">
                <FormGroup>
                    <Input
                        type="textarea" className="form-control-alternative" style={{ resize: "none" }}
                        maxLength={255} rows={3} placeholder="회사 정보를 입력합니다."
                        value={reqCompanyDTO.companyInfo}
                        onChange={(e) => handleChange('companyInfo', e.target.value)}
                    />
                </FormGroup>
            </div>

            <SectionBorder />

            <h6 className="heading-small text-muted mb-4">관리자 메모</h6>

            <div className="pl-lg-4">
                <FormGroup>
                    <Input
                        type="textarea" className="form-control-alternative" style={{ resize: "none" }}
                        maxLength={255} rows={3} placeholder="입력된 해당 정보는 관리자만 조회가능합니다."
                        value={reqCompanyDTO.adminNote}
                        onChange={(e) => handleChange('adminNote', e.target.value)}
                    />
                </FormGroup>
            </div>
        </>
    );
};

export default EtcInfoSection;