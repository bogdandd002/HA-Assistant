import { useEffect, useMemo, useRef } from "react";
import { ContractorsUsersTable } from "./contractors_users_table";
import { UsersTable } from "./users_table";
import { Divider, Typography } from "antd";
import { useSelectColumns } from "../../store/app_data";

const { Title } = Typography;

export const AddUserList = () => {
  const colState = useSelectColumns.getState().columnsControl;
  // show additional contractor table only for MC and MCS where wa-contractor not hiden
  const showContractorTable = useRef(colState.wa_contractor);

  return (
    <>
      {showContractorTable.current ? (
        <>
          <Divider style={{ borderColor: "#7cb305" }}>
            <Title level={3}> Users</Title>
          </Divider>
          <UsersTable />
        </>
      ) : (
        <>
          <Divider style={{ borderColor: "#7cb305" }}>
            <Title level={3}> Users</Title>
          </Divider>
          <UsersTable />
          <Divider style={{ borderColor: "#7cb305" }}>
            <Title level={3}>Contractors Users</Title>
          </Divider>
          <ContractorsUsersTable />
        </>
      )}
    </>
  );
};
