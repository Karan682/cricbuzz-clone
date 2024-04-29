import { comparePassword, hashPassword } from "../heplers/authHepler.js"
import userModel from "../models/userModel.js"
import JWT from "jsonwebtoken"
 

export const registerController = async(req,res) =>{
try {
    const {name,email,password,phone,address,answer} = req.body

    //validation
    if(!name){
        return res.send({message:'name is required'})
    }
    if(!email){
        return res.send({message:'email is required'})
    }
    if(!password){
        return res.send({message:'password is required'})
    }
    if(!phone){
        return res.send({message:'phone is required'})
    }
    if(!address){
        return res.send({message:'address is required'})
    }
    if(!answer){
        return res.send({message:'Answer is required'})
    }

    //check user
    const existinguser = await userModel.findOne({email}) 
    //exist user
    if (existinguser){
        res.status(200).send({
            success:false,
            message:'Already register please login',
        })
    }

    //register user
    const hashedPassword= await hashPassword(password)
    //save
    const user = await new userModel({
        name,
        email,
        phone,
        address,
        password:hashedPassword,
        answer
    }).save();

    res.status(201).send({
        success:true,
        message:"user register succesfully",
        user,
    })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in registeration',
            error
        });
    }
};


//post login
export const loginController = async (req,res) => {
    try{
        const {email,password} = req.body
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not registerd'
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid password'
            })
        }

        //token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success:true,
            message:'login successfully',
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role : user.role
            },
            token,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in login',
            error
        });

    }

};

//forgot-password controller
export const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      if (!answer) {
        res.status(400).send({ message: "answer is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      //check
      const user = await userModel.findOne({ email, answer });
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const hashed = await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };



//test controller
export const testController = (req,res) =>{
    try{
    console.log('protected route')
    }catch(error){
        console.log(error);
        res.send({error});
    }
}

//get-user
export const userController = async (req, res) => {
    try {
      const user = await userModel.find({});
      res.status(200).send({
        success: true,
        message: "All Categories List",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all categories",
      });
    }
  };