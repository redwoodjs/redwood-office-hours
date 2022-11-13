import { Link, routes } from '@redwoodjs/router'

import { PhotoIcon } from '@heroicons/react/24/solid'

const Image = ({ image }) => {
  return (
    <div className="border-1 rounded-md bg-gray-50 p-4 shadow-md">
      <h3 className="text-xl font-bold">{image.name}</h3>
      <p className="text-md mb-4 text-gray-600">{image.description}</p>

      <div className="align-center align-items-center mb-4 flex justify-center">
        <Link key={image.id} to={routes.image({ id: image.id })}>
          <img src={image.src} className="h-48" />
        </Link>
      </div>

      <p className="text-md text-gray-500">
        <a
          key={`path-${image.id}`}
          href={image.src}
          target="_blank"
          className="flex"
        >
          <PhotoIcon className="mr-2 h-6 w-6 text-gray-500" />
          {image.path}
        </a>
      </p>
      <p className="text-md truncate font-semibold text-gray-700">
        <a
          key={`src-${image.id}`}
          href={image.src}
          target="_blank"
          className="mr-6 flex"
        >
          <PhotoIcon className="mr-2 h-6 w-6 text-gray-500" />
          {image.src}
        </a>
      </p>
    </div>
  )
}

export default Image
