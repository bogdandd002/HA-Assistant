import React, { useEffect, useState } from "react";
import { Create, useForm } from "@refinedev/antd";
import {
  Col,
  Form,
  Input,
  List,
  Radio,
  RadioChangeEvent,
  Row,
  Tabs,
  TabsProps,
  Typography,
  Checkbox,
  CheckboxProps,
} from "antd";
import useGetUserIdentity from "../../store/user_data";
import { useShallow } from "zustand/shallow";
import { CheckboxGroupProps } from "antd/es/checkbox";

const { TextArea } = Input;
const { Title } = Typography;

//checkbox groupt for questions
const answers: CheckboxGroupProps<string>["options"] = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
  { label: "N/A", value: "N/A", disabled: true },
];

type questions = {
  q_number: number;
  q_title: string;
  q_condition: boolean;
  q_state: string;
};

const predefQuestions: Array<questions> = [
  {
    q_number: 1,
    q_title: "Question 1",
    q_condition: true,
    q_state: "No",
  },
  {
    q_number: 2,
    q_title: "Question 2",
    q_condition: false,
    q_state: "No",
  },
  {
    q_number: 3,
    q_title: "Question 3",
    q_condition: true,
    q_state: "No",
  },
];
export const WaCommentsCreate = () => {
  const { form, formProps, saveButtonProps, query, onFinish } = useForm();
  const user = useGetUserIdentity(useShallow((state) => state?.user));
  const [question_values, setQuestionValue] = useState(predefQuestions);
  const [approve, setApproval] = useState(true);

  const onChange = (
    { target: { value } }: RadioChangeEvent,
    q_number: number
  ) => {
    setQuestionValue(
      question_values.map((question) => {
        if (question.q_number === q_number) {
          return { ...question, q_state: value };
        } else {
          return question;
        }
      })
    );
  };
  const checkboxonChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  useEffect(() => {
    question_values.map((question) => {
      if (question.q_condition === true) {
        if (question.q_state === "Yes") {
          setApproval(false);
        } else {
          setApproval(true);
        }
      }
    });
  }, [question_values]);

  const approval: CheckboxGroupProps<string>["options"] = [
    { label: "Approve", value: "approved", disabled: approve },
    { label: "Reject", value: "rejected" },
  ];

  const tabItems: TabsProps["items"] = [
    //General TAB
    {
      key: "1",
      label: "Work activity ",
      children: (
        <>
          <Form
                        {...formProps}
                        form={form}
                        layout="vertical"
                      >  
          <Form.Item
          name={["wa_comment_type"]}></Form.Item>
          <Row>
            <Col span={8}></Col>
            <Col span={8}>
              <Title level={4}>Review work activity here </Title>
            </Col>
            <Col span={8}></Col>
          </Row>
          <Row>
            <Col span={24}>
              <List
                itemLayout="horizontal"
                dataSource={question_values}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Radio.Group
                          options={answers}
                          onChange={(value) => onChange(value, item.q_number)}
                          value={item.q_state}
                          optionType="button"
                          buttonStyle="solid"
                        />
                      }
                      title={item.q_title}
                    />
                    {redStar(item.q_condition)}
                  </List.Item>
                )}
              />
            </Col>
          </Row>

          <Row>
            <Col span={4}>
              <Radio.Group
                options={approval}
                onChange={(value)=>{
                  form.setFieldValue("wa_comment_type", value.target.value)
                }}
                optionType="button"
                buttonStyle="solid"
              />
            </Col>
            <Col span={20}>
              <Title level={5}>Can this work activity begin? </Title>
            </Col>
          </Row>
          </Form>
        </>
      ),
    },

    //Rams review TAB
    {
      key: "2",
      label: "Risk assesment ",
      children: (
        <>
         <Row>
            <Col span={8}></Col>
            <Col span={8}>
              <Title level={4}>Review work activity here </Title>
            </Col>
            <Col span={8}></Col>
          </Row>
          <Row>
            <Col span={24}>
              <List
                itemLayout="horizontal"
                dataSource={question_values}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Radio.Group
                          options={answers}
                          onChange={(value) => onChange(value, item.q_number)}
                          value={item.q_state}
                          optionType="button"
                          buttonStyle="solid"
                        />
                      }
                      title={item.q_title}
                    />
                    {redStar(item.q_condition)}
                  </List.Item>
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Checkbox onChange={checkboxonChange}>
                Risk Assesment Meets Expectation
              </Checkbox>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Title level={5}> Comments </Title>
            <Col span={24}>
              {" "}
              <TextArea
                placeholder="Please insert only your Risk assesment comments in this box"
                showCount
                allowClear
                maxLength={500}
                style={{ height: 220}}
              />
            </Col>
          </Row>
        </>
      ),
    },
    // Method statement TAB
    {
      key: "3",
      label: "Method statement ",
      children: (
         <>
          <Row>
            <Col span={8}></Col>
            <Col span={8}>
              <Title level={4}>Review work activity here </Title>
            </Col>
            <Col span={8}></Col>
          </Row>
          <Row>
            <Col span={24}>
              <List
                itemLayout="horizontal"
                dataSource={question_values}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Radio.Group
                          options={answers}
                          onChange={(value) => onChange(value, item.q_number)}
                          value={item.q_state}
                          optionType="button"
                          buttonStyle="solid"
                        />
                      }
                      title={item.q_title}
                    />
                    {redStar(item.q_condition)}
                  </List.Item>
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Checkbox onChange={checkboxonChange}>
                Method Statement Meets Expectation
              </Checkbox>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Title level={5}> Comments </Title>
            <Col span={24}>
              {" "}
              <TextArea
                placeholder="Please insert only your Method statement comments in this box"
                showCount
                allowClear
                maxLength={500}
                style={{ height: 220 }}
              />
            </Col>
          </Row>
        </>
      ),
    },
  ];

  // function to higlite the conditional criteria in questions
  const redStar = (condition: boolean) => {
    if (condition === true)
      return (
        <Title level={4} color="red">
          * Mandatory condition
        </Title>
      );
  };

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
