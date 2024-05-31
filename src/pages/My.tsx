import Flex from '@shared/Flex'
import useUser from '@hooks/auth/useUser'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import Button from '@/components/shared/Button'
import useGoogleSignin from '@hooks/useGoogleSignin'
import { useNavigate } from 'react-router-dom'

function MyPage() {
  const user = useUser()
  const navigate = useNavigate()
  const { signout } = useGoogleSignin()

  const handleSignout = () => {
    signout()
    navigate('/')
  }

  return (
    <Flex direction="column" align="center">
      <Spacing size={100} />
      <img
        src={
          user?.photoURL
            ? user?.photoURL
            : 'https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-512.png'
        }
        alt="프로필 이미지"
        width={120}
        height={120}
      />
      <Spacing size={40} />
      <Text bold={true}>{user?.displayName}</Text>
      <Spacing size={20} />
      <Button onClick={handleSignout}>로그아웃</Button>
    </Flex>
  )
}

export default MyPage
