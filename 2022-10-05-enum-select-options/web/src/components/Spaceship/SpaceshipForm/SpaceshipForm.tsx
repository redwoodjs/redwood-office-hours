import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

import type { EditSpaceshipById, UpdateSpaceshipInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'
import EpisodeSelectList from 'src/components/EpisodeSelectList/EpisodeSelectList'

type FormSpaceship = NonNullable<EditSpaceshipById['spaceship']>

interface SpaceshipFormProps {
  spaceship?: EditSpaceshipById['spaceship']
  onSave: (data: UpdateSpaceshipInput, id?: FormSpaceship['id']) => void
  error: RWGqlError
  loading: boolean
}

const SpaceshipForm = (props: SpaceshipFormProps) => {
  const onSubmit = (data: FormSpaceship) => {
    if (data.appearsIn) {
      data.appearsIn = data.appearsIn.filter((value) => !!value)
    }

    props.onSave(data, props?.spaceship?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormSpaceship> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.spaceship?.name}
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

        <EpisodeSelectList appears={props.spaceship} />

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

export default SpaceshipForm
