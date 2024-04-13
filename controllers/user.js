import UserModel from "../models/User.js"


// signup

export const signup = async (req, res) => {
    const data= await UserModel.create(req.body)
    await data.save()
    res.status(201).json({message:"User has been created!",result: data})
}

// login 

export const login= async (req, res) => {
    const {email,password}=req.body
    if(!email || !password){
        return res.status(501).json({message: "please provide email and password"}) 
    }
    const user = await UserModel.findOne({email:email})
    if(!user){
        return res.status(401).json({message: "No account is found this email"})
    }   
    if(user.password!==password){
        return res.status(301).json({message:"incorrect password"})
    }
    return res.status(200).json({message:"login successfully",result: user})
}

//name update by id

export const update_by_id=async (req, res) => {
    const {id , name }= req.body
    
    if (!name){
        return res.status(400).json({ message : "Please provide name" })
    }
    const  user=await UserModel.findOne({_id:id })
    if(!user){
       return res.status(404).json({ message: "No account found with the provided credentials."})
    }
    const data= await  UserModel.updateOne({_id:id},{ $set:{name:name} },{new:true})

    return res.status(201).json({message:"name update successfully",result: data})
}

//name update by email

export const update_by_email= async (req, res) => {  
    const {email , name }= req.body
    
    if (!name){
        return res.status(400).json({ message : "Please provide name" })
    }
    const  user=await UserModel.findOne({email:email })
    if(!user){
       return res.status(404).json({ message: "No account found with the provided credentials."})
    }
    const data= await  UserModel.updateOne({email:email},{ $set:{name:name} },{new:true})

    return res.status(201).json({message:"name update successfully",result: data})
}

//delete a user by id

export const delete_by_id = async (req, res) => {
    const {id}= req.params
    
    if (!id){
        return res.status(400).json({ message : "Please provide an id " })
    }
    const  user=await UserModel.findOne({ _id: id })
    if(!user){
       return res.status(404).json({ message: "No account found with the provided credentials."})
    }
    const data=await UserModel.deleteOne({_id:id})
    return res.status(201).json({message:"delete successfully",result: data})
}

//delete a user by email

export const delete_by_email =  async (req, res) => {
    const { email}= req.body
    
    if (!email){
        return res.status(400).json({ message : "Please provide an email " })
    }
    const  user=await UserModel.findOne({ email })
    if(!user){
       return res.status(404).json({ message: "No account found with the provided credentials."})
    }
    const data=await UserModel.deleteOne({email:email})
    return res.status(201).json({message:"delete successfully",result: data})
}

// update password by id

export const update_password_by_id = async (req, res) => {
    const {id , oldPassword,newPassword  }= req.body
    
    if (!oldPassword ||  !newPassword ){
        return res.status(400).json({ message : "Please provide  both password" })
    }
    const  user=await UserModel.findById({_id:id })
    if(!user){
       return res.status(404).json({ message: "No account found with the provided credentials."})
    }
    if (oldPassword!==user.password){
        return res.status(400).json({ message : "your old password is incorect" })
    }
    const data= await  UserModel.findByIdAndUpdate({_id:id},{ $set:{password:newPassword} },{new:true})

    return res.status(201).json({message:"name update successfully",result: data})
}