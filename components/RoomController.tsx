import React, { useState } from "react"
import { AudioSelectButton } from '@livekit/react-components'
import { Room } from 'livekit-client'
import Card from "./Card"
import Router from 'next/router'

interface RoomControllerProps {
  room: Room,
  enableAudio: boolean | undefined
}

const RoomController: React.FC<RoomControllerProps> = (props) => {
  
  const { room, enableAudio } = props
  const [audioEnabled, setAudioEnabled] = useState<boolean>(enableAudio as boolean)

  const toggleAudio = () => {
    if (audioEnabled) {
      setAudioEnabled(false);
      room.localParticipant.setMicrophoneEnabled(false)
    } else {
      setAudioEnabled(true);
      room.localParticipant.setMicrophoneEnabled(true)
    }
  }

  const endSpeaking = () => {
    
  }

  const leaveRoom = () => {
    room.disconnect()
    Router.push("/")
  }

  return (
    <Card>
      <div className="flex items-stretch">
        <div className="w-30 text-sm lg:text-lg">
          <AudioSelectButton
            isMuted={!audioEnabled}
            className="rounded-l-lg bg-blue-200 px-2 leading-10"
            popoverTriggerBtnClassName="rounded-r-lg bg-blue-200 px-2 leading-10"
            popoverContainerClassName="z-1000 cursor-pointer rounded-lg bg-slate-500 
            text-white mb-1 ml-4 p-2"
            onClick={toggleAudio}
            // onSourceSelected={setAudioDevice}
          />
        </div>
        <div className="ml-2 w-25 text-sm lg:w-30 lg:text-lg">
            <button
              className="rounded-xl bg-orange-500 text-white px-2 leading-10 w-full"
              // onClick={connectToRoom}
            >
              End Speaking
            </button>
        </div>
        <div className="ml-2 w-25 text-sm lg:w-30 lg:text-lg">
            <button
              className="rounded-xl bg-red-500 text-white px-2 leading-10 w-full"
              onClick={leaveRoom}
            >
              Leave Room
            </button>
        </div>
      </div>
    </Card>
  )
}

export default RoomController