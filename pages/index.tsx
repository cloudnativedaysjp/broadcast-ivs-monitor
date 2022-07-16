import type { NextPage } from 'next'
import Box, { BoxProps } from '@mui/material/Box'
import { Player } from '../src/components/player'
import { Clock } from '../src/components/clock'
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

function Item(props: BoxProps) {
  const { sx, ...other } = props
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#101010' : '#fff',
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        p: 1,
        m: 1,
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        position: 'relative',
        ...sx,
      }}
      {...other}
    />
  )
}

const Home: NextPage = () => {
  return (
    <div>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {data.map((track) => (
          <Item>
            <div css={Overlay}>
              <a href={track['name']}>{track['name']}</a>
            </div>
            <Player playBackUrl={track['videoId']} />
          </Item>
        ))}
        <Item>
          <Clock />
        </Item>
      </Box>
    </div>
  )
}

export default Home
