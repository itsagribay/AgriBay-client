export class Product {
    id: number;
    seller: number;
    sellerAddress: string;
    unitPrice: number;
    totalQuantity: number;
    imageUrl1: string;
    imageUrl2: string;
    description: string;
    item: {
        id: number;
        name: string;
        category: string;
        unit: string;
        defaultImage: string;
    };
    totalPrice: number;
}