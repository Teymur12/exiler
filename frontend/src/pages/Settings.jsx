import Header from 'components/header';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from 'slices/user.slice';


const ProfileUpdate = () => {
    const { register, handleSubmit } = useForm();
    const [file, setFile] = React.useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch() 
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('email', data.email);
            formData.append('fullName', data.fullName);
            formData.append('userName', data.userName);
            formData.append('password', data.password);
            if (file) {
                formData.append('profilePic', file);
            }

            const response = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Profile updated successfully:', result);
            dispatch(setUser(result))
            navigate('/profile',{state:{true:true}});
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    useEffect(() => {
        onSubmit()
    },[])

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };


    return (
        <div>
            <Header/>
            <div className='grid justify-center items-center mt-[8%]'>

            <h1 className='mb-[20px]'>Update Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='grid gap-y-3'>
                <div>

                    <input className='border bg-gray-100 h-[40px] w-[280px]' placeholder='email' type="text" {...register('email')} />
                </div>
                <div>
                
                    <input className='border bg-gray-100 h-[40px] w-[280px]' placeholder='Full Name' type="text" {...register('fullName')} />
                </div>
                <div>
            
                    <input className='border bg-gray-100 h-[40px] w-[280px]' placeholder='User Name' type="text" {...register('userName')} />
                </div>
                <div>
            
                    <input className='border bg-gray-100 h-[40px] w-[280px]' placeholder='Password ' type="password" {...register('password')} />
                </div>
                <div>
                    
                    <input className='border bg-gray-100 h-[31px] w-[280px]' placeholder='' type="file" onChange={handleFileChange} />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
            </div>
    );
};

export default ProfileUpdate;