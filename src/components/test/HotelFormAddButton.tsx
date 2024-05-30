import { COLLECTIONS } from '@constants'
import { FORMS } from '@mock/data'
import { store } from '@remote/firebase'
import Button from '@shared/Button'
import { collection, getDocs, writeBatch } from 'firebase/firestore'

function HotelFormAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    const snapshots = await getDocs(collection(store, COLLECTIONS.HOTEL))

    snapshots.docs.forEach((hotel) => {
      batch.update(hotel.ref, {
        forms: FORMS,
      })
    })

    await batch.commit()

    alert('폼 데이터가 추가되었습니다')
  }

  return <Button onClick={handleButtonClick}>폼 데이터 추가</Button>
}

export default HotelFormAddButton
