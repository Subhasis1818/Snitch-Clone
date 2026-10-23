import { body, validationResult } from "express-validator";

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
    .isIn(["INR","USD"]).withMessage("Currency either be INR or USD"),
    body("sizes")
    .exists().withMessage("Sizes are required")
    .isArray().withMessage("Sizes must be an array of object")
    ,
    body("sizes.*.size")
    .exists().withMessage("Size must be present in every entry in the sizes array").bail()
    .isString().withMessage("Size must be a string").bail()
    .trim()
    .isIn(["XS","S","M","L","XL","XXL"]).withMessage("Size can be one of these XS,S,M,L,XL,XXL.")
    ,
    body("sizes.*.stock")
    .exists().withMessage("stock must be present in every entry of the sizes of the array").bail()
    .isIn({min:0}).withMessage("Stock must be a integer value").bail()
    ,
    (req,res,next)=>{
       const errors=validationResult(req)
       if(!errors.isEmpty()){
            return res.status(400).json({
                message:"Invalid request",
                errors:errors.array()
            })
       }
       next()
    }


]
export default createProductValidator;