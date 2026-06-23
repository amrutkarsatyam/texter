import pool from "../dbinit.js";

const getChatList=async(req,res)=>{
    try{
        
        const userid=req.userid;
        const [queryResponse]=await pool.query('select chats.chatid,chats.chatname from chats join chat_members on chats.chatid=chat_members.chatid where chat_members.userid=(?)',[userid]);
        // console.log(queryResponse);

        return res.status(200).json({
            message:"Fetched List Of Chats",
            chatList:queryResponse
        })
    }
    catch(err){
        res.status(500).json({
            message:"Error in Fecthing Chats",
            error: err.code
        })
    }
}
export default getChatList;