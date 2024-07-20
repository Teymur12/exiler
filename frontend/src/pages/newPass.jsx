import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NewPass = () => {
    const passwordRef1 = useRef();
    const passwordRef2 = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const handlePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };

    const handlePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const passwordValue1 = passwordRef1.current.value.trim();
        const passwordValue2 = passwordRef2.current.value.trim();

        if (!passwordValue1 || !passwordValue2) {
            alert('Please fill up all fields');
            return;
        }

        if (passwordValue1 !== passwordValue2) {
            alert('Passwords do not match');
            return;
        }

        dispatch({ type: 'UPDATE_PASSWORD', password: passwordValue1 });

        navigate('/success');
    };

    return (
        <div className='flex justify-center'>
            <div className='h-[494px] w-[360px] border border-gray-200 mt-[9%] flex justify-center flex-col items-center text-center gap-y-8'>
                <div className='grid gap-y-2'>
                    <h1 className='font-bold'>Create A Strong Password</h1>
                    <p className='text-gray-400 text-sm'>
                        Your password must be at least 6 <br /> characters and should include a <br /> combination of numbers, letters and <br /> special characters (!$@%).
                    </p>
                </div>
                <label className="relative flex bg-zinc-50 border focus-within:border-gray-400 rounded-sm">
                    <input
                        required
                        className="bg-transparent px-2 outline-none w-[225px] h-[45px] text-xs peer"
                        ref={passwordRef1}
                        type={showPassword1 ? 'text' : 'password'}
                    />
                    <span className="absolute top-1/2 left-[9px] cursor-text pointer-events-none text-xs text-gray-400 -translate-y-1/2 transition-all peer-valid:text-[10px] peer-valid:top-2.5">
                        New password
                    </span>
                    <div className="h-full select-none  flex cursor-pointer items-center text-sm font-semibold pr-2" onClick={handlePasswordVisibility1}>
                        {showPassword1 ? 'Hide' : 'Show'}
                    </div>
                </label>
                <label className="relative flex bg-zinc-50 border focus-within:border-gray-400 rounded-sm">
                    <input
                        required
                        className=" w-[225px] h-[45px] bg-transparent px-2 outline-none  text-xs peer"
                        ref={passwordRef2}
                        type={showPassword2 ? 'text' : 'password'}
                    />
                    <span className="absolute top-1/2 left-[9px] cursor-text pointer-events-none text-xs text-gray-400 -translate-y-1/2 transition-all peer-valid:text-[10px] peer-valid:top-2.5">
                        New password , again
                    </span>
                    <div className="h-full select-none  flex cursor-pointer items-center text-sm font-semibold pr-2" onClick={handlePasswordVisibility2}>
                        {showPassword2 ? 'Hide' : 'Show'}
                    </div>
                </label>
                <div className='bg-[#0095F6] text-white font-medium text-sm rounded-[10px] w-[267px] h-[44px] flex justify-center'>
                    <button>Reset Password</button>
                </div>
            </div>
        </div>
    );
};

export default NewPass;
