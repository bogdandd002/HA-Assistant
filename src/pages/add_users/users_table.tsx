import {
  CreateButton,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { BaseRecord, CrudFilter, HttpError, useGo } from "@refinedev/core";
import { Button, Form, Input, Space, Table } from "antd";
import { IUser } from "../../interfaces";
import useGetUserIdentity from "../../store/user_data";
import { useShallow } from "zustand/shallow";
import { useProjectDetails } from "../../store/app_data";
import { useNavigate } from "react-router";

interface ISearch {
  title: string;
}

export const UsersTable = () => {
  const navigate = useNavigate();
  const user = useGetUserIdentity(useShallow((state) => state?.user));
  const { tableProps, setFilters, searchFormProps } = useTable<
    IUser,
    HttpError,
    ISearch
  >({
    resource: "Users",
    sorters: {
      initial: [
        {
          field: "id",
          order: "asc",
        },
      ],
      mode: "server",
    },
    onSearch: (values) => {
      return [
        {
          field: "name",
          operator: "contains",
          value: values,
        },
      ];
    },
    filters: {
      permanent: [
        {
          field: "contractor.documentId",
          operator: "eq",
          value: user?.contractor_documentId,
        },
      ],
    },
    liveMode: "auto",
    meta: {
      populate: "*",
    },

    syncWithLocation: true,
  });

  let allowCreateUser = false;

  if (user.user_role === "Main_contractor") {
    allowCreateUser = true;
  }

  return (
    <List
      title="Internal users"
      headerButtons={
        <Button
          type="primary"
          onClick={() => navigate("create", { state: { tab: "1" } })}
          disabled={allowCreateUser}
        >
          Add new internal user
        </Button>
      }
    >
      <Form {...searchFormProps} layout="inline">
        <Form.Item name="name">
          <Input
            placeholder="Search by name"
            onChange={(e) => {
              setFilters([
                {
                  field: "name",
                  operator: "contains",
                  value: e.currentTarget.value
                    ? e.currentTarget.value
                    : undefined,
                },
              ]);
            }}
          />
        </Form.Item>
      </Form>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex={"name"} title={"Name"} />
        <Table.Column dataIndex={"surname"} title={"Surname"} />
        <Table.Column dataIndex="email" title={"Email"} />
        <Table.Column dataIndex="position" title={"Position"} />
        <Table.Column dataIndex="is_superuser" title={"Super user"} />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} disabled={allowCreateUser}/>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} disabled={allowCreateUser}/>
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
