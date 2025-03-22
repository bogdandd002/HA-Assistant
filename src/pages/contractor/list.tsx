import {
    DeleteButton,
    EditButton,
    List,
    ShowButton,
    useTable,
  } from "@refinedev/antd";
  import { type BaseRecord } from "@refinedev/core";
  import { Space, Table } from "antd";
  import { IContractor } from "../../interfaces/index";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
  
  export const ContractorList = () => {
    const { tableProps } = useTable<IContractor>({
      meta: { 
        populate: "*",
      },
      syncWithLocation: true,
    });

    return (
      <List>
        <Table {...tableProps} rowKey="documentId">
          <Table.Column dataIndex="documentId" title={"ID"} />
          <Table.Column dataIndex="name" title={"Name"} />
          <Table.Column dataIndex="address" title={"Address"} />
          <Table.Column dataIndex="activity" title={"Activity"} />
          <Table.Column 
          dataIndex={"contact_people"}
           title={"Contact Person"}
           render= {(_, record) => {return record.contact_people.name;}}
            />
          <Table.Column<{ documentId: string }>
            title="Actions"
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.documentId} />
                <DeleteButton hideText size="small" recordItemId={record.documentId} />
              </Space>
            )}
          />
        </Table>
      </List>
    );
  };
  