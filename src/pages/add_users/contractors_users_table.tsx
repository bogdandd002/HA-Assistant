import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { BaseRecord, CanAccess, CrudFilter, HttpError } from "@refinedev/core";
import { Button, Form, Input, Space, Table } from "antd";
import { IProject, IUser } from "../../interfaces";
import useGetUserIdentity from "../../store/user_data";
import { useShallow } from "zustand/shallow";
import { useProjectDetails, useSelectColumns } from "../../store/app_data";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

interface ISearch {
  title: string;
}

export const ContractorsUsersTable = () => {
  const navigate = useNavigate();
  const colState = useSelectColumns.getState().columnsControl;
  const selectedProject = useProjectDetails((state) => state?.project);
  const user = useGetUserIdentity(useShallow((state) => state?.user));
  const userProjects: string[] = user.projects?.map(
    (element: IProject) => element.documentId
  );
  let permanent: CrudFilter[];

  if (user.user_role === "Admin") {
    // Admin can see all users
    permanent = [
      {
        field: "contractor.name",
        operator: "ne",
        value: "admin",
      },
    ];
  } else {
    permanent = [
      {
        field: "contractor.work_for.documentId",
        operator: "containss",
        value: user.contractor_documentId,
      },
    ];
  }

  const { tableProps, setFilters, searchFormProps } = useTable<
    IUser,
    HttpError,
    ISearch
  >({
    resource: "users",
    sorters: {
      initial: [
        {
          field: "id",
          order: "asc",
        },
      ],
      mode: "server",
    },
    onSearch: (values) => {
      return [
        {
          field: "name",
          operator: "contains",
          value: values,
        },
      ];
    },
    filters: {
      permanent: permanent,
    },
    liveMode: "auto",
    meta: {
      populate: "*",
    },

    syncWithLocation: true,
  });

  return (
    <List
      title="Contractor's users"
      headerButtons={
        <Button
          type="primary"
          onClick={() => navigate("create", { state: { tab: "2" } })}
        >
          Add new contractor user
        </Button>
      }
    >
      <Form {...searchFormProps} layout="inline">
        <Form.Item name="name">
          <Input
            placeholder="Search by name"
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
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex={["contractor", "name"]} title={"Contractor"} />
        <Table.Column dataIndex={"name"} title={"Name"} />
        <Table.Column dataIndex={"surname"} title={"Surname"} />
        <Table.Column dataIndex="email" title={"Email"} />
        <Table.Column dataIndex="position" title={"Position"} />
        <Table.Column
          dataIndex="is_superuser"
          title={"Super user"}
          hidden={colState.user_super}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
