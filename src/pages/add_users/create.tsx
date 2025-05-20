import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Checkbox, Select, Radio, RadioChangeEvent } from "antd";
import { IContractor, IProject, IUser } from "../../interfaces";
import useGetUserIdentity from "../../store/user_data";
import { useShallow } from "zustand/shallow";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

export const UserCreate = () => {
  const location = useLocation().state;
  const user = useGetUserIdentity(useShallow((state) => state?.user));
  let role = 1,
    manualySelect = false,
    projectSelection = false,
    adminRadio = false,
    CsRadio = false,
    McsRadio = false;

  
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
        field: "documentId",
        operator: "ne",
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
      form.setFieldValue("contractor", user?.contractor_documentId)
    } else {
      manualySelect = false; // display manualy secection field
      projectSelection = true; // hide project selection
      adminRadio = true; //display admin role selection
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
      manualySelect = false; //hide role selection field
      projectSelection = false; //display project selection
      McsRadio = true; //show Main contracto super radio options
    } else {
      manualySelect = true; // hide manualy secection field
      projectSelection = false; // display project selection
      role = 4; // set role contractor for external users
    }
  }
  if (user.user_role === "Main_contractor" && location.tab === "2") {
    manualySelect = true; // hide manualy secection field
    projectSelection = false; // display project selection
    role = 4; // set role contractor for external users
  }
  const onChange = (e: RadioChangeEvent) => {
    role = e.target.value;
  };

  const handleOnFinish = () => {
    const username = form.getFieldValue("name");
    form.setFieldsValue({
      username: username, // harcodding username as first name
      role: role, // set role based on logic
      // contractor: contractor, //set contractor id same as the user crating
    });

    return form.getFieldsValue(true);
  };


  // useEffect(()=> {
  //   role = value;
  // },[value])
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
        <Form.Item name={["role"]} hidden={manualySelect}>
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
                ]}
              />
            )}
            {CsRadio && (
              <Radio.Group
                style={{ width: 200 }}
                onChange={onChange}
                options={[
                  { value: 3, label: "Contractor Super" },
                  { value: 4, label: "Contractor" },
                ]}
              />
            )}
            {McsRadio && (
              <Radio.Group
                style={{ width: 200 }}
                onChange={onChange}
                options={[
                  { value: 5, label: "Main Contractor Super" },
                  { value: 6, label: "Main Contractor" },
                ]}
              />
            )}
          </>
        </Form.Item>
        <Form.Item
          label="Select projects asociated with this user"
          name={["project"]}
          rules={[
            {
              required: false,
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
          />
        </Form.Item>
        <Form.Item
        label="Contractor associated with this user" 
        name={["contractor"]}
        rules={[{ required: true, message: 'Please select contractor associated with this user!' }]}
        hidden={manualySelect}>
          <Select
            placeholder="Asociate user with contractor"
            style={{ width: 300 }}
            {...contractors}
          />
        </Form.Item>
        <Form.Item name={["username"]}></Form.Item>
      </Form>
    </Create>
  );
};
