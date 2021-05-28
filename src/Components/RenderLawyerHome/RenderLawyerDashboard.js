import React, { useState, useEffect } from "react";
import { Image, Text, View } from "react-native";
import useGlobalStyles from "../../Hooks/useGlobalStyles";
//import AppointmentModalButton from "../RenderClientTier/AppointmentModalButton";
import firebase from "firebase";
import useActionDispatcher from "../../Hooks/useActionDispatcher";
import { useSelector } from "react-redux";
import { message, notification, Button, Avatar, Switch } from "antd";
import { SET_KEYS_TRUE, UPDATE_USER_DATA } from "../../Store/actions";

var docRef = null;
const RenderLawyerDashboard = ({ fullHeight, fullWidth }) => {
  const picWidth = fullHeight * 0.15;
  const styles = useGlobalStyles();
  const [isChecked, setIsChecked] = useState(true);
  const [callRequest, setCallRequest] = useState(false);
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
    <View
      style={{
        maxWidth: "100%",
        height: "100%",
        margin: "auto",
        top: "10%",
      }}
    >
      <Image
        style={{
          width: "18vh",
          height: "20%",
          marginHorizontal: "auto",
          borderRadius: "50%",
        }}
        source={{ uri: userData.profilePic }}
      />
      <Text style={styles.title}>{userData.displayName}</Text>

      <Switch
        style={{ width: "25%", marginLeft: "38%" }}
        onChange={availabilityToggle}
        unCheckedChildren="Offline"
        checkedChildren="Online"
        checked={userData.isOnline}
      />
      <Text style={styles.text}>
        Lawmax <b>{userData.lawyerTier}</b>
      </Text>
      <Text style={styles.text}>
        {userData.firm} {userData.city}
      </Text>
    </View>
  );
};

export default RenderLawyerDashboard;
