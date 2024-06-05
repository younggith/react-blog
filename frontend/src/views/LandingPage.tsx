import {
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent
} from 'react'
import {useNavigate} from 'react-router-dom'
import {
  Map,
  ZoomControl,
  MapTypeControl,
  CustomOverlayMap,
  Circle,
  MapMarker,
  MarkerClusterer
} from 'react-kakao-maps-sdk'
import {TextField, List, ListItem, ListItemText, Icon} from '@mui/material'
import {Circle as IconC, Search} from '@mui/icons-material'
import ToastNotification from '../utils/ToastNotification'
import * as util from '../utils/commonUtil'

interface CoordinateProps {
  id: number
  lat: number
  lng: number
  name: string
  keyword: string
}

const localDB: CoordinateProps[] = [
  {id: 1, lat: 37.5046124, lng: 127.0448806, name: '장소1', keyword: '카페'},
  {id: 2, lat: 37.5047996, lng: 127.0444782, name: '장소2', keyword: '식당'},
  {id: 3, lat: 37.5047996, lng: 127.0444782, name: '장소3', keyword: '식당'},
  {id: 4, lat: 37.5047996, lng: 127.0444782, name: '장소4', keyword: '식당'},
  {id: 5, lat: 37.5047996, lng: 127.0444782, name: '장소5', keyword: '식당'},
  {id: 6, lat: 37.5047996, lng: 127.0444782, name: '장소6', keyword: '식당'},
  {id: 7, lat: 37.5047996, lng: 127.0444782, name: '장소7', keyword: '식당'},
  {id: 8, lat: 37.5047996, lng: 127.0444782, name: '장소8', keyword: '식당'},
  {id: 9, lat: 37.5047996, lng: 127.0444782, name: '장소9', keyword: '식당'},
  {id: 10, lat: 37.5047996, lng: 127.0444782, name: '장소10', keyword: '식당'},
  {id: 11, lat: 37.5047996, lng: 127.0444782, name: '장소11', keyword: '식당'},
  {id: 12, lat: 37.5047996, lng: 127.0444782, name: '장소12', keyword: '식당'},
  {id: 13, lat: 37.5047996, lng: 127.0444782, name: '장소13', keyword: '식당'},
  {id: 14, lat: 37.5047996, lng: 127.0444782, name: '장소14', keyword: '식당'},
  {id: 15, lat: 37.5047996, lng: 127.0444782, name: '장소15', keyword: '식당'}
]

const LandingPage = () => {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [markerPosition, setMarkerPosition] = useState<{lat: number; lng: number} | null>(
    null
  )
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [searchResults, setSearchResults] = useState<CoordinateProps[]>([])
  const [count, setCount] = useState<number>(0)
  const [radiusInput, setRadiusInput] = useState<string>('')
  const [radius, setRadius] = useState<number>(1000)
  const [inputError, setInputError] = useState<boolean>(false)
  const navigate = useNavigate()

  // 현재 위치를 가져오는 함수
  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords
          setCurrentLocation({lat: latitude, lng: longitude})
          setMarkerPosition({lat: latitude, lng: longitude})
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
      setMarkerPosition({lat: latLng.getLat(), lng: latLng.getLng()})
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
        const lat1 = markerPosition.lat * (Math.PI / 180)
        const lat2 = location.lat * (Math.PI / 180)
        const deltaLat = lat2 - lat1
        const deltaLng = (location.lng - markerPosition.lng) * (Math.PI / 180)

        const a =
          Math.sin(deltaLat / 2) ** 2 +
          Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = R * c // 거리 (미터)

        return distance <= radius
      }).length

      setCount(filteredCount)
    }
  }, [markerPosition, radius])

  const handleSearchKeywordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setSearchKeyword(e.target.value)
    },
    []
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        // 검색 키워드로 localDB에서 결과를 필터링
        const results = localDB.filter(
          item =>
            item.keyword.includes(searchKeyword) &&
            item.lat >=
              (markerPosition !== null
                ? markerPosition!.lat - radius / 110574
                : currentLocation!.lat - radius / 110574) &&
            item.lat <=
              (markerPosition !== null
                ? markerPosition!.lat + radius / 110574
                : currentLocation!.lat + radius / 110574) &&
            item.lng >=
              (markerPosition !== null
                ? markerPosition!.lng - radius / 111320
                : currentLocation!.lng - radius / 111320) &&
            item.lng <=
              (markerPosition !== null
                ? markerPosition!.lng + radius / 111320
                : currentLocation!.lng + radius / 111320)
        )
        setSearchResults(results)
      }
    },
    [searchKeyword, markerPosition, radius]
  )
  const handleSearchListClick = useCallback((id: number) => {
    navigate(`/api/test/${id}`)
  }, [])
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setRadiusInput(e.target.value)
    },
    [radiusInput]
  )

  // 버튼 클릭 시 호출되는 핸들러
  const handleRadiusSetting = useCallback(() => {
    const newRadius = parseInt(radiusInput, 10)
    if (!isNaN(newRadius)) {
      setRadius(newRadius)
    }
  }, [radiusInput, radius])
  return (
    <>
      <main>
        <div className="w-4/5 mx-auto my-4">
          <div className="float-left pb-4">
            <input
              type="text"
              placeholder="반경 크기"
              className="max-w-xs input input-bordered input-sm"
              value={radiusInput}
              onChange={handleInputChange}
            />
            <span className="px-4 font-bold">단위(m)</span>
            <button className="btn btn-sm btn-neutral" onClick={handleRadiusSetting}>
              설정
            </button>
          </div>
          <div className="float-right">
            <IconC style={{color: 'orange'}} />
            반경에 포함된 모임 수: {count}
          </div>
        </div>
        <div
          className="clear-both h-screen mx-auto"
          style={{width: '80%', position: 'relative'}}>
          {/* 지도와 검색 창을 같은 영역에 배치 */}
          {currentLocation && (
            <Map
              center={
                currentLocation
                  ? {lat: currentLocation.lat, lng: currentLocation.lng}
                  : {lat: 0, lng: 0}
              }
              style={{width: '100%', height: '100%'}}
              level={5}
              onClick={handleMapClick}>
              {/* 현재 위치를 표시하는 마커 */}
              <MapMarker
                position={
                  markerPosition
                    ? {lat: markerPosition.lat, lng: markerPosition.lng}
                    : {lat: 0, lng: 0}
                }
              />

              {/* 반경 1km를 표시하는 원 */}
              <Circle
                center={
                  markerPosition
                    ? {lat: markerPosition.lat, lng: markerPosition.lng}
                    : {lat: 0, lng: 0}
                }
                radius={radius}
                strokeWeight={3}
                strokeColor={'#FFA7EF'}
                fillColor={'#F3CDEF'}
                fillOpacity={0.5}
              />

              {/* 지도 오른쪽 위에 반경 1km 이내의 좌표 수를 표시하는 요소 */}
              {/* <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                color: 'red',
                fontWeight: 'bold',
                zIndex: 1
              }}>
              <IconC style={{color: 'orange'}} />
              반경 1km 이내 좌표 수: {count}
            </div> */}

              {/* 지도 왼쪽에 검색창과 검색 결과를 살짝 투명하게 배치 */}
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  width: '300px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', // 투명도 조절
                  padding: '10px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                  height: '95%',
                  zIndex: 2
                }}>
                {/* 검색 키워드를 입력할 수 있는 입력 필드 */}
                <TextField
                  label="검색 키워드"
                  value={searchKeyword}
                  onChange={handleSearchKeywordChange}
                  onKeyDown={handleKeyDown}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    endAdornment: <Search />
                  }}
                />

                {/* 검색 결과를 표시하는 리스트 */}
                <List
                  className="mt-2"
                  style={{
                    height: 'calc(100% - 50px)',
                    overflowY: 'auto',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    borderRadius: '8px',
                    padding: '8px'
                  }}>
                  {/* 검색 결과 항목을 표시 */}
                  {!util.isEmptyOrNull(searchResults) ? (
                    searchResults.map((result, index) => (
                      <ListItem
                        id={'test'}
                        key={index}
                        className="hover:bg-gray-100 hover:cursor-pointer"
                        onClick={() => handleSearchListClick(result.id)}>
                        <ListItemText
                          primary={result.name}
                          secondary={`위도: ${result.lat}, 경도: ${result.lng}`}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText primary="검색된 목록이 없습니다." />
                    </ListItem>
                  )}
                </List>
              </div>
            </Map>
          )}
        </div>
      </main>
    </>
  )
}

export default LandingPage
