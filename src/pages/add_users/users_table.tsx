import {
  CreateButton,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
  useModal,
} from "@refinedev/antd";
import {
  BaseRecord,
  CrudFilter,
  HttpError,
  useGo,
  useOne,
  useUpdate,
} from "@refinedev/core";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import { IContractor, IUser } from "../../interfaces";
import useGetUserIdentity from "../../store/user_data";
import { useShallow } from "zustand/shallow";
import { useProjectDetails } from "../../store/app_data";
import { useNavigate } from "react-router";

interface ISearch {
  title: string;
}

export const UsersTable = () => {
  const navigate = useNavigate();
  const { mutate } = useUpdate({
    resource: "contractors",
  });
  const user = useGetUserIdentity(useShallow((state) => state?.user));
  const { data } = useOne<IContractor, HttpError>({
    resource: "contractors",
    id: user.contractor_documentId,
  });
  const { tableProps, setFilters, searchFormProps } = useTable<
    IUser,
    HttpError,
    ISearch
  >({
    resource: "users",
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
        {
          field: "email",
          operator: "ne",
          value: user?.email,
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

  let curentNrUsers= 0 ;
  if(data?.data){
    curentNrUsers = data?.data.max_nr_users
  }

  const increaseNrContractors = () => {
    if (data?.data) {
      mutate({
        id: user.contractor_documentId,
        values: {
          max_nr_users: curentNrUsers + 1,
        },
      });
    }
  };

  const addUser = () => {
        navigate("create", { state: { tab: "1" } });
 };

 const show = () => {
            Modal.confirm({
              title: 'Can not add any more new users',
              content: 'You have reached the maximum number of allowed users. Please contact us to increase number or delete existing user.',
              footer: (_, { OkBtn }) => (
                <>
                  <Button>Contact us</Button>
                  <OkBtn />
                </>
              ),
            });      
 }

  return (
    <List
      title="Internal users"
      headerButtons={
        <Button type="primary" 
        onClick={(curentNrUsers > 0) ? addUser : show } 
        disabled={allowCreateUser}>
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
        <Table.Column dataIndex="is_superuser" title={"Super user"}
        render={(_, record) => <> </>} />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton
                hideText
                size="small"
                recordItemId={record.id}
                disabled={allowCreateUser}
              />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.documentId}
                disabled={allowCreateUser}
                meta={{ mainUserId: user.contractor_id }}
                onSuccess={increaseNrContractors}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
