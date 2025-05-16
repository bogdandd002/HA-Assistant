import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Checkbox, Select, Radio, RadioChangeEvent } from "antd";
import { IProject, IUser } from "../../interfaces";
import useGetUserIdentity from "../../store/user_data";
import { useShallow } from "zustand/shallow";
import { useLocation } from "react-router";
import { useState } from "react";

export const UserCreate = () => {
  const location = useLocation().state;
  let role: number, manualySelect: boolean = false;
  const user = useGetUserIdentity(useShallow((state) => state?.user));
  const [value, setValue] = useState(1);
  const { formProps, saveButtonProps, form } = useForm<IUser>();
  const { selectProps } = useSelect<IProject>({
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
  
  // Set role admin for new internal user
  // Allow admin to select role manualy when adding new contractor user
  if( user.user_role === "Admin" )
  {
    if( location.tab === "1" ){
      role = 1;
      manualySelect = true; //hide role selection field
    } else { 
      manualySelect = false; // display manualy secection field
    }
  }
console.log("select" + manualySelect)
   const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" form={form}
      onFinish={() => {form.setFieldValue("contractor", user?.contractor_id),
                        form.setFieldValue("role", role)
      }}>
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
        <Form.Item name={["role"]} hidden = {true}>
<Radio.Group
      style={{ width: 200 }}
      onChange={onChange}
      value={value}
      options={[
        { value: 1, label: 'Contractor Super' },
        { value: 2, label: 'Contractor' },
        { value: 3, label: 'Main Contractor Super' },
        { value: 4, label: 'Main Contractor' },
      ]}
      disabled = {true}
    />
</Form.Item>
        <Form.Item
          label="Confirmed"
          valuePropName="checked"
          name={["confirmed"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Checkbox>Confirmed</Checkbox>
        </Form.Item>
        <Form.Item
          label="Select projects asociated with this user"
          name={["project"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select projects access for this user"
            style={{ width: 300 }}
            mode="multiple"
            allowClear
            {...selectProps}
          />
        </Form.Item>
        <Form.Item
          label="Select user account type"
          name={["role"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Account type"
            options={[
              { value: 4, label: "Normal user" },
              { value: 3, label: "Super user" },
            ]}
          />
        </Form.Item>
        <Form.Item name={["contractor"]} ></Form.Item>
      </Form>
    </Create>
  );
};
