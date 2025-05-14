import { useEffect, useMemo, useRef } from "react";
import { ContractorsUsersTable } from "./contractors_users_table";
import { UsersTable } from "./users_table";
import { Divider, Tabs, TabsProps, Typography } from "antd";
import { useSelectColumns } from "../../store/app_data";
import { CrudFilter } from "@refinedev/core";

const { Title } = Typography;

export const AddUserList = () => {
  const colState = useSelectColumns.getState().columnsControl;
  // show additional contractor table only for MC and MCS as wa_contractor columns is true for them
  const showContractorTable = useRef(colState.wa_contractor);
  
  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Internal users',
      children: <UsersTable />,
    },
    {
      key: '2',
      label: "Contractor's users",
      children: <ContractorsUsersTable />,
    },
  ];

  return (
    <>
      {showContractorTable.current ? (
        <>
          <UsersTable />
        </>
      ) : (
        <Tabs defaultActiveKey="1" items={tabItems} size="large" type="card" />
      )}
    </>
  );
};
