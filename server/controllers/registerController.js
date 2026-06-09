import express from 'express';
import pool from '../dbinit.js';
import {v4} from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const registerController= async (req,res)=>{
    try{
        if (!req.body) {
            return res.status(400).json({ message: "Request body is undefined" });
        }
        console.log(req.body);
        const email=req.body.email;
        const password=req.body.password;
        if(!email||!password){
            return res.status(400).json({
                message: "All Fields Required"
            })
        }
        
        const userid=v4();
        const salt=await bcrypt.genSalt();
        const hashedPassword=await bcrypt.hash(password,salt);
        const token=jwt.sign({userid,email},process.env.JWT_SECRET);

        const [queryResponse]=await pool.query('insert into users(userid, email, password) values (?,?,?)',[userid,email,hashedPassword]);

        return res.status(200).json({
            message:"User Added",
            token: token
        })
    }
    catch(err){
        if(err.code=='ER_DUP_ENTRY')
            return res.status(400).json({
                message: err.message,
                code:err.code
            });
        res.status(500).json({
                message: err.message,
                code:err.code
        });
    }
}

export default registerController;