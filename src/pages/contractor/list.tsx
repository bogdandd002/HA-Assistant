import { SelectProjectComponent } from "../../components/pages/common_pages/select_project";
import { useEffect, useState } from "react";
import { useProjectDetails, useSelectColumns } from "../../store/app_data";
import useGetUserIdentity from "../../store/user_data";
import AdminListDisplay from "./admin_contractor_panel";
import { Form, Input, Space, Table } from "antd";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
} from "@refinedev/antd";
import { useTable } from "@refinedev/antd";
import { IContractor } from "../../interfaces";
import { CrudFilter, HttpError } from "@refinedev/core";

export const ContractorList = () => {
  const user = useGetUserIdentity((state) => state?.user);
  const selectedProject = useProjectDetails((state) => state?.project);
  const colState = useSelectColumns.getState().columnsControl;

  let permanent: CrudFilter[] = [
    {
      field: "work_for.documentId",
      operator: "eq",
      value: user?.contractor_documentId,
    },
  ];

  if (user?.user_role === "Admin") {
    permanent = [
      {
        field: "work_for.documentId",
        operator: "eq",
        value: user?.contractor_documentId,
      },
    ];
  }
  if (user?.user_role === "Main_contractor") {
    permanent = [
      {
        field: "work_for.documentId",
        operator: "eq",
        value: user?.contractor_documentId,
      },
      {
        field: "projects.documentId",
        operator: "contains",
        value: user?.projects,
      },
    ];
  }
  const { tableProps, tableQuery, filters, setFilters, searchFormProps } =
    useTable<IContractor, HttpError>({
      sorters: {
        initial: [
          {
            field: "name",
            order: "asc",
          },
        ],
        mode: "server",
      },
      onSearch: (values: any) => {
        return [
          {
            field: "name",
            operator: "contains",
            value: values.title,
          },
        ];
      },

      filters: {
        permanent: permanent,
      },
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
            placeholder="Search by contractors name"
            onChange={(e) => {
              setFilters([
                {
                  field: "name",
                  operator: "contains",
                  value: e.currentTarget.value
                    ? e.currentTarget.value
                    : undefined,
                },
              ]);
            }}
          />
        </Form.Item>
      </Form>
      <Table {...tableProps} rowKey="documentId">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column dataIndex="address" title={"Address"} />
        <Table.Column dataIndex="activity" title={"Activity"} />
        <Table.Column
          dataIndex="contact_person"
          title={"Contact Person"}
          render={(_, resource) => <h2></h2>}
        />
        <Table.Column
          dataIndex="users"
          title={"Number of alocated users"}
          hidden={colState.contracor_nr_users}
          render={(_, resource) => Object.keys(resource.users).length}
        />
        <Table.Column
          dataIndex="start_on_project"
          title={"Start on project date"}
          render={(value) => <DateField value={value} format="DD-MM-YYYY" />}
        />
        <Table.Column
          dataIndex="completed_project"
          title={"Has completed project"}
        />
        <Table.Column<{ documentId: string }>
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
      </Table>
    </List>
  );
};
