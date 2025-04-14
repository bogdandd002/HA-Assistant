import React from "react";
import { useShow } from "@refinedev/core";
import {
    Show,
    NumberField,
    TagField,
    TextField,
    DateField,
} from "@refinedev/antd";
import { Button, Descriptions, DescriptionsProps, Tabs, TabsProps, Tag, Typography } from "antd";
import { API_URL } from "../../constants";
import { DownloadOutlined, EyeOutlined, FontSizeOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const WorkActivityShow = () => {
    const { query } = useShow({});
    const { data, isLoading } = query;

    const record = data?.data;
    // console.log(record) 

    const itemsTab1: DescriptionsProps['items'] = [
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
          children: (<Tag color={ tagColor(record?.approval_status) }
          bordered={false} style={{ fontSize:'large' }}>
            {record?.approval_status}
            </Tag>
            ),
        },
      ];

    const itemsTab2: DescriptionsProps['items'] = [
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
        children: (<Tag color={ tagColor(record?.ra_approval_status) }
         bordered={false} style={{ fontSize:'large' }}
        >
         <> {record?.ra_approval_status} </> 
          </Tag>
          ),
      },
      {
        label: 'Preview risk assessment',
        span: { xl: 2, xxl: 2 },
        children: (<Button
           icon={<EyeOutlined />}  
           size={'large'} 
           type="primary"
           onClick={ () => previewFile(record?.ra_file_url) }>Preview</Button>
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
    ]

    const itemsTab3: DescriptionsProps['items'] = [
      {
        label: 'Method statement title',
        span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 },
        children: record?.ms_title,
      }, 
      {
          label: 'Method statement descrition',
          span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 },
          children: record?.ma_descrition,
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
        children: (<Tag color={ tagColor(record?.ra_approval_status) }
         bordered={false} style={{ fontSize:'large' }}
        >
         <> {record?.ra_approval_status} </> 
          </Tag>
          ),
      },
      {
        label: 'Preview method statement',
        span: { xl: 2, xxl: 2 },
        children: (<Button
           icon={<EyeOutlined />}  
           size={'large'} 
           type="primary"
           onClick={ () => previewFile(record?.ra_file_url) }>Preview</Button>
          ),
      },
      {
        label: 'Download method statement file',
        span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
        children: <Button
        type="primary" icon={<DownloadOutlined />} size={'large'}
         onClick={() => {
            downloadFile(API_URL+ record?.ra_file_url)
        }}>Download</Button>,
       },
    ]

    const tabItems: TabsProps['items'] = [
      {
        key: '1',
        label: 'Work activity ',
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
        key: '2',
        label: 'Risk assestment',
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
        key: '3',
        label: 'Method statement',
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

    function previewFile( record: any){
      const link = API_URL + record;
       window.open(link, "_blank");
    }

    return (
        <Show isLoading={isLoading} title='Work activity general information'>
          <Tabs
           defaultActiveKey="1"
           items={tabItems} 
           size="large" 
           type="card" 
           />
        </Show>
    );
};
