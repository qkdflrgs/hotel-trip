import { Review } from '@models/review'
import { COLLECTIONS } from '@constants'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'
import { store } from './firebase'
import { User } from '@models/user'

export async function getReviews({ hotelId }: { hotelId: string }) {
  const hotelRef = doc(store, COLLECTIONS.HOTEL, hotelId)

  const reviewQuery = query(
    collection(hotelRef, COLLECTIONS.REVIEW),
    orderBy('createdAt', 'desc'),
  )

  const reviewSnapshot = await getDocs(reviewQuery)

  const reviews = reviewSnapshot.docs.map((doc) => {
    const review = doc.data()

    return {
      id: doc.id,
      ...review,
      createdAt: review.createdAt.toDate(),
    } as Review
  })

  const results: Array<Review & { user: User }> = []

  const userMap: {
    [key: string]: User
  } = {}

  for (let review of reviews) {
    const cashedUser = userMap[review.userId]

    if (cashedUser == null) {
      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTIONS.USER), review.userId),
      )

      const user = userSnapshot.data() as User

      userMap[review.userId] = user

      results.push({
        ...review,
        user,
      })
    } else {
      results.push({
        ...review,
        user: cashedUser,
      })
    }
  }

  return results
}
