// src/pages/DashboardPage.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../api/authApi'
import { getAccountById, getMyAccount } from '../api/accountApi'


function DashboardPage() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  // 계좌 조회용 state
  const [account, setAccount] = useState(null)
  const [accountError, setAccountError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await getMe()
        setUser(res.data)
        await fetchMyAccount()
      } catch (err) {
        setError('사용자 정보를 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }
    fetchMe()
  }, [])

  const fetchMyAccount = async () => {
    setAccount(null)
    setAccountError('')
    try {
      const res = await getAccountById(2)
      setAccount(res.data)
    } catch (e) {
      const status = e.response?.status
      if (status === 401) setAccountError('로그인이 필요합니다 (401)')
      else setAccountError('계좌 조회 실패')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    navigate('/login', { replace: true })
  }

  return (
    <div className="container">
      <div className="topbar">
        <div className="brand">
          <span className="brandDot" />
          <span>SubinBank</span>
          <span className="pill">Dashboard</span>
        </div>

        <div className="miniRow">
          <span className="pill">JWT · Protected</span>
          <button className="btn" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </div>

      {loading && (
        <div className="alert" style={{ marginTop: 14 }}>
          로딩 중…
        </div>
      )}
      {error && (
        <div className="alert alertDanger" style={{ marginTop: 14 }}>
          {error}
        </div>
      )}

      {user && (
        <div className="grid2">
          {/* 내 정보 */}
          <div className="card">
            <h3 className="cardTitle">내 정보</h3>
            <p className="cardSub">백엔드에서 받아온 프로필 데이터입니다.</p>

            <div className="kv">
              <div className="k">이름</div>
              <div className="v">{user.fullName}</div>
            </div>
            <div className="kv" style={{ marginTop: 10 }}>
              <div className="k">이메일</div>
              <div className="v">{user.email}</div>
            </div>
            <div className="kv" style={{ marginTop: 10 }}>
              <div className="k">역할</div>
              <div className="v">{user.role}</div>
            </div>
          </div>

          {/* 계좌 조회 */}
          <div className="card">
            <h3 className="cardTitle">계좌 조회</h3>
            {accountError && (
              <div className="alert alertDanger" style={{ marginTop: 12 }}>
                {accountError}
              </div>
            )}

            {account && (
              <div style={{ marginTop: 14 }}>
                <div className="kv">
                  <div className="k">계좌번호</div>
                  <div className="v">{account.accountNumber}</div>
                </div>

                <div className="kv" style={{ marginTop: 10 }}>
                  <div className="k">잔액</div>
                  <div className="v">{account.balance}</div>
                </div>

                <div className="kv" style={{ marginTop: 10 }}>
                  <div className="k">소유자</div>
                  <div className="v">{account.ownerEmail}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage
