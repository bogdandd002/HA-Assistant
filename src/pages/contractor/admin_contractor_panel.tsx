import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
 
  useTable,
} from "@refinedev/antd";
import {
  
  HttpError,
  
} from "@refinedev/core";
import { Space, Table } from "antd";
import { IContractor } from "../../interfaces";
import { useProjectDetails } from "../../store/app_data";


export default function AdminListDisplay (props: any) {

  const { tableProps, tableQuery, filters, setFilters } = useTable<
    IContractor,
    HttpError
  >({
    meta: {
      populate: "*",
    },
    syncWithLocation: true,
  });

  
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
                  hidden={false}
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
