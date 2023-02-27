import axios from 'axios'
import { Video } from '../types'
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';
import { GetServerSideProps } from 'next';

type Props = {
  videos:Video[];
}

const Home = ({videos}:Props) => {
  
  return (
    <div className='text-3xl font-bold'> 
      {videos.length ? (
        videos.map((video:Video)=>(
          <VideoCard post={video} key={video._id}/>
        ))
      ) : (
        <NoResults text="No videos"/>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const topic = context.query.topic

  let response = null;
  
  if(topic){
    response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/discover/${topic}`)
  }
  else{
    response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`)
  }
 
  return {
    props:{
      videos:response.data
    }
  }
}

export default Home
