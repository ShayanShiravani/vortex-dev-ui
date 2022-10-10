import { LiveKitRoom, useRoom } from '@livekit/react-components'
import { Room as LivekitRoom, RoomEvent, setLogLevel } from 'livekit-client';
import type { NextPage } from 'next'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState, useCallback } from 'react'
import RoomController from '../components/RoomController';
import { changeTurn } from '../utils/livekit/api';

const Room: NextPage = () => {

  const router = useRouter()
  const { query } = router
  const url = query.url as string
  const token = query.token as string
  const { room } = useRoom()
  const [roomName, setRoomName] = useState<string>("")
  const [intervalId, setIntervalId] = useState<number|undefined>(undefined)

  useEffect(() => {
    if (!url || !token) {
      Router.push({
        pathname: "/"
      })
    }
    if (room) {
      let { localParticipant } = room
      localParticipant.setCameraEnabled(false)
    }
  }, []) //eslint-disable-line


  const handleRoomMetadataChanged = (metadata: string) => {
    console.log(JSON.parse(metadata||"{}"))
  }

  const onConnected = (room: LivekitRoom) => {
    setLogLevel('debug')
    setRoomName(room.name)
    let { localParticipant, options } = room
    localParticipant.setScreenShareEnabled(false)
    localParticipant.setCameraEnabled(false)
    localParticipant.setMicrophoneEnabled(query.audioEnabled==='1')
    if (query.hasOwnProperty('audioDeviceId')) {
      const audioDeviceId = query.audioDeviceId
      if (audioDeviceId && options.audioCaptureDefaults) {
        options.audioCaptureDefaults.deviceId = audioDeviceId;
      }
    }

    room
      .on(RoomEvent.ParticipantPermissionsChanged, (prevPermissions, participant) => {
        console.log("Can publish:", localParticipant.permissions?.canPublish)
        // if (
        //   participant.identity == localParticipant.identity
        // ) {
        //   if(
        //     localParticipant.permissions?.canPublish && 
        //     !localParticipant.isMicrophoneEnabled
        //   ) {
        //     console.log("Enable microphone")
        //     localParticipant.setMicrophoneEnabled(true)
        //   } else if (
        //     !localParticipant.permissions?.canPublish
        //   ) {
        //     console.log("Disable microphone")
        //     localParticipant.setMicrophoneEnabled(false)
        //   }
        // }
      })
      .on(RoomEvent.RoomMetadataChanged, handleRoomMetadataChanged)
      .on(RoomEvent.ParticipantMetadataChanged, (metadata, participant) => {
        console.log("Metadata:", localParticipant.metadata)
        if(participant.identity == localParticipant.identity && 
          localParticipant.metadata && localParticipant.metadata.length > 0) {
          const parsedMetadata = JSON.parse(localParticipant.metadata)
          if(parsedMetadata.no == 1 && !intervalId) {
            console.log("I'm room leader")
            const changeTurnIntervalId = window.setInterval(() => {
              console.log("Request to change turn")
              changeTurn(room.name)
            }, 10000)
            setIntervalId(changeTurnIntervalId)
          }
          if(parsedMetadata.canPublish) {
            localParticipant.setMicrophoneEnabled(true)
          } else {
            localParticipant.setMicrophoneEnabled(false)
          }
        }
      })
  }

  const onLeave = useCallback(() => {
    console.log("intervalId:", intervalId)
    if(intervalId) {
      console.log("Clear interval")
      clearInterval(intervalId)
    }
  }, [intervalId])

  return (
    <div>
      <Head>
        <title>Vortex test app</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={'relative bg-blur bg-cover'}>
        <div className={'py-10 lg:py-20 px-4 sm:px-20 relative z-10'}>
          <section className={'flex flex-col items-center justify-center bg-gradient-to-r from-sky-400 to-blue-600 rounded-xl'}>
            <div className="flex flex-col items-center w-full max-w-md px-2 py-16 sm:px-0">
              <h2 className='underline mb-5'>
                Vortex Room {roomName?`(${roomName})`:""}
              </h2>
              <div>
                <LiveKitRoom
                  url={url}
                  token={token}
                  onConnected={(room) => onConnected(room)}
                  roomOptions={{
                    adaptiveStream: query.adaptiveStream === '1',
                    publishDefaults: {
                      simulcast: query.simulcast === '1',
                    },
                  }}
                  controlRenderer={({ room }) => (
                    <RoomController
                      room={room}
                      enableAudio={query.audioEnabled === '1'}
                      onLeave={onLeave}
                    />
                  )}
                  // onLeave={}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Room
