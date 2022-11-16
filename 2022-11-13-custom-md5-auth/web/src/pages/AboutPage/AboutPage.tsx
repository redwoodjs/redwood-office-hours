import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const AboutPage = () => {
  return (
    <>
      <MetaTags title="About" description="About page" />

      <div className="space-y-2">
        <h1 className="text-2xl font-bold">About This Custom Auth Example</h1>
        <p>
          Here we showcase how a developer might implement{' '}
          <a href="https://redwoodjs.com/docs/auth/custom" target="_blank">
            custom authentication
          </a>{' '}
          to "roll-your-own" authentication or implement an Authentication
          Provider that as yet{' '}
          <a href="https://redwoodjs.com/docs/authentication" target="_blank">
            RedwoodJS doesn't support
          </a>
          .
        </p>
        <p>
          This example is a <span className="font-bold">contrived</span> example
          to demonstrate what one needs to do to implement the basics of an
          authentication client/provider.
        </p>
        <p>
          {' '}
          It simply uses the <a href="https://en.wikipedia.org/wiki/MD5">
            MD5
          </a>{' '}
          message-digest algorithm to generate a password from the supplied
          username.
        </p>
        <p>
          It is{' '}
          <span className="font-bold">
            not a secure authentication provider
          </span>{' '}
          and{' '}
          <span className="font-bold">
            should not be used in a real-world application
          </span>
          .
        </p>
        <h2 className="text-xl font-semibold">Try It Out</h2>
        <p>
          When you{' '}
          <Link to={routes.signUp()} className="text-semi-bold text-indigo-700">
            Sign Up
          </Link>{' '}
          and
          <ul className="list-disc pl-5 pt-2">
            <li>
              provide a <code>username</code> you will
            </li>
            <li>
              {' '}
              receive a <code>password</code> from your{' '}
              <Link
                to={routes.profile()}
                className="text-semi-bold text-indigo-700"
              >
                Profile
              </Link>{' '}
              page that
            </li>
            <li>
              you can then use to{' '}
              <Link
                to={routes.signIn()}
                className="text-semi-bold text-indigo-700"
              >
                Sign In
              </Link>
            </li>
          </ul>
        </p>
        <h2 className="text-xl font-semibold">How it Works</h2>
        <h3 className="text-lg font-semibold">Web Side</h3>
        <p>
          The Custom Md5Auth client implements the main methods that a RedwoodJS
          Auth Provider requires:
          <ul className="list-disc pl-5 pt-2">
            <li>login</li>
            <li>logout</li>
            <li>signup</li>
            <li>getToken</li>
            <li>getUserMetadata</li>
          </ul>
        </p>
        <h3 className="text-md font-medium">login</h3>
        <p>
          The login method accepts the form post with a username and password
          and checks that the password provided matches the{' '}
          <a href="https://en.wikipedia.org/wiki/MD5">MD5</a> hashed username.
        </p>
        <h3 className="text-md font-medium">logout</h3>
        <p>
          The logout method removes the token `md5-auth-token` from
          localStorage. Thus there's nothing to authenticate the request.
        </p>
        <h3 className="text-md font-medium">signup</h3>
        <p>
          The signup method accepts the form post with a username and sets the
          authentication token in localStorage to the{' '}
          <a href="https://en.wikipedia.org/wiki/MD5">MD5</a> hashed username in
          the key `md5-auth-token`.
        </p>
        <p>
          The token takes the shape <code>username||password</code> where
          password is the md5 hash digest of the username.
        </p>
        <p>
          For example, the username `md5auth` has password
          `3aa27b6f0599c098862c55ca5cfc64bc`.
        </p>
        <h3 className="text-md font-medium">getToken</h3>
        <p>
          The getToken method gets the authentication token from localStorage
          with the key `md5-auth-token` (set in signup). This value is used to
          set the Authorization header when making secure GraphQL requests.
        </p>
        <h3 className="text-md font-medium">getUserMetadata</h3>
        <p>
          The getUserMetadata methods gets the authentication token from
          localStorage in the key `md5-auth-token` in the shape{' '}
          <code>username||password</code> and returns a json object with the
          username to represent a User with and id, username and roles.
        </p>
        <p>
          Important!: This `getUserMetadata` methods determines if the user is
          authenticated or not. Returning `null`` here means the user is not
          authenticated.
        </p>
        <h3 className="text-lg font-semibold">Routes</h3>
        <p>
          <ul className="list-disc pl-5 pt-2">
            <li>home - Public landing page.</li>
            <li>about - This page. Public.</li>
            <li>signIn - Public page to sign in.</li>
            <li>signUp - Public page to sign up.</li>
            <li>
              profile - Private page to show your user profile and password to
              use when logging in. This page both presents the userMetadata from
              useAuth and also makes a requireAuth protected graphQL query to
              fetch a secret message.
            </li>
          </ul>
        </p>
        <h3 className="text-lg font-semibold">Api Side</h3>
        <p>
          To secure your GraphQL API, RedwoodJS sends the authentication token
          and auth-provider type in the headers of each GraphQL request.
        </p>
        <p>
          In this example, the auth-provider type is defined in the custom
          client as `md5-auth`.
        </p>
        <p>
          The Authorization header is constructed from the `getToken` method in
          the client: e.g., "Authorization: Bearer
          username||md5_hashed_username".
        </p>
        <p>
          The api-side GraphQL handler needs to be able to decode the
          Authorization header a see if the token is valid. If so, the request
          is authentication and if not, then permission is denied.
        </p>
        <h3 className="text-md font-semibold">Custom Auth Decoder</h3>
        <p>
          You must implement an AuthDecoder to both verify the that the
          Authorization header bearer token is valid and also to decode that
          token to provide information useful for getting user information --
          like fetching user data based on a decoded id value.
        </p>
        <p>
          You then pass your custom auth decoder to your `createGraphQLHandler`.
        </p>
        <p>
          In our case the `md5AuthDecoder` accepts the token and the
          auth-provider type, makes sure that the decoder should be used for
          this header, and then splits the token to get the username and
          password and checks that a md5 hash of the username matches the
          password.
        </p>
        <p>If the two match, then the request is authenticated.</p>
        <p>If not, it throws a ForbiddenError error.</p>
        <p>
          You can test your the GraphQL API using the query:
          <code>
            {`

          query AuthTest {
  secret {
    message
  }
}
`}
          </code>
          If you don't set the request headers or user an invalid token, your
          request will be denied.
        </p>
        <p>
          You can set the following headers to authenticate the request.
          <code>{`
  "Authorization": "Bearer md5auth||3aa27b6f0599c098862c55ca5cfc64bc",
  "auth-provider": "md5-auth"
}`}</code>
        </p>
        <p>
          Notice that you need to provide both the `auth-provider` and the
          `Authorization` header.
        </p>
      </div>
    </>
  )
}

export default AboutPage
