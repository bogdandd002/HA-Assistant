import { Authenticated, Refine } from "@refinedev/core";
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
import { authProvider, axiosInstance } from "./providers/authProvider";
import { Header } from "./components/header";
import { API_URL } from "./constants/constants";
import { ColorModeContextProvider } from "./contexts/color-mode";

import {
  ContractorCreate,
  ContractorEdit,
  ContractorList,
  ContractorShow,
} from "./pages/contractor";

import { accessControlProvider } from "./providers/accessControlProvider";
import {
  ProjectCreate,
  ProjectEdit,
  ProjectList,
  ProjectShow,
} from "./pages/projects";
import {
  WorkActivityCreate,
  WorkActivityEdit,
  WorkActivityList,
  WorkActivityShow,
} from "./pages/work_activities";
import {
  AddUserEdit,
  AddUserList,
  AddUserShow,
  UserCreate,
} from "./pages/add_users";
import {
  SignSheetCreate,
  SignSheetEdit,
  SignSheetList,
  SignSheetShow,
} from "./pages/sign_sheets";

import { lazy, Suspense } from "react";
import { customDataProvider } from "./providers/dataProvider";
import { WaCommentsCreate, WaCommentsList, WaCommentsShow } from "./pages/wa_comments";



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
                dataProvider={customDataProvider(API_URL + `/api`, axiosInstance)}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                resources={[// {
                //   name: "select_project", list: () => null
                // },
                {
                 name: "dashboard",
                 list: "/dashboard",
                 create: "/dashboard/create",
                 edit: "/dashboard/edit/:id",
                 show: "/dashboard/show/:id",
                 icon: <Icons.DashboardOutlined />,
                 meta:{
                   label: "Dashboard" ,
                 }
               }, {
                  name: "projects",
                  list: "/projects",
                  create: "/projects/create",
                  edit: "/projects/edit/:id",
                  show: "/projects/show/:id",
                  icon: <Icons.ProjectOutlined />,
                  meta: {
                    label: "Projects",
                  },
                }, {
                  name: "contractors",
                  list: "/contractors",
                  create: "/contractors/create",
                  edit: "/contractors/edit/:id",
                  show: "/contractors/show/:id",
                  icon: <Icons.UsergroupAddOutlined />,
                  meta: {
                    label: "Contractors",
                  },
                }, {
                  name: "contact-people",
                  list: "/contact-people",
                  create: "/contact-people/create",
                  edit: "/contact-people/edit/:id",
                  show: "/contact-people/show/:id",
                  icon: <Icons.DiffOutlined />,
                  meta: {
                    canDelete: true,
                  },
                }, {
                  name: "work-activities",
                  list: "/work-activities",
                  create: "/work-activities/create",
                  edit: "/work-activities/edit/:id",
                  show: "/work-activities/show/:id",
                  icon: <Icons.DiffOutlined />
                }, {
                  name: "users",
                  list: "/add-user",
                  create: "/add-user/create",
                  edit: "/add-user/edit/:id",
                  show: "/add-user/show/:id",
                  icon: <Icons.TeamOutlined />,
                  meta: {
                    label: "Users",
                  },
                }, {
                  name: "sign-sheets",
                  list: "/sign-sheets",
                  create: "/sign-sheets/create",
                  edit: "/sign-sheets/edit/:id",
                  show: "/sign-sheets/show/:id",
                  icon: <Icons.FormOutlined />,
                }, {
                  name: "wa-comments",
                  list: "/wa-comments",
                  create: "/wa-comments/create",
                  edit: "/wa-comments/edit/:id",
                  show: "/wa-comments/show/:id"
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
                    <Route path="/sign-sheets">
                      <Route index element={<SignSheetList />} />
                      <Route path="create" element={<SignSheetCreate />} />
                      <Route path="edit/:id" element={<SignSheetEdit />} />
                      <Route path="show/:id" element={<SignSheetShow />} />
                    </Route>
                    <Route path="/wa-comments">
                      <Route index element={<WaCommentsList />} />
                      <Route path="create" element={<WaCommentsCreate />} />
                      <Route path="edit/:id" element={<WaCommentsCreate />} />
                      <Route path="show/:id" element={<WaCommentsShow />} />
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
