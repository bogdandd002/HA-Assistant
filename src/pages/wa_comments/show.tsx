import React from "react";
import { useShow } from "@refinedev/core";
import { MarkdownField, Show, TextField } from "@refinedev/antd";
import { DatePicker, Typography } from "antd";
import moment from "moment";

const { Title } = Typography;

export const WaCommentsShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;

    const record = data?.data;

    return <Show isLoading={isLoading}>
        <Title level={5}>{"ID"}</Title>
              <TextField value={record?.documentId} />
              <Title level={5}>{"Created on"}</Title>
              <TextField value={moment(record?.createdAt).format('DD-MM-YYYY')}  />
              <Title level={5}>{"at"}</Title>
              <TextField value={moment(record?.createdAt).format('hh:mm')}  />
              <Title level={5}>{"Reason for comment"}</Title>
              <TextField value={record?.wa_comment_type}  />
              <Title level={5}>{"Comments"}</Title>
              <MarkdownField value={record?.general_comment} />

    </Show>;
};
