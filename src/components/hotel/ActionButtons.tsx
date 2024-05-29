import { Hotel } from '@models/hotel'
import useShare from '@hooks/useShare'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import CopyToClipboard from 'react-copy-to-clipboard'
import useLike from '@hooks/like/useLike'

interface ActionButtonProps {
  label: string
  iconUrl: string
  onClick?: () => void
}

interface ActionButtonsProps {
  hotel: Hotel
}

function ActionButtons({ hotel }: ActionButtonsProps) {
  const share = useShare()
  const { data: likes, mutate: like } = useLike()
  const isLike = Boolean(likes?.find((like) => like.hotelId === hotel.id))

  return (
    <Flex css={containerStyles}>
      <ActionButton
        label="찜하기"
        iconUrl={
          isLike
            ? 'https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-512.png'
            : 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-heart-outline-512.png'
        }
        onClick={() => {
          like({
            hotel: {
              name: hotel.name,
              mainImageUrl: hotel.mainImageUrl,
              id: hotel.id,
            },
          })
        }}
      />
      <ActionButton
        label="공유하기"
        iconUrl="https://cdn1.iconfinder.com/data/icons/rounded-social-media/512/kakao-512.png"
        onClick={() => {
          share({
            title: hotel.name,
            description: hotel.comment,
            imageUrl: hotel.mainImageUrl,
            buttonLabel: 'Hotel Trip에서 보기',
          })
        }}
      />
      <CopyToClipboard
        text={window.location.href}
        onCopy={() => alert('링크가 복사되었습니다')}
      >
        <ActionButton
          label="링크복사"
          iconUrl="https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-32-512.png"
        />
      </CopyToClipboard>
    </Flex>
  )
}

function ActionButton({ label, iconUrl, onClick }: ActionButtonProps) {
  return (
    <Flex
      direction="column"
      align="center"
      onClick={onClick}
      style={{ gap: '6px' }}
    >
      <img src={iconUrl} alt={`${label} 버튼 이미지`} width={30} height={30} />
      <Text typography="t7">{label}</Text>
    </Flex>
  )
}

const containerStyles = css`
  padding: 24px;
  cursor: pointer;

  & * {
    flex: 1;
  }
`

export default ActionButtons
