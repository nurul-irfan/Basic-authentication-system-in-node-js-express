import express from "express"

import { login, signup,update_by_id ,update_by_email,delete_by_id, delete_by_email,update_password_by_id} from '../controllers/user.js'
const routers= express.Router()

// router.get("/me",)
// router.get("/all",)
routers.post("/signup",signup)
routers.post("/login",login)
routers.put("/update_by_id",update_by_id)
routers.put("/update_by_email",update_by_email)
routers.delete("/delete_by_id",delete_by_id)
routers.delete("/delete_by_email",delete_by_email)
routers.put("/update_password_by_id",update_password_by_id)

export default routers