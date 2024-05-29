import { Hotel } from '@models/hotel'
import ListRow from '@shared/ListRow'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import { css } from '@emotion/react'
import addDelimiter from '@utils/addDelimiter'
import Tag from '@shared/Tag'
import { MouseEvent, useEffect, useState } from 'react'
import { differenceInMilliseconds, parseISO } from 'date-fns'
import formatTime from '@utils/formatTime'
import { Link } from 'react-router-dom'

interface HotelProps {
  hotel: Hotel
  isLike: boolean
  onLike: ({
    hotel,
  }: {
    hotel: Pick<Hotel, 'name' | 'id' | 'mainImageUrl'>
  }) => void
}

function HotelBox({ hotel, isLike, onLike }: HotelProps) {
  const [remainedTime, setRemainedTime] = useState<number>(0)

  useEffect(() => {
    if (hotel.events == null || hotel.events.promoEndTime == null) return

    const promoEndTime = hotel.events.promoEndTime

    const timer = setInterval(() => {
      const leftSeconds = differenceInMilliseconds(
        parseISO(promoEndTime),
        new Date(),
      )

      if (leftSeconds < 0) {
        clearInterval(timer)
        return
      }

      setRemainedTime(leftSeconds)
    }, 1_000)

    return () => {
      clearInterval(timer)
    }
  }, [hotel.events])

  const tagComponent = () => {
    if (hotel.events == null) return null

    const promotionText =
      remainedTime > 0 ? ` - ${formatTime(remainedTime)} 남음` : ''

    return (
      <div>
        <Tag
          color={hotel.events.tagThemeStyle.color}
          backgroundColor={hotel.events.tagThemeStyle.backgroundColor}
        >
          {hotel.events.name.concat(promotionText)}
        </Tag>
        <Spacing size={8} />
      </div>
    )
  }

  const handleLike = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    onLike({
      hotel: {
        name: hotel.name,
        mainImageUrl: hotel.mainImageUrl,
        id: hotel.id,
      },
    })
  }

  return (
    <div>
      <Link to={`/hotel/${hotel.id}`}>
        <ListRow
          contents={
            <Flex direction="column">
              {tagComponent()}
              <ListRow.Texts title={hotel.name} subTitle={hotel.comment} />
              <Spacing size={4} />
              <Text typography="t7" color="grey600">
                {hotel.starRating}성급
              </Text>
            </Flex>
          }
          right={
            <Flex
              direction="column"
              align="flex-end"
              style={{ position: 'relative' }}
            >
              <img
                src={
                  isLike
                    ? 'https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-512.png'
                    : 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-heart-outline-512.png'
                }
                alt="찜하기"
                css={iconHeartStyles}
                onClick={handleLike}
              />
              <img
                src={hotel.mainImageUrl}
                alt="호텔 이미지"
                css={imageStyles}
              />
              <Spacing size={8} />
              <Text bold={true}>{addDelimiter(hotel.price)}원</Text>
            </Flex>
          }
          style={containerStyles}
        />
      </Link>
    </div>
  )
}

const containerStyles = css`
  align-items: flex-start;
`

const imageStyles = css`
  width: 90px;
  height: 110px;
  border-radius: 8px;
  object-fit: cover;
  margin-left: 16px;
`

const iconHeartStyles = css`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
`

export default HotelBox
