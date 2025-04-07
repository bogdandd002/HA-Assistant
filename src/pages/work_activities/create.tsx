import React from "react";
import { Create, getValueFromEvent, useForm, useModalForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Upload, Select, Button, Modal, Divider} from "antd";
import dayjs from "dayjs";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { IMethodStatement, IProject, IWorkActivity } from "../../interfaces";
import { HttpError } from "@refinedev/core";
import { API_URL, TOKEN_KEY } from "../../constants";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";

const project = localStorage.getItem("selected_project_id");

export const WorkActivityCreate = () => {
    const { form, formProps, saveButtonProps, query, onFinish } = useForm<IWorkActivity>();
    const { selectProps: projectSelectProps } = useSelect<IProject>({
        resource: "projects",
        optionLabel: "name",
        optionValue: "documentId",
        pagination: {
          mode: "server",
        },
      });

    form.setFieldValue("approval_status", "pending review");
    form.setFieldValue("project", project);

    return (
        <Create saveButtonProps={saveButtonProps}>
                <Form {...formProps} 
                form={form} 
                layout="vertical"
                onFinish={(values) => {
                    formProps.onFinish?.(mediaUploadMapper(values));
                  }}
                >
        <Divider style={{ borderColor: '#7cb305' }}>Work activity details</Divider>
                <Form.Item
                        label="Title"
                        name={["title"]}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name={["description"]}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>           
            <Form.Item
                        label="Start Date"
                        name={["start_date"]}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                        getValueProps={(value) => ({
                            value: value ? dayjs(value) : undefined,
                        })}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="Duration (in days)"
                        name={["duration"]}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item> 
            <Form.Item noStyle name={["approval_status"]}> </Form.Item> {/*hardcoded above*/}
            <Divider style={{ borderColor: '#7cb305' }}>Risk assesment details</Divider>
            <Form.Item
                        label="Title"
                        name={["ra_title"]}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name={["ra_description"]}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>           
                    <Form.Item
                        label="Revision number"
                        name={["ra_revision"]}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item> 
                    <Form.Item
                        label="Revision date"
                        name={["ra_revision_date"]}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                        getValueProps={(value) => ({
                            value: value ? dayjs(value) : undefined,
                        })}
                    >
                        <DatePicker />
                    </Form.Item>
            <Form.Item noStyle name={["ra_approval_status"]}> </Form.Item> {/*hardcoded above*/}
            <Form.Item
            name="ra_file"
            valuePropName="fileList"
            getValueProps={(data) => getValueProps(data, API_URL)}
            noStyle
          >
            <Upload.Dragger
              name="files"
              action={`${API_URL}/api/upload`}
              headers={{
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
              }}
              listType="picture-card"
              multiple
              style={{width: '30%', justifyContent: 'left'}}
            >
                 <p className="ant-upload-drag-icon">
                <InboxOutlined />
                </p>
              <p className="ant-upload-text">Click to upload or drag & drop your risk assessment in this area</p>
            </Upload.Dragger>
            </Form.Item>
            <Divider style={{ borderColor: '#7cb305' }}>Method statement details</Divider>
            <Form.Item
                        label="Title"
                        name={["ms_title"]}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name={["ms_description"]}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>           
                    <Form.Item
                        label="Revision number"
                        name={["ms_revision"]}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item> 
                    <Form.Item
                        label="Revision date"
                        name={["ms_revision_date"]}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                        getValueProps={(value) => ({
                            value: value ? dayjs(value) : undefined,
                        })}
                    >
                        <DatePicker />
                    </Form.Item>
            <Form.Item noStyle name={["ms_approval_status"]}> </Form.Item> {/*hardcoded above*/}
            <Form.Item
            name="ms_file"
            valuePropName="fileList"
            getValueProps={(data) => getValueProps(data, API_URL)}
            noStyle
          >
            <Upload.Dragger
              name="files"
              action={`${API_URL}/api/upload`}
              headers={{
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
              }}
              listType="picture-card"
              multiple
              style={{width: '30%', justifyContent: 'left'}}
            >
                 <p className="ant-upload-drag-icon">
                <InboxOutlined />
                </p>
              <p className="ant-upload-text">Click to upload or drag & drop your method statement in this area</p>
            </Upload.Dragger>
            </Form.Item>
            <Form.Item noStyle name={["project"]}> </Form.Item> {/*automaticaly set based on the selected project*/}
            <Form.Item noStyle name={["contractor"]}> </Form.Item> {/*automaticaly set based on the user*/}
                </Form>
            </Create>
    );
};
