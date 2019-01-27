import { UserDetail } from "../models/user.module"
import { ShoppingCart } from "../models/shopping-cart.model";
export class Order {

    constructor(
        public userId?: string,
        public cartProducts?: ShoppingCart,
        public totalCartPrice?: number,
        public currency?: string,
        public userDetail?: UserDetail,
        public date?: string,
        public paymentMethod?: string) { }
}