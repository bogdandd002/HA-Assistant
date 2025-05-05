
import { SelectProjectComponent } from "../../components/pages/common_pages/select_project";
import { useEffect, useState } from "react";
import useProjectDetails from "../../store/app_data";
import { WorkActivityListDisplay } from "./list_of_work_activities";
import { columnsControl } from "../../tables_columns_selection";


export const WorkActivityList = () => {
  const isProject = useProjectDetails((state) => state?.project);

  const [display, setDisplay] = useState(false);
console.log(columnsControl.wa_contractor)
  useEffect(() => {
    const selectedProject = localStorage.getItem("selected_project");
    if (selectedProject) setDisplay(true);
  }, [isProject]);

  return (
    <div>
      {display ? (
        <>
          <WorkActivityListDisplay />
        </>
      ) : (
        <SelectProjectComponent />
      )}
    </div>
  );
};
