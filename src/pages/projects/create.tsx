import { Create, useForm, useSelect } from "@refinedev/antd";
import MDEditor from "@uiw/react-md-editor";
import { DatePicker, Form, Input, Select } from "antd";
import { IContractor, IProject } from "../../interfaces/data/data";
import dayjs from "dayjs";
import useGetUserIdentity from "../../store/user_data";
import moment from "moment";

export const ProjectCreate = () => {
  const user = useGetUserIdentity.getState().user;
  const { formProps, saveButtonProps, form, onFinish } = useForm<IProject>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let s_date: any, e_date: any;
  const handleOnFinish = () => {
    const daysDiference = e_date.diff(s_date, "weeks");
    form.setFieldsValue({
      contractors: user?.contractor_documentId,
      users: user?.id,
      duration: daysDiference,
      project_owner: user.contractor_id
      // contractor: contractor, //set contractor id same as the user crating
    });
    return form.getFieldsValue(true);
  };

  return (
    <Create title="Add Project" saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
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
          <Input />
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
              required: true,
            },
          ]}
          // getValueProps={(value) => ({
          //   value: value ? dayjs(value) : undefined,
          // })}
        >
          <DatePicker
            format={"DD-MM-YYYY"}
            onChange={(date) => (s_date = date)}
          />
        </Form.Item>
        <Form.Item
          label="End date"
          name={["end_date"]}
          rules={[
            {
              required: true,
            },
          ]}
          // getValueProps={(value) => ({
          //   value: value ? dayjs(value) : undefined,
          // })}
        >
          <DatePicker
            format={"DD-MM-YYYY"}
            onChange={(date) => (e_date = date)}
          />
        </Form.Item>
        <Form.Item name={["contractors"]}></Form.Item>
        <Form.Item name={["users"]}></Form.Item>
        <Form.Item name={["duration"]}></Form.Item>
        <Form.Item name={["project_owner"]}></Form.Item>
      </Form>
    </Create>
  );
};
