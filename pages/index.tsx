import type { NextPage } from 'next'
import Box, { BoxProps } from '@mui/material/Box'
import { Player } from '../src/components/player'
import { css } from '@mui/styled-engine'

const Overlay = css({
  position: 'absolute',
  bottom: 10,
  right: 10,
  color: 'rgba(255,255,255,0.5)',
  zIndex: 2,
  textShadow: '0 0 10px rgba(0,0,0,0.5)',
  fontSize: '8em',
})

const Outer = css({
  width: '100%',
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
    <div css={Outer}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <Item>
          <div css={Overlay}>Track A</div>
          <Player
            playBackUrl={
              'https://d3pun3ptcv21q4.cloudfront.net/medialive/o11y2022/talks/1349/1349.m3u8'
            }
          />
        </Item>
        <Item>
          <div css={Overlay}>Track B</div>
          <Player
            playBackUrl={
              'https://d3pun3ptcv21q4.cloudfront.net/medialive/o11y2022/talks/1349/1349.m3u8'
            }
          />
        </Item>
        <Item>
          <div css={Overlay}>Track C</div>
          <Player
            playBackUrl={
              'https://d3pun3ptcv21q4.cloudfront.net/medialive/o11y2022/talks/1349/1349.m3u8'
            }
          />
        </Item>
      </Box>
    </div>
  )
}

export default Home
