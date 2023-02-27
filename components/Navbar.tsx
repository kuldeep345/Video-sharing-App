import React , { useState , useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { createOrGetUser } from '../utils'
import useAuthStore from '../store/authStore'

type Props = {}

const Navbar = (props: Props) => {

  const { userProfile, addUser, removeUser }:any = useAuthStore()
  const router = useRouter()
  const [ searchValue , setSearchValue] = useState('')

  const handleSearch = (e : {preventDefault : ()=>void})=>{
    e.preventDefault()

    if(searchValue){
      router.push(`/search/${searchValue}`)
    }
  }


  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href="/">
        <div className='flex items-center justify-center'>
          <Image
            className='cursor-pointer rounded-full -m-1'
            src='/logo3.jpg'
            alt="Tiktik"
            width={60}
            height={60}
          />
        </div>
      </Link>

      <div className='relative hidden md:block'>
        <form
        onSubmit={handleSearch}
        className="absolute md:static top-10 -left-20 bg-white"
        >
            <input 
             type="text"
             value={searchValue}
             onChange={(e)=>setSearchValue(e.target.value)}
             placeholder="Search accounts and videos"
             className='bg-gray-100 p-3 md:text-[1.2rem] font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0'
            />
            <button 
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400 '
            >
              <BiSearch />
            </button>
        </form>
      </div>

      <div>
        {userProfile ? (
          <div className='flex gap-5 md:gap-10'>
            <Link href="/upload">
              <button className='border-2 py-1 px-2 md:px-4 text-md font-semibold flex items-center gap-2 mt-1'>
                <IoMdAdd className='text-xl' />
                <span className='hidden md:block'>Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href='/'>
                <>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    src={userProfile.image}
                    alt="profile pic"
                  />
                </>
              </Link>
            )}
            <button
              type='button'
              className='px-2'
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color='red' fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={(err: void) => console.log(err)}
          />
        )}
      </div>
    </div>
  )
}

export default Navbar