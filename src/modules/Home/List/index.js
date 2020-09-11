import React, {useEffect, useState, useRef} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "../../../components/Navbars/Navbar.js";
import Footer from "../../../components/Footer/Footer.js";
import Sidebar from "../../../components/Sidebar/Sidebar.js";
import PrivateRoute from "../../../components/PrivateRoute";
// import FixedPlugin from "../../components/FixedPlugin/FixedPlugin.js";

import routes from "../../../app/Route.js";

import styles from "../../../assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "../../../assets/img/sidebar-2.jpg";
import logo from "../../../assets/img/stuLogo.png";
import checkSinginHOC from '../../../components/CheckSinginHOC'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux'
import { findRenderedDOMComponentWithTag } from "react-dom/test-utils";
let ps;
// console.log('routes', routes)
const switchRoutes = (
  <Switch>
    {routes.map((prop, index) => {
        return (
          <Route
            path={prop.path}
            component={prop.component}
            key={index}
          />
        );
      }
    )}
    <Redirect from="/admin" to="/admin/table/1" />
  </Switch>
);
// function useInterval(callback, delay) {
//   const savedCallback = useRef();

//   useEffect(() => {
//     savedCallback.current = callback;
//   });

//   useEffect(() => {
//     function tick() {
//       savedCallback.current;
//     }

//     let id = setInterval(tick, delay);
//     return () => clearInterval(id);
//   }, [delay]);
// }
const useStyles = makeStyles(styles);
function Admin(props) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  const {authen} = props
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [totalNoti, setTotalNoti] = useState(0)
  const [first, setFirst] = useState(false)
  const[listNoti, setListNoti] = useState([])
  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  useEffect(()=>{
    let count = 0;
    if(!first){
      filterListNotification()
      setFirst(true)
    }
    
    const timerId = setInterval(()=>{
      filterListNotification()
      // toast('hello')
      // setTotalNoti(count++)
    }, 5000)
    return ()=>{clearInterval(timerId)}
  },[listNoti])
  
  function filterListNotification(){
    const apiLink = `https://api.stu.vn/api/stutb/getbyuserid?_userid=${authen.userInfo.id}`
    try {
  
      fetch(apiLink).then((response) => {
        return response.json();
      }).then((myJson) => {
        const temp = myJson.filter(a => a.tt_tb === 'unread') ? myJson.filter(a => a.tt_tb === 'unread') : []
          myJson.map(e => {
            if(listNoti.findIndex(el => el.id_tb === e.id_tb) === -1 && e.tt_tb === 'unread'){
              toast(e.noi_dung)
            }
          })
          setListNoti(myJson.length > 0 ? myJson.sort(function(a, b){
            var x = b.tt_tb.toLowerCase();
            var y = a.tt_tb.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
          }) : [])
          setTotalNoti(temp.length)        
      }).catch(
        err => {
          
          console.log('errr', err)
        }
      )
      // if(data[0].sta)
      // dispatch(setLoading(true))
    } catch (err) {
      
      console.log('err', err)
    }
  
  }
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"STU"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        
        {...props}
        isAdmin={authen.userInfo.loai === 'admin'}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...props}
          totalNoti={totalNoti}
          listNoti={listNoti}
          authen={authen}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{routes && switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{routes && switchRoutes}</div>
        )}
        {/* {getRoute() ? <Footer /> : null} */}
        {/* <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        /> */}
        <ToastContainer limit={2000}/>
      </div>
    </div>
  );
}
const mapStateToProps = state => ({
  authen: state.authen,
})


export default connect(
  mapStateToProps,
  null
)(Admin)
