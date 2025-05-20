import React from "react";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, Upload, Divider, InputNumber } from "antd";
import dayjs from "dayjs";
import { InboxOutlined } from "@ant-design/icons";
import { IWorkActivity } from "../../interfaces";

import { API_URL, TOKEN_KEY } from "../../constants/constants";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";

const project = localStorage.getItem("selected_project_id");

export const WorkActivityCreate = () => {
  const { form, formProps, saveButtonProps } = useForm<IWorkActivity>();

  form.setFieldValue("approval_status", "pending review");
  form.setFieldValue("ra_approval_status", "pending review");
  form.setFieldValue("ms_approval_status", "pending review");
  form.setFieldValue("project", project);
  form.setFieldValue("contractor", localStorage.getItem("user_contractor_id"));

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        form={form}
        layout="vertical"
        onFinish={(values) => {
          formProps.onFinish?.(mediaUploadMapper(values));
        }}
      >
        <Divider style={{ borderColor: "#7cb305" }}>
          Work activity details
        </Divider>
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
          <DatePicker format={"DD-MM-YYYY"} />
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
        <Form.Item noStyle name={["approval_status"]}></Form.Item>
        <Form.Item noStyle name={["ra_file_url"]}></Form.Item>
        <Form.Item noStyle name={["ra_file_id"]}></Form.Item>
        {/*hardcoded above*/}
        <Divider style={{ borderColor: "#7cb305" }}>
          Risk assesment details
        </Divider>
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
          <InputNumber />
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
          <DatePicker format={"DD-MM-YYYY"} />
        </Form.Item>
        <Form.Item noStyle name={["ra_approval_status"]}></Form.Item>
        {/*hardcoded above*/}
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
            style={{ width: "30%", justifyContent: "left" }}
            maxCount={1}
            onChange={(info) => {
              if (info.file.status === "done") {
                const ra_fileData = info.file.response.map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (rsp: any) => rsp.url
                );
                const ra_fileData_id = info.file.response.map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (rsp: any) => rsp.documentId
                );
                form.setFieldValue("ra_file_url", ra_fileData[0]);
                form.setFieldValue("ra_file_id", ra_fileData_id[0]);
              }
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click to upload or drag & drop your risk assessment in this area
              (1 file only)
            </p>
          </Upload.Dragger>
        </Form.Item>
        <Divider style={{ borderColor: "#7cb305" }}>
          Method statement details
        </Divider>
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
          <InputNumber />
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
          <DatePicker format={"DD-MM-YYYY"} />
        </Form.Item>
        <Form.Item noStyle name={["ms_approval_status"]}>
          {" "}
        </Form.Item>{" "}
        {/*hardcoded above*/}
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
            style={{ width: "30%", justifyContent: "left" }}
            maxCount={1}
            onChange={(info) => {
              if (info.file.status === "done") {
                const ms_fileData = info.file.response.map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (rsp: any) => rsp.url
                );
                const ms_fileData_id = info.file.response.map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (rsp: any) => rsp.documentId
                );
                form.setFieldValue("ms_file_url", ms_fileData[0]);
                form.setFieldValue("ms_file_id", ms_fileData_id[0]);
              }
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click to upload or drag & drop your risk assessment in this area
              (1 file only)
            </p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item noStyle name={["ms_file_url"]}></Form.Item>
        <Form.Item noStyle name={["ms_file_id"]}></Form.Item>
        <Form.Item noStyle name={["project"]}></Form.Item>
        {/*automaticaly set based on the selected project*/}
        <Form.Item noStyle name={["contractor"]}></Form.Item>
        {/*automaticaly set based on the user*/}
      </Form>
    </Create>
  );
};
