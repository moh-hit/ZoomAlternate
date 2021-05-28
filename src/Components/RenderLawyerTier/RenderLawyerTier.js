import React from "react";
import { View, Image } from "react-native";
import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import useGlobalStyles from "../../Hooks/useGlobalStyles";
import useActionDispatcher from "../../Hooks/useActionDispatcher";
import  firebase from "firebase";
import { useSelector } from "react-redux";
import { SET_KEYS_TRUE, UPDATE_USER_DATA } from "../../Store/actions";

const RenderLawyerTier = ({ width, height }) => {
  const styles = useGlobalStyles();
  const state = useSelector((state) => state.globalStateData)
  const userData = useSelector((state) => state.globalUserData);
  const dispatchAction = useActionDispatcher();
  const onTierChange = (value) => {
    //goto render lawyerSpecialiti
    //set global state of layer tier
    dispatchAction(SET_KEYS_TRUE, {
          keys: ["showLawyerSpecialities"],
        });
    dispatchAction(UPDATE_USER_DATA, {
          data: {
            lawyerTier:value
          },
        });
  };
  return (
    <View
      style={{
        maxWidth: "100%",
        width: width,
        height: "100%",
        margin: "auto",
        top: "20%",
      }}
    >
      <View style={{ height: 240 }}>
        <Image
          onClick={() => {
            window.location.href = "/";
          }}
          style={styles.image}
          source={{ uri: "logo.png", width, height }}
        />
      </View>

      <Select
        showSearch
        style={{ width: "70%", marginLeft: "15%", height: 40, fontSize: 16 }}
        placeholder="Years of qualification"
        optionFilterProp="children"
        onChange={onTierChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="X">LawMax X (1-7 years)</Option>
        <Option value="XL">Lawmax XL (8-16)</Option>
        <Option value="EXEC">Lawmax EXEC (>16)</Option>
      </Select>
    </View>
  );
};

export default RenderLawyerTier;
