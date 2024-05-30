import Text from '@shared/Text'
import Flex from '@shared/Flex'
import qs from 'qs'
import Spacing from '@shared/Spacing'
import Button from '@shared/Button'
import { useNavigate } from 'react-router-dom'

function ReservationDonePage() {
  const navigate = useNavigate()
  const { hotelName } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    hotelName: string
  }

  return (
    <div>
      <Spacing size={80} />
      <Flex direction="column" align="center">
        <img
          src="https://cdn0.iconfinder.com/data/icons/expenses-vs-income/30/__travel_case_vacation_suitcase-256.png"
          alt="예약완료 이미지"
          width={120}
          height={120}
        />
        <Spacing size={30} />
        <Text bold={true} typography="t4">
          {hotelName}
        </Text>
        <Spacing size={8} />
        <Text>예약이 완료되었습니다</Text>
      </Flex>
      <Spacing size={40} />
      <div style={{ padding: '24px' }}>
        <Button.Group>
          <Button onClick={() => navigate('/')}>홈으로</Button>
          <Button onClick={() => navigate('/reservation/list')}>
            예약 리스트로
          </Button>
        </Button.Group>
      </div>
    </div>
  )
}

export default ReservationDonePage
