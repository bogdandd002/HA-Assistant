import React from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Checkbox, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useGetIdentity } from "@refinedev/core";
import { IRole, IUser } from "../../interfaces";
import { API_URL } from "../../constants";

export const UserCreate = () => {
    const { data: user } = useGetIdentity<IUser>();
    const { formProps, saveButtonProps, query, form } = useForm();

    const { selectProps: roleSelectProps } = useSelect({
        resource: "users-permissions/roles",
        optionLabel: "name",
        optionValue: "documentId"
      });
    console.log(roleSelectProps)
    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} 
            layout="vertical"
            form={form}
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
                    label="Username"
                    name={["username"]}
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
                    label="Email"
                    name={["email"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={["role"]}
                    noStyle
                >
                   
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
                    label="Select user account type"
                    name={["role"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                <Select
      placeholder="Select user account type"
      style={{ width: 300 }}
      {...roleSelectProps}
    />
                </Form.Item>
                <Form.Item
                    label="Blocked"
                    valuePropName="checked"
                    name={["blocked"]}
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Checkbox>Confirmed</Checkbox>
                </Form.Item> 
            </Form>
        </Create>
    );
};
