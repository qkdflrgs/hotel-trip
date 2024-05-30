import { Room } from '@models/room'
import { css } from '@emotion/react'
import Text from '@shared/Text'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'

interface SummaryProps {
  hotelName: string
  room: Room
  startDate: string
  endDate: string
  nights: string
}

function Summary({
  hotelName,
  room,
  startDate,
  endDate,
  nights,
}: SummaryProps) {
  return (
    <Flex direction="column" style={{ padding: '24px', gap: '8px' }}>
      <Text typography="t4" bold={true}>
        {hotelName}
      </Text>
      <img
        src={room.imageUrl}
        alt={`${room.roomName}의 이미지`}
        css={imageStyles}
      />
      <div>
        <Spacing size={16} />
        <Text bold={true}>{room.roomName}</Text>
        <ul css={listStyles}>
          <Flex as="li" justify="space-between">
            <Text color="grey600" typography="t6">
              일정
            </Text>
            <Text typography="t6">{`${startDate} - ${endDate} (${nights}박)`}</Text>
          </Flex>

          {Object.keys(room.basicInfo).map((key) => {
            if (key in INFO_LABEL_MAP) {
              return (
                <Flex as="li" justify="space-between" key={key}>
                  <Text color="grey600" typography="t6">
                    {INFO_LABEL_MAP[key as keyof typeof INFO_LABEL_MAP]}
                  </Text>
                  <Text typography="t6">{room.basicInfo[key]}</Text>
                </Flex>
              )
            }

            return null
          })}
        </ul>
      </div>
    </Flex>
  )
}

const INFO_LABEL_MAP = {
  bed: '침대',
  maxOccupancy: '최대인원',
  squareMeters: '면적',
  smoke: '흡연여부',
}

const imageStyles = css`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`

const listStyles = css`
  margin-top: 12px;
  li:not(last-child) {
    margin-bottom: 8px;
  }
`

export default Summary
