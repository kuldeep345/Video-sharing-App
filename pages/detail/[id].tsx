import React , { useState , useEffect , useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp , HiVolumeOff } from 'react-icons/hi'
import axios from 'axios'
import { UserProfile, Video } from '../../types'
import { GetServerSideProps, NextPage } from 'next'
import useAuthStore from '../../store/authStore'
import Comments from '../../components/Comments'
import LikeButton from '../../components/LikeButton'

interface Props {
    postDetails:Video
}

const Detail:NextPage<Props> = ({postDetails}) => {

     const [post , setPost] = useState(postDetails)
     const [playing , setPlaying] = useState(false)
     const [isVideoMuted , setIsVideoMuted] = useState(false)
     const {userProfile}:any = useAuthStore()
    const [comment, setComment] = useState('')
    const [isPostingComment , setIsPostingComment] = useState(false) 
     
     const VideoRef = useRef<HTMLVideoElement>(null)
    const router = useRouter()
     const onVideoClick = ()=>{
        if(playing) {
            VideoRef?.current?.pause();
            setPlaying(false)
        } else {
            VideoRef?.current?.play();
            setPlaying(true)
        }
     }

     useEffect(()=> {
        if(post && VideoRef?.current){
            VideoRef.current.muted = isVideoMuted
        }
     } , [post , isVideoMuted])


     const handleLike = async(like:boolean)=>{
        if(userProfile){
            const {data} = await axios.put(`/api/like` , {
                userId:userProfile._id,
                postId:post._id,
                like
            })
            setPost({ ...post , likes:data.likes})
        }
     }

     const addComment = async(e:any) => { 
        e.preventDefault()
        if(userProfile && comment) {
            setIsPostingComment(true)

            const {data} = await axios.put(`/api/post/${post._id}`, {
                userId:userProfile._id,
                comment
            });

            setPost({...post , comments:data.comments})
           
            setComment('');
            setIsPostingComment(false)
        }
     }

     if(!post) return null

  return (
    <div className='flex w-full absolute left-0 top-0 bg-white flex-col md:flex-row h-[103vh] overflow-y-scroll'>
      <div className='w-fit h-auto relative flex-2 lg:w-9/12 flex justify-center items-center bg-black'>
           <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
             <p className='cursor-pointer' onClick={()=>router.back()}>
                <MdOutlineCancel className='text-white text-[35px]'/>
             </p>
            </div> 
            <div className='relative'>
            <div >
                    {!playing && (
                        <button onClick={onVideoClick} className=''>
                            <BsFillPlayFill className='text-white text-6xl lg:text-8xl absolute left-0 right-0 top-0 bottom-0  m-auto'/>
                        </button>
                    )}
                </div>
                <div className='lg:h-[100vh] h-[60vh]'>
                    <video
                    ref={VideoRef}
                    onClick={onVideoClick}
                    src={post.video.asset.url}
                    className='h-full'
                    >
                    </video>
                </div>
                
            </div>
            <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
                {isVideoMuted ? (
                    <button onClick={()=>setIsVideoMuted(false)}>
                        <HiVolumeOff className='text-white text-2xl lg:text-4xl'/>
                    </button>
                ) : (
                    <button onClick={()=>setIsVideoMuted(true)}>
                        <HiVolumeUp className='text-white text-2xl lg:text-4xl'/>
                    </button>
                )}
            </div>
      </div>
      <div className='relative md:w-[900px] lg:w-[700px]'>
            <div className='lg:mt-20 mt-10'>

            <div className='mt-3 flex gap-3 p-2 cursor-pointer font-semibold rounded '>
                    <div className='ml-4 md:w-20 md:h-20 w-16 h-16'>
                        <Link href={`/profile/${post.postedBy?._id}`}>
                            <>
                                <Image
                                    width={62}
                                    height={62}
                                    className=' rounded-full'
                                    src={post.postedBy?.image}
                                    alt='user-profile'
                                    layout='responsive'
                                />
                            </>
                        </Link>
                    </div>
                    <div>
                        <Link href={`/profile/${post.postedBy?._id}`}>
                            <div className='flex flex-col gap-2'>
                                <p className='flex gap-2 items-center text-sm md:text-[1.2rem] font-bold text-primary'>
                                    {post.postedBy.userName}{' '}
                                    <GoVerified className='text-blue-400 text-md' />
                                </p>
                                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                                    {post.postedBy.userName}
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
                <p className='px-10 text-lg text-gray-600'>
                    {post.caption}
                </p>
                 <div className='mt-10 px-10'> 
                    {userProfile && (
                        <LikeButton
                        likes = {post.likes}
                        handleLike = {()=>handleLike(true)}
                        handleDislike = {()=>handleLike(false)}
                        />
                    )}
                 </div>   
               <Comments
                    comment={comment}
                    setComment={setComment}
                    addComment={addComment}
                    comments={post.comments}
                    isPostingComment={isPostingComment}
                 />
            </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${context.query.id}`)
   
    return {
      props: {
        postDetails:data
      }
    }
}

export default Detail
