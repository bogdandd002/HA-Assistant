import { Create, useForm, useSelect} from "@refinedev/antd";
import { Form, Input, InputNumber } from "antd";
import { IContractor } from "../../interfaces/data/data";
import useGetUserIdentity from "../../store/user_data";

export const ContractorCreate = () => {
  const { formProps, saveButtonProps, form, onFinish } = useForm<IContractor>({});
  const user = useGetUserIdentity.getState().user;
  let admin = true;

  if( user.user_role === "Admin") {
    admin = false; //only admin can set max nr of users
  }

  // const { selectProps: contractors } = useSelect<IContractor>({
  //     resource: "contractors",
  //     optionLabel: "name",
  //     optionValue: "id",
  
  //     filters: [
  //       {
  //         field: "documentId",
  //         operator: "ne",
  //         value: user?.contractor_documentId,
  //       },
  //     ],
  //   });

  const handleOnFinish = () => {
    form.setFieldsValue({"work_for": user?.contractor_documentId});

    return form.getFieldsValue(true);
  };

  return (
    <Create
    title="Add Contractor"
    saveButtonProps={saveButtonProps}>
      <Form {...formProps}
        layout="vertical"
        form={form}
        onFinish={() => onFinish?.(handleOnFinish())}>
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
         <Form.Item
          label={"Number of maximum users"}
          name={["max_nr_users"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber min={1} defaultValue={1} />
        </Form.Item>
        <Form.Item
          name={["work_for"]}
        ></Form.Item>
      </Form>
    </Create>
  );
};
