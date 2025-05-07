import { Create, useForm} from "@refinedev/antd";
import { Form, Input } from "antd";
import { IContractor } from "../../interfaces/data/data";

export const ContractorCreate = () => {
  const { formProps, saveButtonProps } = useForm<IContractor>({});

  return (
    <Create
    title="Add Contractor"
    saveButtonProps={saveButtonProps}>
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
    </Create>
  );
};
