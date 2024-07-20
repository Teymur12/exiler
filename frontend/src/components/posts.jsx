import React, { useEffect, useRef, useState } from 'react';
import tate from "../image/atate.jpg";
import { BsThreeDots } from "react-icons/bs";
import send from "../image/send.png";
import save from "../image/save-instagram.png";
import comment from "../image/chat.png";
import { timeSince } from '../utils/utils';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost } from '../post/postAction';
import { LuDelete } from "react-icons/lu";
import { Link } from 'react-router-dom';

const Posts = () => {
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const [isRed, setIsRed] = useState({});
    const commentRef = useRef({});
    const [showModal, setShowModal] = useState(false);
    const [modalComments, setModalComments] = useState([]);
    const [dotsOpen, setDotsOpen] = useState(false);

    const openModal = () => {
        setDotsOpen(true);
    };

    const closeModal = () => {
        setDotsOpen(false);
    };

    useEffect(() => {
        const getFollowingPosts = async () => {
            const response = await fetch('/api/post/getfollowingpost',
            );
            const data = await response.json();
        }
        getFollowingPosts();

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
    }, [posts]);


    useEffect(() => {
        const storedLikes = JSON.parse(localStorage.getItem("likings")) || [];
        const initialIsRed = storedLikes.reduce((acc, postId) => {
            acc[postId] = true;
            return acc;
        }, {});
        setIsRed(initialIsRed);
    }, []);

    const handleClick = (id) => {
        const updatedIsRed = { ...isRed };
        const storedLikes = JSON.parse(localStorage.getItem("likings")) || [];

        if (updatedIsRed[id]) {
            delete updatedIsRed[id];
            dispatch(unlikePost(id));
            const newStoredLikes = storedLikes.filter(likeId => likeId !== id);
            localStorage.setItem("likings", JSON.stringify(newStoredLikes));
        } else {
            updatedIsRed[id] = true;
            dispatch(likePost(id));
            storedLikes.push(id);
            localStorage.setItem("likings", JSON.stringify(storedLikes));
        }

        setIsRed(updatedIsRed);
    };


    const sendComment = async (id) => {
        const commentValue = commentRef.current[id]?.value.trim();
        if (!commentValue) return;

        const response = await fetch(`/api/post/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment: commentValue }),
        });

        if (!response.ok) {
            console.log("Comment not sent");
        } else {
            alert("Comment successfully sent");
            commentRef.current[id].value = '';
        }
    };

    const deleteComment = async (id, commentId) => {
        try {
            const response = await fetch(`/api/post/${id}/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error('Failed to delete comment');
                return;
            }



            closeModal();
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const toggleModal = (comments) => {
        setModalComments(comments);
        setShowModal(!showModal);
    };

    return (
        <div className='grid justify-center pb-6'>
            <div className='w-[300px] sm:w-[468px] h-auto border-b border-t bg-white'>
                <div className='pb-4 pt-4'>
                    {posts.map(post => (
                        <div key={post._id}>
                            <div className='flex h-[50px] w-[100%] justify-between items-center'>
                                <div className='w-[200px] flex items-center ml-[10px] mt-[10px] gap-3'>
                                    <Link to={`/peopleProfile/${post.postedBy._id}`}>
                                        <a className='flex items-center' href="">
                                            <img className='w-[40px] h-[40px] object-cover rounded-[50%] border' src={post.postedBy.profilePic} alt="" />
                                            <p className='font-semibold text-[14px] ml-[10px]'>{post.postedBy.userName}</p>
                                        </a>
                                    </Link>
                                    <p className='text-xs text-gray-500'>
                                        {timeSince(new Date(post.createdAt))}
                                    </p>
                                </div>
                                <button onClick={openModal}>
                                    <BsThreeDots />
                                </button>

                                {dotsOpen && (
                                    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                                        <div className="bg-white p-4 rounded w-[250px] h-[70px] flex justify-center items-center">
                                            <button className=' text-red-600 font-semibold text-[20px]'>span</button>

                                            <button className='text-white absolute right-4 top-4 text-[30px]' onClick={closeModal}>X</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className='h-[400px] mt-[12px] object-cover'>
                                    <img className='w-[100%] h-[100%] object-cover' src={post.body} alt="" />
                                </div>
                            </div>
                            <div className='grid gap-y-2 mt-3'>
                                <div className='flex justify-between'>
                                    <div className='flex gap-4'>
                                        <button onClick={() => handleClick(post._id)} className='text-[22px]'>
                                            <FaHeart style={{ color: isRed[post._id] ? 'red' : 'black' }} />
                                        </button>
                                        <button onClick={() => toggleModal(post.comments)} className='w-[22px]'>
                                            <img src={comment} alt="" />
                                        </button>
                                        <button className='w-[22px]'>
                                            <img src={send} alt="" />
                                        </button>
                                    </div>
                                    <button className='w-[22px]'>
                                        <img src={save} alt="" />
                                    </button>
                                </div>
                                <div>
                                    <h6 className='text-sm font-semibold'>{post.likes.length} likes</h6>
                                </div>
                                <div className='flex gap-3'>
                                    <span className='font-bold text-xs'>{post.postedBy.userName}</span>
                                    <span className='text-xs font-medium text-gray-700'>{post.title}</span>
                                </div>
                                <div>
                                    <button className='text-gray-500 text-s' type='button'>View all comments</button>
                                </div>
                                <div className='max-h-[85px]'>
                                    <div className='flex justify-between'>
                                        <div>
                                            <input type="text" placeholder='Add a comment...' ref={el => commentRef.current[post._id] = el} />
                                        </div>
                                        <div>
                                            <button className='text-gray-500' onClick={() => sendComment(post._id)}>Post</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal showModal={showModal} comments={modalComments} onDelete={deleteComment} onClose={() => setShowModal(false)} />
        </div>
    );
};

const Modal = ({ showModal, comments, onDelete, onClose }) => {
    if (!showModal) return null;
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-[500px] h-[400px] p-4 rounded-lg overflow-y-scroll">
                <button onClick={onClose} className="absolute text-white text-[25px] right-4 top-4">X</button>
                <div className=" h-full mt-4">
                    {comments.map((comment, index) => (
                        <div key={index} className="flex justify-between mb-3">
                            <h6 className="flex gap-1 items-center">
                                <img src={comment.profilePic} className="w-[25px] h-[25px] rounded-[50%]" alt="" />
                                <span className="font-bold text-[20px]">{comment.username}</span>
                                <p className="text-gray-600 text-[15px]">{comment.comment}</p>

                            </h6>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Posts;