import React, { useEffect, useState } from "react";
import {
  AuditOutlined,
  ContactsOutlined,
  HomeOutlined,
  UserOutlined,
  WalletOutlined,
  SwitcherOutlined,
  HistoryOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
// import RenderClientWallet from "../RenderClientTier/RenderClientWallet";
// import RenderAboutUs from "../RenderClientTier/RenderAboutUs";
// import RenderContactUs from "../RenderClientTier/RenderContactUs";
import RenderLawyerDashboard from "./RenderLawyerDashboard";
import RenderLawyerProfile from "./RenderLawyerProfile";
// import { LawyerAppointmentPage } from "./LawyerAppointmentPage";
import firebase from "firebase";
import useActionDispatcher from "../../Hooks/useActionDispatcher";
import { useSelector } from "react-redux";
import {
  SET_KEYS_TRUE,
  UPDATE_USER_DATA,
  SET_DASHBOARDKEYS_TRUE,
} from "../../Store/actions";
import WalletPage from "../WalletPage/WalletPage";
import PastCalls from "../RenderPastCalls/PastCalls";

const { Header, Content, Footer, Sider } = Layout;
const RenderLawyerHome = ({ fullHeight, fullWidth }) => {
  // useEffect(() => {
  //   db.ref("Accounts/" + state.username + "/message").update({
  //     callerName: "",
  //     callerProfilePic: "",
  //     callerId: "",
  //   });
  // }, [state?.username]);
  const userData = useSelector((state) => state.globalUserData);
  const state = useSelector((state) => state.globalDashboard);
  const dispatchAction = useActionDispatcher();
  const [collapse, setCollapse] = useState(true);
  const onCollapse = (collapsed) => {
    setCollapse((prevCheck) => !prevCheck);
  };

  useEffect(() => {
    dispatchAction(SET_DASHBOARDKEYS_TRUE, {
      keys: ["lawyerDashboard"],
    });
  }, []);

  const userNavigation = (event) => {
    switch (event.key) {
      case "1":
        dispatchAction(SET_DASHBOARDKEYS_TRUE, {
          keys: ["lawyerDashboard"],
        });
        //goto lawyerDashboard
        break;
      case "2":
        dispatchAction(SET_DASHBOARDKEYS_TRUE, {
          keys: ["lawyerProfile"],
        });
        //goto lawyerProfile
        break;
      case "4":
        //goto past recordings
        dispatchAction(SET_DASHBOARDKEYS_TRUE, {
          keys: ["meetingLogPage"],
        });
        break;
      case "3":
        //goto lawyer wallet
        dispatchAction(SET_DASHBOARDKEYS_TRUE, {
          keys: ["walletPage"],
        });
        break;
      case "5":
        //goto aboutUs
        break;
      case "6":
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
    <RenderLawyerDashboard height={fullHeight} width={fullWidth} />
  );
};

export default RenderLawyerHome;
