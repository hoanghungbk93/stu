/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import History from "@material-ui/icons/History";
import AddCircle from "@material-ui/icons/AddCircle";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Business from "@material-ui/icons/Business";
// core components/views for Admin layout
// import DashboardPage from "views/Dashboard/Dashboard.js";
// import UserProfile from "views/UserProfile/UserProfile.js";
import {Home} from "../modules/Home";
import HomeTable from "../modules/Home/Table"
import HomeDetail from "../modules/Home/Detail"
import HomeAdd from "../modules/Home/New"
// import {HomeAdd, HomeTable, HomeDetail } from "../modules/Home"
import {Users, UserAdd, UserEdit} from "../modules/Users";
import {Projects, ProjectAdd, ProjectEdit} from "../modules/Project";
import {Products, ProductAdd, ProductEdit} from "../modules/Product";
import AssignmentIcon from '@material-ui/icons/Assignment';
// import Typography from "views/Typography/Typography.js";
// import Icons from "views/Icons/Icons.js";
// import Maps from "views/Maps/Maps.js";
// import NotificationsPage from "views/Notifications/Notifications.js";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.js";

const routes = [
  {
    path: "/admin/table",
    name: "TRANG CHỦ",
    icon: HomeIcon,
    component: HomeTable,
    isVisible: true,
    submenus: [
      {
        name: 'Yêu cầu xuất kho',
        path: '',
        icon: Person,
        component: HomeTable
      },
      {
        name: 'Yêu cầu mua hàng',
        path: '',
        icon: Person,
        component: HomeTable
      },
      {
        name: 'Phiếu nhập kho',
        path: '',
        icon: Person,
        component: HomeTable
      },
      {
        name: 'Phiếu xuất kho',
        path: '',
        icon: Person,
        component: Home
      },
    ]
  },
  // {
  //   path: "/admin/addNewRequirement",
  //   name: "TẠO MỚI YÊU CẦU",
  //   icon: AddCircle,
  //   component: HomeTable,
  //   submenus: [
  //     {
  //       name: 'Yêu cầu xuất kho',
  //       path: '',
  //       icon: Person,
  //       component: HomeTable
  //     },
  //     {
  //       name: 'Yêu cầu mua hàng',
  //       path: '',
  //       icon: Person,
  //       component: HomeTable
  //     },
  //     {
  //       name: 'Phiếu nhập kho',
  //       path: '',
  //       icon: Person,
  //       component: HomeTable
  //     },
  //     {
  //       name: 'Phiếu xuất kho',
  //       path: '',
  //       icon: Person,
  //       component: HomeTable
  //     },
  //   ],
  //   isVisible: true
  // },
  {
    path: '/admin/history',
    component: UserAdd,
    name: "LỊCH SỬ",
    icon: History,
    submenus: [
      {
        name: 'Yêu cầu xuất kho',
        path: '',
        icon: Person,
        component: HomeTable
      },
      {
        name: 'Yêu cầu mua hàng',
        path: '',
        icon: Person,
        component: HomeTable
      },
      {
        name: 'Phiếu nhập kho',
        path: '',
        icon: Person,
        component: HomeTable
      },
      {
        name: 'Phiếu xuất kho',
        path: '',
        icon: Person,
        component: HomeTable
      },
    ],
    isVisible: true
  },
  {
    path: '/admin/user',
    component: Users,
    name: "QUẢN LÍ NGƯỜI DÙNG",
    icon: Person,
    isVisible: true
  },
  {
    path: '/admin/addNew',
    component: UserAdd,
    name: "QUẢN LÍ VẬT TƯ",
    icon: Business,
    isVisible: false
  },
  {
    path: '/admin/edit/:id',
    component: UserEdit,
    name: "QUẢN LÍ VẬT TƯ",
    icon: Business,
    isVisible: false
  },
  {
    path: '/admin/project',
    component: Projects,
    name: "QUẢN LÍ DỰ ÁN",
    icon: AssignmentIcon,
    isVisible: true
  },
  {
    path: '/admin/addNewProject',
    component: ProjectAdd,
    name: "QUẢN LÍ VẬT TƯ",
    icon: Business,
    isVisible: false
  },
  {
    path: '/admin/editProject/:id',
    component: ProjectEdit,
    name: "QUẢN LÍ VẬT TƯ",
    icon: Business,
    isVisible: false
  },
  {
    path: '/admin/product',
    component: Products,
    name: "QUẢN LÍ VẬT TƯ",
    icon: AssignmentIcon,
    isVisible: true
  },
  {
    path: '/admin/addNewProduct',
    component: ProductAdd,
    name: "QUẢN LÍ VẬT TƯ",
    icon: Business,
    isVisible: false
  },
  {
    path: '/admin/editProduct/:id',
    component: ProductEdit,
    name: "QUẢN LÍ VẬT TƯ",
    icon: Business,
    isVisible: false
  },
  {
    path: '/admin/editRequirement/:id',
    component: HomeDetail,
    name: "HomeDetail",
    icon: Business,
    isVisible: false
  },
  {
    path: '/admin/addNewRequirement',
    component: HomeAdd,
    name: "HomeDetail",
    icon: Business,
    isVisible: false
  }
];

export default routes;
