import * as actionTypes from "../actions";

const initialUserData = {
  userInfo: "",
  username: "",
  password: "",
  usertrial: "",
  fulllname: "",
  word: "",
  nextWord: "",
  mobile: "",
  accessKey: null,
  myName: "",
  value: 0,
  checked: "",
  isOnline: false,
  visible: false,
  clientData: null,
  lawyerFirm: "",
  userAgreementVisible: false,
  lawyerSpecialities: [],
  lawyerTier: "",
  ringtone: new Audio("hangouts-incoming-call.mp3"),
  particularCall: ""
};

const globalUserDataReducer = (state = initialUserData, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_DATA:
      let intermediateState = state;
      intermediateState = {
        ...intermediateState,
        ...action.payload.data,
      };
      return intermediateState;
    default:
      return state;
  }
};

export default globalUserDataReducer;
