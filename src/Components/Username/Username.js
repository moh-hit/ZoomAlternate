import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, TouchableHighlight, TextInput } from "react-native";
import useGlobalStyles from "../../Hooks/useGlobalStyles";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { SET_KEYS_TRUE, UPDATE_USER_DATA } from "../../Store/actions";
import useActionDispatcher from "../../Hooks/useActionDispatcher";
import loginBanner from '../../assets/imgs/loginBanner.svg'
import googleLogo from '../../assets/imgs/google.svg'


const Username = ({
  fullHeight,
  fullWidth,
  //setActivePage,
}) => {
  const styles = useGlobalStyles();
  const INPUT_MAP = {
    EMAIL: {
      HEADING: "Your Email",
      KEY: "email",
      SECURE: false
    },
    PASSWORD: {
      HEADING: "Password",
      KEY: "password",
      SECURE: true
    }
  }

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
      style={styles.containerLogin}
    >
      <div class="row" style={{ width: "100%" }}>
        <div class="col-sm-6"><View style={styles.loginLeft}>
          <Text style={styles.logo}>InConnect</Text>
          <Image alt="login banner" source={loginBanner} style={styles.loginBanner} />
          <View style={{ marginTop: 30 }}>
            <Text style={styles.bannerT1}>Privacy by design.</Text>
            <Text style={styles.bannerT2}>Lorem ipsum dolor sit amet consectetur adipiscing elit vitae dictumst, nascetur ornare.</Text>
          </View>

        </View></div>
        <div class="col-sm-6"><View style={styles.loginRight}>
          <Image source={{ uri: "https://www.backbase.com/wp-content/uploads/2020/05/Microsoft-Logo-PNG-Transparent.png" }} style={styles.companyLogo} />
          <Text style={{ fontSize: 20, fontWeight: 600, paddingVertical: "6vh" }}>Login to your account</Text>
          <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
            <TouchableHighlight onPress={googleLogin} style={styles.googleButton}>
              <View style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
                <Image source={googleLogo} style={styles.googleLogo} />
                <Text style={{ fontSize: 16, paddingHorizontal: 60 }}>Login with Google</Text>
              </View>
            </TouchableHighlight>
            <div className="sep-container">
              <div className="seperator"></div>
              <Text style={{ fontWeight: "500", color: "rgba(0,0,0,0.5)" }}>OR</Text>
              <div className="seperator"></div>
            </div>
            {Object.values(INPUT_MAP).map((inp, index) => (
              <View style={{ marginVertical: 10 }}>
                <Text style={{ marginVertical: "1vh", fontWeight: 500 }}>{inp.HEADING}</Text>
                <TextInput
                  value={inp.key}
                  style={styles.input}
                />
              </View>
            ))}
            <View style={{
              width: "20vw",
              flexDirection: "row",
              justifyContent: "space-between", alignItems: "center",
              marginTop: 10,
              marginBottom: "10vh"
            }}>
              <Text style={styles.resetPassword}>Reset Password</Text>
              <TouchableHighlight style={styles.loginButton}>
                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                  <Text style={styles.loginText}>Login</Text>
                </View>
              </TouchableHighlight>
            </View>
            <Text>Don’t have an account? <strong style={{ textDecorationLine: 'underline' }}>Create new account</strong></Text>
          </View>
        </View></div>
      </div>

    </View >
  );
};


export default Username