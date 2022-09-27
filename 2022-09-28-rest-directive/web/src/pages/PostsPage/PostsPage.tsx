import { MetaTags } from '@redwoodjs/web'

import PostsCell from 'src/components/PostsCell'

const PostsPage = () => {
  return (
    <>
      <MetaTags title="Posts" description="Posts page" />
      <h1 className="mt-6 text-2xl font-semibold tracking-wide">Posts</h1>
      <PostsCell />
    </>
  )
}

export default PostsPage
