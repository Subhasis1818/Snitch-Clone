import { body } from "express-validator";

export const createProductValidator=[
    body("title")
    .exists().withMessage("Title is required").bail()
    .isString().withMessage("TItle must be a string").bail()
    .trim()
    .isLength({min:2,max:100}).withMessage("Title must between 2 to 100").bail()
    .isAlpha("en-US",{ignore:" "}).withMessage("Title cam only have english small case and capital case character"),
    body("description")
    .exists().withMessage("Description is required").bail()
    .isString().withMessage("Description must be a string").bail()
    .trim()
    .isLength({min:10 ,max:500}).withMessage("Description length mudt between 20 to 500 characters"),
    body("price.amount")
    .exists().withMessage("price amount is required")
    .isFloat({min:0}).withMessage("price must be Float and must be greater than zero"),
    body("price.currency")
    .exists().withMessage("Currency is required").bail()
    .isString().withMessage("Currency must be String")
    .isIn(["INR","USD"]).withMessage("Currency either be INR or USD")
]