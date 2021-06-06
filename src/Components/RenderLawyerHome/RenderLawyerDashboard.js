import React, { useState, useEffect } from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
import useGlobalStyles from "../../Hooks/useGlobalStyles";
//import AppointmentModalButton from "../RenderClientTier/AppointmentModalButton";
import firebase from "firebase";
import useActionDispatcher from "../../Hooks/useActionDispatcher";
import { useSelector } from "react-redux";
import { message, notification, Button, Avatar, Switch } from "antd";
import { SET_KEYS_TRUE, UPDATE_USER_DATA } from "../../Store/actions";
import { AddBox, Event, Notifications } from '@material-ui/icons';
import { Grid, Paper, Tab, Tabs } from "@material-ui/core";
import { Col, Container, Row } from "react-bootstrap";

var docRef = null;
const RenderLawyerDashboard = ({ fullHeight, fullWidth }) => {
  const SIDEBAR_MENUS = {
    NEW_MEETING: {
      name: "New meeting",
      primary: true,
      key: "new_meeting"
    },
    SCHLD_MEETING: {
      name: "Scheduled meetings",
      primary: false,
      key: "schld_meeting",
      active: true
    },
    ACTIVE_USERS: {
      name: "Active users",
      primary: false,
      key: "active_users"
    },
    CALL_RCRDINGS: {
      name: "Call Recordings",
      primary: false,
      key: "call_recordings"
    },
    CALL_LOGS: {
      name: "Call Logs",
      primary: false,
      key: "call_logs"
    }

  }
  const SCHLDCARD_DETAILS = [
    { title: "Weekly round-up Weekly round-up", timing: "02:30pm - 03:30pm", guest: "Mandeep Sharma" },
    { title: "MJ Clients", timing: "02:30pm - 03:30pm", guest: "Mandeep Sharma" },
    { title: "Visco Follow up", timing: "02:30pm - 03:30pm", guest: "Mandeep Sharma" },
    { title: "Team Sync", timing: "02:30pm - 03:30pm", guest: "Mandeep Sharma" },
    { title: "Design Rollout", timing: "02:30pm - 03:30pm", guest: "Mandeep Sharma" },
  ]

  const picWidth = fullHeight * 0.15;
  const styles = useGlobalStyles();

  const [isChecked, setIsChecked] = useState(true);
  const [callRequest, setCallRequest] = useState(false);
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const userData = useSelector((state) => state.globalUserData);
  const dispatchAction = useActionDispatcher();
  const onSwitchChange = (event) => {
    console.log("event value", event);
    availabilityToggle(event);
  };

  useEffect(() => {
    

    docRef = firebase.database().ref("/Accounts/" + userData.username + "/");
    const response = {
      id: "8G467296EP549083V",
      intent: "CAPTURE",
      status: "COMPLETED",
      purchase_units: [
        {
          reference_id: "default",
          amount: {
            currency_code: "USD",
            value: "1.00",
          },
          payee: {
            email_address: "lawmax08@gmail.com",
            merchant_id: "ABLVFDWPDY4ME",
          },
          description: "Your description",
          soft_descriptor: "PAYPAL *LAWMAX",
          shipping: {
            name: {
              full_name: "Mohit Kumar",
            },
            address: {
              address_line_1: "432 5th Main BDA Layout Domlur",
              admin_area_2: "Bangalore",
              admin_area_1: "Karnataka",
              postal_code: "560071",
              country_code: "IN",
            },
          },
          payments: {
            captures: [
              {
                id: "7TW55290WV4687512",
                status: "PENDING",
                status_details: {
                  reason: "PENDING_REVIEW",
                },
                amount: {
                  currency_code: "USD",
                  value: "1.00",
                },
                final_capture: true,
                seller_protection: {
                  status: "ELIGIBLE",
                  dispute_categories: [
                    "ITEM_NOT_RECEIVED",
                    "UNAUTHORIZED_TRANSACTION",
                  ],
                },
                links: [
                  {
                    href:
                      "https://api.paypal.com/v2/payments/captures/7TW55290WV4687512",
                    rel: "self",
                    method: "GET",
                  },
                  {
                    href:
                      "https://api.paypal.com/v2/payments/captures/7TW55290WV4687512/refund",
                    rel: "refund",
                    method: "POST",
                  },
                  {
                    href:
                      "https://api.paypal.com/v2/checkout/orders/8G467296EP549083V",
                    rel: "up",
                    method: "GET",
                  },
                ],
                create_time: "2021-02-12T08:02:17Z",
                update_time: "2021-02-12T08:02:17Z",
              },
            ],
          },
        },
      ],
      payer: {
        name: {
          given_name: "Mohit",
          surname: "Kumar",
        },
        email_address: "moh.hit1012@gmail.com",
        payer_id: "TPWWFESKKYP4J",
        address: {
          country_code: "IN",
        },
      },
      create_time: "2021-02-12T07:59:57Z",
      update_time: "2021-02-12T08:02:17Z",
      links: [
        {
          href: "https://api.paypal.com/v2/checkout/orders/8G467296EP549083V",
          rel: "self",
          method: "GET",
        },
      ],
    };
    console.log(response.purchase_units[0].payments.captures[0].id);
  }, []);

  useEffect(() => {
    console.log("online ref called. userData:", userData);
    const onlineRef = firebase
      .database()
      .ref("/Accounts/" + userData.username + "/currentOnline");
    onlineRef.on("value", (snapshot) => {
      console.log("online ref called");
      dispatchAction(UPDATE_USER_DATA, {
        data: {
          isOnline: snapshot.val(),
        },
      });
    });
    docRef = firebase.database().ref("/Accounts/" + userData.username + "/");
  }, [userData.username]);

  useEffect(() => {
    console.log("call request use effect");
    if (callRequest) {
      notification.open({
        message: `${userData.clientName} is calling ...`,
        icon: <Avatar size={35} src={userData.clientProfilePic} />,
        btn: (
          <>
            <Button style={{ paddingRight: 8 }} onClick={acceptCall}>
              Accept
            </Button>
            <Button style={{ paddingLeft: 8 }} onClick={rejectCall}>
              Reject
            </Button>
          </>
        ),
        key: "call",
        duration: 0,
        onClose: handleCloseNotification,
      });
    }
  }, [callRequest]);

  const handleCloseNotification = () => {
    notification.close("call");
  };

  const acceptCall = () => {
    const startTime = Date.now();

    firebase
      .database()
      .ref("/Accounts/" + userData.username + "/message")
      .update({
        callStatus: true,
        startTime: startTime,
        callRequest: false,
      });
    notification.close("call");
    // goto userpage
    dispatchAction(SET_KEYS_TRUE, {
      keys: ["userPage"],
    });
    firebase
      .database()
      .ref("/Accounts/" + userData.username + "/message/")
      .off();
  };

  const rejectCall = () => {
    firebase
      .database()
      .ref("/Accounts/" + userData.username + "/message")
      .update({
        callRequest: false,
        reject: true,
      });
    notification.close("call");
  };

  const availabilityToggle = (event) => {
    console.log(userData);
    if (event) {
      firebase
        .database()
        .ref("/Accounts/" + userData.username)
        .update({
          currentOnline: true,
          webRTC: {},
        });
      firebase
        .database()
        .ref("/Accounts/" + userData.username + "/message")
        .update({
          startTime: null,
          callRequest: false,
          callStatus: false,
          reject: false,
          message: null,
          lawyerVideo: false,
          clientVideo: false,
          lawyerScreenshare: false,
          clientScreenshare: false,
          sender: userData.username,
        });
      firebase
        .database()
        .ref("/Accounts/" + userData.username + "/ice")
        .update({
          clientIce: null,
          lawyerIce: null,
        });

      docRef.on("value", (snapshot) => {
        // set global states call request, client profile pic, client name, currentOnline
        console.log("listening to message works", snapshot.val());
        if (snapshot.val().message.callRequest) {
          const updateAfterCallReq = async () => {
            await dispatchAction(UPDATE_USER_DATA, {
              data: {
                clientProfilePic: snapshot.val().message.callerProfilePic,
                clientName: snapshot.val().message.callerName,
              },
            });
            await setCallRequest(true);
          };
          updateAfterCallReq();
        }
      });
    } else {
      firebase
        .database()
        .ref("/Accounts/" + userData.username)
        .update({
          currentOnline: false,
        });
      docRef.off();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.navbar}>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Image source={{ uri: "https://www.backbase.com/wp-content/uploads/2020/05/Microsoft-Logo-PNG-Transparent.png" }} style={styles.companyLogoNav} />
          <div className="vertical-seperator"></div>
          <Text style={styles.logoNav}>InConnect</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Notifications style={{ color: "rgba(0,0,0,0.5)", fontSize: 28 }} />
          <Image source={{ uri: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" }} style={styles.userProfileNav} />
        </View>
      </View>
      <Row>
        <Col xs={2}>
          <View style={styles.sidebarContainer}>
            <View style={{ alignItems: "flex-start" }}>
              {Object.values(SIDEBAR_MENUS).map((menu, index) => (
                <TouchableHighlight style={[menu.primary ? styles.sidebarPrimaryBut : styles.sidebarSecBut, { backgroundColor: menu.active ? "#F5F5F5" : menu.primary ? "#6626EF" : "#fff" }]}>
                  <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {menu.primary && <AddBox style={{ color: "#fff", fontSize: 20 }} />}
                    <Text style={menu.primary ? styles.sidebarPrimaryButText : styles.sidebarSecButText}>{menu.name}</Text>
                  </View>
                </TouchableHighlight>
              ))}
            </View>
            <View style={{ marginBottom: "3vh" }}>
              <View style={styles.adBanner}>
                <View style={{ alignItems: "flex-start" }}>
                  <Text style={styles.adBannerT1}>50% off on 10 users</Text>
                  <Text style={styles.adBannerT2}>Lorem ipsum dolor sit amet lorem.</Text>
                </View>
                <Text style={styles.adBannerBtn}>Know More</Text>
              </View>
            </View>
          </View>
        </Col>
        <Col xs={10}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Today" />
            <Tab label="Tomorrow" />
            <Tab label="This Week" />

          </Tabs>
          <Row xs={1} md={4}>
            {SCHLDCARD_DETAILS.map((detail, index) => (
              <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                <View style={styles.schldCard}>
                  <View>
                    <Text style={styles.schldCardT1}>{detail.title}</Text>
                    <Text style={styles.schldCardT2}>{detail.timing}</Text>
                    <Text style={styles.schldCardT3}>Invited Guest</Text>
                    <Text style={styles.schldCardT4}>{detail.guest}</Text>
                  </View>
                  <View style={styles.schldCardActionContainer}>
                    <Text style={{ fontWeight: "700", textTransform: "uppercase", color: "#6626EF", fontSize: 12 }}>Edit</Text>
                    <Text style={{ fontWeight: "700", textTransform: "uppercase", color: "#6626EF", fontSize: 12 }}>Start Meeting</Text>
                  </View>
                </View>
              </Col>
            ))}
          </Row>

        </Col>
      </Row>
    </View >

  );
};

export default RenderLawyerDashboard;
