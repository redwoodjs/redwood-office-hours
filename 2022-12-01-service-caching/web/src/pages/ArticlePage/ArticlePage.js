import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import ArticleCell from 'src/components/ArticleCell'

const ArticlePage = ({ id }) => {
  return (
    <>
      <MetaTags title="Article" description="Article page" />

      <h1>
        <Link to={routes.home()}>Rob's Blog</Link>
      </h1>
      <ArticleCell id={id} />
    </>
  )
}

export default ArticlePage
