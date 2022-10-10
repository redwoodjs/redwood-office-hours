import { MetaTags } from '@redwoodjs/web'
import PersonAutocomplete from 'src/components/PersonAutocomplete/PersonAutocomplete'

const SearchPage = () => {
  return (
    <>
      <MetaTags title="Search" description="Search page" />

      <PersonAutocomplete />
    </>
  )
}

export default SearchPage
