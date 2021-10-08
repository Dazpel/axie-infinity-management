import { onAuthStateChanged } from "@firebase/auth";
import { DocumentData } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { fetchUserDetails } from "../../utils/functions";
import { useAppDispatch } from "../store/hooks";
import { updateManagerOnLogin } from "../store/slices/managerSlice";
import { firebaseAuth } from "./fbConfig";

interface authContext {
  currentUser: undefined | DocumentData;
  isAuthenticated?: Boolean;
  pending?: Boolean;
  setCurrentUser?: React.Dispatch<React.SetStateAction<undefined>>;
}
interface props {
  children: React.ReactNode;
}

export const AuthContext = React.createContext<authContext>({
  currentUser: undefined,
});

export const AuthProvider = (props: props) => {
  const [currentUser, setCurrentUser] = useState<undefined | DocumentData>(
    undefined
  );
  const [pending, setPending] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (currentUser: any) => {
      if (currentUser) {
        let res = await fetchUserDetails(currentUser.uid);
        if (res.success) {
          setCurrentUser(res.data);
          let payload = {
            uid: currentUser.uid,
            name: res?.data?.name,
            email: res?.data?.email,
            isGreeted: res?.data?.isGreeted,
            scholarsId: res?.data?.scholarsId,
            roninAddress: res?.data?.roninAddress,
            walletAddress: res?.data?.walletAddress,
            profilePicture: res?.data?.profilePicture,
            academySettings: res?.data?.academySettings,
          };
          dispatch(updateManagerOnLogin(payload));
          setPending(false);
        } else {
          setCurrentUser(undefined);
          setPending(false);
        }
      } else {
        setCurrentUser(undefined);
        setPending(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: currentUser !== undefined,
        setCurrentUser,
        pending,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
