import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { makeStyles } from "@material-ui/core/styles";
import { Slide } from "@material-ui/core";
import firebase from "../firebase_config";
import { useSelector } from "react-redux";
import useActionDispatcher from "../Hooks/useActionDispatcher";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import WelcomePage from "../Components/Welcome/Welcome";
import { SET_KEYS_TRUE, UPDATE_USER_DATA } from "../Store/actions";
import FirmLandingPage from "../Components/Firm/FirmLandingPage/FirmLandingPage";
import FirmHome from "../Components/Firm/FirmHome/FirmHome";

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

export default function FirmLawmax() {
  useEffect(() => {
    console.log("FIRM CHECK IN");
    var unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        const userId = firebase.auth().currentUser.uid;
        console.log(userId);
        firebase
          .database()
          .ref(`Accounts/${userId}`)
          .once("value", (snap) => {
            if (snap.val()) {
              console.log("LAWYER LOGIN FOUND");
              firebase
                .auth()
                .signOut()
                .then(
                  function () {
                    // Sign-out successful.
                    dispatchAction(SET_KEYS_TRUE, {
                      keys: ["firmLandingPage"],
                    });
                    console.log("signed out");
                  },
                  function (error) {
                    // An error happened.
                  }
                );
            } else {
              firebase
                .database()
                .ref(`Firms/${userId}`)
                .once("value", (snap1) => {
                  if (snap1.val()) {
                    //firm login found
                    setLoading(false);
                    console.log("FIRM LOGIN FOUND");
                    dispatchAction(SET_KEYS_TRUE, {
                      keys: ["firmHome"],
                    });
                  } else {
                    firebase
                      .auth()
                      .signOut()
                      .then(
                        function () {
                          // Sign-out successful.
                          dispatchAction(SET_KEYS_TRUE, {
                            keys: ["firmLandingPage"],
                          });
                          console.log("signed out");
                        },
                        function (error) {
                          // An error happened.
                        }
                      );
                  }
                });
            }
          });
      } else {
        setLoading(false);
        unsubscribe();
        console.log("no previously logged in user");
        dispatchAction(SET_KEYS_TRUE, {
          keys: ["firmLandingPage"],
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

  return loading ? (
    <WelcomePage fullWidth={fullWidth} fullHeight={fullHeight} />
  ) : (
    <div>
      {state.firmLandingPage ? (
        <FirmLandingPage fullWidth={fullWidth} fullHeight={fullHeight} />
      ) : null}
      {state.firmHome ? (
        <FirmHome fullWidth={fullWidth} fullHeight={fullHeight} />
      ) : null}
    </div>
  );
}
