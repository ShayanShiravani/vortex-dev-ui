import axios from 'axios'
import { LIVEKIT_BACKEND_URL } from '../../config';
import { Room } from 'livekit-client'
import { LIVEKIT_BACKEND_RESPONSE } from '../../constants/types';

export const getRoomsList = async (): Promise<string[]> => {
  try {
    let { data } = await axios.get<LIVEKIT_BACKEND_RESPONSE>(LIVEKIT_BACKEND_URL)
    if(data.success) {
      let rooms = data.data
      let roomNames = rooms.reduce((result: string[], room: Room) => {
        result.push(room.name)
        return result
      }, [])
      return roomNames
    } else {
      return []
    }
  } catch (error) {
    console.log(error.message)
    return []
  }
}

export const addRoom = async (name: string): Promise<boolean> => {
  try {
    let { data } = await axios.post<LIVEKIT_BACKEND_RESPONSE>(LIVEKIT_BACKEND_URL + "create", {
      room: name
    })
    if(data.success) {
      let room = data.data
      return true
    } else {
      console.log(data.message)
    }
  } catch (error) {
    console.log(error.message)
  }
  return false
}

export const joinRoom = async (room: string, username: string): Promise<string|null> => {
  try {
    let { data } = await axios.post<LIVEKIT_BACKEND_RESPONSE>(LIVEKIT_BACKEND_URL + "join", {
      room: room,
      participant: username
    })
    if(data.success) {
      let token = data.data
      return token
    } else {
      console.log(data.message)
    }
  } catch (error) {
    console.log(error.message)
  }
  return null
}

export const changeTurn = async (room: string): Promise<boolean> => {
  try {
    let { data } = await axios.post<LIVEKIT_BACKEND_RESPONSE>(LIVEKIT_BACKEND_URL + "change-turn", {
      room: room
    })
    if(data.success) {
      return true
    } else {
      console.log(data.message)
    }
  } catch (error) {
    console.log(error.message)
  }
  return false
}

export const skipTurn = async (room: string, identity: string): Promise<boolean> => {
  try {
    let { data } = await axios.post<LIVEKIT_BACKEND_RESPONSE>(LIVEKIT_BACKEND_URL + "skip-turn", {
      room: room,
      identity: identity
    })
    if(data.success) {
      return true
    } else {
      console.log(data.message)
    }
  } catch (error) {
    console.log(error.message)
  }
  return false
}