import { readUserDataApiUrl } from "../api/user";

const getUser = async () => {
    try {
      const getFunc = readUserDataApiUrl() 
      .then(function (response) {
        if (response.data.statusCode === 200) {
          
          const todoData = response.data;
          return todoData
        } else if(response.data.statusCode === 404 &&response.data.message === "user not found"){
          
          return []
        }
      })

      return getFunc;
    } catch (error) {
      console.log(error)
      return {data: []}
    }
}

export {getUser}