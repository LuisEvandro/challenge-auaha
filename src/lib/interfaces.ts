export interface User{
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface Product{
    id: number,
    imagePath: string,
    name: string,
    price: number,
    quantity: number,
    promotinalPrice?: number,
    percentageOff?: string,
    isBestSeller: boolean,
    isFreghtFree: boolean
}

export interface Order{
    id: number,
    products: Product[],
    createdAt: string,
    finalPrice: number
}

export interface Banners{
    id: number,
    imagePath: string,
    name: string
}