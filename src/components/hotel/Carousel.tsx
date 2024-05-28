import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { css } from '@emotion/react'

interface CarouselProps {
  images: string[]
}

function Carousel({ images }: CarouselProps) {
  return (
    <div>
      <Swiper css={containerStyles} spaceBetween={8}>
        {images.map((imageUrl, index) => (
          <SwiperSlide key={imageUrl}>
            <img
              src={imageUrl}
              alt={`${index}번째 호텔 이미지`}
              css={imageStyles}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const containerStyles = css`
  padding: 0 24px;
  height: 300px;
`

const imageStyles = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`

export default Carousel
