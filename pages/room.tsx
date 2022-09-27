import { LiveKitRoom, useRoom } from '@livekit/react-components'
import { Room as LivekitRoom, RoomEvent } from 'livekit-client';
import type { NextPage } from 'next'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import RoomController from '../components/RoomController';

const Room: NextPage = () => {

  const router = useRouter()
  const { query } = router
  const url = query.url as string
  const token = query.token as string
  const { room } = useRoom()
  const [roomName, setRoomName] = useState<string>("")

  useEffect(() => {
    if (!url || !token) {
      Router.push({
        pathname: "/"
      })
    }
    if (room) {
      room.localParticipant.setCameraEnabled(false)
    }
  }, []) //eslint-disable-line

  const onConnected = (room: LivekitRoom) => {
    setRoomName(room.name)
    room.localParticipant.setScreenShareEnabled(false)
    room.localParticipant.setCameraEnabled(false)
    room.localParticipant.setMicrophoneEnabled(query.audioEnabled==='1')
    room.on(RoomEvent.ParticipantPermissionsChanged, () => {
      if (room.localParticipant.permissions?.canPublish) {
        room.localParticipant.setMicrophoneEnabled(true)
      }
    })
    if (query.hasOwnProperty('audioDeviceId')) {
      const audioDeviceId = query.audioDeviceId
      if (audioDeviceId && room.options.audioCaptureDefaults) {
        room.options.audioCaptureDefaults.deviceId = audioDeviceId;
      }
    }
  }

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
                    />
                  )}
                // onLeave={onLeave}
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