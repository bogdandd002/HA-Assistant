import { useEffect, useMemo, useRef } from "react";
import { columnsControl } from "../../constants/tables_columns_selection";
import { ContractorsUsersTable } from "./contractors_users_table";
import { UsersTable } from "./users_table";
import { Divider, Typography } from "antd";

const { Title } = Typography;

export const AddUserList = () => {
  const showContractorTable = useRef(columnsControl.wa_contractor);

  // useEffect(() => {
  //   showContractorTable.current = columnsControl.wa_contractor;
  // })

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
