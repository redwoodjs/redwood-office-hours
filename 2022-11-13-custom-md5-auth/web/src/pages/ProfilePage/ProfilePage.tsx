// import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import SecretCell from 'src/components/SecretCell'

import { useAuth } from 'src/auth'

const ProfilePage = () => {
  const { isAuthenticated, userMetadata } = useAuth()
  return (
    <>
      <MetaTags title="Profile" description="Profile page" />

      <h1 className="mb-4 text-lg">My Profile</h1>
      <div className="mb-2 border-2 border-dotted p-4 shadow-sm">
        {isAuthenticated && <div>{JSON.stringify(userMetadata)}</div>}
      </div>
      <div className="mb-2 border-2 border-dotted p-4 shadow-sm">
        {isAuthenticated && <SecretCell />}
      </div>
    </>
  )
}

export default ProfilePage
