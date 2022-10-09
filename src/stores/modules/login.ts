import { defineStore } from "pinia";
interface IRouterData {
  data: any[];
}
export const useLoginStore = defineStore("login", {
  state: () => ({
    login: {
      token: "",
    },
  }),
  getters: {
    getRoutes: (state):any => {
      return [];
    },
  },
  actions: {
    getNewRoutes: () => {
      return new Promise<IRouterData>((resolve) => {
        resolve({ data: [] });
      });
    },
  },
});
