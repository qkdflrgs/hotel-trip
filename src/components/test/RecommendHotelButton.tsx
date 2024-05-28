import { COLLECTIONS } from '@constants'
import { store } from '@remote/firebase'
import { collection, writeBatch } from 'firebase/firestore'
import { getDocs } from 'firebase/firestore'
import Button from '@shared/Button'

function RecommendHotelButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    const snapshot = await getDocs(collection(store, COLLECTIONS.HOTEL))

    snapshot.docs.forEach((hotel) => {
      const recommendedHotel = []

      for (let doc of snapshot.docs) {
        if (recommendedHotel.length === 5) break

        if (doc.id !== hotel.id) {
          recommendedHotel.push(doc.id)
        }
      }

      batch.update(hotel.ref, {
        recommendHotel: recommendedHotel,
      })
    })

    await batch.commit()

    alert('업데이트가 완료되었습니다')
  }

  return <Button onClick={handleButtonClick}>호텔 추천 데이터 추가하기</Button>
}

export default RecommendHotelButton
