import { RootState } from "./reducers";

export const getUserName = (state: RootState) => state.user.user?.user_name;
export const getUserEmail = (state: RootState) => state.user.user?.email;
