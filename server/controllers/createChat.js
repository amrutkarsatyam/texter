import pool from '../dbinit.js'
import {v4} from 'uuid'

const createChat= async(req,res)=>{
    try{
        const userid=req.userid;
        const chatname=req.body.chatname;
        const chat_members=req.body.chat_members;
        const chatid= v4();
        const [queryResponse]=await pool.query('insert into chats(chatid,chatname,admin) values (?,?,?)',[chatid,chatname,userid]);
        let members_count=chat_members.length;
        for (const member of chat_members) {
            try{
                const [memberdata]=await pool.query('select userid from users where email=?',[member]);
                if(memberdata[0]){
                    const [result]=await pool.query('insert into chat_members(chatid,userid) values(?,?)',[chatid,memberdata[0].userid]);
                }
                else{
                    members_count--;
                }


            }
            catch(err){
                return res.json({
                    err:err.code
                })
            }
        }
        console.log(queryResponse);
        return res.status(201).json({
            message:'Chat Creation Successful',
            chatid: chatid,
            insertedMembers:members_count
        })
    }
    catch(err){
        return res.status(500).json({
            message:"Error in Creating Chat",
            error: err.message
        })
    }
}

export default createChat;