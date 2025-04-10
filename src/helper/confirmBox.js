import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { deleteTodoApiUrl } from '../api/todo';
import { todoDeletedSuccessFully } from './toaster';
import { todoDeletedUnSuccessFully } from './toaster';
import { getTodos } from '../customHooks/getTodos';
import { useLogin } from '../context/loginContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({data,getDataFromDelete, title}) {

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const {notLogin} =useLogin()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (permission) => {
    if (permission) {
      console.log("mataji sukhi rakhe yaar")

        try {
           deleteTodoApiUrl(data)
             .then(function (response) {
               const todoDeletedStatusCode = response?.data?.statusCode
       
               if (todoDeletedStatusCode === 200) {
                 todoDeletedSuccessFully();
       
                 const TodosForLoop = getTodos();
                 return TodosForLoop;
               }else {
                 todoDeletedUnSuccessFully();
                 const TodosForLoop = getTodos();
                 return TodosForLoop;
               }
             })
             .then((resp) => {
              getDataFromDelete(resp?.data) 
             })
         } catch (error) {
           console.log(error)
         }
    }
    else{
      console.log("have more moro aava dayo")
      
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button color='error' variant="contained" onClick={handleClickOpen}>
      <i className='bx bx-message-square-x' ></i>
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Do You want to Confirm Delete "${title}"?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your TODO will Deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>CANCEL</Button>
          <Button color='error' variant="contained" onClick={(() => handleClose(true))}>DELETE</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}