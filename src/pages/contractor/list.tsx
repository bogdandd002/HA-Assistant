import {
    DeleteButton,
    EditButton,
    List,
    ShowButton,
    useTable,
  } from "@refinedev/antd";
  import { useMany, type BaseRecord } from "@refinedev/core";
  import { Space, Table } from "antd";
  import { IContactPerson, IContractor } from "../../interfaces/index";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
  
  export const ContractorList = () => {
    const { tableProps } = useTable<IContractor>({
      meta: { 
        
      },
      syncWithLocation: true,
    });

    const { data: categoryData, isLoading: categoryIsLoading } = useMany({
      resource: "contact-people",
      ids:
        tableProps?.dataSource
          ?.map((item) => item?.contact_people?.id)
          .filter(Boolean) ?? [],
      queryOptions: {
        enabled: !!tableProps?.dataSource,
      },
    });

    return (
      <List>
        <Table {...tableProps} rowKey="documentId">
          <Table.Column dataIndex="documentId" title={"ID"} />
          <Table.Column dataIndex="name" title={"Name"} />
          <Table.Column dataIndex="address" title={"Address"} />
          <Table.Column dataIndex="activity" title={"Activity"} />
          <Table.Column
          dataIndex={["contact_person", "name"]}
          title={"Contact Person"}
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
  