import React from "react";
import { View } from "react-native";
import UserProfile from "../UserProfile/UserProfile";

const RenderClientProfile = ({ state }) => {
  return (
    <View
      style={{
        maxWidth: "100%",
        height: "100%",
        margin: "auto",
        top: "5%",
      }}
    >
      <UserProfile state={state} />
    </View>
  );
};

export default RenderClientProfile;
