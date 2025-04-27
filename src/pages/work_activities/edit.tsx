import React, { useState } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, Descriptions, TabsProps, DescriptionsProps, Tag, Tabs, Divider, Upload } from "antd";
import dayjs from "dayjs";
import { API_URL, TOKEN_KEY } from "../../constants";
import { getValueProps } from "@refinedev/strapi-v4";
import { InboxOutlined } from "@ant-design/icons";

export const WorkActivityEdit = () => {
    const { formProps, saveButtonProps, query, form } = useForm();
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ms_rev, ms_setRev] = useState("");
    const record = query?.data?.data;
    const { TextArea } = Input;
    const tabItems: TabsProps['items'] = [
          {
            key: '1',
            label: 'Work activity ',
            children: (         
              <Form
                {...formProps}
                form={form}
                layout="vertical"
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
                  <DatePicker format={"DD-MM-YYYY"} disabled/>
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
                </Form>
            ),
          },
          {
            key: '2',
            label: 'Risk assestment',
            children: (
                <Form
                {...formProps}
                form={form}
                layout="vertical"
              >
                <Divider style={{ borderColor: "#7cb305" }}>
                Risk assesment details
                </Divider>
                <Form.Item noStyle name={["ra_file_url"]}></Form.Item>
                <Form.Item noStyle name={["ra_file_id"]}></Form.Item>
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
          <TextArea rows={4} 
           style={{ width: "70%", justifyContent: "left" }}/>
        </Form.Item>
        <Form.Item
          label="Revision number"
          name={["ra_revision"]}
          rules={[
            {
              required: true,
            },
            {
                validator: (_, value) => {
                  if (!value)
                    return Promise.reject("Require revision number!")
                    if (value <= record?.ra_revision)
                        return Promise.reject("New revision number can not be equal or lower than previous one!")
                    return Promise.resolve()
                }
            }
          ]}
        >
          <Input style={{ width: "10%", justifyContent: "left" }}/>
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
          <DatePicker format={"DD-MM-YYYY"}/>
        </Form.Item>
        <Form.Item noStyle name={["ra_approval_status"]}>
        </Form.Item>
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
                const ra_fileData = info.file.response.map((rsp: any) => rsp.url);
                const ra_fileData_id = info.file.response.map(
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


                </Form>
            ),
          },
          {
            key: '3',
            label: 'Method statement',
            children: (
                <Form
                {...formProps}
                form={form}
                layout="vertical"
              >  
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
                      <TextArea rows={4} 
                        style={{ width: "70%", justifyContent: "left" }}/>
                     </Form.Item>
                     <Form.Item
                       label="Revision number"
                       name={["ms_revision"]}
                       rules={[
                        {
                          required: false,
                        },
                        {
                          validator: (_, value) => {
                            if (!value)
                              return Promise.reject("Require revision number!")
                              if (value <= record?.ms_revision)
                                  return Promise.reject("New revision number can not be equal or lower than previous one!")
                              return Promise.resolve()
                          }
                        }
                      ]}
                    >
                      <Input onChange={(event) => ms_setRev(event.target.value)}
                       style={{ width: "10%", justifyContent: "left" }}/>
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
                         maxCount={1}
                         style={{ width: "30%", justifyContent: "left" }}
                         onChange={(info) => {
                             if (info.file.status === "done") {
                               const ms_fileData = info.file.response.map((rsp: any) => rsp.url);
                               const ms_fileData_id = info.file.response.map(
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
                           Click to upload or drag & drop your method statement in this area
                         </p>
                       </Upload.Dragger>
                     </Form.Item>
                     </Form>
            ),
          },
        ];
       

    return (
        <Edit 
        saveButtonProps={saveButtonProps}
        title=" Revise work activity / Risk assessment / Method statement">
            <Tabs
            defaultActiveKey="1"
            items={tabItems} 
            size="large" 
            type="card" 
            />
           
        </Edit>
    );
};
