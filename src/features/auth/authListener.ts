import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { store } from "@/app/store";
import { setUser } from "./authSlice";

export const initializeAuthListener = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.dispatch(setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || null,
        photoURL: user.photoURL || null,
      }));
    } else {
      store.dispatch(setUser(null));
    }
  });
};