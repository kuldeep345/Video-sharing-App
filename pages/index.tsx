import axios from 'axios'
import { Video } from '../types'
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';

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

export async function getServerSideProps(){
  const {data} = await axios.get(`http://localhost:3000/api/post`)
 
  return {
    props:{
      videos:data
    }
  }
}

export default Home
