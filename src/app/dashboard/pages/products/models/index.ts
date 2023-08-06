export interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    stock: number,
}

export interface CreateProductData {
    name: string,
    description: string,
    price: number,
    stock: number,
}

export interface UpdateProductData {
    id?: number,
    name?: string,
    description?: string,
    price?: number,
    stock?: number,
}