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
import  rateLimit from "express-rate-limit"
// morgan does not currently provide bundled TypeScript declarations.
// @ts-expect-error -- use the package's JavaScript implementation.
import morgan from "morgan"
//use the morgan dependency to log request in the terminal
//it helps for development and it can help when debugging if a client has failed request it can pin point to the area




const app = express()
//use to parse a request body into json 

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100
});
//limiter can be use in specific routers or the entire app
app.use(limiter)
app.use(express.json({
    limit: "10mb"
}))
//addition express.json limiting body size it is optional to put limit in the express.json
app.use(helmet())
app.use(morgan("dev"))
app.use(cors({
    origin: "http://localhost:5173"
}))



app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/auth", authRouter)
app.use("/orders", orderRouter)


app.use(errorHandler)


app.listen(3000, () => console.log("Server running on port 3000"))