import { getLikes, toggleLike } from '@remote/like'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import useUser from '@hooks/auth/useUser'
import { Hotel } from '@models/hotel'
import { useAlertContext } from '@contexts/AlertContext'
import { useNavigate } from 'react-router-dom'

function useLike() {
  const user = useUser()
  const navigate = useNavigate()
  const client = useQueryClient()
  const { open } = useAlertContext()

  const { data } = useQuery({
    queryKey: ['likes'],
    queryFn: () => getLikes({ userId: user?.uid as string }),
    enabled: user != null,
  })

  const { mutate } = useMutation(
    ({ hotel }: { hotel: Pick<Hotel, 'name' | 'id' | 'mainImageUrl'> }) => {
      if (user == null) {
        throw new Error('로그인이 필요합니다')
      }

      return toggleLike({ hotel, userId: user.uid })
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['likes'])
      },
      onError: (e: Error) => {
        if (e.message === '로그인이 필요합니다') {
          open({
            title: '로그인이 필요한 기능입니다',
            onButtonClick: () => {
              navigate('/signin')
            },
          })

          return
        }

        open({
          title: '알 수 없는 오류가 발생했습니다. 잠시후 다시 시도해주세요!',
          onButtonClick: () => {},
        })
      },
    },
  )

  return { data, mutate }
}

export default useLike
