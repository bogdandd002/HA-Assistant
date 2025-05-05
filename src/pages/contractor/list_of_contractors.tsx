import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useModalForm,
  useTable,
} from "@refinedev/antd";
import {
  CanAccess,
  HttpError,
  keys,
  useMany,
  type BaseRecord,
} from "@refinedev/core";
import { Space, Table } from "antd";
import { IContractor, IProject } from "../../interfaces";
import { columnsControl } from "../../tables_columns_selection";

export default function ContractorListDisplay (props: any) {
  const selectedProject = localStorage.getItem("selected_project");
  const project = JSON.parse(selectedProject || "{}");
  const { tableProps, tableQuery, filters, setFilters } = useTable<
    IContractor,
    HttpError
  >({
    meta: {
      populate: "*",
    },
    filters: {
      permanent: [
        {
          field: "projects.documentId",
          operator: "eq",
          value: project.project_id,
        },
      ],
    },
    syncWithLocation: true,
  });

  
  // const { data: categoryData, isLoading: categoryIsLoading } = useMany({
  //   resource: "contact-people",
  //   ids:
  //     tableProps?.dataSource
  //       ?.map((item) => item?.contact_people?.id)
  //       .filter(Boolean) ?? [],
  //   queryOptions: {
  //     enabled: !!tableProps?.dataSource,
  //   },
  // });
  return (
    <List>
      <Table {...tableProps} rowKey="documentId">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column dataIndex="address" title={"Address"} />
        <Table.Column dataIndex="activity" title={"Activity"} />
        <Table.Column
          dataIndex="contact_person"
          title={"Contact Person"}
          render={ (_, resource) => <h2></h2> }
        /> 
         <Table.Column
                  dataIndex="users"
                  title={"Number of alocated users"}
                  hidden={columnsControl.contracor_nr_users}
                  render={(_, resource) => Object.keys(resource.users).length}
                  
                />
          <Table.Column
                    dataIndex="start_on_project"
                    title={"Start on project date"}
                    render={(value) => <DateField value={value} format="DD-MM-YYYY" />}
                  />
        <Table.Column dataIndex="completed_project" title={"Has completed project"} />
        <Table.Column<{ documentId: string }>
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
      </Table>
    </List>  
  );
}
