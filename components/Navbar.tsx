import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'

type Props = {}

const Navbar = (props: Props) => {
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
    </div>
  )
}

export default Navbar