import React, { useEffect, useState } from "react";
import { Create, useForm } from "@refinedev/antd";
import {
  Col,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Tabs,
  TabsProps,
  Typography,
} from "antd";
import useGetUserIdentity from "../../store/user_data";
import { useShallow } from "zustand/shallow";
import { CheckboxGroupProps } from "antd/es/checkbox";

const { TextArea } = Input;
const { Title } = Typography;
let approved = true;

// const questions: CheckboxGroupProps<string>["options"] = [
//   { label: "Yes", value: "Yes" },
//   { label: "No", value: "No" },
//   { label: "N/A", value: "N/A", disabled: true },
// ];

type questions = {
    q_number: number;
    q_title: string;
    q_condition: boolean;
}

const predefQuestions: Array<questions>= [
    {
        q_number: 1,
        q_title: "Question 1",
        q_condition: true
},
{
    q_number:2,
    q_title: "Question 2",
    q_condition: false,
}
]
export const WaCommentsCreate = () => {
  const { form, formProps, saveButtonProps, query, onFinish } = useForm();
  const user = useGetUserIdentity(useShallow((state) => state?.user));
  const [value, setValue] = useState("No");

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio4 checked", value);
    setValue(value);
  };

  useEffect(()=>{
    if(value === "Yes"){
        approved = false;
    }
  },[value])

  const approval: CheckboxGroupProps<string>["options"] = [
  { label: "Approve", value: "approved", disabled: approved },
  { label: "Reject", value: "rejected" },
];

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Work activity ",
      children: (
        <>
          <Row>
            <Col span={8}></Col>
            <Col span={8}>
              <Title level={3}>Review work activity here </Title>
            </Col>
            <Col span={8}></Col>
          </Row>
          {predefQuestions.map((question) => {
            return(
                <Row>
            <Col span={4}>
              <Radio.Group
                options={[
                    { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
  { label: "N/A", value: "N/A", disabled: true },
                ]
                }
                onChange={onChange}
                value={value}
                optionType="button"
                buttonStyle="solid"
              />
            </Col>
            <Col span={20}>
            <Title level={4}>{question.q_title} </Title>
            </Col>
          </Row>   
            )
            
          })}
         
          <Row>
                <Col span={4}>
              <Radio.Group
                options={approval}
                onChange={onChange}
                value={value}
                optionType="button"
                buttonStyle="solid"
              />
            </Col>
            <Col span={20}>
            <Title level={4}>Can this work activity begin? </Title>
            </Col>
          </Row>
        </>
      ),
    },
    {
      key: "2",
      label: "Risk assesment ",
      children: <></>,
    },
    {
      key: "3",
      label: "Method statement ",
      children: <></>,
    },
  ];

  const handleOnFinish = () => {
    form.setFieldsValue({
      user: user?.id,
    });

    return form.getFieldsValue(true);
  };

  return (
    <Create saveButtonProps={saveButtonProps} title="Review work activity RAMS">
      <Tabs defaultActiveKey="1" items={tabItems} size="large" type="card" />
      {/* <Form 
      {...formProps} 
      form={form}
      layout="vertical"
      onFinish={() => onFinish?.(handleOnFinish())}>
        <Form.Item
          label="General Comment"
          name={["comment"]}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          label="Reason for comment"
          name={["comment_type"]}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>{" "}
        <Form.Item
          name={["work_activity"]}
          rules={[
            {
              required: false,
            },
          ]}
        >
        </Form.Item>
         <Form.Item
          name={["user"]}
          rules={[
            {
              required: false,
            },
          ]}
        >
        </Form.Item>
      </Form> */}
    </Create>
  );
};
