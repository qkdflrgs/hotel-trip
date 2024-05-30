import FixedBottomButton from '@/components/shared/FixedBottomButton'
import RangePicker from '@shared/RangePicker'
import qs from 'qs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SchedulePage() {
  const navigate = useNavigate()
  const { roomId, hotelId } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  })
  const [selectedDate, setSelectedDate] = useState<{
    startDate?: string
    endDate?: string
    nights: number
  }>({
    startDate: undefined,
    endDate: undefined,
    nights: 0,
  })

  useEffect(() => {
    if (roomId === '' || hotelId === '') {
      window.history.back()
    }
  }, [roomId, hotelId])

  const moveToReservation = () => {
    const params = qs.stringify(
      {
        hotelId,
        roomId,
        ...selectedDate,
      },
      {
        addQueryPrefix: true,
      },
    )

    navigate(`/reservation${params}`)
  }

  const isPossibleSubmit =
    selectedDate.startDate != null && selectedDate.endDate != null

  const buttonLabel = isPossibleSubmit
    ? `${selectedDate.startDate} - ${selectedDate.endDate} (${selectedDate.nights}박)`
    : '예약 날짜를 선택해주세요'

  return (
    <div>
      <RangePicker
        startDate={selectedDate.startDate}
        endDate={selectedDate.endDate}
        onChange={(dateRange) => {
          setSelectedDate({
            startDate: dateRange.from,
            endDate: dateRange.to,
            nights: dateRange.nights,
          })
        }}
      />
      <FixedBottomButton
        label={buttonLabel}
        disabled={!isPossibleSubmit}
        onClick={moveToReservation}
      />
    </div>
  )
}

export default SchedulePage
