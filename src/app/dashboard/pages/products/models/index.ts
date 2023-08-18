export interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    categoryId: number,
    stock: number,
}

export interface CreateProductData {
    name: string,
    description: string,
    price: number,
    stock: number,
    categoryId: number
}

export interface UpdateProductData {
    id?: number,
    name?: string,
    description?: string,
    price?: number,
    stock?: number,
    categoryId?: number
}