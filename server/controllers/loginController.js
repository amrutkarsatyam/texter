import pool from '../dbinit.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const loginController= async(req,res)=>{
    try{
        if(!req.body.email||!req.body.password){
            return res.status(400).json({message:"Bad Request, no creds"});
        }
        const [data]=await pool.query('select userid,password from users where email=?',[req.body.email]);
        if(data.length==0)return res.status(401).json({message:"User Not Found"});
        const userid=data[0].userid;
        const email=req.body.email;
        // console.log(data[0]);
        // console.log(data[0].password);
        const hashedPass=data[0].password;
        if(await bcrypt.compare(req.body.password,hashedPass)){
            const token=await jwt.sign({userid,email},process.env.JWT_SECRET);
            return res.status(200).json({
                message:"Login Successful",
                token:token,
                userid:userid
            })
        }
        else return res.status(401).json({
            message:"Wrong Password"
        })
    }
    catch(err){
        return res.status(500).json({
            message:err.message,
            code:err.code
        })
    }
}
export default loginController;