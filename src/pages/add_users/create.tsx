import { Create, useForm, useSelect } from "@refinedev/antd";
import {
  Form,
  Input,
  Checkbox,
  Select,
  Radio,
  RadioChangeEvent,
  Typography,
  Empty,
  Button,
  Modal,
} from "antd";
import { IContractor, IProject, IUser } from "../../interfaces";
import useGetUserIdentity from "../../store/user_data";
import { useShallow } from "zustand/shallow";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { link } from "fs";
import { useGo } from "@refinedev/core";
import { InfoCircleTwoTone } from "@ant-design/icons";

export const UserCreate = () => {
   let role = 1,
    manualySelect = false,
    projectSelection = false,
    adminRadio = false,
    CsRadio = false,
    McsRadio = false,
    roleSelection = false,
    selectContractor = false;

  const location = useLocation().state;
  const go = useGo();
  const user = useGetUserIdentity(useShallow((state) => state?.user));
  const { formProps, saveButtonProps, form, onFinish } = useForm<IUser>();
  const { selectProps: projects } = useSelect<IProject>({
    resource: "projects",
    optionLabel: "name",
    optionValue: "id",

    filters: [
      {
        field: "contractors.documentId",
        operator: "eq",
        value: user?.contractor_documentId,
      },
    ],
  });

  const { selectProps: contractors } = useSelect<IContractor>({
    resource: "contractors",
    optionLabel: "name",
    optionValue: "id",

    filters: [
      {
        field: "work_for.documentId",
        operator: "eq",
        value: user?.contractor_documentId,
      },
    ],
  });

  // Set role admin for new internal user
  // Allow admin to select role manualy when adding new contractor user
  if (user.user_role === "Admin") {
    if (location.tab === "1") {
      role = 1;
      manualySelect = true; //hide role selection field
      projectSelection = true;
      form.setFieldValue("contractor", user?.contractor_id);
    } else {
      manualySelect = false; // display manualy secection field
      projectSelection = true; // hide project selection
      adminRadio = true; //display admin role selection
      roleSelection = true;
      selectContractor = true;
    }
  }
  // Set display conditions for Contractor_super role
  if (user.user_role === "Contractor_super" && location.tab === "1") {
    manualySelect = false;
    projectSelection = false;
    CsRadio = true;
  }
  if (user.user_role === "Main_contractor_super") {
    if (location.tab === "1") {
      manualySelect = false; //role selection field
      roleSelection = true; // make role field selection required
      projectSelection = false; //display project selection
      McsRadio = true; //show Main contracto super radio options
      selectContractor = false;
      form.setFieldValue("contractor", user?.contractor_id);
    } else {
      selectContractor = true;
      projectSelection = false; // display project selection
      role = 4; // set role as contractor for external users
    }
  }
  if (user.user_role === "Main_contractor" && location.tab === "2") {
    manualySelect = true; // hide manualy secection field
    projectSelection = false; // display project selection
    role = 4; // set role contractor for external users
    selectContractor = true; // select contractor
  }
  const onChange = (e: RadioChangeEvent) => {
    role = e.target.value;
  };

  const handleOnFinish = () => {
    const username = form.getFieldValue("name");
    form.setFieldsValue({
      username: username, // harcodding username as first name
      role: role, // set role based on logic
      parentUserContractorId: user.contractor_documentId, //pass over the contractor id for the user whi is creating new user. Used in scope of controlling number of users.
    });

    return form.getFieldsValue(true);
  };

  return (

    <Create saveButtonProps={saveButtonProps}>
        <Form
          {...formProps}
          layout="vertical"
          form={form}
          onFinish={() => onFinish?.(handleOnFinish())}
        >
          <Form.Item
            label="Name"
            name={["name"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Surname"
            name={["surname"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name={["email"]}
            rules={[
              { required: true, message: "Email is required!" },
              () => ({
                validator(rule, value) {
                  if (!value) {
                    return Promise.resolve();
                  }
                  if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value)) {
                    return Promise.reject("Enter a valid email");
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Position"
            name={["position"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name={["password"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Please select user role"
            name={["role"]}
            hidden={manualySelect}
            rules={[
              {
                required: roleSelection,
              },
            ]}
          >
            <>
              {adminRadio && (
                <Radio.Group
                  style={{ width: 200 }}
                  onChange={onChange}
                  options={[
                    { value: 3, label: "Contractor Super" },
                    { value: 4, label: "Contractor" },
                    { value: 5, label: "Main Contractor Super" },
                    { value: 6, label: "Main Contractor" },
                  ]} />
              )}
              {CsRadio && (
                <Radio.Group
                  style={{ width: 200 }}
                  onChange={onChange}
                  options={[
                    { value: 3, label: "Super User" },
                    { value: 4, label: "Normal User" },
                  ]} />
              )}
              {McsRadio && (
                <Radio.Group
                  style={{ width: 200 }}
                  onChange={onChange}
                  options={[
                    {
                      value: 5, 
                      label: ["Super User ", <Button type="link" onClick={() => {
                          Modal.info({
                                       title: 'Super User',
                                       content: (
                                                  <div>
                                                  <p>Has all the elevated permisions and can:</p>
                                                  <p>- create new projects</p>
                                                  <p>- add new contractors</p>
                                                  </div>
                                                ),
                                        onOk() { return },
                                       });}}>
                              <InfoCircleTwoTone />
                          </Button>]
                    },
                    { value: 6, label: "Normal User" },
                  ]} />
              )}
            </>
          </Form.Item>
          <Form.Item
            label="Select projects asociated with this user"
            name={["projects"]}
            rules={[
              {
                required: !projectSelection,
              },
            ]}
            hidden={projectSelection}
          >
            <Select
              placeholder="Select projects access for this user"
              style={{ width: 300 }}
              mode="multiple"
              allowClear
              {...projects}
              notFoundContent={<Empty
                image="/empty.svg"
                styles={{ image: { height: 60 } }}
                description={<Typography.Text>
                  You have no project yet. <br></br>
                  <Button type="link"
                    onClick={() => go({ to: "/projects" })}>Please create a project first.</Button>
                </Typography.Text>}
              ></Empty>} />
          </Form.Item>
          <Form.Item
            label="Contractor associated with this user"
            name={["contractor"]}
            rules={[
              {
                required: selectContractor,
                message: "Please select contractor associated with this user!",
              },
            ]}
            hidden={!selectContractor}
          >
            <Select
              placeholder="Asociate user with contractor"
              style={{ width: 300 }}
              {...contractors}
              notFoundContent={<Empty
                image="/empty.svg"
                styles={{ image: { height: 60 } }}
                description={<Typography.Text>
                  You have no active contractors yet. <br></br>
                  <Button type="link"
                    onClick={() => go({ to: "/contractors" })}>Please add a contractor first.</Button>
                </Typography.Text>}
              ></Empty>} />
          </Form.Item>
          <Form.Item name={["username"]}></Form.Item>
          <Form.Item name={["parentUserContractorId"]}></Form.Item>
        </Form>
      </Create>
  );
};
