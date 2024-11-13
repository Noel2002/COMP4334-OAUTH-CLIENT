import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/AuthContext';
import { BLOGS } from '@/lib/data';
import React, { useEffect } from 'react';

type BlogCardProps = {
  title: string;
  content: string;
  photo: string;
}

const BlogCard = (props: BlogCardProps) => {
  return (
    <div>
      <img src={props.photo} alt={props.title} className=' rounded-xl' />
      <h2 className=' font-bold text-xl'>{props.title}</h2>
      <p className=' font-light line-clamp-3'>{props.content}</p>
    </div>
  )
}

const Home = () => {
  const context = React.useContext(AuthContext);
  const [blogs, setBlogs] = React.useState(BLOGS);

  useEffect(() => {
    if(context?.isAuthenticated){
      setBlogs(BLOGS);
    }else{
      setBlogs(BLOGS.slice(0, 3));
    }
  },[context]);

  return (
    <div>
      <div className=' grid grid-cols-3 gap-8'>
        {
          blogs.map((blog) => (
            <BlogCard 
              key={blog.id}
              title={blog.title}
              content={blog.content}
              photo={blog.photo}
            />
          ))
        }
      </div>
      {!context?.isAuthenticated && 
        <div className=' bg-gray-300/30 w-full py-12 mt-8'>
            <div className='w-[600px] mx-auto text-center space-y-4'>
              <p className=' text-2xl font-base'>Read the best stories from industry leaders on Blog.</p>
              <p>The owners of Blog. made these stories available for Blog. members only. Sign in to instantly unlock this story plus other member-only benefits.</p>
              <Button onClick={context?.login}>Sign in</Button>
            </div>
        </div>
      }
    </div> 
  )
}

export default Home