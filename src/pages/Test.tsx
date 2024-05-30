import RecommendHotelButton from '@components/test/RecommendHotelButton'
import HotelListAddButton from '@components/test/HotelListAddButton'
import HotelFormAddButton from '@components/test/HotelFormAddButton'

function TestPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '24px',
      }}
    >
      <HotelListAddButton />
      <RecommendHotelButton />
      <HotelFormAddButton />
    </div>
  )
}

export default TestPage
