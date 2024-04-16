// import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

// const initialState = {
//     msg:'',
//     user:null,
//     token:'',
//     loading: false,
//     error: ""
// }

//  export const signUpUser = createAsyncThunk('signupuser',async(body)=>{
//     const res = await fetch('', {
//     method:"post",
//     headers:{
//         'Content-Type': 'application/json',

//     },
//     body: JSON.stringify(body)

//  })
//  return await res.json();
// });


 
// const authSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers:{


//     },
   
// });

// export default authSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';




const userSlice = createSlice({
    name:"user",
    initialState:{
        token:"",
        userId:-1,
        email:""
    },
    reducers:{
        addToken:(state,action)=>{
            state.token = action.payload;

        },
        addUserId:(state,action)=>{
            state.userId = action.payload;
        },
        addEmail:(state,action)=>{
            state.email = action.payload;
        }
    }
})


export const {addToken,addEmail,addUserId} = userSlice.actions;

export default userSlice.reducer;