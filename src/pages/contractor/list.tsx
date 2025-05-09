import ContractorListDisplay from "./list_of_contractors";

import { SelectProjectComponent } from "../../components/pages/common_pages/select_project";
import { useEffect, useState } from "react";
import { useProjectDetails } from "../../store/app_data";
import useGetUserIdentity from "../../store/user_data";
import AdminListDisplay from "./admin_contractor_panel";

export const ContractorList = () => {
  const isProject = useProjectDetails((state) => state?.project);
  const user = useGetUserIdentity((state) => state?.user);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    // const selectedProject = localStorage.getItem("selected_project");
    if (isProject.project_name) setDisplay(true);
  }, [isProject]);

  let template;
  if (user.user_role == "Admin") {
    template = <AdminListDisplay />;
  } else {
    if (display) template = <ContractorListDisplay />;
    else template = <SelectProjectComponent />;
  }

  return <>{template}</>;
};
