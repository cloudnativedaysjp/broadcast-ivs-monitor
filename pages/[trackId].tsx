import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Player } from '../src/components/player'
import { css } from '@mui/styled-engine'
import { data } from '../src/data'

const Overlay = css({
  position: 'absolute',
  bottom: 10,
  right: 10,
  color: 'rgba(255,255,255,0.5)',
  zIndex: 2,
  textShadow: '0 0 10px rgba(0,0,0,0.5)',
  fontSize: '10vw',
})

const Track: NextPage = () => {
  const router = useRouter()

  return (
    <div>
      <div css={Overlay}>{router.query.trackId}</div>
      {data.map((track) => {
        if (track.name == router.query.trackId) {
          return <Player playBackUrl={track.videoId} />
        }
      })}
    </div>
  )
}

export default Track
