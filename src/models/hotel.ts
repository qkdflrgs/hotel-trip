type Location = {
  directions: string
  pointGeolocation: {
    x: number
    y: number
  }
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
}
