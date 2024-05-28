import { getHotel } from '@remote/hotel'
import { useQuery } from 'react-query'

function useHotel({ id }: { id: string }) {
  return useQuery({ queryKey: ['hotel', id], queryFn: () => getHotel(id) })
}

export default useHotel
