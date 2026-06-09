import pool from '../dbinit.js'

const sendMessage=async(req,res)=>{
    try{
        const userid=req.userid;
        const chatid=req.body.chatid;
        const text=req.body.text;
        const timestamp=new Date();
        if(!userid||!chatid||!text||!timestamp){
            return res.status(400).json({
                message:"Missing Required Fields"
            })
        }
        const [isUserInChat]=await pool.query('select 1 from chat_members where userid=? and chatid=?',[userid,chatid]);
        if(isUserInChat.length===0)
            return res.status(403).json({
            message:"Unauthorized, User is not a member of the chat"
        })
        console.log("auth",isUserInChat.length>0);
        const [postedMessage]=await pool.query('insert into messages (userid,chatid,text,time) values (?,?,?,?)',[userid,chatid,text,timestamp]);
        console.log("sent",postedMessage)
        if(postedMessage.affectedRows>0){
            return res.status(201).json({
                message:"Message Sent!"
            })
        }
        else{
            return res.status(500).json({
                message:"Unable to Send Message"
            })
        }
    }
    catch(err){
        return res.status(500).json({
            message:'Unable to Send Message',
            error:err.message
        })
    }
}

export default sendMessage;