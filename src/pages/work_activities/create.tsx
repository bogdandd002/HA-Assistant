import React from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Upload, Divider, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import { InboxOutlined } from "@ant-design/icons";
import { IContractor, IUser, IWorkActivity } from "../../interfaces";

import { API_URL, TOKEN_KEY } from "../../constants/constants";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import useGetUserIdentity from "../../store/user_data";
import { useShallow } from "zustand/shallow";
import { useOne } from "@refinedev/core";
import { useProjectDetails } from "../../store/app_data";

export const WorkActivityCreate = () => {
  const project = useProjectDetails.getState().project;
  const { form, formProps, saveButtonProps, onFinish } = useForm<IWorkActivity>();
  const user = useGetUserIdentity(useShallow((state) => state?.user));


  const { selectProps: users } = useSelect<IUser>({
      resource: "users",
      optionLabel: (item) => `${item.name} ${item.surname}`,
      optionValue: "id",
  
      filters: [
        {
          field: "contractor.id",
          operator: "eq",
          value: project.project_owner,
        },
        // activate this filter to also filter users by alocated project
        // {
        //   field: "projects.documentId",
        //   operator: "containss",
        //   value: project.project_id,
        // },
      ],
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnFinish = (values: any) => {
    mediaUploadMapper(values)
    form.setFieldsValue({
      approval_status: "pending review", 
      ra_approval_status: "pending review", 
      ms_approval_status: "pending review",
      project: project.project_id,
      contractor: user?.contractor_id,
      created_by_user: user?.name + user?.surname
    });
    
    return form.getFieldsValue(true);
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        form={form}
        layout="vertical"
        onFinish={(values) => onFinish?.(handleOnFinish(values))}
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
        <Divider style={{ borderColor: "#7cb305" }}>
            Who should verify this work activity
        </Divider>
        <Form.Item
            label="Send it for attention of: "
            name={["reviewers"]}
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
              {...users}
               />
          </Form.Item>
        <Form.Item noStyle name={["ms_file_url"]}></Form.Item>
        <Form.Item noStyle name={["ms_file_id"]}></Form.Item>
        <Form.Item noStyle name={["project"]}></Form.Item>
        <Form.Item noStyle name={["contractor"]}></Form.Item>
        <Form.Item noStyle name={["created_by_user"]}></Form.Item>
      </Form>
    </Create>
  );
};
