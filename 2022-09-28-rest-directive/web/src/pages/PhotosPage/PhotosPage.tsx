import { MetaTags } from '@redwoodjs/web'

import PhotosCell from 'src/components/PhotosCell'

const PhotosPage = () => {
  return (
    <>
      <MetaTags title="Photos" description="Photos page" />
      <h1 className="mt-6 text-2xl font-semibold tracking-wide">Photos</h1>
      <PhotosCell />
    </>
  )
}

export default PhotosPage
