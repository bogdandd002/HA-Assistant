import React, { useEffect, useRef, useState } from "react";
import { Create, TextField, useForm } from "@refinedev/antd";
import { Button, Checkbox, Form, Input, Space } from "antd";
import { ISignSheet } from "../../interfaces";
import SignaturePad from "react-signature-canvas";
import "./signCanvas.css";
import { useSearchParams } from "react-router";

export const SignSheetCreate = () => {
  const { formProps, saveButtonProps, form} = useForm<ISignSheet>();

  const sigCanvas = useRef<SignaturePad>(null);

  const [searchParams] = useSearchParams();
  searchParams.get('id');
  
  function clear() {
    sigCanvas?.current?.clear();
  }

    function collectSignature () { 
        form.setFieldValue(
            "signature", 
            sigCanvas?.current?.getCanvas().toDataURL('image/png')); 
  }

  function onChange(e: any) {
    let agreed: boolean; 
       if(e.target.checked)
        agreed = true;
       else
        agreed = false;
    form.setFieldValue("confirmation", agreed)
    console.log(agreed)
  }

  form.setFieldValue("work_activity", searchParams.get('wa'))
  form.setFieldValue("ms_revision", Number(searchParams.get('ms')))
  form.setFieldValue("ra_revision", Number(searchParams.get('ra')))

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form 
      {...formProps} layout="vertical"
      form={form}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Surname"
          name="surname"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Trade"
          name="trade"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="confirmation"
          valuePropName=""
          rules={[
            {
                validator: (_, value) => {
                    if(!value)
                        return Promise.reject("You must read the method statement and risk assesmet first!")
                    return Promise.resolve()
                }
            }
          ]}
        >
            <Checkbox 
            defaultChecked={false} 
            onChange={(e) => onChange(e)}/> &nbsp;&nbsp;
            <TextField value={"I confirm that I have read and understand the Method statement and Risk assesment for this work activity"} />
        </Form.Item>
        <Form.Item
          label="Please sign here"
          name="signature"
          rules={[
            { 
                validator: (_, value) => {
                    if(!value)
                        return Promise.reject("Please sign in the box!")
                    return Promise.resolve()
                }
            },
          ]}
        >
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "signatureCanvas",
              }}
              onEnd={() => collectSignature()}
            /><br></br>
            <Button onClick={clear}>Clear</Button>
          
        </Form.Item>
        <Form.Item
          name="work_activity"
          rules={[
            {
              required: false,
            },
          ]}
        ></Form.Item>
         <Form.Item
          name="ms_revision"
          noStyle
        ></Form.Item>
        <Form.Item
          name="ra_revision"
          noStyle
        ></Form.Item>
      </Form>
    </Create>
  );
};
