import { getRecommendHotels } from '@remote/hotel'
import { useQuery } from 'react-query'

function useRecommendHotels({ hotelIds }: { hotelIds: string[] }) {
  return useQuery({
    queryKey: ['recommendHotels', JSON.stringify(hotelIds)],
    queryFn: () => getRecommendHotels(hotelIds),
    enabled: hotelIds.length > 0,
  })
}

export default useRecommendHotels
