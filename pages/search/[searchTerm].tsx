import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'
import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import { Post, User } from '../../types'
import { GetServerSideProps, NextPage } from 'next'
import useAuthStore from '../../store/authStore'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface Props {
    videos: Post[]
}

const SearchTerm: NextPage<Props> = ({ videos }) => {

    const [isAccounts, setIsAccounts] = useState(false)
    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
    const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400'

    const router = useRouter()
    const { searchTerm }:any = router.query
    const { allUsers } = useAuthStore()

    const searchedAccounts = allUsers.filter((user:User)=>user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className='w-full'>
            <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
                <p className={`text-xl text-semibold cursor-pointer mt-2 ${accounts}`} onClick={() => setIsAccounts(true)}>Accounts</p>
                <p className={`text-xl text-semibold cursor-pointer mt-2 ${isVideos}`} onClick={() => setIsAccounts(false)}>Videos</p>
            </div>
            {isAccounts ? (
                <div className='md:mt-16'>
                    {searchedAccounts.length > 0 ? (
                       searchedAccounts.map((user:User , idx:number)=>(
                        <div className='p-2 items-center' key={idx}>
                        <Link href={`/profile/${user._id}`}>
                          <div className='flex gap-3 hover:bg-gray-100 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                            <div>
                              <Image
                                src={user.image}
                                width={50}
                                height={50}
                                className="rounded-full"
                                alt='user-perofile'
                              />
                            </div>
                            <div>
                              <p className='flex gap-1 items-center text-md font-bold text-gray-900 lowercase'>
                                {user.userName.replaceAll(' ', '')}
                                <GoVerified />
                              </p>
                              <p className='capitalize text-gray-400 text-xs'>
                                {user.userName}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                       ))
                    ) : <NoResults text={`No Account results for ${searchTerm}`}/>}
                </div>
            ) : (
                <div className='md:mt-16  flex flex-wrap gap-6 md:justify-start'>
                    {videos.length ? (
                        videos.map((video:Post , idx) => (
                            <VideoCard post={video} key={idx}/>
                        ))
                    ) : <NoResults text={`No video results for ${searchTerm}`}/> }
                </div>
            )}
        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {

    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${context.query.searchTerm}`)

    return {
        props: {
            videos: data
        }
    }
}

export default SearchTerm