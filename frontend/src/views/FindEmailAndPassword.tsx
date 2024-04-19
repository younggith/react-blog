import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

const FindEmailAndPassword = () => {
  const tab = useParams<string>()
  const [activeTab, setActiveTab] = useState<string>('email')

  useEffect(() => {
    console.log('tab', tab.param)
    if (tab.path === 'email') {
      setActiveTab('email')
    } else if (tab.path === 'password') {
      setActiveTab('password')
    }
  }, [tab])

  return (
    <div className="container mx-auto p-4 h-screen ">
      {/* 탭 리스트 */}
      <div role="tablist" className="tabs tabs-lifted mb-4 tabs-lg">
        <a
          role="tab"
          className={`tab ${activeTab === 'email' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('email')}>
          이메일
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 'password' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('password')}>
          비밀번호
        </a>
      </div>
      {activeTab === 'email' && (
        <div role="tabpanel" className="p-10">
          {/* 이메일 찾기 콘텐츠 */}
          <h2 className="text-xl font-semibold mb-4">이메일 찾기</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">
                이름
              </label>
              <input
                type="text"
                id="name"
                className="input input-bordered w-full"
                placeholder="이름을 입력하세요"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2">
                휴대폰 번호
              </label>
              <input
                type="tel"
                id="phone"
                className="input input-bordered w-full"
                placeholder="휴대폰 번호를 입력하세요"
              />
            </div>
            <button className="btn btn-primary w-full">이메일 찾기</button>
          </form>
        </div>
      )}
      {activeTab === 'password' && (
        <div role="tabpanel" className="p-10">
          {/* 비밀번호 찾기 콘텐츠 */}
          <h2 className="text-xl font-semibold mb-4">비밀번호 찾기</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                이메일
              </label>
              <input
                type="email"
                id="email"
                className="input input-bordered w-full"
                placeholder="이메일을 입력하세요"
              />
            </div>
            <button className="btn btn-primary w-full">비밀번호 찾기</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default FindEmailAndPassword
