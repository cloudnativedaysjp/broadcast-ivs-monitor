import React, { useEffect, useState } from 'react'
import { css } from '@mui/styled-engine'

const clockStyle = css({
  fontSize: '7vw',
  textAlign: 'center',
})

export const Clock: React.FC = () => {
  const [message, setMessage] = useState<string>()
  useEffect(() => {
    setInterval(() => {
      const nowTime = new Date()
      const nowHour = nowTime.getHours()
      const nowMin = nowTime.getMinutes()
      const nowSec = nowTime.getSeconds()
      setMessage(nowTime.toLocaleTimeString('ja-JP', { hour12: false }))
    }, 1000)
  }, [])

  return <div css={clockStyle}>{message}</div>
}
