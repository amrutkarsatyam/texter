import pool from '../dbinit.js'

const getMessages=async (req,res)=>{
    try{

        const userid=req.userid;
        const chatid=req.params.id;
        const [isUserInChat]=await pool.query('select 1 from chat_members where userid=? and chatid=?',[userid,chatid]);
        if(isUserInChat.length===0){
            return res.status(403).json({
                message:"Unauthorized, User is not a member of the chat"
            })
        }
        const [messages]=await pool.query('select * from messages where chatid=?',[chatid]);
        return res.status(200).json({
            message:"Fetched Messages Successfully",
            messages : messages
        })
    }
    catch(error){
        return res.status(500).json(error.message);
    }
}

export default getMessages;