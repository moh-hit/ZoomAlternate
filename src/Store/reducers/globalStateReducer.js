import * as actionTypes from "../actions";

const initialState = {
    landingPage: false,
      welcomePage: true,
      showPassword: false,
      showUserInfo: false,
      userPage: false,
      showLawyerTier: false,
      selectLawyerTier: false,
      selectLawyerFirm: false,
      showLawyerSpecialities: false,
      selectLawyerSpecialities: false,
      showUsername: false,
      videoReplay: false,
      lawyerHome: false,
      clientHome:false,
      clientProfile: false,
      collapsed: false,
      specialities2: false,
      signInWithEmail: false,
      userProfile: false,
      clientDashboard: false,
      findLawyer: false,
      lawyerDashboard: false,
      lawyerProfile : false,
      meetingLogPage: false,
      showParticularCall: false,



      firmLandingPage: false,
      firmHome: false
};

const globalStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_KEYS_TRUE:
      let intermediateState = { ...state };
      for (const [key] of Object.entries(state)) {
        if (action.payload.keys.includes(key)) {
          intermediateState[key] = true;
          console.log('set true', key)
        } else {
          intermediateState[key] = false;
        }
      }

      return intermediateState;
    default:
      return state;
  }
};

export default globalStateReducer;
