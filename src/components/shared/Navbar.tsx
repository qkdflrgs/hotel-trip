import { colors } from '@styles/colorPalette'
import { css } from '@emotion/react'
import { Link, useLocation } from 'react-router-dom'
import Button from './Button'
import Flex from './Flex'
import { useCallback } from 'react'
import useUser from '@hooks/auth/useUser'
import Spacing from './Spacing'

function Navbar() {
  const user = useUser()
  const location = useLocation()
  const showSignButton =
    ['/signup', '/signin'].includes(location.pathname) === false

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Flex align="center">
          <Link to="/settings">
            <img
              src="https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-06-256.png"
              alt="설정 아이콘"
              width={40}
              height={40}
            />
          </Link>
          <Spacing size={8} direction="horizontal" />
          <Link to="/my">
            <img
              src={
                user.photoURL ??
                'https://cdn4.iconfinder.com/data/icons/music-ui-solid-24px/24/user_account_profile-2-512.png'
              }
              alt="유저 프로필 이미지"
              width={40}
              height={40}
              style={{ borderRadius: '100%' }}
            />
          </Link>
        </Flex>
      )
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [user, showSignButton])

  return (
    <Flex
      justify={'space-between'}
      align={'center'}
      css={navbarContainerStyles}
    >
      <Link to="/">홈</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainerStyles = css`
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.grey};
  padding: 10px 24px;
`

export default Navbar
