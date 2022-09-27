import type { Post } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import Card from 'src/components/Card'

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card key={post.id}>
      <Link to={routes.post({ id: post.id })} className="mt-2 block">
        <p className="text-xl font-semibold text-gray-900">{post.title}</p>
        <p className="mt-3 text-base text-gray-500">{post.body}</p>
      </Link>
      <div className="mt-3">
        <Link
          to={routes.post({ id: post.id })}
          className="text-base font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Read full story
        </Link>
      </div>
    </Card>
  )
}

export default PostCard
