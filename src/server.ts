import express from "express"
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"
import authRouter from "./routes/auth.routes.js"
import orderRouter from "./routes/order.routes.js"
import { errorHandler } from "./middleware/error.middleware.js"
import helmet from "helmet"
// cors does not currently provide bundled TypeScript declarations.
// @ts-expect-error -- use the package's JavaScript implementation.
import cors from "cors";
import rateLimit from "express-rate-limit"




const app = express()
//use to parse a request body into json 
app.use(express.json())
app.use(helmet())
app.use(cors({
    origin: "http://localhost:5173"
}))


app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/auth", authRouter)
app.use("/orders", orderRouter)


app.use(errorHandler)


app.listen(3000, () => console.log("Server running on port 3000"))