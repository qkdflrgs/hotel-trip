import Contents from '@components/hotel/Contents'
import Rooms from '@components/hotel/Rooms'
import Carousel from '@components/hotel/Carousel'
import useHotel from '@components/hotel/hooks/useHotel'
import Top from '@shared/Top'
import { useParams } from 'react-router-dom'
import Map from '@components/hotel/Map'
import RecommendHotels from '@components/hotel/RecommendHotels'
import ActionButtons from '@components/hotel/ActionButtons'
import Review from '@components/hotel/Review'
import ScrollProgressBar from '@shared/ScrollProgessBar'
import { css } from '@emotion/react'
import SEO from '@shared/SEO'

function HotelPage() {
  const { id } = useParams() as { id: string }
  const { data: hotel, isLoading } = useHotel({ id })

  if (hotel == null || isLoading) return <div>Loading...</div>

  return (
    <div>
      <SEO
        title={hotel.name}
        description={hotel.comment}
        image={hotel.images[0]}
      />
      <ScrollProgressBar style={scrollProgressBarStyles} />
      <Top title={hotel.name} subTitle={hotel.comment} />
      <Carousel images={hotel.images} />
      <ActionButtons hotel={hotel} />
      <Rooms hotelId={hotel.id} />
      <Contents contents={hotel.contents} />
      <Map location={hotel.location} />
      <RecommendHotels hotelIds={hotel.recommendHotel} />
      <Review hotelId={hotel.id} />
    </div>
  )
}

const scrollProgressBarStyles = css`
  position: sticky;
  top: 52.5px;
  z-index: 2;
`

export default HotelPage
