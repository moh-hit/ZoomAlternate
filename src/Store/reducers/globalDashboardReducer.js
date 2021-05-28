import * as actionTypes from "../actions";

const initialDashboardData = {
  userPage: false,
  showLawyerTier: false,
  selectLawyerTier: false,
  showLawyerSpecialities: false,
  selectLawyerFirm: false,
  selectLawyerSpecialities: false,
  showUsername: false,
  videoReplay: false,
  lawyerHome: false,
  collapsed: false,
  specialities2: false,
  signInWithEmail: false,
  aboutUs: false,
  contactUs: false,
  userProfile: false,
  clientDashboard: false,
  clientProfile: false,
  findLawyer: false,
  lawyerDashboard: true,
  lawyerProfile: false,
  walletPage: false,
  meetingLogPage: false,
};

const globalDashboardReducer = (state = initialDashboardData, action) => {
  switch (action.type) {
    case actionTypes.SET_DASHBOARDKEYS_TRUE:
      let intermediateState = { ...state };
      for (const [key] of Object.entries(state)) {
        if (action.payload.keys.includes(key)) {
          intermediateState[key] = true;
          console.log(key);
        } else {
          intermediateState[key] = false;
          console.log(key);
        }
      }

      return intermediateState;
    default:
      return state;
  }
};
export default globalDashboardReducer;
