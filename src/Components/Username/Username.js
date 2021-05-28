import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import useGlobalStyles from "../../Hooks/useGlobalStyles";
import { Button, Col, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { SET_KEYS_TRUE, UPDATE_USER_DATA } from "../../Store/actions";
import useActionDispatcher from "../../Hooks/useActionDispatcher";

const Username = ({
  fullHeight,
  fullWidth,
  //setActivePage,
}) => {
  const styles = useGlobalStyles();
  const width = fullWidth * 0.3;
  const height = fullWidth * 0.15;
  console.log(firebase.auth().currentUser);
  const handleGoBack = () => {
    // 1st arg - key to set true
    // 2nd arg - key to set false
    //setActivePage("landingPage", "showUsername");
  };
  const userData = useSelector((state) => state.globalUserData);
  const state = useSelector((state) => state.globalStateData);
  const dispatchAction = useActionDispatcher();
  const googleLogin = () => {
    console.log("google login clicked");
    const provider = new firebase.auth.GoogleAuthProvider();
    const googleLogin = firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const token = result.credential.accessToken;
        const user = result.user;
        const names = user["displayName"].split(" ");
        console.log(firebase.auth().currentUser);
        const userId = user["uid"];
        const email = user["email"];
        const snap = firebase
          .database()
          .ref("/Accounts/" + userId)
          .once("value")
          .then((snapshot) => {
            if (snapshot.val()) {
              if (snapshot.val().role === "lawyer") {
                console.log(snapshot.val());
                console.log("Existing, but offline lawyer");
                //goto home page
                dispatchAction(SET_KEYS_TRUE, {
                  keys: ["lawyerHome"],
                });
                dispatchAction(UPDATE_USER_DATA, {
                  data: {
                    username: user["uid"],
                    email: snapshot.val().email,
                    profilePic: snapshot.val().profilePic,
                    displayName: snapshot.val().name,
                    lawyerSpecialities: snapshot.val().specialities,
                    lawyerTier: snapshot.val().tier,
                    islawyer: true,
                    isOnline: false,
                  },
                });
              } else if (snapshot.val().role === "client") {
                console.log(snapshot.val());
                //goto home page
                dispatchAction(SET_KEYS_TRUE, {
                  keys: ["clientHome"],
                });
                dispatchAction(UPDATE_USER_DATA, {
                  data: {
                    username: user["uid"],
                    email: snapshot.val().email,
                    profilePic: snapshot.val().profilePic,
                    displayName: snapshot.val().name,
                    islawyer: false,
                    isOnline: true,
                  },
                });
              }
            } else {
              firebase
                .database()
                .ref("/Accounts/" + userId)
                .update({
                  name: user["displayName"],
                  email: user["email"],
                  profilePic: user["photoURL"],
                });
              console.log("new user");
              //goto landing page
              dispatchAction(SET_KEYS_TRUE, {
                keys: ["landingPage"],
              });
              dispatchAction(UPDATE_USER_DATA, {
                data: {
                  username: user["uid"],
                  email: user["email"],
                  profilePic: user["photoURL"],
                  displayName: user["displayName"],
                },
              });
              //add username, email, profilepic, displayname to global state
            }
          });
      })
      .catch(function (error) {
        const errorcode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorMessage, errorcode);
      });
  };

  return (
    <View
      classname="login-page"
      style={{
        width: width,
        marginLeft: fullWidth * 0.35,
        borderTopWidth: fullHeight * 0.25,
        borderColor: "#ffffff",
        overflow: "hidden",
      }}
    >
      <View>
        <Image
          onClick={() => {
            window.location.href = "/";
          }}
          style={styles.image}
          source={{ uri: "logo.png", width, height }}
        />
      </View>
      {fullWidth > 500 ? (
        <Button
          style={{
            marginLeft: "15%",
            width: "70%",
            marginTop: "15%",
            border: "3px solid #172A55",
            color: "#172A55",
            borderRadius: 6,
            height: fullHeight * 0.06,
            fontSize: 16,
            fontWeight: 600,
            textAlign: "center",
          }}
          size="large"
          onClick={googleLogin}
        >
          Sign in with Google
        </Button>
      ) : (
        <Button
          style={{
            marginLeft: "15%",
            width: "70%",
            marginTop: "15%",
            backgroundColor: "#172A55",
            color: "white",
            height: fullHeight * 0.04,
            fontSize: 6,
            textAlign: "center",
          }}
          size={"small"}
          onClick={googleLogin}
        >
          Sign in with Google
        </Button>
      )}
    </View>
  );
};

export default Username;
