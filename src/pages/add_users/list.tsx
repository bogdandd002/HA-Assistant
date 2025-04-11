import { EditButton, List, ShowButton, useTable } from "@refinedev/antd";
import { BaseRecord, HttpError } from "@refinedev/core";
import { AntdInferencer } from "@refinedev/inferencer/antd";
import { Form, Input, Space, Table } from "antd";


interface ISearch {
    title: string;
  }


export const AddUserList = () => {
     const { tableProps, filters, setFilters, sorters, searchFormProps } = useTable<ISearch>({
            resource: "Users",
               sorters: {
                 initial: [
                   {
                     field: "title",
                     order: "desc",
                   },
                 ],
                 mode: "server"
               },
               onSearch: (values) => {
                 return [
                   {
                     field: "username",
                     operator: "contains",
                     value: values,
                   },
                 ];
               },
               filters: {
                permanent: [
                  {
                    field: "project.documentId",
                    operator: "eq",
                    value: localStorage.getItem("selected_project_id"),
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
        <Form.Item name="username">
          <Input placeholder="Search by username" onChange={(e) => {
            setFilters([
              {
                field: "username",
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
                <Table.Column dataIndex="username" title={"Username"} />
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
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
