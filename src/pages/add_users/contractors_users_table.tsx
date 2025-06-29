import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import {  CrudFilter, HttpError, useOne, useUpdate } from "@refinedev/core";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import { IContractor, IProject, IUser } from "../../interfaces";
import useGetUserIdentity from "../../store/user_data";
import { useShallow } from "zustand/shallow";
import { useProjectDetails, useSelectColumns } from "../../store/app_data";
import { useNavigate } from "react-router";

interface ISearch {
  value_c: string;
  value_n: string;
}

export const ContractorsUsersTable = () => {
  const navigate = useNavigate();
  const { mutate } = useUpdate({
      resource: "contractors"
    });
  const colState = useSelectColumns.getState().columnsControl;
  const selectedProject = useProjectDetails((state) => state?.project);
  const user = useGetUserIdentity(useShallow((state) => state?.user));
   const { data } = useOne<IContractor, HttpError>({
      resource: "contractors",
      id: user.contractor_documentId,
    });

  const userProjects: string[] = user.projects?.map(
    (element: IProject) => element.documentId
  );
  let permanent: CrudFilter[];

  if (user.user_role === "Admin") {
    // Admin can see all users
    permanent = [
      {
        field: "contractor.name",
        operator: "ne",
        value: "admin",
      },
    ];
  } else {
    permanent = [
      {
        field: "contractor.work_for.documentId",
        operator: "containss",
        value: user.contractor_documentId,
      },
    ];
  }

  const { tableProps, setFilters, searchFormProps } = useTable<
    IUser,
    HttpError,
    ISearch>({
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
    onSearch: (search_value) => {
      return [
        {
          field: "contractor",
          operator: "contains",
          value: search_value.value_c,
        },
        {
          field: "name",
          operator: "contains",
          value: search_value.value_n,
        },
      ];
    },
    filters: {
      permanent: permanent,
    },
    liveMode: "auto",
    meta: {
      populate: "*",
    },

    syncWithLocation: true,
  });

   const addUser = () => {
        navigate("create", { state: { tab: "2" } });
  };
let curentNrUsers= 0 ;
  if(data?.data){
    curentNrUsers = data?.data.max_nr_users
  }

   const increaseNrContractors = () => {
    if(data?.data){
    mutate({
      id: user.contractor_documentId,
      values: {
        max_nr_users : curentNrUsers + 1,
      }
    })
  }
}

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
      title="Contractor's users"
      headerButtons={
        <Button
          type="primary"
          onClick={(curentNrUsers > 0) ? addUser : show }
        >
          Add new contractor user
        </Button>
      }
    >
      <Form {...searchFormProps} layout="inline">
        <Form.Item name="contractor">
          <Input
            placeholder="Search by contractor"
            onChange={(e) => {
              setFilters([
                {
                  field: "contractor.name",
                  operator: "contains",
                  value: e.currentTarget.value
                    ? e.currentTarget.value
                    : undefined,
                },
              ]);
            }}
          />
          </Form.Item>
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
        <Table.Column dataIndex={["contractor", "name"]} title={"Contractor"} />
        <Table.Column dataIndex={"name"} title={"Name"} />
        <Table.Column dataIndex={"surname"} title={"Surname"} />
        <Table.Column dataIndex="email" title={"Email"} />
        <Table.Column dataIndex="position" title={"Position"} />
        <Table.Column
          dataIndex="is_superuser"
          title={"Super user"}
          hidden={colState.user_super}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id}
              meta={{ mainUserId : user.contractor_documentId }} 
             onSuccess={increaseNrContractors}/>
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
