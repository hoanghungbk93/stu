/*eslint-disable*/
import React,{useState, useEffect} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import styles from "../../assets/jss/material-dashboard-react/components/sidebarStyle.js";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const { color, logo, image, logoText, routes, history, isAdmin } = props;
  console.log('history', history)
  console.log('isAdmin', isAdmin)
  const initialMenuList = []
  routes.forEach(element => {
    if(element.submenus) initialMenuList.push(false)
  });
  const [visit, setVisit]= useState(initialMenuList)

  const handleClick = (event, component) => {
    if(event >= visit.length){
      history.push(component)
    } else{
      history.push(component)
      let temp = visit.slice()
      temp[event] = !temp[event]
      setVisit(temp)
    }
  };

  const handleClose = (key) => {
    if(key >= visit.length){

    } else{
    let temp = visit.slice()
    temp[key] = false
    setVisit(temp)
    }
  };
  const handleDrawerToggle = () => {
    let temp = visit.map(e => false)
    setVisit(temp)
  };
  
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        console.log('prop', prop)
        console.log('isAdmin', isAdmin)
        console.log('prop.isVisible && prop.admin === true && !isAdmin', prop.isVisible && prop.admin === true && !isAdmin)
        
        if (!prop.isVisible) return
        if (prop.isVisible && prop.admin === true && !isAdmin) return
        var activePro = " ";
        var listItemClasses;
        if (prop.path === "/upgrade-to-pro") {
          activePro = classes.activePro + " ";
          listItemClasses = classNames({
            [" " + classes[color]]: true
          });
        } else {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.path)
          });
        }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.path)
        });
        return (
          <NavLink
            to={prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
              <ListItem button className={classes.itemLink + listItemClasses} onClick={()=>handleClick(key, prop.path)}>
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                />
              )}
              <ListItemText
                primary={prop.name}
                className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.itemTextRTL]: props.rtlActive
                })}
                disableTypography={true}
              />
            </ListItem>
                <div style={{paddingLeft : 20}}
                  
                >
                   {visit[key] && <List className={classes.list}>
              {
                prop.submenus.map(e => {
                  return(
                  <ListItem button className={classes.itemLink} onClick={()=>handleClose(key)}>
                  <ListItemText primary={e.name} className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.itemTextRTL]: props.rtlActive
                })}
                disableTypography={true}/>
                </ListItem>
                  )
                })
              }
              </List>}
                </div>
            </NavLink>

        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a
        href="http://stu.com.vn"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
        target="_blank"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={()=>{props.handleDrawerToggle()
            handleDrawerToggle()}
          }
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={"left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
