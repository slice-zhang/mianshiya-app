import UserRoleEnum from "@/access/accessEnum";
import { UserData } from "@/api/user/type";
import { createSlice } from "@reduxjs/toolkit";
import userAvatar from "../../public/avatar.webp";
export const DEFAULT_USER: Partial<UserData> = {
  id: 0,
  username: "游客",
  user_avatar: userAvatar,
  user_role: UserRoleEnum.NOT_AUTH,
};

const userLogin = createSlice({
  name: "userLogin",
  initialState: DEFAULT_USER,
  reducers: {
    setUserInfo(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUserInfo } = userLogin.actions;
export default userLogin.reducer;
