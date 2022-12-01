import { Link, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query ArticlesQuery {
    articles: posts {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ articles }) => {
  return (
    <div>
      {articles.map((item) => {
        return (
          <article key={item.id}>
            <h2 style={{ margin: 0 }}>
              <Link to={routes.article({ id: item.id })}>{item.title}</Link>
            </h2>
            <h5 style={{ margin: 0 }}>{item.createdAt}</h5>
            <p>{item.body}</p>
          </article>
        )
      })}
    </div>
  )
}
