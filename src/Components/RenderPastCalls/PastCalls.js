import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { Card } from "antd";
import firebase from "../../firebase_config";
import useActionDispatcher from "../../Hooks/useActionDispatcher";
import { useSelector } from "react-redux";
import {
  SET_KEYS_TRUE,
  UPDATE_USER_DATA,
  SET_DASHBOARDKEYS_TRUE,
} from "../../Store/actions";
import ParticularCall from "./ParticularCall";

export default function PastCalls({ height, width }) {
  const userId = firebase.auth().currentUser.uid;

  const userData = useSelector((state) => state.globalUserData);
  const state = useSelector((state) => state.globalStateData);
  const dispatchAction = useActionDispatcher();

  const [pastCalls, setPastCalls] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref(`Accounts/${userId}/PastCalls`)
      .on("value", (snap) => {
        setPastCalls(Object.values(snap.val()));
      });
  }, []);

  const onCardClick = async (callNode) => {
    await dispatchAction(UPDATE_USER_DATA, {data : {
      particularCall: callNode
    }});
    await dispatchAction(SET_KEYS_TRUE, {
      keys: ["meetingLogPage", "showParticularCall"],
    });
  };



  if (state.showParticularCall) {
    return <ParticularCall height={height} width={width} />;
  } else {
    return (
      <div style={{width: window.innerWidth}} className="d-flex justify-content-around align-items-center col-12">
        {pastCalls &&
          pastCalls.map((call) => (
            <TouchableWithoutFeedback
              onPress={() => onCardClick(call.videoIdNode)}
            >
              <Card
                className="col-xl-5 col-lg-3 col-md-4 col-sm-6 col-xs-12"
                title={new Date(call.videoIdNode).toLocaleString()}
                bordered={false}
                style={{ width: 300, cursor: "pointer" }}
              >
                <p>{call.clientName}</p>
              </Card>
            </TouchableWithoutFeedback>
          ))}
      </div>
    );
  }
}
