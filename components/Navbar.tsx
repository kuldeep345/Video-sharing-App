import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import { GoogleLogin , googleLogout } from '@react-oauth/google'
import { createOrGetUser } from '../utils'

type Props = {}

const Navbar = (props: Props) => {

  const user = false

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href="/">
        <div className='relative w-[50px] h-8'>
           <Image 
            className='cursor-pointer'
            src='/logo2.jpg'
            alt="Tiktik"
            fill
           />
        </div>
      </Link>
      <div>SEARCH</div>
      <div>
        {user ? (
          <div>Logged In</div>
        ) : (
          <GoogleLogin 
          onSuccess={(response)=>createOrGetUser(response)}
          onError={(err:void) => console.log(err)}
          />
        )}
      </div>
    </div>
  )
}

export default Navbar