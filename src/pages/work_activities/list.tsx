import { DateField, DeleteButton, EditButton, getDefaultSortOrder, List, ShowButton, useTable } from "@refinedev/antd";
import { IWorkActivity } from "../../interfaces";
import { BaseRecord, HttpError } from "@refinedev/core";
import { Form, Input, Space, Table } from "antd";

interface ISearch {
    title: string;
  }

export const WorkActivityList = () => {
     const { tableProps, filters, setFilters, sorters, searchFormProps } = useTable<IWorkActivity, HttpError, ISearch>({
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
                 field: "title",
                 operator: "contains",
                 value: values.title,
               },
             ];
           },
           filters: {
             mode: "server",
           },
           liveMode: "auto",
           meta: { 
             populate: "*",
           },
     
           syncWithLocation: true,
         });
     
    function selectProject(text: any): void {
        throw new Error("Function not implemented.");
    }

         // const { data: categoryData, isLoading: categoryIsLoading } = useMany({
         //   resource: "contact-people",
         //   ids:
         //     tableProps?.dataSource
         //       ?.map((item) => item?.contact_people?.id)
         //       .filter(Boolean) ?? [],
         //   queryOptions: {
         //     enabled: !!tableProps?.dataSource,
         //   },
         // });
     
         return (
           <List>
              <Form {...searchFormProps} layout="inline">
             <Form.Item name="title">
               <Input placeholder="Search by activity" onChange={(e) => {
                 setFilters([
                   {
                     field: "title",
                     operator: "contains",
                     value: !!e.currentTarget.value
                       ? e.currentTarget.value
                       : undefined,
                   },
                 ]);
               }} />
             </Form.Item>
           </Form>
             <Table {...tableProps} 
             rowKey="documentId"
             pagination={{
               ...tableProps.pagination,
               position: ["bottomCenter"],
               size: "small",
             }}>
               <Table.Column dataIndex="title" title={"Title"}
               sorter={{multiple:2}}
               defaultSortOrder={getDefaultSortOrder("title", sorters)}
               />
               <Table.Column 
               dataIndex="start_date" title={"Start Date"}
               sorter={{multiple:1}}
               defaultSortOrder={getDefaultSortOrder("start_date", sorters)}
                />
               <Table.Column dataIndex="duration" title={"Duration"} />
               <Table.Column dataIndex="approval_status" title={"Status"} />
               <Table.Column<{ documentId: string }>
                 title="Actions"
                 dataIndex="actions"
                 render={(_, record) => ( 
                   <Space>
                     <EditButton hideText size="small" recordItemId={record.documentId} />
                     <ShowButton hideText size="small" recordItemId={record.documentId} />
                     <DeleteButton hideText size="small" recordItemId={record.documentId} />
                   </Space>
                 )}
               />
             </Table>
           </List>
         );
};
