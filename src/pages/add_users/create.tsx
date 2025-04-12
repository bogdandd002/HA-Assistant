import React from "react";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Checkbox, DatePicker } from "antd";
import dayjs from "dayjs";
import { useGetIdentity } from "@refinedev/core";
import { IUser } from "../../interfaces";

export const UserCreate = () => {
    const { data: user } = useGetIdentity<IUser>();
    const { formProps, saveButtonProps, query, form } = useForm();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} 
            layout="vertical"
            onFinish={ () =>{
                if (user?.user_role == "Contractor_super")
                {
                    form.setFieldValue("role", "Contractor")
                }
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
                    rules={[
                        {
                            required: true,
                        },
                    ]}
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
            </Form>
        </Create>
    );
};
