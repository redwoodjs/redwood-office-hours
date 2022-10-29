import { MetaTags } from '@redwoodjs/web'
import ImagesCell from 'src/components/ImagesCell'

const HomePage = () => {
  return (
    <>
      <MetaTags
        title="OG Images"
        description="OpenGraph Dynamic Image Generation Examples"
      />

      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-12 text-2xl">
          OpenGraph Dynamic Image Generation Examples
        </h1>
        <ImagesCell />
      </div>
    </>
  )
}

export default HomePage
