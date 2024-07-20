import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Header from './header';
import Footer from './footer';
import Loader from './loader';
import ViewFollowers from '../modals/viewFollowerModal';
import ViewFollow from '../modals/viewFollowModal';
import { RiWindow2Line } from 'react-icons/ri';
import PostModal from '../modals/otherPeoplePostModal';

const fetchUserProfile = async (userId) => {
    try {
        const response = await fetch(`/api/user/${userId}`);
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

const fetchPosts = async (userId) => {
    try {
        const response = await fetch(`/api/post/getuserpost/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
};

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openFollowingModal, setOpenFollowingModal] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false); // New loading state

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const userData = await fetchUserProfile(id);
                setUser(userData);
            } catch (error) {
                setError(error.message);
            }
        };

        getUserProfile();
    }, [id]);

    useEffect(() => {
        const getPosts = async () => {
            const fetchedPosts = await fetchPosts(id);
            setPosts(fetchedPosts);
        };

        getPosts();
    }, [id]);

    const handleFollowClick = async () => {
        if (!user) return;

        setLoading(true); // Start loading
        try {
            const response = await fetch(`/api/auth/follow/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({ following: !user.following })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
                throw new Error('Network response was not ok');
            }

            // Update the local user state to reflect the new follow status
            setUser(prevUser => ({
                ...prevUser,
                following: !prevUser.following
            }));
        } catch (error) {
            console.error('Error following user:', error);
        } finally {
            setLoading(false); // End loading
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>{<Loader />}</div>;

    const handleFollowersClick = () => {
        setOpenModal(true);
    };

    const handleFollowingClick = () => {
        setOpenFollowingModal(true);
    };

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setIsPostModalOpen(true);
    };

    const closePostModal = () => {
        setIsPostModalOpen(false);
        setSelectedPost(null);
    };

    return (
        <div>
            <Header />
            <div className="flex justify-center">
                <div className="grid mt-[20px]">
                    <div className=''>
                        <div className="flex justify-around flex-wrap gap-y-3 w-auto sm:w-[600px] ">
                            <div>
                                <img
                                    className="rounded-full w-[165px] object-cover h-[165px]"
                                    src={`../${user.profilePic}`}
                                    alt="Profile"
                                // onError={(e) => e.target.src = tate} 
                                />
                            </div>
                            <div className="flex flex-col gap-y-5">
                                <div className="flex items-center gap-3">
                                    <p className="font-bold text-2xl">{user.userName}</p>
                                    <button
                                        onClick={handleFollowClick}
                                        className={`border text-white w-[90px] h-[35px] rounded-[10px] ${user.following ? 'bg-[#0095F6]' : 'bg-gray-500'}`}
                                        disabled={loading} // Disable button while loading
                                    >
                                        {loading ? 'Loading...' : (user.following ? 'Unfollow' : 'Follow')}
                                    </button>
                                </div>
                                <div className="flex gap-3">
                                    <div className='flex gap-1'><p className='font-bold'>0</p>gonderi</div>
                                    <div className="flex gap-1 cursor-pointer" onClick={handleFollowersClick}>
                                        <p className="font-bold">{user.followers?.length}</p> followers
                                    </div>
                                    <div className="flex gap-1 cursor-pointer" onClick={handleFollowingClick}>
                                        <p className="font-bold">{user.following?.length}</p> following
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold">{user.fullName}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-[96px] border-t border-black pt-[15px]">
                            <div className="flex items-center gap-1">
                                <p><RiWindow2Line /></p>
                                <h1>POSTS</h1>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-center flex-wrap ml-0 lg:ml-[70px]">
                            <div className="flex gap-1 justify-center lg:justify-start flex-wrap max-w-screen-lg mb-10">
                                {posts.map((post) => (
                                    <div key={post._id} onClick={() => handlePostClick(post)}>
                                        <a href="#" key={post._id}>
                                            <img className="w-[307px] h-[307px] object-cover" src={`../${post.body}`} alt="Post" />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ViewFollowers
                openModal={openModal}
                setOpenModal={setOpenModal}
                currentFollowers={user.followers || []}
            />
            <ViewFollow
                openFollowingModal={openFollowingModal}
                setOpenFollowingModal={setOpenFollowingModal}
                currentFollowing={user.following || []}
            />
            <PostModal
                isOpen={isPostModalOpen}
                post={selectedPost}
                onClose={closePostModal}
            />
            <Footer />
        </div>
    );
};

export default Profile;
