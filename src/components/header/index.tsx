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
import  useGetUserIdentity  from "../../store/user_data"
import { shallow } from "zustand/shallow";
import useSetProject from "../../store/app_data";

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
  const { mode, setMode } = useContext(ColorModeContext);
  const project = useSetProject((state: any) => state.project)
  const [selectedProject, setSelectedProject] = useState("");
  const  setUserState  = useGetUserIdentity((state: any) => state.setUserState)
  setUserState(useGetIdentity<IUser>())
  const user  = useGetUserIdentity((state: any) => state.user)
  
localStorage.setItem('user', JSON.stringify(user))
  useEffect(() => { 
    localStorage.setItem('user', JSON.stringify(user));
    const project = localStorage.getItem('selected_project_name');  
    
    if(project){
      setSelectedProject(project)
    }
  }, [selectedProject, user])

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
      <Space direction="horizontal" style={{width: '70%', justifyContent: 'left'}}>
       {DisplayProject(selectedProject)}
      </Space>
      <Space direction="horizontal" style={{width: '30%', justifyContent: 'right'}}>
        
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
