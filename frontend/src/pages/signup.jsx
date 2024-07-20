import React, { useRef, useState, useEffect } from 'react';
import { RiFacebookBoxFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../slices/user.slice';
import logo from '../image/logo.png';
import playmarket from '../image/playmarket.png';
import microsoft from '../image/microsoft.png';

const Signup = () => {
  const [show, setShow] = useState(false);
  const [inputType, setInputType] = useState('password');

  useEffect(() => {
    setInputType(show ? 'text' : 'password');
  }, [show]);

  const fullNameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const imageRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fullNameValue = fullNameRef.current.value.trim();
    const userNameValue = userNameRef.current.value.trim();
    const emailValue = emailRef.current.value.trim();
    const passwordValue = passwordRef.current.value.trim();
    const imageFile = imageRef.current.files[0];

    if (!fullNameValue || !userNameValue || !emailValue || !passwordValue || !imageFile) {
      console.error('Please fill up all fields');
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append('fullName', fullNameValue);
    formData.append('userName', userNameValue);
    formData.append('email', emailValue);
    formData.append('password', passwordValue);
    formData.append('profilePic', imageFile);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.log('Server error:', errorMessage);
      } else {
        const data = await response.json();
        dispatch(setUser(data));
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/auth/signin');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  return (
    <div className="h-full w-full flex items-center flex-wrap overflow-auto justify-center gap-x-8 mt-5 mb-5">
      <div className="w-[350px] grid gap-y-3">
        <div className="bg-white border px-[40px] pt-8 pb-6">
          <a className="flex justify-center" href="#">
            <img className="h-[70px]" src={logo} alt="" />
          </a>
          <span className="flex justify-center text-center font-medium text-gray-500 mt-3 mb-3">
            Sign up to see photos and videos <br /> from your friends.
          </span>
          <a
            className="border w-[268px] h-[34px] rounded-[10px] bg-brend flex justify-center mb-2.5 items-center gap-x-2 text-sm font-semibold text-white"
            href="#"
          >
            <RiFacebookBoxFill size={20} />
            Log in with Facebook
          </a>
          <form className="grid gap-y-2" onSubmit={handleSubmit}>
            <div className="flex items-center my-2.5 mb-3.5">
              <div className="h-px bg-gray-300 flex-1"></div>
              <span className="px-4 text-[13px] text-gray-500 font-semibold">OR</span>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>
            <label className='relative flex bg-zinc-50 border focus-within:border-gray-400 rounded-sm'>
              <input required={true} className="bg-transparent px-2 outline:none w-full h-[38px] text-xs valid:pt-[10px] peer" ref={emailRef} type="text" />
              <span className="absolute top-1/2 left-[9px] cursor-text pointer-events-none text-xs text-gray-400 -translate-y-1/2 transition-all peer-valid:text-[10px] peer-valid:top-2.5">Email</span>
            </label>
            <label className='relative flex bg-zinc-50 border focus-within:border-gray-400 rounded-sm'>
              <input required={true} className="bg-transparent px-2 outline:none w-full h-[38px] text-xs valid:pt-[10px] peer" ref={fullNameRef} type="text" />
              <span className="absolute top-1/2 left-[9px] cursor-text pointer-events-none text-xs text-gray-400 -translate-y-1/2 transition-all peer-valid:text-[10px] peer-valid:top-2.5">Full Name</span>
            </label>
            <label className='relative flex bg-zinc-50 border focus-within:border-gray-400 rounded-sm'>
              <input required={true} className="bg-transparent px-2 outline:none w-full h-[38px] text-xs valid:pt-[10px] peer" ref={userNameRef} type="text" />
              <span className="absolute top-1/2 left-[9px] cursor-text pointer-events-none text-xs text-gray-400 -translate-y-1/2 transition-all peer-valid:text-[10px] peer-valid:top-2.5">Username</span>
            </label>
            <label className='relative flex bg-zinc-50 border focus-within:border-gray-400 rounded-sm'>
              <input required={true} className="bg-transparent px-2 outline:none w-full h-[38px] text-xs valid:pt-[10px] peer" ref={passwordRef} type={inputType} />
              <span className="absolute top-1/2 left-[9px] cursor-text pointer-events-none text-xs text-gray-400 -translate-y-1/2 transition-all peer-valid:text-[10px] peer-valid:top-2.5">Password</span>
              <div className="h-full select-none flex cursor-pointer items-center text-sm font-semibold pr-2" onClick={() => setShow(!show)}>
                {show ? 'Hide' : 'Show'}
              </div>
            </label>
            <label>
              <input ref={imageRef} type="file" />
            </label>

            <p className="text-[12px] text-gray-500 text-center">
              People who use our service may have uploaded <br /> your contact information to Instagram. Learn <br /> More
            </p>
            <p className="text-[12px] text-gray-500 text-center">
              By signing up, you agree to our Terms , Privacy <br /> Policy and Cookies Policy .
            </p>
            <button className="mt-1 h-[30px] bg-brand font-semibold rounded text-white text-sm" type="submit">
              Sign up
            </button>
          </form>
        </div>
        <div onClick={handleSubmit} className="h-[70px] bg-white flex justify-center items-center text-sm text-center border">
          Have an account? <Link to="/auth/signin" className="font-semibold text-brand">
            Log In
          </Link>
        </div>
        <div className="flex justify-center text-sm">Get the app.</div>
        <div className="flex justify-center gap-2">
          <a href="#">
            <img className="h-[40px]" src={playmarket} alt="" />
          </a>
          <a href="#">
            <img className="h-[40px]" src={microsoft} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
