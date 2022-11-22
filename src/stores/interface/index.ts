export interface IuserState {
  name: string;
  avatar: string;
}
export interface Userinfo {
  name: string;
  avatar: string;
  roles: Array<any>;
  permissions: Array<any>;
}
export interface RootStateTypes {
  menu: any;
  couter: any;
  tabs: any;
  theme: any;
  user: Userinfo;
}
