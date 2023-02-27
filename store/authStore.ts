import {create} from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

const authstore = (set:any) => ({
    userProfile:null,
    allUsers:[],
    addUser: (user:any) => set({ userProfile:user}),
    removeUser:()=>set({ userProfile:null}),
    fetchAllUsers: async ()=>{
        const response = await axios.get(`/api/users`);

        set({ allUsers : response.data})
    }
})

const useAuthStore = create(
    persist(authstore, {
        name:'auth'
    })
)


export default useAuthStore