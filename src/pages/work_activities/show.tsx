import React from "react";
import { useShow } from "@refinedev/core";
import {
    Show,
    NumberField,
    TagField,
    TextField,
    DateField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const WorkActivityShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Title</Title>
            <TextField value={record?.title} />
            <Title level={5}>Description</Title>
            <TextField value={record?.description} />
            <Title level={5}>Start Date</Title>
            <DateField value={record?.start_date} />
            <Title level={5}>Duration</Title>
            <NumberField value={record?.duration ?? ""} />
            <Title level={5}>Approval Status</Title>
            <TextField value={record?.approval_status} />
            <Title level={5}>Created At</Title>
            <DateField value={record?.createdAt} />
            <Title level={5}>Updated At</Title>
            <DateField value={record?.updatedAt} />
            <Title level={5}>Published At</Title>
            <DateField value={record?.publishedAt} />
        </Show>
    );
};
