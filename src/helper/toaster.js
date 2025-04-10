
import { toast } from 'react-toastify';


const notify = () =>{
    toast('Wow so easy!');
}

const usernameNotEntered = () => {
    toast.warning('cannot get username');
}

const emailNotEntered = () => {
    toast.warning('cannot get email');
}

const passwordNotEntered = () => {
    toast.warning('cannot get password');
}


const passwordIsNotSame = () => {
    toast.warning('Password is Not Equal to Confirm Password');
}


const passwordLengthIsLessThanEight = () => {
    toast.warning('Password length must be 8');
}


const todoCreatedSuccessFully = () => {
    toast.success('Todo Created');
}


const todoCreatedUnSuccessFully = () => {
    toast.error('Todo is not created ');
}


const todoDeletedSuccessFully = () => {
    toast.success('Todo deleted');
}


const todoDeletedUnSuccessFully = () => {
    toast.error('Todo is not deleted ');
}

const todoUpdatedSuccessFully = () => {
    toast.success('Todo is updated');
}

const todoUpdatedUnsuccessFully = () => {
    toast.error('title And content is both empty');
}

const firstDeleteTodo = () => {
    toast.warn('first delete your all todos is not deleted ');
}

const userNotExist = () => {
    toast.warn('User not Exist');
}

const wrongPassword = () => {
    toast.warn('Invalid Credentails');
}

const todoTitleAlreadyExist = () => {
    toast.warn('Todo Title Already exist');
}


const usernameAndEmailIsNotEntered = () => {
    toast.warn('UserName and Email is not entered');
}

const usernameAndEmailIsNotProper = () => {
    toast.warn('UserName and Email is not Proper');
}

const usernameAndEmailIsAlreadyExist = () => {
    toast.warn('UserName or Email is already exist');
}

const userUpdateSuccessfully = () => {
    toast.success('user updated successfully!');
}

const notValidEmail = () => {
    toast.warn('Email should include @ and .');
}

const notValidEmailBySymbols = () => {
    toast.warn('email is not valid only numbers, alphabets, dot(.) and @');
}

const notValidUsernameBySymbols = () => {
    toast.warn('username is not valid only numbers, alphabets and underscore(_) is valid');
}

const todoTitleAndContentIsSame = () => {
    toast.warn('Title and Content is not updated');
}

const todoContentIsRequired = () => {
    toast.warn('content is empty');
}





export {
    notify,
    usernameNotEntered,
    emailNotEntered,
    passwordNotEntered,
    passwordIsNotSame,
    passwordLengthIsLessThanEight,
    todoCreatedSuccessFully,
    todoCreatedUnSuccessFully,
    todoDeletedSuccessFully,
    todoDeletedUnSuccessFully,
    firstDeleteTodo,
    userNotExist,
    wrongPassword,
    usernameAndEmailIsNotEntered,
    usernameAndEmailIsNotProper,
    usernameAndEmailIsAlreadyExist,
    userUpdateSuccessfully,
    notValidEmail,
    notValidEmailBySymbols,
    notValidUsernameBySymbols,
    todoUpdatedSuccessFully,
    todoUpdatedUnsuccessFully,
    todoTitleAlreadyExist,
    todoTitleAndContentIsSame
}