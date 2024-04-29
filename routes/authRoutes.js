import express  from "express"
import {loginController, registerController,testController,forgotPasswordController,userController} from "../conterollers/authController.js";
import {isAdmin, requireSignIn} from "../middlewares/authMiddleware.js"

const router = express.Router()

//routing
//resgister
router.post('/register', registerController)

//login || post
router.post('/login', loginController)

//forgot-password
router.post('/forgot-password', forgotPasswordController)

//test routes
router.get('/test',requireSignIn,isAdmin, testController)

//protected user route auth 
router.get("/user-auth" , requireSignIn, (req,res) =>{
    res.status(200).send({ok:true})
})

//protected admin route auth 
router.get("/admin-auth" , requireSignIn,isAdmin, (req,res) =>{
    res.status(200).send({ok:true})
})

//get-users
router.get('/get-users', userController);

export default router;


