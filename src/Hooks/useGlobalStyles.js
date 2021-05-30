import { StyleSheet } from "react-native";
const useGlobalStyles = () => {
  const styles = StyleSheet.create({
    containerLogin: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
    },
    loginLeft: {
      backgroundColor: "#D17EE5",
      marginHorizontal: "8%",
      height: "90vh",
      width: "80%",
      paddingHorizontal: "10%"

    },
    loginRight: {
      height: "100vh",
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingVertical: "5vh"
    },
    logo: {
      fontSize: 28,
      fontWeight: "700",
      paddingVertical: "5%",
      color: "#fff",
      backgroundColor: "#6626EF",
      width: "12vw",
      textAlign: "center"
    },

    loginBanner: {
      marginTop: "5%",
      marginHorizontal: "10%",
      height: "50vh",
      width: "60%"
    },
    bannerT1: {
      fontSize: 40,
      color: "#fff",
      fontWeight: "500",
    },
    bannerT2: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "300",
      marginVertical: 15,
    },
    companyLogo: {
      height: '5vh',
      width: "20%"
    },
    googleLogo: {
      height: "3vh",
      width: "1.5vw"
    },
    googleButton: {
      backgroundColor: "#fff",
      paddingHorizontal: 20,
      paddingVertical: 10,
      width: "20vw",
      height: "6vh",
      shadowColor: "rgba(0, 0, 0, 0.6)",
      shadowOffset: {
        width: 1,
        height: 4,
      },
      shadowOpacity: 0.27,
      shadowRadius: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: "#D8D8D8",
      height: "6vh",
      width: "20vw",
      paddingHorizontal: 10
    },
    resetPassword: {
      fontWeight: 700,
      textDecorationLine: 'underline'
    },
    loginButton: {
      backgroundColor: "#6626EF",
      paddingVertical: "1.5vh"
    },
    loginText: {
      fontSize: 16,
      paddingHorizontal: 40,
      fontWeight: 700,
      color: "#fff",
      textTransform: 'uppercase'
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
      fontWeight: "bold",
    },
    text: {
      lineHeight: "1.5em",
      fontSize: "1.125rem",
      marginVertical: "1em",
      textAlign: "center",
    },
    titleHeader: {
      textAlign: "center",
      fontWeight: "bold",
      color: "white",
      fontSize: "1.25rem",
    },
    profilePic: {
      width: '50',
      height: '50',

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
