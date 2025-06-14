import {
  DateField,
  DeleteButton,
  EditButton,
  getDefaultSortOrder,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { IWorkActivity } from "../../interfaces";
import { CrudFilter, HttpError, Link } from "@refinedev/core";
import { Form, Input, Space, Table, Tag } from "antd";
import { useProjectDetails, useSelectColumns } from "../../store/app_data";
import useGetUserIdentity from "../../store/user_data";
import { useShallow } from "zustand/shallow";
import moment, { now } from "moment";

interface ISearch {
  title: string;
}


export const WorkActivityListDisplay = () => {
  const selectedProject = useProjectDetails.getState().project
  const colState = useSelectColumns.getState().columnsControl;
  const user = useGetUserIdentity(useShallow((state) => state?.user));

  let permanent: CrudFilter[] = [];
  let field = "contractor.documentId";

  // Admin can see all work activities
    if (user.user_role === "Admin") {
      
      permanent = [];
    } 

    // MCS and MC can see WA for all contractors that work for them 
    if(user.user_role === "Main_contractor_super" || user.user_role === "Main_contractor") {

      field = "contractor.work_for.documentId"
    }
    // If a project is selected filter by contractor and project else just by contractor
      if(selectedProject.project_id){
        permanent = [
        {
          field: field,
          operator: "eq",
          value: user.contractor_documentId,
        },
        {
          field: "project.documentId",
          operator: "eq",
          value: selectedProject.project_id,
        }
      ];
      } else {
        permanent = [
        {
          field: field,
          operator: "eq",
          value: user.contractor_documentId,
        },
      ];
      } 
      
  const { tableProps, setFilters, sorters, searchFormProps } = useTable<
    IWorkActivity,
    HttpError,
    ISearch
  >({
    sorters: {
      initial: [
        {
          field: "title",
          order: "desc",
        },
      ],
      mode: "server",
    },
    onSearch: (values) => {
      return [
        {
          field: "title",
          operator: "contains",
          value: values.title,
        },
      ];
    },
    filters: {
      permanent: permanent,
    },
    liveMode: "auto",
    meta: {
      populate: "*",
    },

    syncWithLocation: true,
  });

  const duration = (start_date: Date) => {
    let color = "green"
    const today = moment();
    const daysDiference = today.diff(start_date, "days");
    if ( daysDiference > 60 && daysDiference < 90 ){
    color = "yellow" 
    }
    if ( daysDiference > 90) {
    color = "volcano"
    }
return <Tag color={color}> {daysDiference + " days ago"} </Tag>
  }

const status = (tag: string) => {
  let color =  tag === " pending review" ? 'green':'orange';
  if (tag === "require review"){
    color = 'magenta';
  }
  return <Tag color={color} key={tag}>
    {tag.toUpperCase()}
  </Tag>
}

  return (
    <List>
      <Form {...searchFormProps} layout="inline">
        <Form.Item name="title">
          <Input
            placeholder="Search by activity"
            onChange={(e) => {
              setFilters([
                {
                  field: "title",
                  operator: "contains",
                  // eslint-disable-next-line no-extra-boolean-cast
                  value: !!e.currentTarget.value
                    ? e.currentTarget.value
                    : undefined,
                },
              ]);
            }}
          />
        </Form.Item>
      </Form>
      <Table
        {...tableProps}
        rowKey="documentId"
        pagination={{
          ...tableProps.pagination,
          position: ["bottomCenter"],
          size: "small",
        }}
      >
        <Table.Column
          dataIndex={"created_by_user"}
          title={"Created by"}
          hidden={colState.wa_name}
        />
        <Table.Column
          dataIndex={["contractor", "name"]}
          title={"Contractor"}
          hidden={colState.wa_contractor}
        />
        <Table.Column
          dataIndex={"updatedAt"}
          title={"Last updated"}
          render={(value) => <DateField value={value} format="DD-MM-YYYY" />}
        />
        <Table.Column
          dataIndex="title"
          title={"Title"}
          render={(text, record) => (
            <Link
              go={{
                to: {
                  resource: "work-activities",
                  action: "show",
                  id: record.documentId,
                },
              }}
            >
              {record.title}
            </Link>
          )}
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("title", sorters)}
        />
        <Table.Column
          dataIndex="start_date"
          title={"Start Date"}
          sorter={{ multiple: 1 }}
          defaultSortOrder={getDefaultSortOrder("start_date", sorters)}
          render={(value) => <DateField value={value} format="DD-MM-YYYY" />}
        />
        <Table.Column
          title={"RA last rev"}
          render={(_, resource) => <>{duration(resource.ra_revision_date)}</>}
        />
        <Table.Column 
        title={"MS last rev"}
        render={(_, resource) => <>{duration(resource.ms_revision_date)}</>}
         />
        <Table.Column 
        dataIndex="approval_status" 
        title={"Status"}
        render={(value) => status(value)}
         />
        <Table.Column
          dataIndex="approval_status"
          title={"Require review"}
          hidden={colState.wa_rev_exp}
        />
        <Table.Column<{
          documentId: string;
          ra_file_id: string;
          ms_file_id: string;
        }>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton
                hideText
                size="small"
                recordItemId={record.documentId}
              />
              <ShowButton
                hideText
                size="small"
                recordItemId={record.documentId}
              />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.documentId}
              />
            </Space>
          )}
        />
        <Table.Column dataIndex="approval_status" title={"History timeline"} />
      </Table>
    </List>
  );
};
