// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import CharactersLayout from 'src/layouts/CharactersLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={CharactersLayout}>
        <Route path="/characters/new" page={CharacterNewCharacterPage} name="newCharacter" />
        <Route path="/characters/{id:Int}/edit" page={CharacterEditCharacterPage} name="editCharacter" />
        <Route path="/characters/{id:Int}" page={CharacterCharacterPage} name="character" />
        <Route path="/characters" page={CharacterCharactersPage} name="characters" />
        <Route path="/" page={CharacterCharactersPage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
