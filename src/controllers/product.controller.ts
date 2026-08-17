import type { Request, Response } from "express"
import { getProducts, getProductById, deleteProductById } from "../services/product.service.js"
import { AppError } from "../errors/app.error.js"


export const getProductsController = async (req: Request , res: Response) => {
    const products = await getProducts()
    res.json(products)

}

export const getProductByIdController = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const product = await getProductById(id)
    if(!product) {
       return res.status(404).json({message: "Product not found"})
    }
    res.json(product)
}

export const deleteProductController = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const deleted = await deleteProductById(id)

    if(!deleted) {
        throw new AppError("Product not found", 404)
    }
    res.status(200).json({
        message: "Product deleted successfully"
    })
}