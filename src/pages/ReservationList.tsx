import useReservations from '@components/reservation-list/hooks/useReservations'
import ListRow from '@shared/ListRow'

function ReservationListPage() {
  const { data, isLoading } = useReservations()

  if (data == null || isLoading) return null

  return (
    <div>
      {data.map(({ hotel, reservation }) => (
        <ListRow
          key={reservation.id}
          left={
            <img
              src={hotel.mainImageUrl}
              alt="호텔 이미지"
              width={80}
              height={80}
            />
          }
          contents={
            <ListRow.Texts
              title={hotel.name}
              subTitle={`${reservation.startDate} - ${reservation.endDate}`}
            />
          }
        />
      ))}
    </div>
  )
}

export default ReservationListPage
