import React, { useRef, useState } from 'react';
import Header from 'components/header';
import { useNavigate } from 'react-router';

const CreatePost = () => {
    const navigate = useNavigate();

    const bodyRef = useRef();
    const titleRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('postPic', bodyRef.current.files[0]);
        formData.append('title', titleRef.current.value.trim());

        try {
            const response = await fetch('/api/post/create', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.log('Server error:', errorMessage);
            } else {
                const data = await response.json();
                console.log(data);
                alert("Successfully created");
                navigate("/");
            }
        } catch (error) {
            console.error('Error during post creation:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className='flex justify-center mt-[150px]'>
                <div className='bg-zinc-100 border w-[500px] h-[375px]'>
                    <div className="grid gap-y-3">
                        <div className="px-[40px] pt-8 pb-6">
                            <div className="flex justify-center mb-8">
                                <p className='font-semibold text-[30px]'>Create Post</p>
                            </div>
                            <form className="grid gap-y-6" onSubmit={handleSubmit}>
                                <label className="relative flex bg-white border focus-within:border-gray-400 rounded-sm">
                                    <input 
                                        type='file'
                                        ref={bodyRef}
                                    />
                                </label>
                                <label className="relative flex bg-white border focus-within:border-gray-400 rounded-sm">
                                    <input
                                        placeholder='Description'
                                        className="bg-transparent px-2 outline:none w-full h-[38px] text-s valid:pt-[10px] peer"
                                        type='text'
                                        ref={titleRef}
                                    />
                                </label>
                                <button type="submit" className='border bg-brand w-[150px] h-[40px] text-white font-medium'>
                                    Post
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
