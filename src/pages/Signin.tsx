import Spacing from '@shared/Spacing'
import Flex from '@shared/Flex'
import Button from '@shared/Button'
import useGoogleSignin from '@hooks/useGoogleSignin'

function SigninPage() {
  const { signin } = useGoogleSignin()

  return (
    <Flex direction="column" align="center" style={{ padding: '24px' }}>
      <Spacing size={100} />
      <img
        src="https://cdn4.iconfinder.com/data/icons/doodle-4/158/send-512.png"
        alt="프로필 이미지"
        width={120}
        height={120}
      />
      <Spacing size={60} />
      <Button size="medium" onClick={signin}>
        <Flex justify="center" align="center">
          <img
            src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Google-512.png"
            alt="구글"
            width={20}
            height={20}
          />
          <Spacing size={4} direction="horizontal" />
          구글로 로그인
        </Flex>
      </Button>
    </Flex>
  )
}

export default SigninPage
