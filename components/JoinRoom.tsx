import { Menu } from "@headlessui/react"
import React, { useEffect, useState } from "react"
import { getRoomsList, joinRoom } from "../utils/livekit/api"
import DropDown from "./Dropdown"
import { AudioSelectButton } from '@livekit/react-components';
import { LIVEKIT_SERVER_URL } from "../config/index"
import Router from "next/router";

const JoinRoom: React.FC = () => {
  const [username, setUsername] = useState<string>("")
  const [rooms, setRooms] = useState<string[]>([])
  const [selectedRoom, setSelectedRoom] = useState<string>("")
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true)
  const [audioDevice, setAudioDevice] = useState<MediaDeviceInfo>()

  useEffect(() => {
    getRoomsList()
      .then(res => {
        setRooms(res)
      })
  }, []) //eslint-disable-line

  const toggleAudio = () => {
    console.log(audioDevice)
    if (audioEnabled) {
      setAudioEnabled(false);
    } else {
      setAudioEnabled(true);
    }
  }

  const connectToRoom = async () => {
    if(selectedRoom.length === 0)  {
      return
    }
    if(username.length === 0) {
      return
    }

    let token = await joinRoom(selectedRoom, username)
    if(token === null) {
      return
    }

    const params: { [key: string]: string } = {
      url: LIVEKIT_SERVER_URL,
      token,
      videoEnabled: '0',
      audioEnabled: audioEnabled ? '1' : '0',
      simulcast: '1',
      dynacast: '1',
      adaptiveStream: '1',
    };
    if (audioDevice) {
      params.audioDeviceId = audioDevice.deviceId;
    }

    Router.push({
      pathname: '/room',
      query: params
    }, undefined, { shallow: true })
    
  }


  return (
    <>
      <div className="flex space-x-5 mb-5">
        <DropDown
          buttonText="Select Room"
          position="left"
        >
          <div className="px-1 py-1 ">
            {rooms.map((room) => (
              <Menu.Item
                key={room}
              >
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-slate-200' : ''
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => setSelectedRoom(room)}
                  >
                    {room}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </DropDown>
        <div className="text-indigo-500 align-middle">
          <span className="text-xs">
            Selected Room:
          </span>
          <b className="ml-3 text-black">{selectedRoom}</b>
        </div>
      </div>
      <div className="mb-5 text-sm">
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-lg border-solid border-2 border-sky-300 
          outline-none leading-10 w-full px-2"
          placeholder="Insert username..."
          autoFocus={true}
        />
      </div>
      <div className="flex text-sm items-stretch">
        <div className="mr-2 w-20">
          <button
            className="rounded-lg bg-blue-200 px-2 leading-10 w-full"
            onClick={connectToRoom}
          >
            Join
          </button>
        </div>
        <div className="mx-2">
          <AudioSelectButton
            isMuted={!audioEnabled}
            className="rounded-l-lg bg-blue-200 px-2 leading-10"
            popoverTriggerBtnClassName="rounded-r-lg bg-blue-200 px-2 leading-10"
            popoverContainerClassName="z-1000 cursor-pointer rounded-lg bg-slate-500 
            text-white mb-1 ml-4 p-2"
            onClick={toggleAudio}
            onSourceSelected={setAudioDevice}
          />
        </div>
      </div>
    </>
  )
}

export default JoinRoom