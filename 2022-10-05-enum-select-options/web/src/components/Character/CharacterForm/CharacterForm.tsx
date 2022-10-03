import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

import type {
  EditCharacterById,
  UpdateCharacterInput,
  EpisodeOption,
  Character,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

import EpisodeSelectList from 'src/components/EpisodeSelectList/EpisodeSelectList'

type FormCharacter = NonNullable<EditCharacterById['character']>

export interface CharacterFormProps {
  character?: EditCharacterById['character']
  onSave: (data: UpdateCharacterInput, id?: FormCharacter['id']) => void
  error: RWGqlError
  loading: boolean
}

const CharacterForm = (props: CharacterFormProps) => {
  const onSubmit = (data: FormCharacter) => {
    if (data.appearsIn) {
      data.appearsIn = data.appearsIn.filter((value) => !!value)
    }

    props.onSave(data, props?.character?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormCharacter> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.character?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="appearsIn"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Appears in
        </Label>

        {false && (
          <>
            <div className="rw-check-radio-items">
              <CheckboxField
                id="character-appearsIn-0"
                name="appearsIn[0]"
                defaultValue="NEW_HOPE"
                defaultChecked={props.character?.appearsIn?.includes(
                  'NEW_HOPE'
                )}
                className="rw-input"
                errorClassName="rw-input rw-input-error"
              />
              <div>New Hope</div>
            </div>

            <div className="rw-check-radio-items">
              <CheckboxField
                id="character-appearsIn-1"
                name="appearsIn[1]"
                defaultValue="EMPIRE_STRIKES_BACK"
                defaultChecked={props.character?.appearsIn?.includes(
                  'EMPIRE_STRIKES_BACK'
                )}
                className="rw-input"
                errorClassName="rw-input rw-input-error"
              />
              <div>Empire Strikes_back</div>
            </div>

            <div className="rw-check-radio-items">
              <CheckboxField
                id="character-appearsIn-2"
                name="appearsIn[2]"
                defaultValue="RETURN_OF_THE_JEDI"
                defaultChecked={props.character?.appearsIn?.includes(
                  'RETURN_OF_THE_JEDI'
                )}
                className="rw-input"
                errorClassName="rw-input rw-input-error"
              />
              <div>Return Of_the_jedi</div>
            </div>

            <div className="rw-check-radio-items">
              <CheckboxField
                id="character-appearsIn-3"
                name="appearsIn[3]"
                defaultValue="ROGUE_ONE"
                defaultChecked={props.character?.appearsIn?.includes(
                  'ROGUE_ONE'
                )}
                className="rw-input"
                errorClassName="rw-input rw-input-error"
              />
              <div>Rogue One</div>
            </div>
          </>
        )}

        {true && <EpisodeSelectList character={props.character} />}

        <FieldError name="appearsIn" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default CharacterForm
