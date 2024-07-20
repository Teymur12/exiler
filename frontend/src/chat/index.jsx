import { Link } from 'react-router-dom';
import tate from "../image/atate.jpg";
import { TbArrowBigLeftFilled } from "react-icons/tb";

import { setConversations } from '../slices/conversation.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';



const Message = () => {
  const dispatch = useDispatch()
  const conversations = useSelector(state => state.conversations.conversations ) || [];



  const getAllConversations = async () => {
    try {
      const response = await fetch('/api/users')
      const data = await response.json()


      if (!response.ok) {
        console.log("failed to get all conversations");
      }
      if (response.ok) {
        dispatch(setConversations(data))
      }

    } catch (error) {
      console.log(`fetch error: ${error}`);
    }
  }

  useEffect(() => {
    getAllConversations()
  }, [])

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 border-r border-gray-200">
        <div className="p-4">
          <input
            type="text"
            placeholder="Enter to Search..."
            className="w-full p-2 border border-gray-300 rounded hidden sm:block"
          />
        </div>
        <div className='p-4 grid flex-col items-center ml-6 text-[20px]'>
          <Link to="/"><TbArrowBigLeftFilled /></Link>
        </div>

        <div className="p-4 h-[80%] flex flex-col text-center overflow-y-scroll">
          <div className="ml-4 h-[60px] grid items-center hover:bg-gray-200">
            {conversations?.map((conversation) => (
              <div key={conversation.id} className="flex items-center gap-2">
                <img src={conversation.profilePic} alt="User" className="rounded-full" />
                <div>
                  <h1 className="font-semibold hidden sm:block">{conversation.name}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center">
            {/* <img src={selectedConversation.profilePic}  className="rounded-full w-10 h-10" /> */}
            <div className="ml-4">
              {/* <div className="font-semibold">{selectedConversation.userName}</div> */}
            </div>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="mb-4">
            <div className='flex justify-center mb-[40px]'>
              <Link to="/peopleProfile">
                <div className='flex flex-col items-center gap-y-2'>
                  <img className='w-[150px] h-[150px] rounded-full' src={tate} alt="Profile of Tate" />
                  <h1 className='text-[22px] font-semibold'>Tate</h1>
                </div>
              </Link>
            </div>



            <div className="bg-gray-200 w-[250px] sm:w-[350px] p-4 rounded-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae repudiandae tenetur doloribus quod sequi facere vitae molestias a necessitatibus ipsa. Aperiam sunt ducimus minima ipsam ratione aliquam minus delectus dicta.
            </div>
            <div className="text-sm text-gray-500 mt-2">April 2021</div>
          </div>
          <div className="mb-4 text-right">
            <div className="bg-blue-500 w-[250px] sm:w-[350px] text-white p-4 rounded-lg inline-block">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae repudiandae tenetur doloribus quod sequi facere vitae molestias a necessitatibus ipsa. Aperiam sunt ducimus minima ipsam ratione aliquam minus delectus dicta.
            </div>
            <div className="text-sm text-gray-500 mt-2">April 2021</div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 flex">
          <input
            type="text"
            placeholder="Enter your message..."
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button className="bg-blue-500 text-white p-2 rounded ml-2">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Message;
