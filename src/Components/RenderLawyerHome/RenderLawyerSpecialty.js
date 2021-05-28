import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Menu, Button, Card, Dropdown, Col, Row } from "antd";
import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import { Text, View } from "react-native";
import useGlobalStyles from "../../Hooks/useGlobalStyles";
import { lawyerSpecialties } from "../utils/LawyerSpecialtiesList";
import { TrophyFilled } from "@ant-design/icons";
import firebase from "firebase";
import useActionDispatcher from "../../Hooks/useActionDispatcher";
import { useSelector } from "react-redux";
import {
  SET_KEYS_TRUE,
  UPDATE_USER_DATA,
  SET_DASHBOARDKEYS_TRUE,
} from "../../Store/actions";

const RenderLawyerSpecialty = ({ state }) => {
  const globalStyles = useGlobalStyles();

  const userData = useSelector((data) => data.globalUserData);
  const dispatchAction = useActionDispatcher();

  const [specialty, setSpecialty] = useState(state?.lawyerSpecialties ?? []);
  const handleMenuClick = (e) => {
    if (!specialty.includes(lawyerSpecialties[e.key])) {
      setSpecialty((s) => [...s, lawyerSpecialties[e.key]]);
    }
  };
  const handleSubmit = (value) => {
    //update firebase and global state here
    console.log(value);
    dispatchAction(UPDATE_USER_DATA, {
      data: {
        lawyerSpecialities: value,
      },
    });
    firebase
      .database()
      .ref("/Accounts/" + state.username + "/")
      .update({
        specialities: value,
      });
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      {lawyerSpecialties.map((e, i) => (
        <Menu.Item key={i}>{e}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card title="Lawyer Specialty" style={{ width: 600, marginTop: 12 }}>
        <Select
          mode="multiple"
          defaultValue={userData.lawyerSpecialities}
          onChange={handleSubmit}
          style={{
            width: "70%",
            marginLeft: "15%",
            minHeight: 40,
            fontSize: 16,
          }}
          placeholder="Please select specialities"
        >
          {lawyerSpecialties.map(function (item, key) {
            return <Option key={item}>{item}</Option>;
          })}
        </Select>
      </Card>
    </View>
  );
};

export default RenderLawyerSpecialty;
