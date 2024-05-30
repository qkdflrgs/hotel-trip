import Spacing from '@shared/Spacing'
import useReservation from '@components/reservation/hooks/useReservation'
import Summary from '@components/reservation/Summary'
import { parse } from 'qs'
import { useEffect } from 'react'
import Form from '@components/reservation/Form'
import addDelimiter from '@utils/addDelimiter'
import useUser from '@hooks/auth/useUser'
import { useNavigate } from 'react-router-dom'

function ReservationPage() {
  const navigate = useNavigate()
  const user = useUser()
  const { startDate, endDate, nights, roomId, hotelId } = parse(
    window.location.search,
    { ignoreQueryPrefix: true },
  ) as {
    startDate: string
    endDate: string
    nights: string
    roomId: string
    hotelId: string
  }

  useEffect(() => {
    if (
      [user, startDate, endDate, nights, roomId, hotelId].some((param) => {
        return param == null
      })
    ) {
      window.history.back()
    }
  }, [endDate, hotelId, nights, roomId, startDate, user])

  const { data, isLoading, makeReservation } = useReservation({
    hotelId,
    roomId,
  })

  if (data == null || isLoading) {
    return null
  }
  const handleSubmit = async (formValues: { [key: string]: string }) => {
    const newReservation = {
      userId: user?.uid as string,
      hotelId,
      roomId,
      startDate,
      endDate,
      price: data?.room.price * Number(nights),
      formValues,
    }

    await makeReservation(newReservation)
    navigate(`/reservation/done?hotelName=${data.hotel.name}`)
  }

  const buttonLabel = `${nights}박 ${addDelimiter(data.room.price * Number(nights))}원 예약하기`

  return (
    <div>
      <Summary
        hotelName={data.hotel.name}
        room={data.room}
        startDate={startDate}
        endDate={endDate}
        nights={nights}
      />
      <Spacing size={8} backgroundColor="grey100" />
      <Form
        onSubmit={handleSubmit}
        forms={data.hotel.forms}
        buttonLabel={buttonLabel}
      />
    </div>
  )
}

export default ReservationPage
