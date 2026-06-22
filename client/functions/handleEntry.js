const apiLoginUrl = import.meta.env.VITE_LOGIN_URL;
const apiRegisterUrl = import.meta.env.VITE_REGISTER_URL;

const TOKEN_KEY = "texterToken";

const handleLogin = async (email, password) => {
    try {
        const response = await fetch(
            apiLoginUrl,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        )

        if(!response.ok){
            const text=await response.text();
            // console.log("RES NOT OK ", text);
            throw new Error("Req Failed");
        }

        const data = await response.json();
        // console.log(data);

        if (data.token) {
            localStorage.setItem(TOKEN_KEY, data.token);
            const userid=data.userid;
            console.log("token set to : " + localStorage.getItem(TOKEN_KEY))
            return userid;
        }
        return false;
    }
    catch (error) {
        console.log(error.message);
    }
}


const handleRegister = async (email, password) => {
    try {
        const response = await fetch(
            apiRegisterUrl,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        )

        if(!response.ok){
            const text=await response.text();
            console.log("RES NOT OK ", text);
            throw new Error("Req Failed");
        }

        const data = await response.json();
        // console.log(data);

        if (data.token) {
            localStorage.setItem(TOKEN_KEY, data.token);
            console.log("token set to : " + localStorage.getItem(TOKEN_KEY))
        }
    }
    catch (error) {
        // console.log(error.message)
    }
}


export { handleLogin, handleRegister}