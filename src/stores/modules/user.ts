import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      id: "admin",
      name: "admin",
      roles: [],
    },
  }),
  getters: {
    getUserId: (state) => state.user.id,
  },
  actions: {
    setUser(payload: any) {
      this.user = payload;
    },
  },
});
