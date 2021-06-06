import React, { useEffect, useState } from "react";
import {
  AuditOutlined,
  ContactsOutlined,
  HomeOutlined,
  UserOutlined,
  WalletOutlined,
  SwitcherOutlined,
  SearchOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import RenderClientDashboard from "./RenderClientDashboard";
import RenderFindLawyer from "./RenderFindLawyer";
import firebase from "firebase";
import useActionDispatcher from "../../Hooks/useActionDispatcher";
import { useSelector } from "react-redux";
import {
  SET_KEYS_TRUE,
  UPDATE_USER_DATA,
  SET_DASHBOARDKEYS_TRUE,
} from "../../Store/actions";
import RenderClientProfile from "./RenderClientProfile";
import RenderClientWallet from "./RenderClientWallet";
import RenderAboutUs from "./RenderAboutUs";
import RenderContactUs from "./RenderContactUs";

const { Header, Content, Footer, Sider } = Layout;
const RenderClientHome = ({ fullHeight, fullWidth }) => {
  const userData = useSelector((state) => state.globalUserData);
  const state = useSelector((state) => state.globalDashboard);
  const dispatchAction = useActionDispatcher();
  const [collapse, setCollapse] = useState(true);
  const onCollapse = (collapsed) => {
    setCollapse((prevCheck) => !prevCheck);
  };

  useEffect(() => {
    dispatchAction(SET_DASHBOARDKEYS_TRUE, {
      keys: ["clientDashboard"],
    });
  }, []);

  const userNavigation = (event) => {
    switch (event.key) {
      case "1":
        console.log(userData);
        dispatchAction(SET_DASHBOARDKEYS_TRUE, {
          keys: ["clientDashboard"],
        });

        //goto lawyerDashboard
        break;
      case "2":
        //goto lawyerProfile
        dispatchAction(SET_DASHBOARDKEYS_TRUE, {
          keys: ["clientProfile"],
        });
        break;
      case "4":
        //goto past recordings
        break;
      case "3":
        console.log("3");
        dispatchAction(SET_DASHBOARDKEYS_TRUE, {
          keys: ["walletPage"],
        });
        //goto lawyer wallet
        break;
      case "5":
        //goto aboutUs
        dispatchAction(SET_DASHBOARDKEYS_TRUE, {
          keys: ["aboutUs"],
        });
        break;
      case "6":
        dispatchAction(SET_DASHBOARDKEYS_TRUE, {
          keys: ["contactUs"],
        });
        //goto contactUs
        break;
      case "7":
        //goto username
        firebase
          .database()
          .ref("Accounts/" + userData.username + "/")
          .update({
            currentOnline: false,
          });
        firebase
          .auth()
          .signOut()
          .then(
            function () {
              console.log("Signed Out");
            },
            function (error) {
              console.error("Sign Out Error", error);
            }
          );
        dispatchAction(SET_KEYS_TRUE, {
          keys: ["showUsername"],
        });
        break;
      case "10":
        // goto isLawyerAppointmentPage
        break;
      default:
      //goto lawyerDashboard
    }
  };

  return (
    <RenderFindLawyer />
  );
};

export default RenderClientHome;
