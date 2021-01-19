import { CartItem } from "../common/cart-item";

export class OrderItem {
    unitPrice: number;
    quantity: number;
    productId: number;

    constructor(cartItem: CartItem) {
        this.quantity = cartItem.quantity;
        this.unitPrice = cartItem.unitPrice;
        this.productId = cartItem.id;
    }
}
