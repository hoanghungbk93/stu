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
import {HomeDetail , Home, TableList} from "../modules/Home";
import {Users, UserAdd, UserEdit} from "../modules/Users";
import AssignmentIcon from '@material-ui/icons/Assignment';
// import Typography from "views/Typography/Typography.js";
// import Icons from "views/Icons/Icons.js";
// import Maps from "views/Maps/Maps.js";
// import NotificationsPage from "views/Notifications/Notifications.js";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  {
    path: "/admin/table",
    name: "TRANG CHỦ",
    icon: HomeIcon,
    component: TableList,
    isVisible: true,
    submenus: [
      {
        name: 'Yêu cầu xuất kho',
        path: '',
        icon: Person,
        component: TableList
      },
      {
        name: 'Yêu cầu mua hàng',
        path: '',
        icon: Person,
        component: TableList
      },
      {
        name: 'Phiếu nhập kho',
        path: '',
        icon: Person,
        component: TableList
      },
      {
        name: 'Phiếu xuất kho',
        path: '',
        icon: Person,
        component: Home
      },
    ]
  },
  {
    path: "/new",
    name: "TẠO MỚI YÊU CẦU",
    icon: AddCircle,
    component: TableList,
    submenus: [
      {
        name: 'Yêu cầu xuất kho',
        path: '',
        icon: Person,
        component: TableList
      },
      {
        name: 'Yêu cầu mua hàng',
        path: '',
        icon: Person,
        component: TableList
      },
      {
        name: 'Phiếu nhập kho',
        path: '',
        icon: Person,
        component: TableList
      },
      {
        name: 'Phiếu xuất kho',
        path: '',
        icon: Person,
        component: TableList
      },
    ],
    isVisible: true
  },
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
        component: TableList
      },
      {
        name: 'Yêu cầu mua hàng',
        path: '',
        icon: Person,
        component: TableList
      },
      {
        name: 'Phiếu nhập kho',
        path: '',
        icon: Person,
        component: TableList
      },
      {
        name: 'Phiếu xuất kho',
        path: '',
        icon: Person,
        component: TableList
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
    path: '/admin/detail',
    component: AssignmentIcon,
    name: "QUẢN LÍ DỰ ÁN",
    icon: AssignmentIcon,
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
    path: '/admin/detail',
    component: HomeDetail,
    name: "HomeDetail",
    icon: Business,
    isVisible: false
  },
];

export default dashboardRoutes;
