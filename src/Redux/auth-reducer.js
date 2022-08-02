import {  authAPI } from '../API/api';
import { stopSubmit } from 'redux-form';




const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';




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


 

 export const setAuthUserData = (userId, email, login,isAuth) => ({ type:'samurai-network/auth/SET_USER_DATA', payload:{userId,email,login,isAuth}});
    



 export const getAuthUserData = () => async (dispatch) => {
    let data = await authAPI.authMe()
    if (data.resultCode === 0 ) {
        let {id, login, email} = data.data;
        dispatch(setAuthUserData(id,email,login,true));
    }
}

// export const getAuthUserData = () => {
//         return (dispatch) => {

// return authAPI.authMe()
//  .then(data => {
//      if (data.resultCode === 0 ) {
//          let {id, login, email} = data.data;
//          dispatch(setAuthUserData(id,email,login,true));
//      }
//  })
// }}




export const loginThunk = (email, password,rememberMe) => async (dispatch) =>{
      
    let response = await authAPI.login( email, password,rememberMe)

     if (response.data.resultCode === 0 ) {
         dispatch(getAuthUserData())
     } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('login',{_error:message}))

 }
}



export const logoutThunk = (email, password,rememberMe) => 
    async (dispatch) => {
        let data = await authAPI.logout( email, password,rememberMe)
         if (data.resultCode === 0 ) {
         dispatch(setAuthUserData(null, null,null,false))}
 
}


 export default authReducer;