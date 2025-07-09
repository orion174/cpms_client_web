const SettingPage = () => {
    const [ activeTabIndex, setActiveTabIndex ] = useState<number>(1);

    const tabMap: { [key: number]: "user" | "company" | "project" } = {
        1: "user"
        2: "company",
        3: "project",
    };

    return (
        <TempHeader />

        <Container className="mt--7" fluid>
            <SettingSelectBar onChange={setActiveTabIndex} />
            <ManagementWrapper activeTab={tabMap[activeTabIndex]} />
        </Container>
    )
};

export default SettingPage();