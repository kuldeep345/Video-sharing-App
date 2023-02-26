import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { createOrGetUser } from '../utils'
import useAuthStore from '../store/authStore'

type Props = {}

const Navbar = (props: Props) => {

  const { userProfile, addUser, removeUser } = useAuthStore()

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