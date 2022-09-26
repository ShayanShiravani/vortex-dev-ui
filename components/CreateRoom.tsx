import React, { useState } from "react"
import { addRoom } from "../utils/livekit/api"

const CreateRoom: React.FC = () => {
  const [room, setRoom] = useState<string>("")
  
  async function newRoom(room:string) {
    let result = await addRoom(room)
    if(result) {
      setRoom("")
    }
  }

  return (
    <>
      <div className="flex flex-col items-center mb-3">
        <input
          type="text"
          name="room-name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="rounded-lg border-solid border-2 border-sky-300 
          outline-none leading-loose w-60 px-2"
          placeholder="Insert name..."
          autoFocus={true}
        />
      </div>
      <div className="flex flex-col items-center mb-3">
        <button
          className="rounded-lg bg-blue-200 w-60 px-2 leading-10"
          onClick={() => newRoom(room)}
        >
          Create
        </button>
      </div>
    </>
  )
}

export default CreateRoom