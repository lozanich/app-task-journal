import Swal from "sweetalert2";
import { firebase, googleAuthProvider } from "../firebase/firebaseConfig";
import { types } from "../types/types";
import { endLoadingAction, startLoadingAction } from "./ui";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    // setTimeout(() => {
    //   dispatch(login(987456, "Lozano"));
    // }, 3500);
    dispatch(startLoadingAction());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        console.log(user);

        const { uid, displayName } = user;
        dispatch(login(uid, displayName));
        dispatch(endLoadingAction());
      })
      .catch((e) => {
        console.log(e);
        dispatch(endLoadingAction());
        Swal.fire("Error", e.message, "error");
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    console.log(email, password, name);
    console.log(dispatch);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });

        const { uid, displayName } = user;
        dispatch(login(uid, displayName));
      })
      .catch((e) => {
        console.log(e);
        Swal.fire("Error", e.message, "error");
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        const { uid, displayName } = user;
        dispatch(login(uid, displayName));
      });
  };
};

export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
    },
  };
};

export const startLogout = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(logout());
      });
  };
};

export const logout = () => {
  return {
    type: types.logout,
  };
};
