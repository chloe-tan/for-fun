import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext([{}, () => { }, () => { }]);

export function useStore() {
  return useContext(StoreContext);
}

type Store = {
  loggedIn: boolean;
  userInfo: null | object;
}

const defaultStore = {
  loggedIn: false,
  userInfo: null,
} as Store;

export function WithStore({ children }: { children: ReactNode }) {
  const [store, setStore] = useState(defaultStore);
  const [reloadCounter, setReloadCounter] = useState(0);
  const refreshStore = () => setReloadCounter((prev) => prev + 1);

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     const userId = localStore.get(USER_ID);
  //     const authData = localStore.get(AUTH_DATA);
  //     if (userId && authData) {
  //       let userBlob = await fetchUser(userId, JSON.parse(authData), () =>
  //         stdLogout(setStore, () => router.push("/login"))
  //       );
  //       if (!userBlob || !userBlob.id) {
  //         console.log(userBlob);
  //         return;
  //       }
  //       setStore((prev) => {
  //         return {
  //           ...prev,
  //           userInfo: {
  //             userId: userBlob.id,
  //             avatarUrl: userBlob.avatarUrl,
  //             userName: userBlob.userName,
  //             authData: JSON.parse(authData),
  //             tenantId: userBlob.tenantId,
  //             tenantName: userBlob.tenantName,
  //             tenantList: [...(userBlob?.tenantList || [])],
  //             role: userBlob.role,
  //             emailNotificationDisabled: userBlob.emailNotificationDisabled,
  //             userConfig: userBlob.userConfig,
  //             version: userBlob.version,
  //             theme: userBlob.theme,
  //             preferredLanguage: language,
  //             certikTeamId: userBlob.certikTeamId,
  //             slackNotificationDisabled: userBlob.slackNotificationDisabled,
  //             department: userBlob.department,
  //             jobTitle: userBlob.jobTitle,
  //             telegramId: userBlob.telegramId,
  //           },
  //         };
  //       });
  //     }
  //   };
  // }, [store.loggedIn, reloadCounter]);

  return (
    <StoreContext.Provider value={[store, setStore, { refreshStore }]}>
      {children}
    </StoreContext.Provider>
  );
}
