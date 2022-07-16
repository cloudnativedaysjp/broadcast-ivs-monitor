import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Player } from '../src/components/player'

const Track: NextPage = () => {
  const router = useRouter()
  const [trackId, setTrackId] = useState<string>()

  useEffect(() => {
    if (router.asPath !== router.route) {
      const { trackId } = router.query
      setTrackId(trackId as string)
    }
  }, [router])

  return (
    <div>
      <h2>You are playing {trackId}</h2>
      <Player
        playBackUrl={
          'https://d3pun3ptcv21q4.cloudfront.net/medialive/o11y2022/talks/1349/1349.m3u8'
        }
      />
    </div>
  )
}

export default Track
