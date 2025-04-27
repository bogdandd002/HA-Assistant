import { BaseRecord } from "@refinedev/core";
import { useTable, List, ShowButton } from "@refinedev/antd";
import { Table, Space } from "antd";
import { ISignSheet } from "../../interfaces";

export const SignSheetList = () => {
  const { tableProps } = useTable<ISignSheet>({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column title="Name" dataIndex={"name"} />
        <Table.Column title="Surame" dataIndex={"surname"} />
        <Table.Column title="Trade" dataIndex={"trade"} />
        <Table.Column title="Ms Rev" dataIndex={"ms_revision"} />
        <Table.Column title="Ra Rev" dataIndex={"ra_revision"} />
        {/* <Table.Column 
                title="Signature"
                dataIndex={"signature"}
                render={(_, record) => (
                   <Space>
                     <Image
     width={'80%'}
     height={'60%'}
     src={record.signature}/>
                   </Space>
                   

                ) }
                /> */}
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
