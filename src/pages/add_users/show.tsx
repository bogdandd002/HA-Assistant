import React from "react";
import { useShow } from "@refinedev/core";
import {
  Show,
  NumberField,
  TagField,
  TextField,
  EmailField,
  BooleanField,
  DateField,
  ListButton,
  EditButton,
  RefreshButton,
} from "@refinedev/antd";
import {
  Descriptions,
  DescriptionsProps,
  Divider,
  List,
  Typography,
} from "antd";
import useGetUserIdentity from "../../store/user_data";

export const AddUserShow = () => {
  const { query } = useShow();
  const { data, isLoading } = query;
  const user = useGetUserIdentity.getState().user;
  const record = data?.data;
  let allowEdit = false;
  if (user.user_role == "Main_contractor") {
    allowEdit = true; // disable edit button for Main_contractor
  }

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Id",
      children: <NumberField value={record?.id ?? ""} />,
    },
    {
      key: "2",
      label: "Name",
      children: <TextField value={record?.name} />,
    },
    {
      key: "3",
      label: "Surname",
      children: <TextField value={record?.surname} />,
    },
    {
      key: "4",
      label: "Position",
      span: 2,
      children: <TextField value={record?.position} />,
    },
    {
      key: "5",
      label: "Email",
      children: <EmailField value={record?.email} />,
    },
  ];

  return (
    <Show
      isLoading={isLoading}
      headerButtons={
        <>
          <ListButton />
          <EditButton disabled={allowEdit} />
          <RefreshButton />
        </>
      }
    >
      <Descriptions title="User Info" items={items} />
      <br></br>
      <Divider orientation="left">Projects asociated with this user</Divider>
      <List
        size="small"
        dataSource={user.projects}
        renderItem={(item) => <List.Item>{item.name}</List.Item>}
      />
    </Show>
  );
};
