import chalk from "chalk";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { Headers } from "undici-types";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3400;


app.use(express.json());
app.use("*",(req,res,next)=>
{
    next();
})

const currentDirectory = process.cwd();

app.listen(PORT, () => console.log(chalk.green(`Server is running on port ${PORT}`)));

// Default route
app.get("/", (req, res) => 
{
    res.sendFile(path.join(currentDirectory, "index.html"));
}
)

// Middleware for handling errors
app.use("*", (req, res, next) => {
    res.statusMessage = "Error";
    next();
});

// Middleware to handle 404 errors
app.use("*", (req, res) => {
    res.status(404).sendFile(path.join(currentDirectory, "Error.html"));
});
