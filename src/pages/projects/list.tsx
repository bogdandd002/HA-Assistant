import {
    DeleteButton,
    EditButton,
    getDefaultSortOrder,
    List,
    ShowButton,
    useTable,
    FilterDropdown,
    SaveButton
  } from "@refinedev/antd";
  import {  HttpError} from "@refinedev/core";
  import { Space, Table, Radio, Form, Input } from "antd";
  import { IProject } from "../../interfaces/index";

  interface ISearch {
    title: string;
  }

  function selectProject(project_name: string, project_id: string) {
        localStorage.setItem("selected_project_name", project_name)
        localStorage.setItem("selected_project_id", project_id)
       // window.dispatchEvent(new Event("storage"));
  }
  
  export const ProjectList = () => {
    const { tableProps, filters, setFilters, sorters, searchFormProps } = useTable<IProject, HttpError, ISearch>({
      sorters: {
        initial: [
          {
            field: "project_nr",
            order: "desc",
          },
        ],
        mode: "server"
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
        mode: "server",
      },
      liveMode: "auto",
      meta: { 
        populate: "*",
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
         <Form {...searchFormProps} layout="inline">
        <Form.Item name="title">
          <Input placeholder="Search by project name" onChange={(e) => {
            setFilters([
              {
                field: "name",
                operator: "contains",
                value: !!e.currentTarget.value
                  ? e.currentTarget.value
                  : undefined,
              },
            ]);
          }} />
        </Form.Item>
      </Form>
        <Table {...tableProps} 
        rowKey="documentId"
        pagination={{
          ...tableProps.pagination,
          position: ["bottomCenter"],
          size: "small",
        }}>
          <Table.Column dataIndex="project_nr" title={"Project Nr."}
          sorter={{multiple:2}}
          defaultSortOrder={getDefaultSortOrder("project_nr", sorters)}
          />
          <Table.Column 
          dataIndex="name" title={"Name"}
          sorter={{multiple:1}}
          defaultSortOrder={getDefaultSortOrder("name", sorters)}
          render={(text, record) => 
          <a href="" onClick={() => selectProject(record.name, record.documentId)}>{text}</a>}
           />
          <Table.Column dataIndex="address" title={"Address"} />
          <Table.Column dataIndex="start_date" title={"Start Date"} />
          <Table.Column dataIndex="end_date" title={"End Date"} />
          <Table.Column
          dataIndex= "contractors"
          title={"Active Contractors"}
          render={ (_, resource) => Object.keys(resource.contractors).length}
        /> 
          <Table.Column<{ documentId: string }>
            title="Actions"
            dataIndex="actions"
            render={(_, record) => ( 
              <Space>
                <EditButton hideText size="small" recordItemId={record.documentId} />
                <ShowButton hideText size="small" recordItemId={record.documentId} />
                <DeleteButton hideText size="small" recordItemId={record.documentId} />
              </Space>
            )}
          />
        </Table>
      </List>
    );
  };
  