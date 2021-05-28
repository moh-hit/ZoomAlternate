import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Spin } from "antd";
import firebase from "../../../firebase_config";
import FirmLawyerRevenueTable from "../FirmHistoryTable/FirmLawyerRevenueTable";

export default function FirmHome({ fullHeight, fullWidth }) {
  const userId = firebase.auth().currentUser.uid;

  const [accountBalance, setAccountBalance] = useState("");

  useEffect(() => {
    console.log("IN FIRM HOME");
    firebase
      .database()
      .ref(`Firms/${userId}/balance`)
      .on("value", (snap) => {
        if (snap.val()) {
          setAccountBalance(snap.val());
        } else {
          setAccountBalance("0");
        }
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 30,
      }}
    >
    <h1 style={{fontSize: 60, color: "#19456b"}}>LAWYERS AT WORK</h1>
      <h1 style={{ marginBottom: 30, color: "#000" }}>
        Firm Balance: $ {accountBalance != "" ? accountBalance : <Spin />}
      </h1>
      <FirmLawyerRevenueTable />
    </View>
  );
}
