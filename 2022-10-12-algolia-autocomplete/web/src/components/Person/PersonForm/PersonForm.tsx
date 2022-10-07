import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditPersonById, UpdatePersonInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormPerson = NonNullable<EditPersonById['person']>

interface PersonFormProps {
  person?: EditPersonById['person']
  onSave: (data: UpdatePersonInput, id?: FormPerson['id']) => void
  error: RWGqlError
  loading: boolean
}

const PersonForm = (props: PersonFormProps) => {
  const onSubmit = (data: FormPerson) => {
  
    
    
  
    
    
  
    props.onSave(data, props?.person?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormPerson> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="fullName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Full name
        </Label>
        
          <TextField
            name="fullName"
            defaultValue={props.person?.fullName}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="fullName" className="rw-field-error" />

        <Label
          name="postalAddress"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Postal address
        </Label>
        
          <TextField
            name="postalAddress"
            defaultValue={props.person?.postalAddress}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="postalAddress" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PersonForm
