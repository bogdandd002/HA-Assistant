import React from "react";
import { BaseRecord } from "@refinedev/core";
import { useTable, List, EditButton, ShowButton } from "@refinedev/antd";
import { Table, Space, Image } from "antd";

export const SignSheetList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column 
                title="Name"
                dataIndex={"name"}
                />
                 <Table.Column 
                title="Surame"
                dataIndex={"surname"}
                />
                 <Table.Column 
                title="Trade"
                dataIndex={"trade"}
                />
                 <Table.Column 
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
                />
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
