import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { GoVerified } from 'react-icons/go'
import useAuthStore from '../store/authStore'
import { User } from '../types'

const SuggestedAccount = () => {

  const { fetchAllUsers , allUsers } = useAuthStore()

  useEffect(() => {
    fetchAllUsers()
  }, [fetchAllUsers])
  
  console.log(allUsers)

  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
        <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
          Suggested Accounts
        </p>
        <div>
          {allUsers.slice(0,6).map((user:User) => (
              <Link href={`/profile/${user._id}`} key={user._id}>
                  <div className='flex gap-3 hover:bg-gray-100 p-2 cursor-pointer font-semibold rounded'>
                      <div className='w-8 h-8'>
                          <Image 
                            src={user.image}
                            width={34}
                            height={34}
                            className="rounded-full"
                            alt='user-perofile'
                          />
                      </div>
                      <div className='hidden xl:block'>
                          <p className='flex gap-1 items-center text-md font-bold text-gray-900 lowercase'>
                            {user.userName.replaceAll(' ','')}
                            <GoVerified/>
                          </p>
                          <p className='capitalize text-gray-400 text-xs'>
                            {user.userName}
                          </p>
                      </div>
                  </div>
              </Link>
          ))}
        </div>
    </div>
  )
}

export default SuggestedAccount