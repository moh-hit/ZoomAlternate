import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Menu, Button, Card, Dropdown, Col, Row } from "antd";
import { lawyerYearsOfQualifications } from "../utils/LawyerYearsOfQualificationOption";
import { Text, View } from "react-native";
import useGlobalStyles from "../../Hooks/useGlobalStyles";
import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import firebase from "firebase";
import useActionDispatcher from "../../Hooks/useActionDispatcher";
import { useSelector } from "react-redux";
import {
  SET_KEYS_TRUE,
  UPDATE_USER_DATA,
  SET_DASHBOARDKEYS_TRUE,
} from "../../Store/actions";

const RenderLawyerTierSelection = ({ state }) => {

  const userData = useSelector((data) => data.globalUserData);
  const dispatchAction = useActionDispatcher();
  const [qualification, setQualification] = useState(
    state?.lawyerTier ?? lawyerYearsOfQualifications[0]
  );
  const globalStyles = useGlobalStyles();
  const handleMenuClick = (e) => {
    setQualification(lawyerYearsOfQualifications[e.key]);
  };
  const handleSubmit = (value) => {
    //update firebase and global state here
    console.log(value)
    dispatchAction(UPDATE_USER_DATA, {
      data: {
        lawyerTier: value,
      },
    });
    firebase.database().ref("/Accounts/" + state.username+"/").update({
      tier:value
  });
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      {lawyerYearsOfQualifications.map((e, i) => (
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
  >    <Card title="Lawyer Qualification" style={{ width: 600, marginTop: 12 }}>
    <Select
      showSearch
      style={{ width: "70%", marginLeft: "15%", height: 40, fontSize: 16 }}
      placeholder="Years of qualification"
      optionFilterProp="children"
      defaultValue={userData.lawyerTier}
      onChange={handleSubmit}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Option value="X">LawMax X (1-7 years)</Option>
      <Option value="XL">Lawmax XL (8-16)</Option>
      <Option value="EXEC">Lawmax EXEC (>16)</Option>
    </Select>

    </Card>
    </View>
  );
};

export default RenderLawyerTierSelection;
