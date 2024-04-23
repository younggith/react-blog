import {useState, useEffect, useCallback, ChangeEvent, KeyboardEvent} from 'react'
import {Pagination, TextField} from '@mui/material'
import {Search} from '@mui/icons-material'
import CardComponent from '../components/CardComponent'

const MeetList = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [searchResults, setSearchResults] = useState([])

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

        setSearchResults([])
      }
    },
    [searchKeyword]
  )

  return (
    <>
      <div className="my-4 mx-auto w-4/5 mb-4">
        <div className="flex justify-end mb-4">
          <TextField
            label="검색"
            value={searchKeyword}
            onChange={handleSearchKeywordChange}
            onKeyDown={handleKeyDown}
            variant="outlined"
            InputProps={{
              endAdornment: <Search />
            }}
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <CardComponent
            title="Lizard"
            subTitle="Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica"
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Pagination count={10} color="primary" showFirstButton showLastButton />
      </div>
    </>
  )
}

export default MeetList
