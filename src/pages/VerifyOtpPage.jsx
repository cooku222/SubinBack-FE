// src/pages/VerifyOtpPage.jsx
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { verifyOtp } from '../api/authApi'
import AuthShell from '../components/AuthShell.jsx'

function VerifyOtpPage() {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const email = useMemo(() => location.state?.email, [location.state])

  useEffect(() => {
    if (!email) navigate('/login', { replace: true })
  }, [email, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await verifyOtp({ email, otp })
      localStorage.setItem('accessToken', res.data.accessToken)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'OTP 검증 실패')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="2차 인증 (OTP)"
      subtitle="전송된 OTP 6자리 코드를 입력하세요."
      rightHint="SubinBank · OTP Verification"
    >
      <div className="pill" style={{ marginBottom: 12 }}>
        대상: <b style={{ color: 'var(--text)' }}>{email || '—'}</b>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <div className="labelRow">
            <label className="label">OTP 코드</label>
            <span className="label">6 digits</span>
          </div>

          <input
            className="input"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            inputMode="numeric"
            placeholder="123456"
            maxLength={6}
            required
          />
        </div>

        {error && <div className="alert alertDanger">{error}</div>}

        <div className="btnRow">
          <button className="btn btnPrimary" type="submit" disabled={loading}>
            {loading ? '검증 중…' : '확인'}
          </button>
          <button className="btn" type="button" onClick={() => navigate('/login')}>
            로그인으로
          </button>
        </div>
      </form>
    </AuthShell>
  )
}

export default VerifyOtpPage
