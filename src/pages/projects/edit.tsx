import { Edit, useForm, useSelect } from "@refinedev/antd";
import MDEditor from "@uiw/react-md-editor";
import { DatePicker, Form, Input, Select } from "antd";
import { IContractor, IProject } from "../../interfaces";
import dayjs from "dayjs";
import moment from "moment";

export const ProjectEdit = () => {
  const { formProps, saveButtonProps, query, formLoading, form, onFinish } = useForm<IProject>({
  
  });

  const projectData = query?.data?.data;
let s_date: any, e_date: any;
s_date = moment(projectData?.start_date, "YYYY-MM-DD")
e_date = moment(projectData?.end_date, "YYYY-MM-DD")
  const handleOnFinish = () => {
    const daysDiference = e_date.diff(s_date, "weeks");
    form.setFieldsValue({
      duration: daysDiference,
      // contractor: contractor, //set contractor id same as the user crating
    });
    return form.getFieldsValue(true);
  };



  return (
     <Edit
        title="Edit Contractor"
        saveButtonProps={saveButtonProps}
        isLoading={formLoading}>
          <Form {...formProps} layout="vertical"
      form={form}
      onFinish={() => onFinish?.(handleOnFinish())}
      >
        <Form.Item
          label={"Proj. Number"}
          name={["project_nr"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input/>
          </Form.Item>
              <Form.Item
          label={"Name"}
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
          label={"Address"}
          name={["address"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Start date"
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
          <DatePicker format={"DD-MM-YYYY"}
           onChange={(date) => (s_date = date)} />
        </Form.Item>
        <Form.Item
          label="End date"
          name={["end_date"]}
          rules={[
            {
              required: false,
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker format={"DD-MM-YYYY"} 
           onChange={(date) => (e_date = date)}/>
        </Form.Item>
        <Form.Item
        name={["contractors"]}></Form.Item>
         <Form.Item
        name={["users"]}></Form.Item>
      </Form>
        </Edit>
  );
};
