import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { BaseRecord, HttpError, useGo, useSelect } from "@refinedev/core";
import {
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import { IProject, IUser, ProjectDetails } from "../../../interfaces";
import useGetUserIdentity from "../../../store/user_data";
import { useShallow } from "zustand/shallow";
import useProjectDetails from "../../../store/app_data";

const { Title } = Typography;

export const SelectProjectComponent = () => {
  const user = useGetUserIdentity(useShallow((state) => state?.user));
   const go = useGo();
  const { options, query } = useSelect<IProject>({
    resource: "projects",
    optionLabel: "name",
    optionValue: "documentId",
    searchField: "name",
    filters: [
      {
        field: "contractors.documentId",
        operator: "eq",
        value: user?.contractor_documentId,
      },
    ],
    debounce: 500,
  });

  function handleChange(value: string) {
    const project = query?.data?.data.find((element: IProject) => {
      return element.documentId == value;
    });
    if (project) {
      const selectProject: ProjectDetails = {
        project_id: project?.documentId,
        project_name: project?.name,
        project_number: project?.project_nr,
      };
      useProjectDetails.getState().setProjectState(selectProject);
      localStorage.setItem("selected_project", JSON.stringify(selectProject));
    }
    
  }

  return (
    <>
      <Row>
        <Col span={8}></Col>
        <Col span={14}>
          <Title level={2} style={{ width: "100%", justifyContent: "center" }}>
            Please select a project first
          </Title>
        </Col>
        <Col span={2}></Col>
      </Row>
      <Divider orientation="left"></Divider>
      <Row>
        <Col span={5}></Col>
        <Col span={14}>
          <Select
            showSearch
            placeholder="Select a project"
            style={{ width: "100%" }}
            onChange={handleChange}
            options={options}
          />
        </Col>
        <Col span={5}></Col>
      </Row>
    </>
  );
};
