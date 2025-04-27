import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetIdentity } from "@refinedev/core";
import {
  Layout as AntdLayout,
  Avatar,
  Button,
  Space,
  Switch,
  theme,
  Typography,
} from "antd";
import React, { useContext, useEffect} from "react";
import { ColorModeContext } from "../../contexts/color-mode";
import useGetUserIdentity from "../../store/user_data";
import {  useShallow } from "zustand/shallow";

import useProjectDetails from "../../store/app_data";
import { UserDetails } from "../../interfaces";
import { useNavigate } from "react-router";

const { Text } = Typography;
const { Title } = Typography;
const { useToken } = theme;

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { token } = useToken();
  useGetIdentity<UserDetails>();
  const navigate = useNavigate();
  const { mode, setMode } = useContext(ColorModeContext);
  const selectedProject = useProjectDetails((state) => state?.project);
  const user = useGetUserIdentity(useShallow((state) => state?.user));
  let selectedProjectName = localStorage.getItem("selected_project");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    selectedProjectName = localStorage.getItem("selected_project");
  }, [selectedProject]);

  function DisplayProject() {
    const displayName = JSON.parse(selectedProjectName || '{}');
    if (displayName.project_name) {
      return <><Title level={4} type="secondary">
        You are in project: {displayName.project_number} - {displayName.project_name}
      </Title>
      <Button type="primary" onClick={()=> navigate("projects") }>Change project</Button></>;
    }
    return  <Button type="primary" size="large" onClick={
      () => navigate("projects")
    }>Select a project</Button>
  }

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  return (
    <AntdLayout.Header style={headerStyles}>
      <Space
        direction="horizontal"
        style={{ width: "70%", justifyContent: "left" }}
      >
        {DisplayProject()}
      </Space>
      <Space
        direction="horizontal"
        style={{ width: "30%", justifyContent: "right" }}
      >
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
          defaultChecked={mode === "dark"}
        />
        <Space style={{ marginLeft: "8px" }} size="middle">
          {user?.username && <Text strong>{user.username}</Text>}
          {user?.user_role && <Text strong>{user.user_role}</Text>}
          {/* {user?.avatar && <Avatar src={user?.avatar} alt={user?.username} />} */}
        </Space>
      </Space>
    </AntdLayout.Header>
  );
};
