import { Product } from "./product";

export class CartItem 
{
    id:number;
    name:string;
    imageUrl:string;
    unitPrice:number;
    quantity:number;

    constructor(product:Product)
    {
        this.id = product.item.id;
        this.name = product.item.name;
        this.imageUrl = product.item.defaultImage;
        this.unitPrice = product.totalPrice;
        this.quantity = 1;
    }


}
