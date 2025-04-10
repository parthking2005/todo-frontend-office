import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteUserApiUrl } from '../api/user';
import { firstDeleteTodo } from './toaster';
import { useLogin } from '../context/loginContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function DeleteUser() {
  const [open, setOpen] = React.useState(false);

    const {notLogin} =useLogin()
  const navigate = useNavigate()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (permission) => {

    if (permission) {
        const deleteUser = () => {
            deleteUserApiUrl().then((resp) => {
              if (resp.data.statusCode === 405) {
                return firstDeleteTodo()
              } else {
                Cookies.remove("refreshToken")
                localStorage.clear()
                notLogin()
                navigate('/signup')
              }
            }).catch((e) => {
              console.log(e)
            })
        
          }
          deleteUser()
          setOpen(false);
    } else {
        setOpen(false);
    }
  };



  return (
    <React.Fragment>
         <button  onClick={handleClickOpen} className="dropdown-item">Delete User</button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete User"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will not able to login from your register username and email
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' color='error' onClick={() => handleClose(true)} autoFocus>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}