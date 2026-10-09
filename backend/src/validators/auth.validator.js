import {body, validationResult} from "express-validator"
export const registerValidator=[
    body("email")
    
    .exists()
    .withMessage("Email is required").bail()
    .trim()
    .isEmail().withMessage("Enter a valid Email address"),

    body("name")
    .exists()
    .withMessage("Name is required").bail()
    .trim()
    .isLength({min:2,max:50}).withMessage("Name length must b/w 2 to 50"),
    body("password")
    .exists().withMessage("Password is required").bail()
    .trim()
    .isLength({min:6}).withMessage("Password must be minimum 6 character long"),
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
export const loginValidator=[
    body("email")
        .exists().withMessage("Email is required").bail()
        .isString().withMessage("Email must be a String").bail()
        .trim()
        .isEmail().withMessage("Enter a valid Email"),
    body("password")
        .exists().withMessage("Password is Incomplete").bail()
        .isString().withMessage("Password must be a String")
        .trim()
        .isLength({min:6}).withMessage("Password atleast 6 characters long"),
        (req,res,next)=>{
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    message:"Invalid Data",
                    errors:errors.array()
                })
            }
            next()
        }
]