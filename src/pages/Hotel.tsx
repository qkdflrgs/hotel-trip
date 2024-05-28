import Contents from '@components/hotel/Contents'
import Rooms from '@components/hotel/Rooms'
import Carousel from '@components/hotel/Carousel'
import useHotel from '@components/hotel/hooks/useHotel'
import Top from '@shared/Top'
import { useParams } from 'react-router-dom'
import Map from '@components/hotel/Map'

function HotelPage() {
  const { id } = useParams() as { id: string }
  const { data: hotel, isLoading } = useHotel({ id })

  if (hotel == null || isLoading) return <div>Loading...</div>

  return (
    <div>
      <Top title={hotel.name} subTitle={hotel.comment} />
      <Carousel images={hotel.images} />
      <Rooms hotelId={hotel.id} />
      <Contents contents={hotel.contents} />
      <Map location={hotel.location} />
    </div>
  )
}

export default HotelPage
