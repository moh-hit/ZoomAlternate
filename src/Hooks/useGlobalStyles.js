import { StyleSheet } from "react-native";
const useGlobalStyles = () => {
  const styles = StyleSheet.create({
    logo: {
      height: 80,
    },
    button: {
      display: "flex",
      alignItems: "center",
      paddingHorizontal: 8,
      paddingVertical: 10,
      textAlign: "center",
    },
    header: {
      padding: 20,
    },
    image: {
      marginHorizontal: "auto",
      marginVertical: 20,
      textAlign: "center",
      maxWidth: "100%",
      cursor: "pointer",
    },
    title: {
      fontWeight: "bold",
      fontSize: "1.6rem",
      marginVertical: "0.5em",
      textAlign: "center",
    },
    achintya: {
      fontSize: "2rem",
      textAlign: "center",
      color: "black",
      fontFamily: "sans-serif, monospace, monospace",
      fontWeight: "bold",
    },
    text: {
      lineHeight: "1.5em",
      fontSize: "1.125rem",
      marginVertical: "1em",
      textAlign: "center",
      fontFamily: "sans-serif, monospace, monospace",
    },
    titleHeader: {
      textAlign: "center",
      fontWeight: "bold",
      color: "white",
      fontSize: "1.25rem",
    },
    profilePic: {
    width:'50',
    height:'50',
    
  },
    link: {
      color: "#1B95E0",
    },
    code: {
      fontFamily: "sans-serif, monospace, monospace",
    },
    error: {
      color: "red",
    },
  });
  return styles;
};

export default useGlobalStyles;
