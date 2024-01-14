import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchdarets = createAsyncThunk('darets/fetchdarets',async()=>{
    
   
    const res = await axios.get('/darets',{
       
       
      }) 
    return res.data  





})

const turnedSlice = createSlice({
    name:'turned',
    initialState:{
        status:'idle',
        data:[]
    },

    reducers:{

        // fetchdaret(state,action){

        //     console.log(state.data.find((t)=>t.id = action.payload)) 

        // }
        setTurnedStatus(state,action){
            state.status = action.payload
        }
       
    },
    
    extraReducers(builder){
        builder.addCase(fetchdarets.pending,(state,action)=>{
            state.status='pending'

        }).addCase(fetchdarets.fulfilled,(state,action)=>{
            state.status='success'
            state.data = action.payload.darets.sort((a, b) =>b.available -  a.available)
            console.log(state.data)
           
            
        })
    }
   

    
})
export default turnedSlice.reducer
export const {setTurnedStatus} = turnedSlice.actions;