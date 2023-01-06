export interface IUser {
  name: string;
  email: string;
  isAdmin: boolean;
}
export type IUserRes = IUser & {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type IProduct = {
  name: string;
  price: string;
  count: string;
  image: string;
  description: string;
};
export type IProductRes = IProduct & {
  id: number;
  createdAt: string;
  updatedAt: string;
};
