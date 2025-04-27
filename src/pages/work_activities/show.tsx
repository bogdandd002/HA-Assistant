import { useState } from "react";
import { HttpError, useGetIdentity, useGo, useShow } from "@refinedev/core";
import { DateField, Show, useTable } from "@refinedev/antd";
import {
  Button,
  Descriptions,
  DescriptionsProps,
  Divider,
  Form,
  Input,
  List,
  Space,
  Table,
  Tabs,
  TabsProps,
  Tag,
} from "antd";
import { API_URL } from "../../constants";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { ISignSheet } from "../../interfaces";

interface ISearch {
  title: string;
}

export const WorkActivityShow = () => {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  const { tableProps, setFilters, searchFormProps } = useTable<
    ISignSheet,
    HttpError,
    ISearch
  >({
    resource: "sign-sheets",
    sorters: {
      initial: [
        {
          field: "name",
          order: "asc",
        },
      ],
      mode: "server",
    },
    onSearch: (values) => {
      return [
        {
          field: "name",
          operator: "contains",
          value: values.title,
        },
      ];
    },
    filters: {
      permanent: [
        {
          field: "work_activity.documentId",
          operator: "eq",
          value: record?.documentId,
        },
      ],
      mode: "server",
    },
    liveMode: "auto",
    meta: {
      populate: ["work_activity"],
    },

    syncWithLocation: true,
  });

  const go = useGo();

  let confirm_ra_read = false;
  let confirm_ms_read = false;
  const [isEnabled, setIsEnabled] = useState(false);

  const itemsTab1: DescriptionsProps["items"] = [
    {
      label: "Title",
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 },
      children: record?.title,
    },
    {
      label: "Descrition",
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 },
      children: record?.descrition,
    },
    {
      label: "Start date",
      span: { xl: 1, xxl: 2 },
      children: record?.start_date,
    },
    {
      label: "Duration",
      span: { xl: 1, xxl: 2 },
      children: record?.duration + duration(record?.duration),
    },
    {
      label: "Approval status",
      span: { xl: 2, xxl: 2 },
      children: (
        <Tag
          color={tagColor(record?.approval_status)}
          bordered={false}
          style={{ fontSize: "large" }}
        >
          {record?.approval_status}
        </Tag>
      ),
    },
    {
      label: "Read and sign",
      span: { xl: 2, xxl: 2 },
      children: (
        <>
          <Button
            icon={<EyeOutlined />}
            size={"large"}
            type="primary"
            onClick={() => previewFile(record?.ra_file_url, "ra")}
          >
            Read risk assesment
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            icon={<EyeOutlined />}
            size={"large"}
            type="primary"
            onClick={() => previewFile(record?.ms_file_url, "ms")}
          >
            Read method statement{" "}
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            icon={<EyeOutlined />}
            disabled={!isEnabled}
            size={"large"}
            type="primary"
            onClick={() => {
              go({
                to: {
                  resource: "sign-sheets",
                  action: "create",
                },
                query: {
                  wa: record?.documentId,
                  ra: record?.ra_revision,
                  ms: record?.ms_revision,
                },
                type: "push",
              });
            }}
          >
            Consent and sign{" "}
          </Button>
        </>
      ),
    },
  ];

  const itemsTab2: DescriptionsProps["items"] = [
    {
      label: "Risk assessment title",
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 },
      children: record?.ra_title,
    },
    {
      label: "Risk assessment descrition",
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 },
      children: record?.ra_descrition,
    },
    {
      label: "Revision number",
      span: { xl: 1, xxl: 1 },
      children: record?.ra_revision,
    },
    {
      label: "Revision date",
      span: { xl: 1, xxl: 1 },
      children: record?.ra_revision_date,
    },
    {
      label: "Approval status",
      span: { xl: 2, xxl: 2 },
      children: (
        <Tag
          color={tagColor(record?.ra_approval_status)}
          bordered={false}
          style={{ fontSize: "large" }}
        >
          <> {record?.ra_approval_status} </>
        </Tag>
      ),
    },
    {
      label: "Preview risk assessment",
      span: { xl: 2, xxl: 2 },
      children: (
        <Button
          icon={<EyeOutlined />}
          size={"large"}
          type="primary"
          onClick={() => {
            previewFile(record?.ra_file_url, "ra");
          }}
        >
          Preview
        </Button>
      ),
    },
    {
      label: "Download risk assessment file",
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
      children: (
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          size={"large"}
          onClick={() => {
            downloadFile(API_URL + record?.ra_file_url);
          }}
        >
          Download
        </Button>
      ),
    },
  ];

  const itemsTab3: DescriptionsProps["items"] = [
    {
      label: "Method statement title",
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 },
      children: record?.ms_title,
    },
    {
      label: "Method statement descrition",
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 },
      children: record?.ma_descrition,
    },
    {
      label: "Revision number",
      span: { xl: 1, xxl: 1 },
      children: record?.ra_revision,
    },
    {
      label: "Revision date",
      span: { xl: 1, xxl: 1 },
      children: record?.ra_revision_date,
    },
    {
      label: "Approval status",
      span: { xl: 2, xxl: 2 },
      children: (
        <Tag
          color={tagColor(record?.ra_approval_status)}
          bordered={false}
          style={{ fontSize: "large" }}
        >
          <> {record?.ra_approval_status} </>
        </Tag>
      ),
    },
    {
      label: "Preview method statement",
      span: { xl: 2, xxl: 2 },
      children: (
        <Button
          icon={<EyeOutlined />}
          size={"large"}
          type="primary"
          onClick={() => previewFile(record?.ms_file_url, "ms")}
        >
          Preview
        </Button>
      ),
    },
    {
      label: "Download method statement file",
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
      children: (
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          size={"large"}
          onClick={() => {
            downloadFile(API_URL + record?.ms_file_url);
          }}
        >
          Download
        </Button>
      ),
    },
  ];

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Work activity ",
      children: (
        <Descriptions
          title="Work activity general information"
          bordered
          column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
          items={itemsTab1}
        />
      ),
    },
    {
      key: "2",
      label: "Risk assestment",
      children: (
        <Descriptions
          title="Risk assessment asociated with this work activity"
          bordered
          column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
          items={itemsTab2}
        />
      ),
    },
    {
      key: "3",
      label: "Method statement",
      children: (
        <Descriptions
          title="Method statement asociated with this work activity"
          bordered
          column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
          items={itemsTab3}
        />
      ),
    },
  ];

  async function downloadFile(
    imageSrc: string,
    nameOfFileDownloaded = imageSrc.replace(/^.*[\\/]/, "")
  ) {
    const response = await fetch(imageSrc);
    const blobImage = await response.blob();
    const href = URL.createObjectURL(blobImage);

    const anchorElement = document.createElement("a");
    anchorElement.href = href;
    anchorElement.download = nameOfFileDownloaded;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  }

  function duration(record: number) {
    if (record == 1) {
      return " day";
    }
    return " days";
  }

  function tagColor(record: string) {
    switch (record) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      default:
        return "warning";
    }
  }

  function previewFile(record: string, document: string) {
    if (document === "ra") confirm_ra_read = true;
    if (document === "ms") confirm_ms_read = true;
    const link = API_URL + record;
    window.open(link, "_blank");
    activateSignButton();
  }

  const activateSignButton = () => {
    if (confirm_ra_read && confirm_ms_read) setIsEnabled(true);
  };

  return (
    <Show isLoading={isLoading} title="Work activity general information">
      <Space>
        <Tabs defaultActiveKey="1" items={tabItems} size="large" type="card" />
      </Space>
      <Divider style={{ fontSize: 20, borderColor: "#7cb305" }}>
        List of operatives that have signed method statement and risk assesment
        for this activity
      </Divider>
      <List>
        <Form {...searchFormProps} layout="inline">
          <Form.Item name="name">
            <Input
              placeholder="Search by name"
              onChange={(e) => {
                setFilters([
                  {
                    field: "name",
                    operator: "contains",
                    value: e.currentTarget.value
                      ? e.currentTarget.value
                      : undefined,
                  },
                ]);
              }}
            />
          </Form.Item>
        </Form>
        <Table {...tableProps} rowKey="id">
          <Table.Column title="Name" dataIndex={"name"} />
          <Table.Column title="Surame" dataIndex={"surname"} />
          <Table.Column title="Trade" dataIndex={"trade"} />
          <Table.Column title="Last signed Ms rev" dataIndex={"ms_revision"} />
          <Table.Column title="Last signed Ra rev" dataIndex={"ra_revision"} />
          <Table.Column
            title="Signed on"
            dataIndex={"createdAt"}
            render={(value) => (
              <DateField value={value} format="DD-MM-YYYY HH:MM" />
            )}
          />
        </Table>
      </List>
    </Show>
  );
};
