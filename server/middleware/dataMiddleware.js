import jwt from 'jsonwebtoken';

const dataMiddleWare = async(req,res,next)=>{
    try{
        if(!req.headers.authorization){
            return res.status(401).json({message:"Unauthorized"});
        }
        const authHeader=req.headers.authorization;
        const headerArr=authHeader.split(" ");
        if(headerArr[0]!='Bearer'||headerArr.length!==2){
            return res.status(401).json({message:"Invalid Auth Header"});
        }
        const token=headerArr[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const decodeduserid=decoded.userid;
        req.userid=decodeduserid;
        return next();
    }
    catch(err){
        return res.status(500).json({
            message:"Error in Authentication",
            error:err.message
        });
    }
}
export default dataMiddleWare;