import { MetaTags } from '@redwoodjs/web'

import PhotoCell from 'src/components/PhotoCell'

const PhotoPage = ({ id }: { id: number }) => {
  return (
    <>
      <MetaTags title="Photo" description="Photo page" />

      <PhotoCell id={id} />
    </>
  )
}

export default PhotoPage
