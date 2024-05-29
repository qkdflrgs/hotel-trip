import styled from '@emotion/styled'
import Text from '@shared/Text'
import ListRow from '@shared/ListRow'
import Spacing from '@shared/Spacing'
import useRecommendHotels from './hooks/useRecommendHotels'
import { css } from '@emotion/react'
import addDelimiter from '@utils/addDelimiter'
import { useState } from 'react'
import Button from '../shared/Button'

interface RecommendHotelsProps {
  hotelIds: string[]
}

function RecommendHotels({ hotelIds }: RecommendHotelsProps) {
  const [showMore, setShowMore] = useState<boolean>(false)
  const { data: recommendHotels, isLoading } = useRecommendHotels({ hotelIds })

  if (recommendHotels == null || isLoading) return null

  const recommendList =
    recommendHotels.length < 3 || showMore
      ? recommendHotels
      : recommendHotels.slice(0, 3)

  return (
    <div css={containerStyles}>
      <Text bold={true} typography="t4" style={{ padding: '0 24px' }}>
        추천 호텔
      </Text>
      <Spacing size={16} />
      <ul>
        {recommendList.map((recommendHotel) => (
          <ListRow
            key={recommendHotel.id}
            left={
              <img
                src={recommendHotel.mainImageUrl}
                alt="추천 호텔 이미지"
                css={imageStyles}
              />
            }
            contents={
              <ListRow.Texts
                title={recommendHotel.name}
                subTitle={`${addDelimiter(recommendHotel.price)}원`}
              />
            }
          />
        ))}
      </ul>
      {recommendHotels.length > 3 && !showMore && (
        <div style={{ padding: '0 24px', margin: '16px 0' }}>
          <Button full={true} weak={true} onClick={() => setShowMore(true)}>
            더보기
          </Button>
        </div>
      )}
    </div>
  )
}

const containerStyles = styled.div`
  margin: 24px 0;
`

const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`

export default RecommendHotels
