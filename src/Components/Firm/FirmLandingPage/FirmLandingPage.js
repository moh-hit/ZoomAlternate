import React, { useState } from "react";
import { Input, Button } from "antd";
import { View, Image } from "react-native";
import useGlobalStyles from "../../../Hooks/useGlobalStyles";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { SET_KEYS_TRUE, UPDATE_USER_DATA } from "../../../Store/actions";
import useActionDispatcher from "../../../Hooks/useActionDispatcher";

export default function FirmLandingPage({ fullHeight, fullWidth }) {
  const styles = useGlobalStyles();
  const width = fullWidth * 0.3;
  const height = fullWidth * 0.15;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userData = useSelector((state) => state.globalUserData);
  const state = useSelector((state) => state.globalStateData);
  const dispatchAction = useActionDispatcher();
  const emailpasswordLogin = () => {
    firebase
      .auth()
      .fetchSignInMethodsForEmail(email)
      .then((checkuser) => {
        if (checkuser.length > 0) {
          console.log("EXISTS");
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
              const user = result.user;
              console.log(user);
              const userId = user["uid"];
              dispatchAction(SET_KEYS_TRUE, {
                keys: ["firmHome"],
              });
              dispatchAction(UPDATE_USER_DATA, {
                data: {
                  username: userId,
                  email: user["email"],
                  displayName: user["displayName"],
                },
              });
            });
        } else {
          console.log("DOESN'T EXIST");
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
              const user = result.user;
              console.log(user);
              const userId = user["uid"];
              user
                .updateProfile({ displayName: email.split("@", 1)[0] })
                .then(() => {
                  firebase
                    .database()
                    .ref("/Firms/" + userId)
                    .update({
                      name: user["displayName"],
                      email: user["email"],
                    });
                });
              dispatchAction(SET_KEYS_TRUE, {
                keys: ["firmHome"],
              });
              dispatchAction(UPDATE_USER_DATA, {
                data: {
                  username: userId,
                  email: user["email"],
                  displayName: user["displayName"],
                },
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
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

      <Input
        placeholder="Enter Firm Email"
        inputMode="email"
        style={{ marginBottom: 20 }}
        size="large"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input.Password
        placeholder="Enter Password"
        size="large"
        style={{ marginBottom: 20 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={emailpasswordLogin} type="primary">
        Sign in
      </Button>
    </View>
  );
}
