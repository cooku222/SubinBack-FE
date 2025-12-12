// src/pages/LoginPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/authApi'
import AuthShell from '../components/AuthShell.jsx'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login({ email, password })
      navigate('/verify-otp', { state: { email } })
    } catch (err) {
      setError(err.response?.data?.message || '로그인 실패')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="로그인"
      subtitle="계정 정보로 로그인 후 OTP(2차 인증)를 완료하세요."
      rightHint="SubinBank · Secure Login"
    >
      <form onSubmit={handleSubmit}>
        <div className="field">
          <div className="labelRow">
            <label className="label">이메일</label>
          </div>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="field">
          <div className="labelRow">
            <label className="label">비밀번호</label>
          </div>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>

        {error && <div className="alert alertDanger">{error}</div>}

        <div className="btnRow">
          <button className="btn btnPrimary" type="submit" disabled={loading}>
            {loading ? '로그인 중…' : '로그인'}
          </button>
          <button className="btn" type="button" onClick={() => navigate('/register')}>
            회원가입
          </button>
        </div>
      </form>

      <div style={{ marginTop: 14 }} className="pill">
        Tip: OTP 페이지로 넘어가면 이메일 기준으로 검증합니다.
      </div>
    </AuthShell>
  )
}

export default LoginPage
