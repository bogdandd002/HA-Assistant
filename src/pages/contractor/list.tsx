import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useModalForm,
  useTable,
} from "@refinedev/antd";
import {
  CanAccess,
  HttpError,
  keys,
  useMany,
  type BaseRecord,
} from "@refinedev/core";
import { Space, Table, theme } from "antd";
import { IContractor } from "../../interfaces";
import  ContractorListDisplay  from "./list_of_contractors";
import { ProjectList } from "../projects";
const contractor_nr_users = false;
export const ContractorList = () => {
  const selectedProject = localStorage.getItem("selected_project");
  const project = JSON.parse(selectedProject || "{}");
  // const { tableProps, tableQuery, filters, setFilters } = useTable<
  //   IContractor,
  //   HttpError
  // >({
  //   meta: {
  //     populate: "*",
  //   },
  //   filters: {
  //     permanent: [
  //       {
  //         field: "projects.documentId",
  //         operator: "eq",
  //         value: project.project_id,
  //       },
  //     ],
  //   },
  //   syncWithLocation: true,
  // });

  // const { data: categoryData, isLoading: categoryIsLoading } = useMany({
  //   resource: "contact-people",
  //   ids:
  //     tableProps?.dataSource
  //       ?.map((item) => item?.contact_people?.id)
  //       .filter(Boolean) ?? [],
  //   queryOptions: {
  //     enabled: !!tableProps?.dataSource,
  //   },
  // });

  let template;
  if (selectedProject) {
    template = < ContractorListDisplay />;
    console.log(selectedProject)
  } else {
    template = <ProjectList />;
  }
  return (
   <>{theme}</>
  );
};
