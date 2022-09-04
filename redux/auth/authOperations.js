import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, changeAuthStatus, authSignOut, updateUserAvatar } =
  authSlice.actions;

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const userAvatar = getState().auth.userAvatar;

      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      await updateProfile(user, { displayName: login, photoURL: userAvatar });

      const updateUser = auth.currentUser;
      
      const userUpdateProfile = {
        userId: updateUser.uid,
        login: updateUser.displayName,
        avatar: updateUser.photoURL,
        email: updateUser.updateUser,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);

  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        login: user.displayName,
        avatar: user.photoURL,
        email: user.email,
      };

      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(changeAuthStatus({ authStatus: true }));
    }
  });
};

export const changeAvatarUser = (avatar) => async (dispatch, getState) => {
  const user = auth.currentUser;
  if (user) {
    await updateProfile(user, { photoURL: avatar });
  }

  dispatch(updateUserAvatar({ avatar }));
};
