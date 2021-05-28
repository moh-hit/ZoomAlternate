import React, { useEffect, useState, useRef } from "react";
import { View, Dimensions } from "react-native";
import { Drawer, Button, Spin } from "antd";
import firebase from "../../firebase_config";
import useActionDispatcher from "../../Hooks/useActionDispatcher";
import { useSelector } from "react-redux";
import {
  SET_KEYS_TRUE,
  UPDATE_USER_DATA,
  SET_DASHBOARDKEYS_TRUE,
} from "../../Store/actions";
import ReactPlayer from "react-player";
import { Slider, Switch } from "antd";

const { width, height } = Dimensions.get("window");

export default function ParticularCall() {
  const userId = firebase.auth().currentUser.uid;

  const userData = useSelector((state) => state.globalUserData);
  const state = useSelector((state) => state.globalStateData);
  const dispatchAction = useActionDispatcher();

  const [lawyerVid, setLawyerVid] = useState("");
  const [clientVid, setClientVid] = useState("");
  const [ready, setReady] = useState({ lawyer: false, client: false });
  const [messages, setMessages] = useState([]);
  const [duration, setDuration] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  let lawyerVidRef = useRef(null);
  let clientVidRef = useRef(null);

  useEffect(() => {
    const getVids = async () => {
      const vids = await firebase
        .storage()
        .ref()
        .child(`${userId}/${userData.particularCall}`);
      const lVid = await vids.child("lawyer");
      const cVid = await vids.child("client");
      await lVid.getDownloadURL().then((url) => {
        setLawyerVid(url);
      });
      await cVid.getDownloadURL().then((url) => {
        setClientVid(url);
      });
    };

    const getMessages = async () => {
      await firebase
        .database()
        .ref(
          `/Accounts/${userId}/PastCalls/${userData.particularCall}/messages`
        )
        .once("value", (snap) => {
          if (snap.val()) {
            var result = Object.keys(snap.val()).map((key) => [
              key,
              snap.val()[key],
            ]);
            setMessages(result);
          }
        });
    };

    getMessages();
    getVids();
  }, []);

  useEffect(() => {
    setInterval(() => {
      if (lawyerVidRef && lawyerVidRef.getCurrentTime) {
        if (totalDuration === "") {
          setTotalDuration(lawyerVidRef.getDuration());
        }
        setDuration(lawyerVidRef.getCurrentTime());
      }
    }, 1000);
  });



  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: width * 0.33,
        }}
      >
        {messages.length ? (
          messages.map((m) => {
            let sender = m[0].split("_").pop();
            if (sender == "client") {
              return (
                <h6
                  style={{
                    padding: 7,
                    paddingLeft: 15,
                    backgroundColor: "#eb596e",
                    borderRadius: 100,
                    color: "#fff",
                  }}
                >
                  {m[1]}
                </h6>
              );
            } else {
              return (
                <h6
                  style={{
                    textAlign: "end",
                    padding: 7,
                    paddingRight: 15,
                    backgroundColor: "#6930c3",
                    borderRadius: 100,
                    color: "#fff",
                  }}
                >
                  {m[1]}
                </h6>
              );
            }
          })
        ) : (
          <h1>NO Message</h1>
        )}
      </View>
      <View
        style={{
          width: width * 0.6,
          marginTop: 20,
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        {lawyerVid.length > 0 ? (
          <ReactPlayer
            ref={(el) => (lawyerVidRef = el)}
            width={600}
            playing={ready.client && ready.lawyer}
            onReady={() => setReady({ ...ready, lawyer: true })}
            url={lawyerVid}
          />
        ) : (
          <View
            style={{
              width: 600,
              height: 360,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin />
          </View>
        )}

        {clientVid.length > 0 ? (
          <ReactPlayer
            ref={(el) => (clientVidRef = el)}
            width={600}
            playing={ready.client && ready.lawyer}
            onReady={() => setReady({ ...ready, client: true })}
            url={clientVid}
          />
        ) : (
          <View
            style={{
              width: 600,
              height: 360,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin />
          </View>
        )}
      </View>
      <Slider
        tipFormatter={null}
        style={{ position: "fixed", bottom: 20, left: 20, width: "95%" }}
        defaultValue={0}
        value={(duration / totalDuration) * 100}
      />
    </View>
  );
}

// messages.map((message) =>
// Object.keys(message) === "lawyer" ? (
//   <h1>{Object.values(message)}</h1>
// ) : (
//   <p>{Object.values(message)}</p>
// )
// ) : <h1>NO CHATS AVAILABLE</h1>
