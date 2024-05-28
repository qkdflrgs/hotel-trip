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
}
