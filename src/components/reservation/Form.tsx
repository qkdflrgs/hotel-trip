import { Hotel, ReservationForm } from '@models/hotel'
import { Fragment, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import Select from '@shared/Select'
import Text from '@shared/Text'
import TextField from '@shared/TextField'
import FixedBottomButton from '@shared/FixedBottomButton'

type FormData = {
  [key: string]: string
}

interface FormProps {
  forms: Hotel['forms']
  buttonLabel: string
  onSubmit: (formValues: FormData) => void
}

function Form({ forms, buttonLabel, onSubmit }: FormProps) {
  const { register, formState, handleSubmit } = useForm<FormData>({
    mode: 'onChange',
  })

  const component = useCallback(
    (form: ReservationForm) => {
      if (form.type === 'TEXT_FIELD') {
        return (
          <div style={{ height: '100px' }}>
            <TextField
              label={form.label}
              helpMessage={
                (formState.errors[form.id]?.message as string) ||
                form.helpMessage
              }
              hasError={formState.errors[form.id] != null}
              {...register(form.id, {
                required: form.required,
                pattern: VALIDATION_MESSAGE_MAP[form.id],
              })}
            />
          </div>
        )
      } else if (form.type === 'SELECT') {
        return (
          <div style={{ height: '100px' }}>
            <Select
              label={form.label}
              options={form.options}
              placeholder="선택해주세요"
              {...register(form.id, {
                required: form.required,
                pattern: VALIDATION_MESSAGE_MAP[form.id],
              })}
            />
          </div>
        )
      } else {
        return null
      }
    },
    [register, formState.errors],
  )

  return (
    <div style={{ padding: '24px' }}>
      <Text bold={true}>예약정보</Text>
      <form style={{ marginBottom: '50px' }}>
        {forms.map((form) => {
          return <Fragment key={form.id}>{component(form)}</Fragment>
        })}
      </form>
      <FixedBottomButton label={buttonLabel} onClick={handleSubmit(onSubmit)} />
    </div>
  )
}

const VALIDATION_MESSAGE_MAP: {
  [key: string]: {
    value: RegExp
    message: string
  }
} = {
  name: {
    value: /^[가-힣]+$/,
    message: '한글명을 확인해주세요',
  },
  email: {
    value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: '이메일 형식을 확인해주세요',
  },
  phone: {
    value: /^\d+$/,
    message: '휴대전화번호를 확인해주세요',
  },
}

export default Form
