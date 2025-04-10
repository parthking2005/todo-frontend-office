import React, { useState } from 'react'
import { getTodos } from '../../customHooks/getTodos.js'
import { todoCreatedSuccessFully, todoCreatedUnSuccessFully } from '../../helper/toaster.js'
import { addTodoApiUrl } from '../../api/todo/index.js'
import './todoForm.css'
import BeutyImage from '../images/Adobe Express - file (1).png'
import { useLogin } from '../../context/loginContext.js'
import { useNavigate } from 'react-router-dom';


function TodoForm({ getData }) {
  const [title, settitle] = useState("")
  const [content, setcontent] = useState("")
  const navigate = useNavigate();
  const {notLogin} =useLogin()

 const handleSubmit = async (e) => {
    e.preventDefault();
   try {
      addTodoApiUrl({
        title: title,
        content: content
      })
        .then(function (response) {
          const todoCreateStausCode = response?.data?.statusCode

          if (todoCreateStausCode === 200) {
            todoCreatedSuccessFully();

            const TodosForLoop = getTodos();
            settitle("")
            setcontent("")
            return TodosForLoop;
          }else {
            todoCreatedUnSuccessFully();
            const TodosForLoop = getTodos();
            return TodosForLoop;
          }
        })
        .then((resp) => {
          console.log(resp, "what is response bro")
          getData(resp)
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error)
    }
  }


  return (
    // <div className='todoForm'>
    //   <form method='post' onSubmit={handleSubmit}>
    //     <label htmlFor="title">Title</label>
    //     <input type="text" value={title} onChange={(e) => settitle(e.target.value)} name="title" id="title" />
    //     <label htmlFor="content">Content</label>
    //     <input type="text" value={content} onChange={(e) => setcontent(e.target.value)} name="content" id="content" />
    //     <button type='submit'>Submit</button>
    //   </form>
    //   <ToastContainer />
    // </div>
    <>
    <div className="todo-form-container">
        <form className="todo-form" method='post' onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => settitle(e.target.value)} className="todo-title-form" placeholder="Title" required />
            <textarea value={content} onChange={(e) => setcontent(e.target.value)} className="todo-content-form" placeholder="Content" required></textarea>
            <button type="submit" className="submit-btn">Submit</button>
        </form>
      <img src={BeutyImage} className='beauty-image' alt="mataji sukhi rakhe yaar" />
    </div>
    </>

  )
}

export default TodoForm
