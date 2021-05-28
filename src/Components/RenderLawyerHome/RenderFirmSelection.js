import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";
import { Button, Select } from "antd";
import useGlobalStyles from "../../Hooks/useGlobalStyles";
import { useSelector } from "react-redux";
import useActionDispatcher from "../../Hooks/useActionDispatcher";
import { SET_KEYS_TRUE, UPDATE_USER_DATA } from "../../Store/actions";
import firebase from "firebase";

const { Option } = Select;
const RenderFirmSelection = ({ width, height }) => {
  const styles = useGlobalStyles();
  const state = useSelector((state) => state.globalStateData);
  const userData = useSelector((state) => state.globalUserData);
  const dispatchAction = useActionDispatcher();

  const [firms, setFirms] = useState([]);

  const onSpecialityChange = (value) => {
    dispatchAction(UPDATE_USER_DATA, {
      data: {
        lawyerFirm: value,
      },
    });
  };

  const lawyerSubmit = () => {
    //goto renderuserinfo
    dispatchAction(SET_KEYS_TRUE, {
      keys: ["lawyerHome"],
    });

    //update tier and specialities in firebase
    firebase
      .database()
      .ref("/Accounts/" + userData.username)
      .update({
        lawyerFirm: userData.lawyerFirm,
      });
  };

  useEffect(() => {
    firebase
      .database()
      .ref("AllFirms/")
      .once("value", (snap) => {
        setFirms(Object.values(snap.val()));
      });
  }, []);

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
        style={{
          width: "70%",
          marginLeft: "15%",
          minHeight: 40,
          fontSize: 16,
        }}
        placeholder="Please Select Firm"
        onChange={onSpecialityChange}
      >
        <Option key="self">Not a Firm Lawyer</Option>
        {firms &&
          firms.map(function (item, key) {
            return <Option key={item}>{item}</Option>;
          })}
      </Select>
      <Button
        type="primary"
        style={{
          marginLeft: "15%",
          width: "70%",
          height: 40,
          fontSize: 16,
          backgroundColor: "#172A55",
          border: "none",
          marginTop: "2%",
        }}
        onClick={lawyerSubmit}
      >
        Submit
      </Button>
    </View>
  );
};

export default RenderFirmSelection;
