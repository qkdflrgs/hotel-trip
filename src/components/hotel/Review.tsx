import Text from '@shared/Text'
import { ChangeEvent, useCallback, useState } from 'react'
import Flex from '@shared/Flex'
import useReview from './hooks/useReview'
import Spacing from '@shared/Spacing'
import ListRow from '@shared/ListRow'
import { format } from 'date-fns'
import useUser from '@hooks/auth/useUser'
import Button from '@shared/Button'
import TextField from '../shared/TextField'

interface ReviewProps {
  hotelId: string
}

function Review({ hotelId }: ReviewProps) {
  const user = useUser()
  const [text, setText] = useState<string>('')
  const { data: reviews, isLoading, write, remove } = useReview({ hotelId })

  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [])

  const reviewRows = useCallback(() => {
    if (reviews?.length === 0) {
      return (
        <Flex direction="column" align="center" style={{ margin: '40px 0' }}>
          <img
            src="https://cdn3.iconfinder.com/data/icons/emoji-1-4/64/_crying_emoji_sad-256.png"
            alt=""
            width={40}
            height={40}
          />
          <Spacing size={16} />
          <Text typography="t6">아직 작성된 리뷰가 없습니다.</Text>
          <Text typography="t6">첫 리뷰를 작성해보세요!</Text>
        </Flex>
      )
    }

    return (
      <ul>
        {reviews?.map((review) => (
          <ListRow
            key={review.id}
            left={
              review.user.photoURL ? (
                <img src={review.user.photoURL} alt="프로필 이미지" />
              ) : null
            }
            contents={
              <ListRow.Texts
                title={review.text}
                subTitle={format(review.createdAt, 'yyyy-MM-dd')}
              />
            }
            right={
              review.userId === user?.uid ? (
                <Button
                  onClick={() =>
                    remove({ reviewId: review.id, hotelId: review.hotelId })
                  }
                >
                  삭제
                </Button>
              ) : null
            }
          />
        ))}
      </ul>
    )
  }, [reviews, user])

  if (isLoading) return null

  return (
    <div style={{ margin: '40px 0' }}>
      <Text bold={true} typography="t4" style={{ padding: '0 24px' }}>
        리뷰
      </Text>
      <Spacing size={16} />
      {reviewRows()}
      {user != null ? (
        <div style={{ padding: '0 24px' }}>
          <TextField value={text} onChange={handleTextChange} />
          <Spacing size={6} />
          <Flex justify="flex-end">
            <Button
              disabled={text.length === 0}
              onClick={async () => {
                const success = await write(text)

                if (success) setText('')
              }}
            >
              작성
            </Button>
          </Flex>
        </div>
      ) : null}
    </div>
  )
}

export default Review
