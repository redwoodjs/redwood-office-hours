import { MetaTags } from '@redwoodjs/web'

import PostCell from 'src/components/PostCell'

const PostPage = ({ id }: { id: number }) => {
  return (
    <>
      <MetaTags title="Post" description="Post page" />

      <PostCell id={id} />
    </>
  )
}

export default PostPage
