import { createStore } from "../utils/reflux-dva";
import { default as homeModel } from "../pages/home-dva/model";
import { default as addressModel } from "../pages/address-dva/model";

export const { Store, Actions } = createStore(homeModel, addressModel)
