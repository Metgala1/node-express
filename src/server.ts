import express from "express"
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"
import authRouter from "./routes/auth.routes.js"
import { errorHandler } from "./middleware/error.middleware.js"

const app = express()
//use to parse a request body into json 
app.use(express.json())


app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/auth", authRouter)


app.use(errorHandler)


app.listen(3000, () => console.log("Server running on port 3000"))