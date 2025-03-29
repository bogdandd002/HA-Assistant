import { DateField, MarkdownField, Show, TextField } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Typography } from "antd";
import { IContractor } from "../../interfaces/data/data";

const { Title } = Typography;

export const ProjectShow = () => {
  const { queryResult } = useShow<IContractor>({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  // const { data: categoryData, isLoading: categoryIsLoading } = useOne({
  //   resource: "categories",
  //   id: record?.category?.id || "",
  //   queryOptions: {
  //     enabled: !!record,
  //   },
  // });

  return (
    <Show
    title="Contractor information" 
    isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.documentId} />
      <Title level={5}>{"Name"}</Title>
      <TextField value={record?.name} />
      <Title level={5}>{"Activity"}</Title>
      <MarkdownField value={record?.activity} />
    </Show>
  );
};
