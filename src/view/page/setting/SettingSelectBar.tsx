import { CardHeader, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { useState } from "react";

const SettingSelectBar = () => {
    const [activeNav, setActiveNav] = useState(1);

    const toggleNavs = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
        e.preventDefault();
        setActiveNav(index);
    };

    const tabLabels = ["사용자관리", "업체관리", "프로젝트관리"];

    return (
        <>
            <CardHeader className="bg-transparent">
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold">{tabLabels[activeNav - 1]}</h3>

                    <Nav className="p-0" pills>
                        {[1, 2, 3].map((index) => (
                            <NavItem key={index}>
                                <NavLink
                                    className={classnames("py-2 px-3", {
                                        active: activeNav === index,
                                    })}
                                    href="#pablo"
                                    onClick={(e) => toggleNavs(e, index)}
                                >
                                    <span className="d-none d-md-block">{tabLabels[index - 1]}</span>
                                    <span className="d-md-none">{index}</span>
                                </NavLink>
                            </NavItem>
                        ))}
                    </Nav>
                </div>
            </CardHeader>
        </>
    );
};

export default SettingSelectBar;