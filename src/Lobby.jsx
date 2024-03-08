import React, { useState, useEffect, useCallback } from 'react';
import { useSocket } from "./context/Socketprovider"
import { useNavigate } from "react-router-dom"
const Lobby = () => {
  const [formData, setFormData] = useState({
    name: '',
    roomId: '',
  });

  const socket = useSocket();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("room:join", { name: formData.name, roomId: formData.roomId });
    console.log('Form submitted with data:', formData);
  };

  const handleJoinRoom = useCallback(({ name, roomId }) => {
    const Naame = name;
    const RooomId = roomId;
    console.log(Naame, RooomId)
    navigate(`/room/${RooomId}`)
  }, [navigate])

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off('room:join', handleJoinRoom)
    }
  }, [socket])

  return (

    <div className="bg-[#2b2a2b] h-screen w-full flex flex-col justify-center items-center text-center">
      <div className="text-[#b3a5b3] capitalize text-2xl m-5 font-thin tracking-[.5em]">one-to-one <br />
        <span className='text-[#cf4040] text-4xl font-extrabold tracking-[0em] italic'>video call </span></div>
      <form className='bg-[#161616] h-[300px] w-[320px] flex flex-col p-5 rounded-3xl font-extrabold  text-[#cf4040]' onSubmit={handleSubmit}>

        <label className='text-xl ' >
          Name<br></br>
          <input
            className='rounded-sm outline-none p-1 text-lg m-2  w-2/3 text-[#000000]'
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label className='text-xl ' >
          Room ID<br></br>
          <input
            className='rounded-sm outline-none p-1 w-2/3 text-lg m-2 mb-0 text-[#000000]'

            type="text"
            name="roomId"
            value={formData.roomId}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button className='bg-[#b92c2c] w-[100px] rounded-md p-2 m-auto mt-0 text-white' type="submit">Submit</button>
      </form>
    </div>

  );
};

export default Lobby;
