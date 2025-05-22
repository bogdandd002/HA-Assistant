import { Create, useForm, useSelect } from "@refinedev/antd";
import MDEditor from "@uiw/react-md-editor";
import { DatePicker, Form, Input, Select } from "antd";
import { IContractor, IProject } from "../../interfaces/data/data";
import dayjs from "dayjs";
import useGetUserIdentity from "../../store/user_data";

export const ProjectCreate = () => {
  const user = useGetUserIdentity.getState().user;
  const { formProps, saveButtonProps, form, onFinish } = useForm<IProject>({});

   const handleOnFinish = () => {
    
    form.setFieldsValue({
      "contractors": user?.contractor_documentId
      // contractor: contractor, //set contractor id same as the user crating
    });

    return form.getFieldsValue(true);
  };

  return (
    <Create
    title="Add Project"
    saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical"
      form={form}
      onFinish={() => onFinish?.(handleOnFinish())}>
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
          <DatePicker format={"DD-MM-YYYY"} />
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
          <DatePicker format={"DD-MM-YYYY"} />
        </Form.Item>
        <Form.Item
        name={["contractors"]}></Form.Item>
      </Form>
    </Create>
  );
};
