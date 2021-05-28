import React from "react";
import { View } from "react-native";
import UserProfile from '../UserProfile/UserProfile';
import RenderLawyerSpecialty from "./RenderLawyerSpecialty";
import RenderLawyerTierSelection from "./RenderLawyerTierSelection";

const RenderLawyerProfile = ({ state }) => {
  return (
    <View
      style={{
        maxWidth: "100%",
        margin: "auto",
        top: "5%",
      }}
    >
      <UserProfile state={state} />
      <RenderLawyerTierSelection state={state} />
      <RenderLawyerSpecialty state={state} />
    </View>
  );
};

export default RenderLawyerProfile;
