import { prisma } from "../config/prisma.js";
import { AppError } from "../errors/app.error.js";
import type { Product } from "../types/product.type.js";

const products: Product[] = [
    {   id: 1,
        name: "Phone",
        price: 350000
    },
    {   id: 2,
        name: "Macbook",
        price: 10000000
    },
    {   id: 3,
        name: "Bicycle",
        price: 50000
    }
];

export const getProducts = async (): Promise<Product[]> => {
    return await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            price: true
        }
    })
}

export const getProductById = async (id: number): Promise<Product | null> => {
    const product = products.find((product) => product.id === id)
    if(!product) {
        return null
    }
    return product
}

export const deleteProductById = async (id: number) => {
    const index = products.findIndex((prod) => prod.id === id )
    if(index === -1) {
        false
    }
    products.splice(index , 1)
    return true
}