import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  Col,
} from "reactstrap";

import { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Headers/Header.jsx";
import Litepicker from "litepicker";
import bootstrapIcon from "@/assets/img/icons/common/google.svg";
import team1Image from "@/assets/img/theme/team-1-800x800.jpg";
import team2Image from "@/assets/img/theme/team-2-800x800.jpg";
import team3Image from "@/assets/img/theme/team-3-800x800.jpg";
import team4Image from "@/assets/img/theme/team-4-800x800.jpg";
import angularImage from "@/assets/img/theme/angular.jpg";

const Suport = () => {
  const navigate = useNavigate();

  // 지원 등록 폼 이동
  const handleRegisterClick = () => {
    navigate('/admin/suportForm', {state: { formType: 'insert' }});
  };

  const pickerRef = useRef(null);

  useEffect(() => {
    if (pickerRef.current) {
      new Litepicker({
        element: pickerRef.current,
        singleMode: false,
        format: "YYYY-MM-DD",
      });
    }
  }, []);

  return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col md="10" className="text-left">
                      <Form inline className="d-flex flex-wrap" style={{ gap: "0.5rem" }}>
                        <InputGroup>
                          <Input
                              type="text"
                              placeholder="Select Date Range"
                              innerRef={pickerRef}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText>
                              <i className="ni ni-calendar-grid-58 text-primary" />
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                        <Input type="select" name="filter1" id="filter1">
                          <option value="">All Projects</option>
                          <option value="project1">Project 1</option>
                          <option value="project2">Project 2</option>
                          <option value="project3">Project 3</option>
                        </Input>
                        <Input type="select" name="filter2" id="filter2">
                          <option value="">All Statuses</option>
                          <option value="completed">Completed</option>
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                        </Input>
                        <Input type="select" name="filter3" id="filter3">
                          <option value="">All Budgets</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </Input>
                        <InputGroup>
                          <Input type="text" placeholder="Search" />
                        </InputGroup>
                        <Button color="primary">검색</Button>
                      </Form>
                    </Col>
                    <Col md="2" className="d-flex justify-content-end align-items-center">
                      <Button type="button" color="success">엑셀다운</Button>
                      <Button type="button" color="default" onClick={handleRegisterClick}>등록</Button>
                    </Col>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                  <tr>
                    <th scope="col">Project</th>
                    <th scope="col">Budget</th>
                    <th scope="col">Status</th>
                    <th scope="col">Users</th>
                    <th scope="col">Completion</th>
                    <th scope="col" />
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img alt="..." src={bootstrapIcon}/>
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            Argon Design System
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>$2,500 USD</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning"/>
                        pending
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip742438047"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={team1Image}
                          />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip742438047"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip941738690"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={team2Image}
                          />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip941738690"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip804044742"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={team3Image}
                          />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip804044742"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip996637554"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={team4Image}
                          />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip996637554"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                              max="100"
                              value="60"
                              barClassName="bg-danger"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v"/>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img alt="..." src={angularImage}/>
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            Angular Now UI Kit PRO
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>$1,800 USD</td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-success"/>
                        completed
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip746418347"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={team1Image}
                          />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip746418347"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip102182364"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={team2Image}
                          />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip102182364"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip406489510"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={team3Image}
                          />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip406489510"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip476840018"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={team4Image}
                          />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip476840018"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className

                                  ="mr-2">100%</span>
                        <div>
                          <Progress
                              max="100"
                              value="100"
                              barClassName="bg-success"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v"/>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img alt="..." src={angularImage}/>
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            Angular Now UI Kit PRO
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>$1,800 USD</td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-success"/>
                        completed
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip746418347"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={team1Image}
                          />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip746418347"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip102182364"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={team2Image}
                          />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip102182364"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip406489510"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={team3Image}
                          />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip406489510"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip476840018"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={team4Image}
                          />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip476840018"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className

                                  ="mr-2">100%</span>
                        <div>
                          <Progress
                              max="100"
                              value="100"
                              barClassName="bg-success"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v"/>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img alt="..." src={angularImage}/>
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            Angular Now UI Kit PRO
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>$1,800 USD</td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-success"/>
                        completed
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip746418347"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={team1Image}
                          />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip746418347"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip102182364"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={team2Image}
                          />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip102182364"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip406489510"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={team3Image}
                          />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip406489510"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip476840018"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={team4Image}
                          />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip476840018"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className

                                  ="mr-2">100%</span>
                        <div>
                          <Progress
                              max="100"
                              value="100"
                              barClassName="bg-success"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v"/>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img alt="..." src={angularImage}/>
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            Angular Now UI Kit PRO
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>$1,800 USD</td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-success"/>
                        completed
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip746418347"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={team1Image}
                          />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip746418347"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip102182364"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={team2Image}
                          />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip102182364"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip406489510"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={team3Image}
                          />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip406489510"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip476840018"
                            onClick={(e) => e.preventDefault()}
                        >
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={team4Image}
                          />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip476840018"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className

                                  ="mr-2">100%</span>
                        <div>
                          <Progress
                              max="100"
                              value="100"
                              barClassName="bg-success"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v"/>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  {/* 추가적인 테이블 행들 */}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <Row className="align-items-center">
                    {/* 왼쪽 버튼 */}
                    <Col md="6">
                      <h4 className="mb-0">총 <span>0</span> 건</h4>
                    </Col>

                    {/* 오른쪽 페이지 네비게이션 */}
                    <Col md="6" className="d-flex justify-content-end">
                      <nav aria-label="...">
                        <Pagination className="pagination mb-0" listClassName="mb-0">
                          <PaginationItem className="disabled">
                            <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                              <i className="fas fa-angle-left" />
                              <span className="sr-only">Previous</span>
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem className="active">
                            <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                              1
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                              2 <span className="sr-only">(current)</span>
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                              3
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                              <i className="fas fa-angle-right" />
                              <span className="sr-only">Next</span>
                            </PaginationLink>
                          </PaginationItem>
                        </Pagination>
                      </nav>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
  );
};

export default Suport;

