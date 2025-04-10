import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import '../components/navbar/navbar.css'
import { updateUserApiUrl } from '../api/user';
import Image from '../components/images/download.png'
import {
    usernameNotEntered, 
    emailNotEntered,
    usernameAndEmailIsNotEntered,
    usernameAndEmailIsNotProper,
    usernameAndEmailIsAlreadyExist,
    userUpdateSuccessfully
} from './toaster.js';
import './UpdateUser.css'
import { useLogin } from '../context/loginContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function FormDialogFotUserUpdate({getData, image, username, email}) {

    const [updateUsername, setUpdateUsername] = useState("")
    const [updateEmail, setUpdateEmail] = useState("")  
    const [profileImage, setProfileImage] = useState(Image)
    const [preview, setPreview] = useState(Image);
        const {notLogin} =useLogin()
      const navigate = useNavigate()
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    //       setUpdateEmail(email)
    //   setUpdateUsername(username)
    
    
    
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
        setUpdateEmail(email)
        setUpdateUsername(username)
        setPreview(image)
        setOpen(true);
  };
  
  const handleClose = () => {
      setOpen(false);
    };
    
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        // const handleSubmitUrlForRegister = await registerUserApiUrl()
        if (!username || username === "") return usernameNotEntered()
            if (!email || email === "") return emailNotEntered()
                
                
                try {
            const formData = new FormData();
            if (username !== updateUsername) {
                console.log("username is same to same")
                formData.append('username', updateUsername)
            }
            if (email !== updateEmail) {
                console.log("email is same to same")
                formData.append('email', updateEmail)
            }
            formData.append('profile', profileImage || image)
            // console.log(formData)
            const res = await updateUserApiUrl(formData);
            console.log(res, "i got the response bro")
            if(res.data.statusCode === 200){
                setUpdateEmail("")
                setUpdateUsername("")
                getData(res)
                localStorage.setItem("profileimg", res.data.data[0].profileimg)
                localStorage.setItem("email", res.data.data[0].email)
                localStorage.setItem("username", res.data.data[0].username)
                userUpdateSuccessfully();
                handleClose();
            } 
            if(res.data.statusCode === 400){
                return usernameAndEmailIsNotEntered()
            }
            if(res.data.statusCode === 404){
                return usernameAndEmailIsNotProper()
            }
            if(res.data.statusCode === 422){
                return usernameAndEmailIsAlreadyExist()
            }
            
            
            
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <React.Fragment>
      <button className='dropdown-item' onClick={handleClickOpen}>
        Edit Profile
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will able to login with entered username and email after this
          </DialogContentText>
          <div className="image-wrapper">
        <img src={preview} alt="User" />
        <label htmlFor="file-upload" className="file-label">📷</label>
        <input
          type="file"
          id="file-upload"
          className="file-input"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
          <TextField
            autoFocus
            required
            margin="dense"
            id="username"
            name="username"
            label="username"
            type="text"
            fullWidth
            variant="outlined"
            value={updateUsername}
            onChange={(e) => setUpdateUsername(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={updateEmail}
            onChange={(e) => setUpdateEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color='primary' type="submit" variant='contained' onClick={handleUpdateSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}