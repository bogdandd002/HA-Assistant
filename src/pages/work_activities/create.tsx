import React from "react";
import { Create, getValueFromEvent, useForm, useModalForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Upload, Select, Button, Modal} from "antd";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import { IMethodStatement, IProject, IWorkActivity } from "../../interfaces";
import { HttpError } from "@refinedev/core";
import { API_URL, TOKEN_KEY } from "../../constants";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { hostname } from "os";
import { Content } from "antd/es/layout/layout";

const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
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
                    {/* <Form.Item name={"ms_file"} label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload action={`${API_URL}/media/upload`} listType="picture-card">
                            <button
                                style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        </Upload>
                    </Form.Item> */}
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
                Content: "multipart/form-data",
                Host: "localhost:1337",
              }}
              listType="picture"
              multiple
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
                    <Form.Item label="Image">
         
        </Form.Item>
                    <Form.Item noStyle name={["approval_status"]}> </Form.Item>
                    <Form.Item noStyle name={["project"]}> </Form.Item>
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
                        label="Duration"
                        name={["duration"]}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Create>
    );
};
