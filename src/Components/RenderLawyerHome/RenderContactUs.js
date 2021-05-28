import React from "react";
import { View, Text, Image } from "react-native";
import useGlobalStyles from "../../Hooks/useGlobalStyles";

const RenderContactUs = () => {
  let width = (window.innerWidth * 9) / 10;
  if (width > 400) width = 400;
  let height = width * (200 / 400);
  const styles = useGlobalStyles();
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
      <View style={{ height: 300 }}>
        <h2>CONTACT US</h2>
        <Image
          onClick={() => {
            window.location.href = "/";
          }}
          style={styles.image}
          source={{ uri: "logo.png", width, height }}
        />
      </View>
      <Text style={styles.text}>
        Venture in early stages but making rapid progress
      </Text>
    </View>
  );
};

export default RenderContactUs;
