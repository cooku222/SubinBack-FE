// src/pages/DashboardPage.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../api/authApi'

function DashboardPage() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await getMe()
        setUser(res.data)
      } catch (err) {
        setError('사용자 정보를 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }
    fetchMe()
  }, [])

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

      {loading && <div className="alert" style={{ marginTop: 14 }}>로딩 중…</div>}
      {error && <div className="alert alertDanger" style={{ marginTop: 14 }}>{error}</div>}

      {user && (
        <div className="grid2">
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

          <div className="card">
            <h3 className="cardTitle">계정 요약</h3>
            <p className="cardSub">실제 앱 느낌을 위해 “요약 카드” 형태로 배치.</p>

            <div className="stat" style={{ background: 'rgba(0,0,0,.18)' }}>
              <div className="statLabel">상태</div>
              <div className="statValue">정상</div>
            </div>

            <div style={{ marginTop: 10 }} className="stat">
              <div className="statLabel">보안 레벨</div>
              <div className="statValue">OTP Enabled</div>
            </div>

            <div style={{ marginTop: 10 }} className="stat">
              <div className="statLabel">세션</div>
              <div className="statValue">AccessToken 저장됨</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage
