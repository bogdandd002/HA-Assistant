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
  Refine,
  useGo,
  useMany,
  useSelect,
  type BaseRecord,
} from "@refinedev/core";
import { Button, Space, Table, theme } from "antd";
import { IContractor, IProject } from "../../interfaces";
import  ContractorListDisplay  from "./list_of_contractors";
import { ProjectList } from "../projects";
import { redirect } from "react-router";
import useGetUserIdentity from "../../store/user_data";
import { SelectProjectComponent } from "../../components/pages/common_pages/select_project";
const contractor_nr_users = false;

export const ContractorList = () => {
  const user = useGetUserIdentity((state) => state?.user);
  const selectedProject = localStorage.getItem("selected_project");
  const project = JSON.parse(selectedProject || "{}");
  const go = useGo();
 
  return (
    
    <div>
      {selectedProject ? (
        <>
          <ContractorListDisplay/>
        </>
      ) : (
        <SelectProjectComponent/>
      )}
    </div>
  );
};
