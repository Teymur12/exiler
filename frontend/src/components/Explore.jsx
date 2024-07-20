import React, { useEffect, useState } from 'react';
import Header from './header';
import PostModal from '../modals/explorePostModal'; // Import the new modal component


const App = () => {
  const [posts, setPosts] = useState([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false); // State for post modal
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
};

const closePostModal = () => {
    setIsPostModalOpen(false);
    setSelectedPost(null);
};

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch('/api/post/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          console.log('Server error:', errorMessage);
        } else {
          const data = await response.json();
          setPosts(data.posts);
        }
      } catch (error) {
        console.error('Error during fetching posts:', error);
      }
    };

    getPosts();
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto pt-5">
          <div  className="flex flex-wrap gap-1 justify-center">
            {posts.map((post, index) => (
              <div key={post._id} onClick={() => handlePostClick(post)}>
                <img key={index} src={post.body} alt="" className="object-cover w-[316px] h-[316px]" />

              </div>
            ))}
          </div>
        </div>
      </div>
      <PostModal
        isOpen={isPostModalOpen}
        post={selectedPost}
        onClose={closePostModal}
      />
    </div>
  );
};


export default App;
