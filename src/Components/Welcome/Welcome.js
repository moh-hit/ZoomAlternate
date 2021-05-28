import React from "react";
import { View, Image } from "react-native";
import { Button, Spin } from "antd";
import useGlobalStyles from "../../Hooks/useGlobalStyles";
import 'antd/dist/antd.css';
import './welcome.css'

const WelcomePage = ({ fullHeight, fullWidth, setUser, ...props }) => {
  const styles = useGlobalStyles();
  const width = fullWidth*0.3
  const height = fullWidth*0.15
  return (
    <View
          style={{
            width: width,
            marginLeft: fullWidth*0.35,
            borderTopWidth:fullHeight*0.25,
            borderColor: '#ffffff',
            overflow : 'hidden',
          }}
    >
      <View>
        <Image
          style={styles.image}
          source={{ uri: "logo.png", width,height }}
        />
        <Spin />
      </View>
    </View>
  );
};

export default WelcomePage;
