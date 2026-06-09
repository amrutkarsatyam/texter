import pool from '../dbinit.js'

const getMessages=async (req,res)=>{
    const userid=req.userid;
    const chatid=req.body.chatid;
    const [isUserInChat]=await pool.query('select 1 from chat_members where userid=? and chatid=?',[userid,chatid]);
    if(isUserInChat.length===0){
        return res.json(403).json({
            message:"Unauthorized, User is not a member of the chat"
        })
    }
    const [messages]=await pool.query('select * from messages where chatid=?',[chatid]);
    return res.status(200).json({
        message:"Fectched Messages Successfully",
        messages : messages
    })
}

export default getMessages;