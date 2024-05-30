import addDelimiter from '@utils/addDelimiter'
import styled from '@emotion/styled'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import ListRow from '@shared/ListRow'
import Tag from '@shared/Tag'
import useRooms from './hooks/useRooms'
import Spacing from '@shared/Spacing'
import { css } from '@emotion/react'
import Button from '@shared/Button'
import qs from 'qs'
import useUser from '@hooks/auth/useUser'
import { useAlertContext } from '@contexts/AlertContext'
import { useNavigate } from 'react-router-dom'

interface RoomsProps {
  hotelId: string
}

function Rooms({ hotelId }: RoomsProps) {
  const user = useUser()
  const { open } = useAlertContext()
  const navigate = useNavigate()
  const { data: rooms } = useRooms({ hotelId })

  return (
    <Container>
      <Header justify="space-between" align="center">
        <Text bold={true}>객실정보</Text>
        <Text typography="t6" color="grey400">
          1박, 세금 포함
        </Text>
      </Header>
      <ul>
        {rooms?.map((room) => {
          const isLast = room.availableCount === 1
          const isSoldOut = room.availableCount === 0

          const params = qs.stringify(
            {
              roomId: room.id,
              hotelId,
            },
            {
              addQueryPrefix: true,
            },
          )

          return (
            <ListRow
              key={room.id}
              left={
                <img
                  src={room.imageUrl}
                  alt={`${room.roomName}의 객실 이미지`}
                  css={imageStyles}
                />
              }
              contents={
                <ListRow.Texts
                  title={
                    <Flex>
                      <Text>{room.roomName}</Text>
                      {isLast && (
                        <>
                          <Spacing size={6} direction="horizontal" />
                          <Tag backgroundColor="red">마감임박</Tag>
                        </>
                      )}
                    </Flex>
                  }
                  subTitle={`${addDelimiter(room.price)}원 / `.concat(
                    room.refundable ? '환불가능' : '환불불가',
                  )}
                />
              }
              right={
                <Button
                  size="medium"
                  disabled={isSoldOut}
                  onClick={() => {
                    if (user == null) {
                      open({
                        title: '로그인이 필요한 기능입니다.',
                        onButtonClick: () => navigate('/signin'),
                      })

                      return
                    }

                    navigate(`/schedule${params}`)
                  }}
                >
                  {isSoldOut ? '매진' : '선택'}
                </Button>
              }
            />
          )
        })}
      </ul>
    </Container>
  )
}

const Container = styled.div`
  margin: 40px 0;
`

const Header = styled(Flex)`
  padding: 0 24px;
  margin-bottom: 20px;
`

const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`

export default Rooms
