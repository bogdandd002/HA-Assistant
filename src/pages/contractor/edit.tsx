import { Edit, useForm, useSelect } from "@refinedev/antd";
import MDEditor from "@uiw/react-md-editor";
import { Form, Input, Select } from "antd";
import { IContractor } from "../../interfaces";

export const ContractorEdit = () => {
  const { formProps, saveButtonProps, queryResult, formLoading } = useForm<IContractor>({
  
  });

  const blogPostsData = queryResult?.data?.data;

  const { selectProps: categorySelectProps } = useSelect({
    resource: "contractors",
    defaultValue: blogPostsData?.name,
    queryOptions: {
      enabled: !!blogPostsData?.name,
    },
  });

  return (
     <Edit
        title="Edit Contractor"
        saveButtonProps={saveButtonProps}
        isLoading={formLoading}>
          <Form {...formProps} layout="vertical">
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
              label={"Activity"}
              name={["activity"]}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Edit>
  );
};
