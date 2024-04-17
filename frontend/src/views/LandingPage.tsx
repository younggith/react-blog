import {useEffect, useState, useCallback} from 'react'
import {
  Map,
  ZoomControl,
  MapTypeControl,
  CustomOverlayMap,
  Circle,
  MapMarker
} from 'react-kakao-maps-sdk'
import ToastNotification from '../utils/ToastNotification'

interface LocationProps {
  latitude: number
  longitude: number
}

const localDB: LocationProps[] = [
  {latitude: 37.5046124, longitude: 127.0448806},
  {latitude: 37.5047996, longitude: 127.0444782}
]

const LandingPage = () => {
  const [currentLocation, setCurrentLocation] = useState<LocationProps | null>(null)
  const [markerPosition, setMarkerPosition] = useState<LocationProps | null>(null)
  const [count, setCount] = useState<number>(0)

  // 현재 위치를 가져오는 함수
  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords
          setCurrentLocation({latitude, longitude})
          setMarkerPosition({latitude, longitude})
        },
        error => {
          ToastNotification.error(`Geolocation error:' ${error}`)
        }
      )
    } else {
      ToastNotification.error('Geolocation is not supported by this browser.')
    }
  }, [])

  const handleMapClick = useCallback(
    (target: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
      const latLng = mouseEvent.latLng
      setMarkerPosition({latitude: latLng.getLat(), longitude: latLng.getLng()})
    },
    []
  )

  useEffect(() => {
    const savedIsLoggedIn = localStorage.getItem('rememberMe')
    if (savedIsLoggedIn === 'true') {
      //   setRememberMe(true)
    }
    getCurrentLocation()
  }, [])

  useEffect(() => {
    if (markerPosition) {
      const filteredCount = localDB.filter(location => {
        const R = 6371e3
        const lat1 = markerPosition.latitude * (Math.PI / 180)
        const lat2 = location.latitude * (Math.PI / 180)
        const deltaLat = lat2 - lat1
        const deltaLng = (location.longitude - markerPosition.longitude) * (Math.PI / 180)

        const a =
          Math.sin(deltaLat / 2) ** 2 +
          Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = R * c // 거리 (미터)

        return distance <= 1000 // 1km 이내에 포함되면 true 반환
      }).length

      setCount(filteredCount)
    }
  }, [markerPosition])
  return (
    <div className="my-4 mx-auto" style={{width: '80%', height: '600px'}}>
      {currentLocation && (
        <Map
          center={
            currentLocation
              ? {lat: currentLocation.latitude, lng: currentLocation.longitude}
              : {lat: 0, lng: 0}
          }
          style={{width: '100%', height: '100%'}}
          level={5}
          onClick={handleMapClick}>
          {/* 현재 위치를 표시하는 마커 */}
          <MapMarker
            position={
              markerPosition
                ? {lat: markerPosition.latitude, lng: markerPosition.longitude}
                : {lat: 0, lng: 0}
            }
          />

          {/* 반경 1km를 표시하는 원 */}
          <Circle
            center={
              markerPosition
                ? {lat: markerPosition.latitude, lng: markerPosition.longitude}
                : {lat: 0, lng: 0}
            }
            radius={1000} // 반경 1km
            strokeWeight={3}
            strokeColor={'#FFA7EF'}
            fillColor={'#F3CDEF'}
            fillOpacity={0.5}
          />
        </Map>
      )}
      <div className="mb-16">반경 1km 이내에 포함되는 좌표값 수: {count}</div>
    </div>
  )
}

export default LandingPage
