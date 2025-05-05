import ContractorListDisplay from "./list_of_contractors";

import { SelectProjectComponent } from "../../components/pages/common_pages/select_project";
import { useEffect, useState } from "react";
import useProjectDetails from "../../store/app_data";

export const ContractorList = () => {
  const isProject = useProjectDetails((state) => state?.project);

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const selectedProject = localStorage.getItem("selected_project");
    if (selectedProject) setDisplay(true);
  }, [isProject]);

  return (
    <div>
      {display ? (
        <>
          <ContractorListDisplay />
        </>
      ) : (
        <SelectProjectComponent />
      )}
    </div>
  );
};
