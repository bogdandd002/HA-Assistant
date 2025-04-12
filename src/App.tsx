import { Authenticated, CanAccess, CanParams, CanReturnType, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import * as Icons from "@ant-design/icons";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { DataProvider } from "@refinedev/strapi-v4";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { authProvider, axiosInstance } from "./authProvider";
import { Header } from "./components/header";
import { API_URL } from "./constants";
import { ColorModeContextProvider } from "./contexts/color-mode";

 import {
  ContractorCreate,
  ContractorEdit,
  ContractorList,
  ContractorShow,
 } from "./pages/contractor";

import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import { newEnforcer } from "casbin";
import { adapter, model } from "./casbin/accessControl";
import { accessControlProvider } from "./providers/accessControlProvider";
import { ProjectCreate, ProjectEdit, ProjectList, ProjectShow } from "./pages/projects";
import { WorkActivityCreate, WorkActivityEdit, WorkActivityList, WorkActivityShow } from "./pages/work_activities";
import { AddUserEdit, AddUserList, AddUserShow, UserCreate } from "./pages/add_users";

const {
  UserAddOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  SlidersOutlined,
  FileAddOutlined,
} = Icons;

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                authProvider={authProvider}
                accessControlProvider={accessControlProvider}
                dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                resources={[// {
                //   name: "select_project", list: () => null
                // },
                {
                  name: "projects",
                  list: "/projects",
                  create: "/projects/create",
                  edit: "/projects/edit/:id",
                  show: "/projects/show/:id",
                  icon: <TeamOutlined />,
                  meta: {
                    label: "Select project"
                  }
                }, {
                  name: "contractors",
                  list: "/contractors",
                  create: "/contractors/create",
                  edit: "/contractors/edit/:id",
                  show: "/contractors/show/:id",
                  icon: <TeamOutlined />,
                  meta: {
                    label: "Contractors"
                  }
                }, {
                  name: "contact-people",
                  list: "/contact-people",
                  create: "/contact-people/create",
                  edit: "/contact-people/edit/:id",
                  show: "/contact-people/show/:id",
                  meta: {
                    canDelete: true,
                  },
                }, {
                  name: "work-activities",
                  list: "/work-activities",
                  create: "/work-activities/create",
                  edit: "/work-activities/edit/:id",
                  show: "/work-activities/show/:id"
                }, {
                  name: "users",
                  list: "/add-user",
                  create: "/add-user/create",
                  edit: "/add-user/edit/:id",
                  show: "/add-user/show/:id"
                }]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "k0ry9W-yvpLgr-gKoaAn",
                }}
              >
               <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={Header}
                          Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="projects" />}
                    />
                    <Route path="/projects">
                      <Route index element={<ProjectList />} />
                      <Route path="create" element={<ProjectCreate />} />
                      <Route path="edit/:id" element={<ProjectEdit />} />
                      <Route path="show/:id" element={<ProjectShow />} />
                    </Route>
                    <Route path="/contractors">
                        <Route index element={<ContractorList />} />
                        <Route path="create" element={<ContractorCreate />} />
                        <Route path="edit/:id" element={<ContractorEdit />} />
                        <Route path="show/:id" element={<ContractorShow />} />
                    </Route>
                    <Route path="/contact-people">
                      <Route index element={<CategoryList />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} />
                    </Route>
                    <Route path="/work-activities">
                      <Route index element={<WorkActivityList />} />
                      <Route path="create" element={<WorkActivityCreate />} />
                      <Route path="edit/:id" element={<WorkActivityEdit />} />
                      <Route path="show/:id" element={<WorkActivityShow />} />
                    </Route>
                    <Route path="/add-user">
                      <Route index element={<AddUserList />} />
                      <Route path="create" element={<UserCreate />} />
                      <Route path="edit/:id" element={<AddUserEdit />} />
                      <Route path="show/:id" element={<AddUserShow />} />
                    </Route>
                    
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route
                      path="/login"
                      element={
                        <AuthPage
                          type="login"
                          formProps={{
                            initialValues: {
                              email: "demo@refine.dev",
                              password: "demodemo",
                            },
                          }}
                        />
                      }
                    />
                    <Route
                      path="/register"
                      element={<AuthPage type="register" />}
                    />
                    <Route
                      path="/forgot-password"
                      element={<AuthPage type="forgotPassword" />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
