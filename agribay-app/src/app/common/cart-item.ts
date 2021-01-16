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
        this.imageUrl = product.imageUrl1;
        this.unitPrice = product.unitPrice;
        this.quantity = 1;
    }


}
