import { DeleteButton, EditButton, List, ShowButton, useTable } from "@refinedev/antd";
import { BaseRecord, HttpError } from "@refinedev/core";
import { Form, Input, Space, Table } from "antd";
import { IUser } from "../../interfaces";
import useGetUserIdentity from "../../store/user_data";
import { useShallow } from "zustand/shallow";
import { useSelectColumns } from "../../store/app_data";

interface ISearch {
    title: string;
  }


export const ContractorsUsersTable = () => {
  const colState = useSelectColumns.getState().columnsControl;
  const user = useGetUserIdentity(useShallow((state) => state?.user));
     const { tableProps, setFilters, searchFormProps } = useTable<IUser, HttpError, ISearch>({
            resource: "Users",
               sorters: {
                 initial: [
                   {
                     field: "id",
                     order: "asc",
                   },
                 ],
                 mode: "server"
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
                    field: "user.projects",
                    operator: "eq",
                    value: localStorage.getItem("selected_project_id"),
                  },
                  {
                    field: "contractor.documentId",
                    operator: "ne",
                    value: user?.contractor_documentId,
                  }
                ],
               },
               liveMode: "auto",
               meta: { 
                 populate: "*",
               },
         
               syncWithLocation: true,
             });

    return (
        <List>
               <Form {...searchFormProps} layout="inline">
        <Form.Item name="name">
          <Input placeholder="Search by name" onChange={(e) => {
            setFilters([
              {
                field: "name",
                operator: "contains",
                value: e.currentTarget.value
                  ? e.currentTarget.value
                  : undefined,
              },
            ]);
          }} />
        </Form.Item>
      </Form>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title={"ID"} />
                <Table.Column dataIndex={"name"} title={"Name"} />
                <Table.Column dataIndex={"surname"} title={"Surname"} />
                <Table.Column dataIndex="email" title={"Email"} />
                <Table.Column dataIndex="position" title={"Position"} />
                <Table.Column dataIndex="is_superuser" title={"Super user"} hidden={colState.user_super}/>
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                             <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
