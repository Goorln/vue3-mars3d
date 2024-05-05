import { defineStore } from "pinia";
import { storage, createStorage } from "@/utils/Storage";
import { store } from "@/store";
import {
  ACCESS_TOKEN,
  CURRENT_USER,
  IS_LOCKSCREEN,
} from "@/store/mutation-types";
import { login } from "@/api/system/user";

const Storage = createStorage({ storage: localStorage });

export interface IUserState {
  token: string;
  username: string;
  welcome: string;
  avatar: string;
  permissions: any[];
  info: any;
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): IUserState => ({
    token: Storage.get(ACCESS_TOKEN, ""),
    username: "",
    welcome: "",
    avatar: "",
    permissions: [],
    info: Storage.get(CURRENT_USER, {}),
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getNickname(): string {
      return this.username;
    },
    getPermissions(): [any][] {
      return this.permissions;
    },
    getUserInfo(): object {
      return this.info;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setAvatar(avatar: string) {
      this.avatar = avatar;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
    setUserInfo(info) {
      this.info = info;
    },
    // 登录
    async login(userInfo) {
      try {
        const response = await login(userInfo);

        const code = response.code;
        if (code === 200) {
          const { sysUserEntity, token } = response.data;
          const ex = 7 * 24 * 60 * 60 * 1000;
          storage.set(ACCESS_TOKEN, token, ex);
          storage.set(CURRENT_USER, sysUserEntity, ex);
          storage.set(IS_LOCKSCREEN, false);
          this.setToken(token);
          this.setUserInfo(sysUserEntity);
        }
        return Promise.resolve(response);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    // 获取用户信息
    GetInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            console.log("login", res);
            const result = res.data;
            if (result.permissions && result.permissions.length) {
              const permissionsList = result.permissions;
              this.setPermissions(permissionsList);
            }
            this.setUserInfo(result);
            this.setAvatar(result.avatar);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 登出
    async logout() {
      this.setPermissions([]);
      this.setUserInfo("");
      storage.remove(ACCESS_TOKEN);
      storage.remove(CURRENT_USER);
      return Promise.resolve("");
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store);
}
