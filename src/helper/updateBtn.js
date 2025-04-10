import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { updateTodoApiUrl } from '../api/todo';
import { getTodos } from '../customHooks/getTodos';
import { todoTitleAlreadyExist, todoTitleAndContentIsSame, todoUpdatedSuccessFully, todoUpdatedUnsuccessFully } from './toaster';



export default function UpdateBtn({ todoTitle, todoContent, todo, getDataFromUpdate }) {

    const [open, setOpen] = React.useState(false);

    const [updatedtitle, setUpdatedtitle] = useState(todoTitle)
    const [updatedcontent, setUpdatedcontent] = useState(todoContent)



    const [todoTitleEmpty, setTodoTitleEmpty] = useState(false)
    const [todoContentEmpty, setTodoContentEmpty] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (permission) => {
        setTodoTitleEmpty(false)
        setTodoContentEmpty(false)
        setUpdatedcontent(todoContent)
        setUpdatedtitle(todoTitle)
        if (permission) {
            setTodoTitleEmpty(false)
            setTodoContentEmpty(false)            

            if (updatedtitle.trim() === "") {
                return setTodoTitleEmpty(true)
            }
            else if (updatedcontent.trim() === "") {
                return setTodoContentEmpty(true)
            }

            if ((updatedtitle.trim() === todoTitle.trim()) && (updatedcontent.trim() === todoContent.trim())) {
                return todoTitleAndContentIsSame()
            }

                try {
                  const data = {
                    title: updatedtitle.trim(),
                    content: updatedcontent.trim()
                  }
                  updateTodoApiUrl(todo, data)
                    .then(function (response) {
                      const todoDeletedStatusCode = response?.data
                    return todoDeletedStatusCode
                }).then((resp) => {
                        if (resp.statusCode === 200) {
                            todoUpdatedSuccessFully()
                            setOpen(false);
                             getTodos().then((resp) => {
                                getDataFromUpdate(resp.data)
                            })
                        } else if(resp === 407){
                            todoUpdatedUnsuccessFully()
                        }else if(resp === 420){
                            todoTitleAlreadyExist()
                        }
                    //   settodos(resp.data)
                    })
                } catch (error) {
                  console.log(error)
                }

                setUpdatedtitle(updatedtitle)
                setUpdatedcontent(updatedcontent)
        } else {
        setUpdatedtitle(todoTitle)
        setUpdatedcontent(todoContent)  
            setOpen(false)
            console.log("cancel thay gayu update nay thay")
        }
    };

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
            <i className='bx bx-pencil' ></i>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}

            >
                <DialogTitle>Update</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updatedtitle}
                        onChange={(e) => setUpdatedtitle(e.target.value)}
                    />
                    {todoTitleEmpty ? "Fill the title" : ""}
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="content"
                        name="content"
                        label="Content"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updatedcontent}
                        onChange={(e) => setUpdatedcontent(e.target.value)}
                        />
                        {todoContentEmpty ? "Fill the content" : ""}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)}>Cancel</Button>
                    <Button color='info' variant="contained" onClick={() => handleClose(true)}>Update</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}