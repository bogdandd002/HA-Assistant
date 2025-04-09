import { DateField, DeleteButton, EditButton, getDefaultSortOrder, List, ShowButton, useTable } from "@refinedev/antd";
import { IWorkActivity } from "../../interfaces";
import { BaseRecord, HttpError, Link } from "@refinedev/core";
import { Anchor, Form, Input, Space, Table } from "antd";
import { API_URL } from "../../constants";
import { LinkProps } from "react-router";
import { AxiosInstance } from "axios";
import { axiosInstance } from "@refinedev/strapi-v4";


interface ISearch {
    title: string;
  }
const project = localStorage.getItem("selected_project")
export const WorkActivityList = (
  httpClient: AxiosInstance = axiosInstance
) => {
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
            permanent: [
              {
                field: "project.name",
                operator: "eq",
                value: project,
              }
            ],
           },
           liveMode: "auto",
           meta: { 
             populate: "*",
           },
     
           syncWithLocation: true,
         });

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
         
        //  deleteOne: async ({ resource, id }) => {
        //   const url = `${API_URL}/${resource}/${id}`;
      
        //   const { data } = await httpClient.delete(url);
      
        //   return {
        //     data,
        //   };
        // }

         return (
           <List>
              <Form {...searchFormProps} layout="inline">
             <Form.Item name="title">
               <Input placeholder="Search by activity" onChange={(e) => {
                 setFilters([
                   {
                     field: "title",
                     operator: "contains",
                     // eslint-disable-next-line no-extra-boolean-cast
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
               <Table.Column 
               dataIndex="title" 
               title={"Title"}
               render={(text, record) => (
               <Link
                  go={{
                      to:{
                        resource: "work-activities",
                        action: "show",
                        id: record.documentId,
                      }
               }}
               >{record.title}</Link>
                    
               )}
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
                     <DeleteButton hideText size="small" recordItemId={record.documentId} 
                        onSuccess={ (value) =>{
                          console.log(value)
                        }} />
                   </Space>
                 )}
               />
             </Table>
           </List>
         );
};
