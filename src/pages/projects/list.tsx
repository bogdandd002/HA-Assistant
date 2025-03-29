import {
    DeleteButton,
    EditButton,
    List,
    ShowButton,
    useTable,
  } from "@refinedev/antd";
  import { CanAccess, keys, useMany, type BaseRecord } from "@refinedev/core";
  import { Space, Table } from "antd";
  import { IProject } from "../../interfaces/index";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
  
  export const ProjectList = () => {
    const { tableProps } = useTable<IProject>({
      meta: { 
        populate: ["contractors"],
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

    return (
      <List>
        <Table {...tableProps} rowKey="documentId">
          <Table.Column dataIndex="project_nr" title={"Project Nr."} />
          <Table.Column dataIndex="name" title={"Name"} />
          <Table.Column dataIndex="address" title={"Address"} />
          <Table.Column dataIndex="start_date" title={"Start Date"} />
          <Table.Column dataIndex="end_date" title={"End Date"} />
          <Table.Column
          dataIndex= "contractors"
          title={"Active Contractors"}
          render={ (_, contractors) =>  contractors}
        /> 
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
  