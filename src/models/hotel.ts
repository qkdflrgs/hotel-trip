export type Location = {
  directions: string
  pointGeolocation: {
    x: number
    y: number
  }
}

type Event = {
  name: string
  promoEndTime?: string
  tagThemeStyle: TagThemeStyle
}

type TagThemeStyle = {
  backgroundColor: string
  color: string
}

export interface Hotel {
  comment: string
  contents: string
  id: string
  images: string[]
  location: Location
  mainImageUrl: string
  name: string
  price: number
  starRating: number
  events?: Event
  recommendHotel: string[]
  forms: ReservationForm[]
}

export interface BaseForm {
  id: string
  label: string
  required: string
  helpMessage?: string
}

export interface TextFieldForm extends BaseForm {
  type: 'TEXT_FIELD'
}

export interface SelectFieldForm extends BaseForm {
  type: 'SELECT'
  options: Array<{ label: string; value: string }>
}

export type ReservationForm = TextFieldForm | SelectFieldForm
