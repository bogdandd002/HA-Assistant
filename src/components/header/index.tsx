import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetIdentity } from "@refinedev/core";
import {
  Layout as AntdLayout,
  Avatar,
  Space,
  Switch,
  theme,
  Typography,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { ColorModeContext } from "../../contexts/color-mode";
import { IUser } from "../../interfaces";

const { Text } = Typography;
const { useToken } = theme;

// window.addEventListener('storage', () => {
//   console.log("Change to local storage!");
//   // ...
// })

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { token } = useToken();
  const { data: user } = useGetIdentity<IUser>();
  const { mode, setMode } = useContext(ColorModeContext);
  const [selected_project, setSelectedProject] = useState("");
  useEffect(() => { 
    const project = localStorage.getItem('selected_project_name');   
    if(project){
      setSelectedProject(project)
    }
  }, [selected_project])

  function DisplayProject(project:string){
    if (project){
      return <h2>You are in project: {project}</h2>
    }
    return <h2> Please select a project</h2>
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
      <Space direction="horizontal" style={{width: '80%', justifyContent: 'left'}}>
       {DisplayProject(selected_project)}
      </Space>
      <Space direction="horizontal" style={{width: '20%', justifyContent: 'right'}}>
        
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
          defaultChecked={mode === "dark"}
        />
        <Space style={{ marginLeft: "8px" }} size="middle">
          {user?.username && <Text strong>{user.username}</Text>}
          {user?.user_role && <Text strong>{user.user_role}</Text>}
          {user?.avatar && <Avatar src={user?.avatar} alt={user?.username} />}
        </Space>
      </Space>
    </AntdLayout.Header>
  );
};
