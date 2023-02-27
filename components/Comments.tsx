import React, { Dispatch, SetStateAction } from 'react'
import { GoVerified } from 'react-icons/go'
import Image from 'next/image'
import Link from 'next/link'
import NoResults from './NoResults'
import useAuthStore from '../store/authStore'
import { User, UserProfile } from '../types'
import { NextPage } from 'next'

interface Props {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  isPostingComment: Boolean;
  comments: {
    _key: string;
    comment: string;
    postedBy: {
      _ref:string;
      _id: string;
    };
  }[]
};

const Comments = ({ comment, addComment, comments, isPostingComment, setComment }: Props) => {

  const { userProfile, allUsers } = useAuthStore()

  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll h-[250px] lg:h-[400px]'>
        {comments.length > 0 ? (
          comments.map((item, idx) => (
            <>
              {allUsers.map((user: User) => (
                user._id === item.postedBy._id && (
                  <div className='p-2 items-center' key={idx}>
                    <Link href={`/profile/${user._id}`}>
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
                            {user.userName.replaceAll(' ', '')}
                            <GoVerified />
                          </p>
                          <p className='capitalize text-gray-400 text-xs'>
                            {user.userName}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <div>
                      <p>
                        {item.comment}
                      </p>
                    </div>
                  </div>
                )
              ))}
            </>
          ))
        ) : (
          <NoResults text='No comments yet!' />
        )}
      </div>
      {userProfile && (
        <div className='absolute bottom-0 w-full left-0 mb-6 px-2 md:px-10'>
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-primary px-6 py-4 mb-3 text-md font-medium border-2 w-full border-gray-200 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button className='text-[1.2rem] text-gray-400' onClick={() => { }}>
              {isPostingComment ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments