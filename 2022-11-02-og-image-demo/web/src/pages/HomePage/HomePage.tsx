import { MetaTags } from '@redwoodjs/web'

const ogExamples = [
  { name: 'Custom-font', path: '/og/custom-font', src: '/og/custom-font' },
  {
    name: 'dynamic-image',
    path: '/og/dynamic-image',
    src: '/og/dynamic-image',
  },
  { name: 'Emoji', path: '/og/emoji', src: '/og/emoji' },
  { name: 'Image-svg', path: '/og/image-svg', src: '/og/image-svg' },
  { name: 'Language', path: '/og/language', src: '/og/language' },
  { name: 'Param Default', path: '/og/param', src: '/og/param' },
  { name: 'Param Default', path: '/og/param', src: '/og/param?title=Vercel' },
  { name: 'Static', path: '/og/static', src: '/og/static' },
  { name: 'Tailwind', path: '/og/tailwind', src: '/og/tailwind' },
  { name: 'Splat/*', path: '/og/splat/splat/*', src: '/og/splat/books/123' },
  { name: 'Pokemon', path: '/og/pokemon', src: '/og/pokemon' },
  {
    name: 'Pokemon with Splat',
    path: '/og/pokemon/p/*',
    src: '/og/pokemon/p/bulbasaur',
  },
]

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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ogExamples.map((example) => {
            return (
              <a href={example.src} target="_blank">
                <div className="border-1 rounded-md bg-gray-50 p-4 shadow-md">
                  <h3 className="mb-4 text-xl">{example.name}</h3>
                  <div className="align-center mb-4 flex justify-center">
                    <img src={example.src} className="h-48" />
                  </div>
                  <p className="text-md text-gray-500">{example.path}</p>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default HomePage
