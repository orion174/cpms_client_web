import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";

import team4Image from "@/assets/img/theme/team-4-800x800.jpg";

const SideInfoForm:React.FC<{}> = () => {
    return (
        <>
            <Card className="card-profile shadow">
                <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                        <div className="card-profile-image">
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                <img
                                    alt="..."
                                    className="rounded-circle"
                                    src={team4Image}
                                />
                            </a>
                        </div>
                    </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                    <div className="d-flex justify-content-between">
                        <Button
                            className="mr-4"
                            color="info"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                        >
                            Connect
                        </Button>
                        <Button
                            className="float-right"
                            color="default"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                        >
                            Message
                        </Button>
                    </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                    <Row>
                        <div className="col">
                            <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                <div>
                                    <span className="heading">22</span>
                                    <span className="description">Friends</span>
                                </div>
                                <div>
                                    <span className="heading">10</span>
                                    <span className="description">Photos</span>
                                </div>
                                <div>
                                    <span className="heading">89</span>
                                    <span className="description">Comments</span>
                                </div>
                            </div>
                        </div>
                    </Row>
                    <div className="text-center">
                        <h3>
                            Jessica Jones
                            <span className="font-weight-light">, 27</span>
                        </h3>
                        <div className="h5 font-weight-300">
                            <i className="ni location_pin mr-2" />
                            Bucharest, Romania
                        </div>
                        <div className="h5 mt-4">
                            <i className="ni business_briefcase-24 mr-2" />
                            Solution Manager - Creative Tim Officer
                        </div>
                        <div>
                            <i className="ni education_hat mr-2" />
                            University of Computer Science
                        </div>
                        <hr className="my-4" />
                        <p>
                            Ryan — the name taken by Melbourne-raised, Brooklyn-based
                            Nick Murphy — writes, performs and records all of his own
                            music.
                        </p>
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Show more
                        </a>
                    </div>
                </CardBody>
            </Card>
        </>
    );
};

export default SideInfoForm;