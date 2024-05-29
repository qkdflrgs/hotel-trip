import { userAtom } from '@store/atom/user'
import { useRecoilValue } from 'recoil'

function useUser() {
  return useRecoilValue(userAtom)
}

export default useUser
