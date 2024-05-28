import { Location } from '@models/hotel'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import Flex from '@shared/Flex'
import Text from '@shared/Text'

interface MapProps {
  location: Location
}

function Map({ location }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API as string,
  })

  return (
    <Flex direction="column" style={{ padding: '24px' }}>
      <Text typography="t4" bold={true}>
        기본 정보
      </Text>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '250px',
            margin: '16px 0',
            boxSizing: 'border-box',
          }}
          center={{
            lat: location.pointGeolocation.y,
            lng: location.pointGeolocation.x,
          }}
          zoom={15}
        >
          <Marker
            position={{
              lat: location.pointGeolocation.y,
              lng: location.pointGeolocation.x,
            }}
          />
        </GoogleMap>
      )}
      <Text typography="t6">{location.directions}</Text>
    </Flex>
  )
}

export default Map
