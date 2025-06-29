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
} from "antd";
import useGetUserIdentity from "../../store/user_data";
import { useShallow } from "zustand/shallow";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { useParsed, useUpdate } from "@refinedev/core";

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
  const { params: {...restParams} } = useParsed();
  const { form, formProps, saveButtonProps, query, onFinish } = useForm();
  const { mutate } =useUpdate({ resource: "work-activities" });
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
                  onChange={(value) => {
                    form.setFieldValue("wa_comment_type", value.target.value);
                  }}
                  optionType="button"
                  buttonStyle="solid"
                />
              </Col>
              <Col span={20}>
                <Title level={5}>Can this work activity begin? </Title>
              </Col>
            </Row>
          
        </>
      ),
    },

    //Ra review TAB
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
                <Checkbox onChange={(e)=> {
                  if(e.target.checked){
                    form.setFieldValue("ra_comment_type", "approved")
                  } else {
                    form.setFieldValue("ra_comment_type", "rejected")
                  }
                }}>
                  Risk Assesment Meets Expectation
                </Checkbox>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Title level={5}> Comments </Title>

              <Col span={24}>
                <Form.Item name={["ra_comment"]}>
                  <TextArea
                    placeholder="Please insert only your Risk assesment comments in this box"
                    showCount
                    allowClear
                    maxLength={500}
                    style={{ height: 220 }}
                  />
                </Form.Item>
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
              <Checkbox onChange={(e)=> {
              if(e.target.checked){
              form.setFieldValue("ms_comment_type", "approved")
              } else {
              form.setFieldValue("ms_comment_type", "rejected")
              }
              }}>
                Method Statement Meets Expectation
              </Checkbox>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Title level={5}> Comments </Title>
            <Col span={24}>
            <Form.Item name={["ms_comment"]}>
              <TextArea
                placeholder="Please insert only your Method statement comments in this box"
                showCount
                allowClear
                maxLength={500}
                style={{ height: 220 }}
              />
              </Form.Item>
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
    const wa_status = form.getFieldValue("wa_comment_type")
    const ra_status = form.getFieldValue("ra_comment_type")
    const ms_status = form.getFieldValue("ms_comment_type")
    form.setFieldsValue({
      user: user?.id,
      work_activity: restParams.wa,
    });
    mutate({
      id: restParams.wa,
      values: {
        approval_status: wa_status,
        ra_approval_status: ra_status,
        ms_approval_status: ms_status
      }
    })

    return form.getFieldsValue(true);
  };

  return (
    <Create saveButtonProps={saveButtonProps} title="Review work activity RAMS">
       <Form {...formProps} form={form} layout="vertical"
          onFinish={() => onFinish?.(handleOnFinish())}>
  
      <Tabs defaultActiveKey="1" items={tabItems} size="large" type="card" />

       <Form.Item name={["user"]}></Form.Item>
             <Form.Item name={["work_activity"]}></Form.Item>
            <Form.Item name={["wa_comment_type"]} 
            initialValue={"rejected"}></Form.Item>
            <Form.Item name={["ms_comment_type"]}
            initialValue={"rejected"}></Form.Item>
            <Form.Item name={["ra_comment_type"]}
            initialValue={"rejected"}></Form.Item>
      </Form>
    </Create>
  );
};
