import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


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
        { trackId }
    </div>
  )
}

export default Track
