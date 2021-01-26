import { Product } from "./product";

export class CartItem 
{
    id:number;
    name:string;
    imageUrl:string;
    unitPrice:number;
    quantity:number;
    selectedQuantity:number;
    unit:string;

    constructor(product:Product)
    {
        this.id = product.item.id;
        this.name = product.item.name;
        this.imageUrl = product.imageUrl1;
        this.unitPrice = product.unitPrice;
        this.quantity = product.totalQuantity;
        this.selectedQuantity ;
        this.unit = product.item.unit;
    }


}
