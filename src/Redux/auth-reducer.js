import {  authAPI } from '../API/api';
import { stopSubmit } from 'redux-form';




const SET_USER_DATA = 'SET_USER_DATA';




let initialState = {
  
   
        userId: null,
        email: null,
        login: null,
        isAuth: false
   
};

const authReducer = (state = initialState,action) => {
  

switch (action.type ) {

case SET_USER_DATA:
         return {
            ...state,
            ...action.payload,
            
        }
default: 
   return state;
    
 }
}


 

 export const setAuthUserData = (userId, email, login,isAuth) => ({ type:'SET_USER_DATA', payload:{userId,email,login,isAuth}});
    

export const getAuthUserData = (userId, email, login) => {
        return (dispatch) => {

return authAPI.authMe(userId, email, login)
 .then(data => {
     if (data.resultCode === 0 ) {
         let {id, login, email} = data.data;
         dispatch(setAuthUserData(id,email,login,true));
     }
 })
}}




export const loginThunk = (email, password,rememberMe) =>(dispatch) =>{
      
authAPI.login( email, password,rememberMe)
 .then(response => {
     if (response.data.resultCode === 0 ) {
         dispatch(getAuthUserData())
     } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('login',{_error:message}))

 }
})
}


export const logoutThunk = (email, password,rememberMe) => {
    return (dispatch) => {
authAPI.logout( email, password,rememberMe)
 .then(data => {
     if (data.resultCode === 0 ) {
     
         dispatch(setAuthUserData(null, null,null,false))
     }
 })
}}


 export default authReducer;