export interface User{
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface Product{
    id: string,
    imagePath: string,
    name: string,
    price: number,
    quantity?: number,
    promotinalPrice: number,
    percentageOff?: string,
    isBestSeller: boolean,
    isFreghtFree: boolean
}

export interface Order{
    id: string,
    products: Product[],
    createdAt: string,
    finalPrice: number
}

export interface Banners{
    id: string,
    imagePath: string,
    name: string
}

export interface FeedbackInterface{
    id: number,
    name: string,
    message: string,
    create_date: string
}