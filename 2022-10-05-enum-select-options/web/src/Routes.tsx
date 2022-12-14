// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import SpaceshipsLayout from 'src/layouts/SpaceshipsLayout'

import CharactersLayout from 'src/layouts/CharactersLayout'
import MainLayout from 'src/layouts/MainLayout'
import HomePage from './pages/HomePage/HomePage'

const Routes = () => {
  return (
    <Router>
      <Set wrap={[MainLayout, SpaceshipsLayout]}>
        <Route path="/spaceships/new" page={SpaceshipNewSpaceshipPage} name="newSpaceship" />
        <Route path="/spaceships/{id:Int}/edit" page={SpaceshipEditSpaceshipPage} name="editSpaceship" />
        <Route path="/spaceships/{id:Int}" page={SpaceshipSpaceshipPage} name="spaceship" />
        <Route path="/spaceships" page={SpaceshipSpaceshipsPage} name="spaceships" />
      </Set>
      <Set wrap={MainLayout}>
        <Route path="/" page={HomePage} name="home" prerender />
      </Set>

      <Set wrap={[MainLayout, CharactersLayout]}>
        <Route path="/characters/new" page={CharacterNewCharacterPage} name="newCharacter" />
        <Route path="/characters/{id:Int}/edit" page={CharacterEditCharacterPage} name="editCharacter" />
        <Route path="/characters/{id:Int}" page={CharacterCharacterPage} name="character" />
        <Route path="/characters" page={CharacterCharactersPage} name="characters" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
