import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Checkbox, Select } from "antd";
import { IProject, IUser } from "../../interfaces";
import useGetUserIdentity from "../../store/user_data";
import { useShallow } from "zustand/shallow";
import { useLocation } from "react-router";

export const UserCreate = () => {
  const location = useLocation();
  let role: number;
  const user = useGetUserIdentity(useShallow((state) => state?.user));
  const { formProps, saveButtonProps, form } = useForm<IUser>();
  const { selectProps } = useSelect<IProject>({
    resource: "projects",
    optionLabel: "name",
    optionValue: "id",

    filters: [
      {
        field: "contractors.documentId",
        operator: "eq",
        value: user?.contractor_documentId,
      },
    ],
  });

  if(user.user_role === "Admin")
  {
    role = 1;
  }



  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" form={form}
      onFinish={() => {form.setFieldValue("contractor", user?.contractor_id),
                        form.setFieldValue("role", role)
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
          label="Email"
          name={["email"]}
          rules={[
            { required: true, message: "Email is required!" },
            () => ({
              validator(rule, value) {
                if (!value) {
                  return Promise.resolve();
                }
                if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value)) {
                  return Promise.reject("Enter a valid email");
                }
                return Promise.resolve();
              },
            }),
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
        <Form.Item name={["role"]} noStyle></Form.Item>
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
        <Form.Item
          label="Select projects asociated with this user"
          name={["project"]}
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
            {...selectProps}
          />
        </Form.Item>
        <Form.Item
          label="Select user account type"
          name={["role"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Account type"
            options={[
              { value: 4, label: "Normal user" },
              { value: 3, label: "Super user" },
            ]}
          />
        </Form.Item>
        <Form.Item name={["contractor"]} noStyle={true}></Form.Item>
      </Form>
    </Create>
  );
};
