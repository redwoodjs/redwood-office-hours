// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import { useAuth } from './auth'

import MainLayout from './layouts/MainLayout/MainLayout'
import ProfilePage from './pages/ProfilePage/ProfilePage'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={MainLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/about" page={AboutPage} name="about" prerender />
        <Route path="/sign-in" page={SignInPage} name="signIn" />
        <Route path="/sign-up" page={SignUpPage} name="signUp" />
        <Set private unauthenticated="home">
          <Route path="/profile" page={ProfilePage} name="profile" />
        </Set>
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
