import { readTodoApiUrl } from "../api/todo"

const getTodos = async () => {
      try {
        const getFunc = readTodoApiUrl() 
        .then(function (resp) {
          if (resp.data.statusCode === 200) {
            const todoData = resp.data;
            return todoData
          } else if(resp.data.statusCode === 404 && resp.data.message === "user not found"){ 
                  return {data: []}
                }
        })
  
        return getFunc;
      } catch (error) {
        console.log(error)
        return {data: []}
      }
}



export {getTodos};