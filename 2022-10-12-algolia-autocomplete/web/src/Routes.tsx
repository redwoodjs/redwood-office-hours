// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import MainLayout from 'src/layouts/MainLayout'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={MainLayout}>
        <Route path="/" page={SearchPage} name="home" />
        <Route path="/search" page={SearchPage} name="search" />
        <Set wrap={ScaffoldLayout} title="People" titleTo="people" buttonLabel="New Person" buttonTo="newPerson">
          <Route path="/people/new" page={PersonNewPersonPage} name="newPerson" />
          <Route path="/people/{id:Int}/edit" page={PersonEditPersonPage} name="editPerson" />
          <Route path="/people/{id:Int}" page={PersonPersonPage} name="person" />
          <Route path="/people" page={PersonPeoplePage} name="people" />
        </Set>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
