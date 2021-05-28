import React from "react";
import { View, Image } from "react-native";
import { Button } from "antd";
import useGlobalStyles from "../../Hooks/useGlobalStyles";
import useActionDispatcher from "../../Hooks/useActionDispatcher";
import  firebase from "firebase";
import { useSelector } from "react-redux";
import { SET_KEYS_TRUE, UPDATE_USER_DATA } from "../../Store/actions";

const LandingPage = ({ fullHeight, fullWidth }) => {

  const styles = useGlobalStyles();
  const width = fullWidth*0.3
  const height = fullWidth*0.15
  const state = useSelector((state) => state.globalStateData)
  const userData = useSelector((state) => state.globalUserData);
  const dispatchAction = useActionDispatcher();
  const setUser = (user) => (e) => {
      if(user==='lawyer'){

            var presenceRef = firebase.database().ref(
              "Accounts/" + userData.username+"/"
            );
            presenceRef.update({currentOnline: true})
            presenceRef
              .onDisconnect()
              .update({ currentOnline: false });
              //goto render lawyer tier
              //add islawyer to global state
              dispatchAction(SET_KEYS_TRUE, {
                    keys: ["showLawyerTier"],
                  });
              dispatchAction(UPDATE_USER_DATA, {
                    data: {
                      islawyer:true
                    },
                  });

      }
      else{
          //goto showuser info
           //add islawyer to global state
           dispatchAction(SET_KEYS_TRUE, {
                 keys: ["showUserInfo"],
               });
           dispatchAction(UPDATE_USER_DATA, {
                 data: {
                   islawyer:false
                 },
               });
      }

    const type = user;
    firebase.database().ref("/Accounts/" + userData.username).update({
      role: type,
    });
  };
  return (
      <View
      classname='login-page'
        style={{
          width: width,
          marginLeft: fullWidth*0.35,
          borderTopWidth:fullHeight*0.25,
          borderColor: '#ffffff',
          overflow : 'hidden',
        }}
      >
        <View >
          <Image
            onClick={() => {
              window.location.href = "/";
            }}
            style={styles.image}
            source={{ uri: "logo.png", width, height }}
          />
        </View>
      <Button
        style={{
          marginLeft: "15%",
          width: "70%",
          marginTop: "2%",
          backgroundColor: "#172A55",
          color: "white",
          fontSize: 16,
          height: 40,
        }}
        onClick={setUser("lawyer")}
      >
        Lawyer
      </Button>
      <Button
        type="primary"
        style={{
          marginLeft: "15%",
          width: "70%",
          backgroundColor: "#FF0102",
          border: "none",
          marginTop: "2%",
          fontSize: 16,
          height: 40,
        }}
        onClick={setUser("client")}
      >
        Client
      </Button>
    </View>
  );
};

export default LandingPage;
