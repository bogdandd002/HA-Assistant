import { DeleteButton, EditButton, List, ShowButton, useTable } from "@refinedev/antd";
import { BaseRecord, HttpError, useGetIdentity } from "@refinedev/core";
import { AntdInferencer } from "@refinedev/inferencer/antd";
import { Form, Input, Space, Table } from "antd";
import { IUser } from "../../interfaces";


interface ISearch {
    title: string;
  }

export const AddUserList = () => {
  const { data: user } = useGetIdentity<IUser>();
     const { tableProps, filters, setFilters, sorters, searchFormProps } = useTable<IUser, HttpError, ISearch>({
            resource: "Users",
               sorters: {
                 initial: [
                   {
                     field: "id",
                     order: "desc",
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
                    field: "projects.documentId",
                    operator: "eq",
                    value: localStorage.getItem("selected_project_id"),
                  },
                  {
                    field: "contractor.documentId",
                    operator: "eq",
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
