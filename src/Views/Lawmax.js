import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  Slide,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
} from "@material-ui/core";
import firebase from "../firebase_config";
import { useSelector } from "react-redux";
import useActionDispatcher from "../Hooks/useActionDispatcher";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import WelcomePage from "../Components/Welcome/Welcome";
import Username from "../Components/Username/Username";
import LandingPage from "../Components/LandingPage/LandingPage";
import RenderUserInfo from "../Components/RenderUserInfo/RenderUserInfo";
import RenderLawyerTier from "../Components/RenderLawyerTier/RenderLawyerTier";
import RenderLawyerSpecialities from "../Components/RenderLawyerSpecialities/RenderLawyerSpecialities";
import RenderLawyerHome from "../Components/RenderLawyerHome/RenderLawyerHome";
import RenderClientHome from "../Components/RenderClientHome/RenderClientHome";
import VideoCall from "../Components/VideoCall/videoCall";
import { SET_KEYS_TRUE, UPDATE_USER_DATA } from "../Store/actions";
import WalletPage from "../Components/WalletPage/WalletPage";
import PastCalls from "../Components/RenderPastCalls/PastCalls";
import RenderFirmSelection from '../Components/RenderLawyerHome/RenderFirmSelection'


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const { width, height } = Dimensions.get("window");

export default function Lawmax() {
  useEffect(() => {
    var unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        const userId = firebase.auth().currentUser.uid;
        const snap = firebase
          .database()
          .ref("/Accounts/" + userId)
          .once("value")
          .then((snapshot) => {
            console.log(user["uid"]);
            if (snapshot.val()) {
              if (snapshot.val().role === "lawyer") {
                setLoading(false);
                unsubscribe();
                console.log(snapshot.val());
                console.log("previously logged in lawyer");
                dispatchAction(SET_KEYS_TRUE, {
                  keys: ["lawyerHome"],
                });
                dispatchAction(UPDATE_USER_DATA, {
                  data: {
                    username: user["uid"],
                    email: snapshot.val().email,
                    profilePic: snapshot.val().profilePic,
                    mobile: snapshot.val().mobile,
                    displayName: snapshot.val().name,
                    lawyerSpecialities: snapshot.val().specialities,
                    lawyerTier: snapshot.val().tier,
                    islawyer: true,
                    isOnline: false,
                  },
                });
                //   self.setState({
                //     showUsername: false,
                //     username: userId,
                //     email: user["email"],
                //     showLawyerTier: false,
                //     welcomePage:false,
                //     lawyerHome: true,
                //     lawyerDashboard: true,
                //     showUsername: false,
                //     landingPage: false,
                //     isLawyer:true,
                //     displayName: user["displayName"],
                //     profilePic: user["photoURL"],
                //     mobile: snapshot.val().mobile,
                //     city:snapshot.val().city,
                //     firm:snapshot.val().firm,
                //     firmAddress:snapshot.val().firmAddress,
                //     registrationNumber:snapshot.val().registrationNumber,
                //     lawyerSpecialities: snapshot.val().specialities,
                //     lawyerTier: snapshot.val().tier,
                //
                //   },
                //   () => {
                //     var presenceRef = db.ref(
                //       "Accounts/" + this.state.username+"/"
                //     );
                //     presenceRef.update({currentOnline: true})
                //     presenceRef
                //       .onDisconnect()
                //       .update({ currentOnline: false });
                //   });
                //   self.availabilityToggle(true);
              } else {
                if (snapshot.val().role === "client") {
                  setLoading(false);
                  unsubscribe();
                  console.log("previously logged in client");
                  dispatchAction(SET_KEYS_TRUE, {
                    keys: ["clientHome"],
                  });
                  dispatchAction(UPDATE_USER_DATA, {
                    data: {
                      username: user["uid"],
                      email: snapshot.val().email,
                      profilePic: snapshot.val().profilePic,
                      mobile: snapshot.val().mobile,
                      displayName: snapshot.val().name,
                      islawyer: false,
                    },
                  });
                } else {
                  setLoading(false);
                  unsubscribe();
                  firebase
                    .auth()
                    .signOut()
                    .then(
                      function () {
                        // Sign-out successful.
                        dispatchAction(SET_KEYS_TRUE, {
                          keys: ["showUsername"],
                        });
                        console.log("signed out");
                      },
                      function (error) {
                        // An error happened.
                      }
                    );
                }
              }
            } else {
              setLoading(false);
              unsubscribe();
              firebase
                .auth()
                .signOut()
                .then(
                  function () {
                    // Sign-out successful.
                    dispatchAction(SET_KEYS_TRUE, {
                      keys: ["showUsername"],
                    });
                    console.log("signed out");
                  },
                  function (error) {
                    // An error happened.
                  }
                );
            }
          })
          .catch(function error(e) {
            console.log(e);
          });
      } else {
        setLoading(false);
        unsubscribe();
        console.log("no previously logged in user");
        dispatchAction(SET_KEYS_TRUE, {
          keys: ["showUsername"],
        });
      }
    });
  }, []);

  const classes = useStyles();
  const userData = useSelector((state) => state.globalUserData);
  const state = useSelector((state) => state.globalStateData);
  const dispatchAction = useActionDispatcher();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  let fullWidth = window.innerWidth;
  let fullHeight = window.innerHeight;

  const dispatchVideoCallEnd = (userType) => {
    if (userType === "lawyer") {
      dispatchAction(SET_KEYS_TRUE, {
        keys: ["lawyerHome"],
      });
    } else if (userType === "client") {
      dispatchAction(SET_KEYS_TRUE, {
        keys: ["clientHome"],
      });
    }
  };

  return loading ? (
    <WelcomePage fullWidth={fullWidth} fullHeight={fullHeight} />
  ) : (
    <div>
      {state.showUsername ? (
        <Username fullWidth={fullWidth} fullHeight={fullHeight} />
      ) : null}
      {state.landingPage ? (
        <LandingPage fullWidth={fullWidth} fullHeight={fullHeight} />
      ) : null}
      {state.showUserInfo ? (
        <RenderUserInfo fullWidth={fullWidth} fullHeight={fullHeight} />
      ) : null}
    
      {state.showLawyerTier ? (
        <RenderLawyerTier fullWidth={fullWidth} fullHeight={fullHeight} />
      ) : null}
      {state.selectLawyerFirm ? (
        <RenderFirmSelection fullWidth={fullWidth} fullHeight={fullHeight} />
      ) : null}

      
      {state.showLawyerSpecialities ? (
        <RenderLawyerSpecialities
          fullWidth={fullWidth}
          fullHeight={fullHeight}
        />
      ) : null}
      {state.lawyerHome ? (
        <RenderLawyerHome
          fullWidth={fullWidth}
          fullHeight={fullHeight}
        />
      ) : null}
      {state.clientHome ? (
        <RenderClientHome
          fullWidth={fullWidth}
          fullHeight={fullHeight}
        />
      ) : null}
            {state.meetingLogPage ? (
        <PastCalls
          fullWidth={fullWidth}
          fullHeight={fullHeight}
        />
      ) : null}
      {state.userPage ? (
        <VideoCall
          username={userData.username}
          profilePic={userData.profilePic}
          displayName={userData.profilePic}
          creator={userData.islawyer}
          endCallDispatch={dispatchVideoCallEnd}
        />
      ) : null}
    </div>
  );
}
