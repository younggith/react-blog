import {ChangeEvent, useState} from 'react'
import {Box, Button, Tab, Tabs, Typography} from '@mui/material'
import {
  Map,
  ZoomControl,
  MapTypeControl,
  CustomOverlayMap,
  Circle,
  MapMarker,
  MarkerClusterer
} from 'react-kakao-maps-sdk'

interface CustomModalProps {
  open: boolean
  handleClose: () => void
}
interface TabPanelProps {
  children?: React.ReactNode
  value: number
  index: number
}

const TabPanel = ({children, value, index}: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tabpanel-${index}`}>
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}
const Modal = ({open, handleClose}: CustomModalProps) => {
  const [value, setValue] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const fnHandleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const files = (target.files as FileList)[0]
    console.log('file change', files)
    if (files === undefined) {
      return
    }
  }
  return (
    <div className={`custom-modal ${open ? 'show' : ''}`} onClick={handleClose}>
      <div className="custom-modal-content" onClick={e => e.stopPropagation()}>
        <div style={{backgroundColor: '#4676D2', position: 'relative'}}>
          <span className="close-btn" onClick={handleClose}>
            &times;
          </span>
          <h2>Modal Title</h2>
        </div>
        <div>
          <label htmlFor="test" className="custom-label">
            제목 :
          </label>
          <input type="text" className="custom-text" id="test" />
        </div>
        <div>
          <Tabs value={value} onChange={handleChange} aria-label="tabs">
            <Tab label="모임 소개" />
            <Tab label="모임 반경" />
          </Tabs>
          <Box sx={{p: 3}}>
            <TabPanel value={value} index={0}>
              <Typography variant="h6">모임 소개</Typography>
              <textarea
                className="comm_inp comm_ta"
                id="content"
                //   title={labelList?.lab18?.global || "내용 입력"}
                //   placeholder={labelList?.lab18?.global || "내용 입력"}
                //   onChange={fnOnChangeInputHandler}
                //   onBlur={fnOnChangeInputHandler}
                //   value={complainInfo.content}
              />
              <Typography>모임 소개 텍스트...</Typography>
              <Button variant="contained" onClick={handleClose} sx={{mt: 2}}>
                입장하기
              </Button>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography variant="h6">모임 반경</Typography>
              <div style={{width: '80%', height: '400px'}}>
                <Map
                  center={
                    // location
                    //   ? {lat: location.lat, lng: location.lng}
                    //   :
                    {lat: 38.367, lng: 126.317}
                  }
                  style={{width: '100%', height: '100%'}}
                  level={5}>
                  {/* 현재 위치를 표시하는 마커 */}
                  <MapMarker
                    position={
                      //   location
                      //     ? {lat: location.lat, lng: location.lng}
                      //     :
                      {lat: 38.367, lng: 126.317}
                    }
                  />

                  {/* 반경 1km를 표시하는 원 */}
                  <Circle
                    center={
                      //   location
                      //     ? {lat: location.lat, lng: location.lng}
                      //     :
                      {lat: 38.367, lng: 126.317}
                    }
                    radius={500}
                    strokeWeight={3}
                    strokeColor={'#FFA7EF'}
                    fillColor={'#F3CDEF'}
                    fillOpacity={0.5}
                  />
                </Map>
              </div>
            </TabPanel>
          </Box>
        </div>
        <div>
          <label htmlFor="files" className="custom-label">
            배너 업로드{' '}
          </label>
          <input
            type="file"
            id="files"
            className="form-control-sm"
            accept=".jpeg, .jpg, .png"
            onChange={e => fnHandleFileChange(e)}
          />
        </div>
        <div style={{textAlign: 'right'}}>
          <Button variant="contained" onClick={handleClose} sx={{mt: 2}}>
            확인
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
