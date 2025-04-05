import React from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Upload, Select } from "antd";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import { IProject, IWorkActivity } from "../../interfaces";

const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
const project = localStorage.getItem("selected_project_id");

export const WorkActivityCreate = () => {
    const { form, formProps, saveButtonProps, query } = useForm<IWorkActivity>();
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
            <Form {...formProps} form={form} layout="vertical"
            >
                <Form.Item
                    label="Title"
                    name={["title"]}
                    rules={[
                        {
                            required: true,
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
                <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button
              style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
              type="button"
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item noStyle name={["approval_status"]}> </Form.Item>
        <Form.Item noStyle name={["project"]}> </Form.Item>
                <Form.Item
                    label="Start Date"
                    name={["start_date"]}
                    rules={[
                        {
                            required: true,
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
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
};
