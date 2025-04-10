import React, { useEffect, useState } from 'react'
import './todos.css'
import TodoForm from '../todoForm/todoForm'
import { getTodos } from '../../customHooks/getTodos.js'
import AlertDialogSlide from '../../helper/confirmBox.js'
import UpdateBtn from '../../helper/updateBtn.js'
import ImageForEmptyTodo from '../images/Adobe Express - file (2).png'
import { ToastContainer } from 'react-toastify'


function Todos() {
  const [todos, settodos] = useState([])

  useEffect(() => {
    getTodos().then((res) => {
      let data = res.data;
      settodos(data)
    })
  }, [settodos])




  const getData = async (data) => {
    const dataForTodos = data.data;
    settodos(dataForTodos)
  }

  const getDataFromDelete = async (data) => {
    const dataForTodos = data;
    settodos(dataForTodos)
  }

  const getDataFromUpdate = async (data) => {
    const dataForTodos = data;
    settodos(dataForTodos)
  }







  return (
    <div className='todos'>
      <TodoForm getData={getData} />
      <div className='todo-list'>
        {
          todos?.length === 0 ? <img src={ImageForEmptyTodo} className="empty-todo-image" alt="empty todos image" /> :
          todos?.map((todo) => (
            <div className="todo-item">
              <div className="todo-header">
                <div className="todo-title">{todo.title}</div>
                <div className="todo-actions">
                <UpdateBtn todoTitle={todo.title} todoContent={todo.content} todo={todo.todo_id} getDataFromUpdate={getDataFromUpdate} />
                <AlertDialogSlide data={todo.todo_id} title={todo.title} getDataFromDelete={getDataFromDelete} />
                </div>
              </div>
              <div className="todo-content">
                {todo.content}
              </div>
            </div>
          ))
        }
      </div>
      <ToastContainer />
    </div>

  )
}

export default Todos
