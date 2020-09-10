import React, {useRef, useEffect} from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "../CustomInput/CustomInput.js";
import Button from "../CustomButtons/Button.js";
import {logout} from '../../modules/Authen/reducer'
import styles from "../../assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { InfiniteLoader, List,  } from 'react-virtualized';
const useStyles = makeStyles(styles);
function useOutsideAlerter(ref, setOpenNotification) {
  useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            setOpenNotification(null)
          }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [ref]);
}
function AdminNavbarLinks(props) {
  const {logout, totalNoti, listNoti, setListNoti, authen} = props
  const history = useHistory()
  const wrapperRef = useRef(null);
    
  // console.log('AdminNavbarLinks', history)
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  useOutsideAlerter(wrapperRef, setOpenNotification);
  const [openProfile, setOpenProfile] = React.useState(null);
  // const [listNoti, setListNoti] = useState([])
  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = (index) => {
    setOpenNotification(null);
    try {
      const params = {
        "id_tb":listNoti[index].id_tb,
          "id_yc": listNoti[index].id_yc,
          "ma_yc": listNoti[index].ma_yc,
          "noi_dung": listNoti[index].noi_dung,
          "tt_tb": "readed",
          "userid": listNoti[index].userid,
      }
      fetch(`https://api.stu.vn/api/stutb/updatetb`, {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
          "Content-Type": 'application/json'
        },
      }).then((response) => {
        console.log('responseaa', response)
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      }).then((myJson) => {
        console.log('myJson', myJson)
        
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
    if(authen.userInfo.loai === 'Trưởng phòng' || authen.userInfo.loai === 'admin'){
      history.push(`/admin/editRequirement/${listNoti[index].ma_yc}`,)
    }
    else{
      history.push(`/admin/detailRequirement/${listNoti[index].ma_yc}`)
    }
  };
  const handleClickProfile = event => {
    setOpenNotification(null);
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const handleLogout = () => {
    logout(history);
  };
  function loadMoreRows ({ startIndex, stopIndex }) {
    // return fetch(`path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`)
    //   .then(response => {
    //     // Store response data in list...
    //   })
    console.log('hihi')
    // let temp = listNoti.slice()
    // temp.concat(['Hung','HUNGj'])
    // setListNoti(temp)
  }
  function rowRenderer({ key, index, style}){
    return(
      <MenuItem
      onClick={() => handleCloseNotification(index)}
      className={classes.dropdownItem}
      style={{backgroundColor: listNoti[index].tt_tb !== 'unread' ? 
      'grey' : 'red', borderBottomWidth: '2', borderBottomColor : 'white',
      marginBottom: 2
      }}
      
    >
      {listNoti[index].noi_dung + '-' +listNoti[index].ma_yc}
    </MenuItem>
    )
  }
  const isRowLoaded = ({index}) => index < listNoti.length;
  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}
      
    >
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />
          {totalNoti > 0 ? <span className={classes.notifications}>{totalNoti} </span> : null}
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              Notification
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
            <div ref={wrapperRef}>
              {listNoti.length > 0 && <Paper>
                {/* <ClickAwayListener onClickAway={handleCloseNotification}> */}
                <InfiniteLoader
                  isRowLoaded={isRowLoaded}
                  loadMoreRows={loadMoreRows}
                  rowCount={listNoti.length}
                >
                  {({ onRowsRendered, registerChild }) => (
                    <List
                      height={500}
                      onRowsRendered={onRowsRendered}
                      ref={registerChild}
                      rowCount={listNoti.length}
                      rowHeight={50}
                      rowRenderer={rowRenderer}
                      width={500}
                    />
                  )}

                </InfiniteLoader>
                {/* </ClickAwayListener> */}
              </Paper>}
              </div>
            </Grow>
          )}
        </Poppers>
      </div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          {/* <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden> */}
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      {authen.userInfo.name}
                    </MenuItem>
                    
                    <MenuItem
                      onClick={handleLogout}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
const mapStateToProps = state => ({
  authen: state.authen,
  requirement: state.requirement
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logout
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminNavbarLinks)