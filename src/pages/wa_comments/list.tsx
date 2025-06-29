import React from "react";
import { BaseRecord } from "@refinedev/core";
import { useTable, List, EditButton, ShowButton, DateField } from "@refinedev/antd";
import { Table, Space } from "antd";

export const WaCommentsList = () => {
    const { tableProps } = useTable({
        meta: {
            populate: "user",
        },
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                title="Date of comment"
                dataIndex={["createdAt"]}
                render={(value) => <DateField value={value} format="DD-MM-YYYY HH:mm" />}
                />
                <Table.Column
                title="By user"
                dataIndex= {["user"]}
                render={ (record) => (
                    <Space>{record.name}{" "}{record.surname}</Space>
                )}
                />
                 <Table.Column
                title="Comment type"
                dataIndex= {["wa_comment_type"]}
                />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.documentId}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
