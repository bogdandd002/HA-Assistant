import {
  DateField,
  DeleteButton,
  EditButton,
  getDefaultSortOrder,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { IWorkActivity } from "../../interfaces";
import { HttpError, Link } from "@refinedev/core";
import { Form, Input, Space, Table } from "antd";
import { useEffect } from "react";
import { columnsControl } from "../../tables_columns_selection";

interface ISearch {
  title: string;
}

export const WorkActivityListDisplay = () => {
  const selectedProject = localStorage.getItem("selected_project");
  const project = JSON.parse(selectedProject || "{}");

  const { tableProps, setFilters, sorters, searchFormProps } = useTable<
    IWorkActivity,
    HttpError,
    ISearch
  >({
    sorters: {
      initial: [
        {
          field: "title",
          order: "desc",
        },
      ],
      mode: "server",
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
          field: "project.documentId",
          operator: "eq",
          value: project.project_id,
        },
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
        <Form.Item name="title">
          <Input
            placeholder="Search by activity"
            onChange={(e) => {
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
            }}
          />
        </Form.Item>
      </Form>
      <Table
        {...tableProps}
        rowKey="documentId"
        pagination={{
          ...tableProps.pagination,
          position: ["bottomCenter"],
          size: "small",
        }}
      >
        <Table.Column
          dataIndex={"created_by_user"}
          title={"Created by"}
          hidden={columnsControl.wa_name}
        />
        <Table.Column
          dataIndex={["contractor", "name"]}
          title={"Contractor"}
          hidden={columnsControl.wa_contractor}
        />
        <Table.Column
          dataIndex={"updatedAt"}
          title={"Last updated"}
          render={(value) => <DateField value={value} format="DD-MM-YYYY" />}
        />
        <Table.Column
          dataIndex="title"
          title={"Title"}
          render={(text, record) => (
            <Link
              go={{
                to: {
                  resource: "work-activities",
                  action: "show",
                  id: record.documentId,
                },
              }}
            >
              {record.title}
            </Link>
          )}
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("title", sorters)}
        />
        <Table.Column
          dataIndex="start_date"
          title={"Start Date"}
          sorter={{ multiple: 1 }}
          defaultSortOrder={getDefaultSortOrder("start_date", sorters)}
          render={(value) => <DateField value={value} format="DD-MM-YYYY" />}
        />
        <Table.Column
          dataIndex="end_date"
          title={"End Date"}
          sorter={{ multiple: 1 }}
          defaultSortOrder={getDefaultSortOrder("start_date", sorters)}
          render={(value) => <DateField value={value} format="DD-MM-YYYY" />}
        />
        <Table.Column dataIndex="duration" title={"Duration"} />
        <Table.Column dataIndex="approval_status" title={"Status"} />
        <Table.Column
          dataIndex="approval_status"
          title={"Require review"}
          hidden={columnsControl.wa_rev_exp}
        />
        <Table.Column<{
          documentId: string;
          ra_file_id: string;
          ms_file_id: string;
        }>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton
                hideText
                size="small"
                recordItemId={record.documentId}
              />
              <ShowButton
                hideText
                size="small"
                recordItemId={record.documentId}
              />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.documentId}
              />
            </Space>
          )}
        />
        <Table.Column dataIndex="approval_status" title={"History timeline"} />
      </Table>
    </List>
  );
};
