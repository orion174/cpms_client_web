import {Card, CardBody, CardTitle, Container, Row, Col} from "reactstrap";

// TODO 간략통계 UI 구현
const Header = () => {
    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-4 pt-md-6">
                <Container fluid>

                    <div className="header-body">
                        <Row>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    신규 등록
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">0</span>
                                            </div>
                                            <Col className="col-auto">
                                                <div
                                                    className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                                    <i className="fas fa-chart-bar"/>
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            <span className="text-success mr-2">
                                                <i className="fa fa-arrow-up"/> 0 건
                                            </span>{" "}
                                            <span className="text-nowrap">어제 보다</span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    신규 접수
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">0</span>
                                            </div>
                                            <Col className="col-auto">
                                                <div
                                                    className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                                    <i className="ni ni-chat-round"/>
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            <span className="text-danger mr-2">
                                                <i className="fas fa-arrow-down"/> 0 건
                                            </span>{" "}
                                            <span className="text-nowrap">어제 보다</span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    처리 완료
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">0</span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                                                    <i className="ni ni-check-bold"/>
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            <span className="text-warning mr-2">
                                                <i className="fas fa-arrow-down"/> 0 건
                                            </span>{" "}
                                            <span className="text-nowrap">어제 보다</span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    전체 처리율
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">0%</span>
                                            </div>
                                            <Col className="col-auto">
                                                <div  className="icon icon-shape bg-info text-white rounded-circle shadow">
                                                    <i className="ni ni-settings"/>
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            <span className="text-success mr-2">
                                                <i className="fas fa-arrow-up"/> 0%
                                            </span>{" "}
                                            <span className="text-nowrap">어제 보다</span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default Header;
