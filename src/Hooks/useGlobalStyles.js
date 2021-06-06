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
      paddingLeft: 40,
      fontWeight: 700,
      color: "#fff",
      textTransform: 'uppercase'
    },


    navbar: {
      gridColumn: "1 / 3",
      gridRow: "1 / 2",
      display: "flex",
      minHeight: "10vh",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: "2vh",
      borderBottomWidth: 1,
      borderBottomColor: "#EAEAEA",
      paddingHorizontal: "3vw"
    },
    companyLogoNav: {
      height: '3.5vh',
      width: "7.5vw"
    },
    logoNav: {
      fontSize: 16,
      fontWeight: "700",
      textAlign: "center"
    },
    userProfileNav: {
      height: "5vh",
      width: "5vh",
      borderRadius: "100%",
      marginLeft: "2vw"
    },

    sidebarContainer: {
      height: "90vh",
      paddingLeft: "2vw",
      paddingRight: "1.5vw",
      paddingTop: "3vh",
      justifyContent: "space-between",
      alignItems: "flex-start",
      borderRightWidth: 1,
      borderRightColor: "#EAEAEA"
    },
    sidebarPrimaryBut: {
      paddingVertical: "1.5vh",
      paddingHorizontal: "1vw",
      marginBottom: "3vh"
    },
    sidebarPrimaryButText: {
      fontSize: 16,
      paddingLeft: "1vw",
      fontWeight: 700,
      color: "#fff",
    },
    sidebarSecBut: {
      paddingVertical: "1.5vh",
      paddingHorizontal: "1vw",
      marginBottom: "1vh"
    },
    sidebarSecButText: {
      fontSize: 14,
      fontWeight: 600,
    },

    adBanner: {
      backgroundColor: "#FFF8F1",
      padding: "2vh",
      justifyContent: "space-between",
      alignItems: "flex-start",
      minHeight: "15vh"
    },
    adBannerT1: {
      fontWeight: "700"
    },
    adBannerT2: {
      fontSize: 12
    },
    adBannerBtn: {
      fontWeight: 700,
      textDecorationLine: 'underline'
    },

    schldCard: {
      minHeight: "30vh",
      width: "18vw",
      padding: "2vh",
      borderWidth: 1,
      borderColor: "#E8E8E8",
      marginVertical: 20,
      justifyContent: "space-between"
    },
    schldCardT1: {
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      fontSize: 20,
      fontWeight: "700",
      marginBottom: "1vh"
    },
    schldCardT2: {
      fontWeight: 500
    },
    schldCardT3: {
      marginTop: "2vh",
      fontSize: 12,
      color: "rgba(0,0,0,0.5)"
    },
    schldCardT4: {
      fontSize: 12,
      fontWeight: "500",
      lineHeight: 24
    },
    schldCardActionContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderTopWidth:1,
      borderTopColor: "#E9E9E9",
      paddingTop: "1vh"
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
