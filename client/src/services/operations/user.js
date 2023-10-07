import { apiConnector } from "../apiconnector"

export function login(email,password,navigate){
    return async(dispatch)=>{
        try{
            const response = await apiConnector("POST",LOGIN_API,{
                email,
                password ,
            })
            console.log("LOGIN API RESPONSE....",response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
        }catch(error)
        {
            
        }


    }
}