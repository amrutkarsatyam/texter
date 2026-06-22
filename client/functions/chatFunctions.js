const apiChatListUrl = import.meta.env.VITE_CHATLIST_URL;
const apiChatCreateUrl = import.meta.env.VITE_CHATCREATE_URL;
const apiChatMessagesUrl = import.meta.env.VITE_CHATMESSAGES_URL;
const apiMessageSendUrl = import.meta.env.VITE_SENDMESSAGE_URL;

const TOKEN_KEY = "texterToken";

const getChatsData = async () => {
    try {
        const response = await fetch(
            apiChatListUrl,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem(TOKEN_KEY)}`
                }
            }
        )
        if (!response.ok) {
            const text = await response.text();
            console.log("Response not OK, ", text);
            throw new Error("Request Failed");
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
}

const createChat = async (chatName,chatMembers) => {
    try {
        const response = await fetch(
            apiChatCreateUrl,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem(TOKEN_KEY)}`
                },
                body: JSON.stringify({
                    chatname: chatName,
                    chat_members: chatMembers
                })
            }
        );
        if (!response.ok) {
            const text = await response.text();
            console.log("Response not OK, ", text);
            throw new Error("Request Failed");
        }
        const data = await response.json();
        // console.log(data);

        return data;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
}

const loadChat = async (id) => {
    try {
        const response = await fetch(
            `${apiChatMessagesUrl}/${id}`,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem(TOKEN_KEY)}`
                },
            }
        )
        if (!response.ok) {
            const text = await response.text();
            // console.log(text);
            throw new Error("Request Failed");
        }
        const data = await response.json();
        console.log('Messages... \n', data);
        return data;
    }
    catch (error) {
        console.log(error.message);
    }
}

const sendMessage = async (id, text) => {
    const response = await fetch(
        apiMessageSendUrl,
        {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chatid: id,
                text: text
            })
        }
    )
    if (!response.ok) {
        const text = await response.text();
        // console.log(text);
        throw new Error("Request Failed");
    }
    const data = await response.json();
    // console.log("sent message, \n",data);
}

export { getChatsData, createChat, loadChat,sendMessage }