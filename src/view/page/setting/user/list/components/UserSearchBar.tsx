import { CardHeader } from "reactstrap";
import { ReqUserListDTO } from "@/view/page/setting/types.ts";

interface UserSearchProps {
    searchParams: ReqUserListDTO;
    updateSearchParams: (key: keyof SearchParams, value: string) => void;
    onSearch: () => void;
    onReset: () => void;
};

const UserSearchBar:React.FC<UserSearchProps> = ({
    searchParams, updateSearchParams, onSearch, onReset
}) => {
    return (
        <>
            <CardHeader className="border-0">
                <h3 className="mb-0">Card tables</h3>
            </CardHeader>
        </>
    );
};

export default UserSearchBar;