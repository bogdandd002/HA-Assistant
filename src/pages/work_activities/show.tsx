import React from "react";
import { useShow } from "@refinedev/core";
import {
    Show,
    NumberField,
    TagField,
    TextField,
    DateField,
} from "@refinedev/antd";
import { Button, Descriptions, DescriptionsProps, Tag, Typography } from "antd";
import { API_URL } from "../../constants";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const WorkActivityShow = () => {
    const { query } = useShow({});
    const { data, isLoading } = query;

    const record = data?.data;
    console.log(record)

    const items: DescriptionsProps['items'] = [
        {
          label: 'Title',
          span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 },
          children: record?.title,
        }, 
        {
            label: 'Descrition',
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 },
            children: record?.descrition,
        },
        {
            label: 'Start date',
            span: { xl: 1, xxl: 2 },
            children: record?.start_date,
        }, 
        {
          label: 'Duration',
          span: { xl: 1, xxl: 2 },
          children: record?.duration + duration( record?.duration ) 
        },
        {
          label: 'Approval status',
          span: { xl: 2, xxl: 2},
          children: (<Tag color={ tagColor(record?.approval_status) }>
            {record?.approval_status}
            </Tag>
            ),
        },
        {
            label: 'Risk assessment title',
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 },
            children: record?.ra_title,
          }, 
          {
              label: 'Risk assessment descrition',
              span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 },
              children: record?.ra_descrition,
          },
          {
            label: 'Revision number',
            span: { xl: 1, xxl: 1 },
            children: record?.ra_revision
          },
          {
              label: 'Revision date',
              span: { xl: 1, xxl: 1 },
              children: record?.ra_revision_date,
          }, 
          {
            label: 'Approval status',
            span: { xl: 2, xxl: 2 },
            children: (<Tag color={ tagColor(record?.ra_approval_status) }>
              {record?.ra_approval_status}
              </Tag>
              ),
          },
          {
            label: 'Preview risk assessment',
            span: { xl: 2, xxl: 2 },
            children: (<Button
               icon={<EyeOutlined />}  size={'large'}>Preview</Button>
              ),
          },
          {
            label: 'Download risk assessment file',
            span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
            children: <Button
            type="primary" icon={<DownloadOutlined />} size={'large'}
             onClick={() => {
                downloadFile(API_URL+ record?.ra_file_url)
            }}>Download</Button>,
           },
          
      ];
    
    async function downloadFile(
        imageSrc: string,
        nameOfFileDownloaded = imageSrc.replace(/^.*[\\/]/, '')
      ) {
        const response = await fetch(imageSrc)
        const blobImage = await response.blob()
        const href = URL.createObjectURL(blobImage)
    
        const anchorElement = document.createElement('a')
        anchorElement.href = href
        anchorElement.download = nameOfFileDownloaded
    
        document.body.appendChild(anchorElement)
        anchorElement.click()
    
        document.body.removeChild(anchorElement)
        window.URL.revokeObjectURL(href)
      }

      function duration(record: any){
        if(record == 1){
            return " day"
        }
        return " days"
    }

    function tagColor(record: any){
        switch(record){
            case "approved":
               return "success";
            case "rejected":
                return "error";
            default:
                return "warning"
        }
    }

    return (
        <Show isLoading={isLoading}>
            <Descriptions
    title="Work activity information"
    bordered
    column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
    items={items}
  />
            <Title level={5}>Title</Title> <TextField value={record?.title} />
            <Title level={5}>Description</Title>
            <TextField value={record?.description} />
            <Title level={5}>Start Date</Title>
            <DateField value={record?.start_date} />
            <Title level={5}>Duration</Title>
            <NumberField value={record?.duration ?? ""} />
            <Title level={5}>Approval Status</Title>
            <TextField value={record?.approval_status} />
            <Title level={5}>Download Risk Assessment for this work activity</Title>
        </Show>
    );
};
