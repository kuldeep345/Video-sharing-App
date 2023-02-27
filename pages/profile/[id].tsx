import React , { useState , useEffect } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'
import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import { User, Video } from '../../types'
import { GetServerSideProps, NextPage } from 'next'

interface Props {
    profile:{
        user:User,
        userVideos:Video[],
        userLikedVideos:Video[]
    }
}

const Profile:NextPage<Props> = ({profile:{user , userLikedVideos , userVideos}}) => {

    const [ showUserVideos , setShowUserVideos ] = useState(true)
    const [ videoList , setVideoList] = useState<Video[]>([])

    const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400' 
    const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'

    useEffect(() => {
      if(showUserVideos){
        setVideoList(userVideos)
      }
      else{
        setVideoList(userLikedVideos)
      }
    }, [showUserVideos ,userLikedVideos , userVideos])
    

  return (
    <div className='w-full'>
        <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
     
                      <div className='relative w-16 h-16 md:w-32 md:h-32'>
                          <Image 
                            src={user.image}
                            className="rounded-full"
                            alt='user-perofile'
                            fill
                          />
                      </div>
                      <div className='flex flex-col items-center'>  
                          <p className='md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-gray-900 lowercase'>
                            {user.userName.replaceAll(' ','')}
                            <GoVerified/>
                          </p>
                          <p className='capitalize md:text-xl text-gray-400 text-xs'>
                            {user.userName}
                          </p>
                      </div>
        </div>
        <div>
            <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
                <p className={`text-xl text-semibold cursor-pointer mt-2 ${videos}`} onClick={()=>setShowUserVideos(true)}>Videos</p>
                <p className={`text-xl text-semibold cursor-pointer mt-2 ${liked}`} onClick={()=>setShowUserVideos(false)}>Liked</p>
            </div>
            <div className='flex gap-6 flex-wrap md:justify-start'>
                {videoList.length > 0 ? (
                    videoList.map((post:Video , idx:number) => (
                        <VideoCard post={post} key={idx} />
                    ))
                ) : <NoResults text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`} />}
            </div>
        </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${context.query.id}`)
   
    return {
      props: {
        profile:data
      }
    }
}

export default Profile