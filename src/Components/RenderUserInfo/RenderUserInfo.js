import React, { useEffect, useState } from 'react'
import useGlobalStyles from "../../Hooks/useGlobalStyles";
import { View, Text } from "react-native";
import { Input, Button } from "antd";
import { useSelector } from "react-redux";
import { SET_KEYS_TRUE, UPDATE_USER_DATA } from "../../Store/actions";
import useActionDispatcher from "../../Hooks/useActionDispatcher";
import  firebase from "firebase";
const RenderUserInfo = ({

  width,
  height,

}) => {
  const styles = useGlobalStyles();
  const state = useSelector((state) => state.globalStateData)
  const userData = useSelector((state) => state.globalUserData);
  const [mobile, setMobile] = useState(true);
  const [city, setCity] = useState(true);
  const [firm, setFirm] = useState(true);
  const [firmAddress, setFirmAddress] = useState(true);
  const [registrationNumber, setRegistrationNumber] = useState(true);
  const dispatchAction = useActionDispatcher();

  const onInputChange = (e) => {
      console.log('input change',e)
    };
  const profileSubmit = () => {
    if (userData.isLawyer) {
      // goto lawyer home
      //update firebase with city, mobile, firm, firm address, registration number
    } else {
      //goto client home
      dispatchAction(SET_KEYS_TRUE, {
            keys: ["clientHome"],
          });
      //update city and mobile number of client
      console.log('client home next')
    }
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
      <Text style={styles.title}>Profile</Text>
      <Input
        style={{
          marginLeft: "15%",
          width: "70%",
          height: 40,
          fontSize: 16,
          marginTop: "2%",
        }}
        type="text"
        onChange={onInputChange}
        value={userData.email}
        name="email"
        placeholder="Email"
        required
      />
      <Input
        style={{
          marginLeft: "15%",
          width: "70%",
          height: 40,
          fontSize: 16,
          marginTop: "2%",
        }}
        type="text"
        onChange={onInputChange}
        value={mobile}
        name="mobile"
        placeholder="Mobile Number"
        required
      />
      <Input
        style={{
          marginLeft: "15%",
          width: "70%",
          height: 40,
          fontSize: 16,
          marginTop: "2%",
        }}
        type="text"
        onChange={onInputChange}
        value={city}
        name="city"
        placeholder="city"
        required
      />
      {userData.isLawyer ? (
          <div>
        <Input
          style={{
            marginLeft: "15%",
            width: "70%",
            height: 40,
            fontSize: 16,
            marginTop: "2%",
          }}
          type="text"
          onChange={onInputChange}
          value={firm}
          name="firm"
          placeholder="Firm"
          required
        />
        <Input
          style={{
            marginLeft: "15%",
            width: "70%",
            height: 40,
            fontSize: 16,
            marginTop: "2%",
          }}
          type="text"
          onChange={onInputChange}
          value={firmAddress}
          name="firmAddress"
          placeholder="Firm Address"
          required
        />
        <Input
          style={{
            marginLeft: "15%",
            width: "70%",
            height: 40,
            fontSize: 16,
            marginTop: "2%",
          }}
          type="text"
          onChange={onInputChange}
          value={registrationNumber}
          name="registrationNumber"
          placeholder="SRA Number"
          required
        /></div>
      ) : null}
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
        onClick={profileSubmit}
      >
        Submit
      </Button>
    </View>
  );
};

export default RenderUserInfo;
