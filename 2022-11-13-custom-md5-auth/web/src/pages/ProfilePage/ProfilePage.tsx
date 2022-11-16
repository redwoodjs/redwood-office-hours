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
      {isAuthenticated && (
        <div className="mb-2">
          <div className="text-sm font-medium text-gray-900">Username</div>
          <div className="text-sm text-gray-500">{userMetadata.username}</div>
        </div>
      )}
      {isAuthenticated && (
        <div className="mb-2">
          <SecretCell />
        </div>
      )}
    </>
  )
}

export default ProfilePage
