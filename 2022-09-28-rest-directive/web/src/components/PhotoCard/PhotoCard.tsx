import type { Photo } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import Card from 'src/components/Card'

const PhotoCard = ({ photo }: { photo: Photo }) => {
  return (
    <Card key={photo.id}>
      <Link to={routes.photo({ id: photo.id })} className="mt-2 block">
        <p className="text-xl font-semibold text-gray-900">{photo.title}</p>
        <p className="mt-3 text-base text-gray-500">
          <img src={photo.thumbnailUrl} alt={photo.title}></img>
        </p>
      </Link>
      <div className="mt-3">
        <a
          href={photo.url}
          target="_blank"
          rel="noreferrer"
          className="text-base font-semibold text-indigo-600 hover:text-indigo-500"
        >
          See orignal photo
        </a>
      </div>
    </Card>
  )
}

export default PhotoCard
