import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Player } from '../src/components/player'
import { css } from "@mui/styled-engine";

const Overlay = css({
  position: "absolute",
  bottom: 10,
  right: 10,
  color: 'rgba(255,255,255,0.5)',
  zIndex: 2,
  textShadow: '0 0 10px rgba(0,0,0,0.5)',
  fontSize: '8em',

});

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
      <div css={Overlay}>Track {trackId}</div>
      <Player
        playBackUrl={
          'https://d3pun3ptcv21q4.cloudfront.net/medialive/o11y2022/talks/1349/1349.m3u8'
        }
      />
    </div>
  )
}

export default Track
