// src/pages/RegisterPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../api/authApi'
import AuthShell from '../components/AuthShell.jsx'

function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      await register({ fullName, email, password })
      setSuccess('회원가입 성공! 잠시 후 로그인 페이지로 이동합니다.')
      setTimeout(() => navigate('/login'), 1100)
    } catch (err) {
      setError(err.response?.data?.message || '회원가입 실패')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="회원가입"
      subtitle="이름/이메일/비밀번호를 입력해 계정을 생성하세요."
      rightHint="SubinBank · Create Account"
    >
      <form onSubmit={handleSubmit}>
        <div className="field">
          <div className="labelRow">
            <label className="label">이름</label>
          </div>
          <input
            className="input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="전수빈"
            autoComplete="name"
            required
          />
        </div>

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
            placeholder="8자 이상 권장"
            autoComplete="new-password"
            required
          />
        </div>

        {error && <div className="alert alertDanger">{error}</div>}
        {success && <div className="alert alertOk">{success}</div>}

        <div className="btnRow">
          <button className="btn btnPrimary" type="submit" disabled={loading}>
            {loading ? '생성 중…' : '계정 만들기'}
          </button>
          <button className="btn" type="button" onClick={() => navigate('/login')}>
            로그인으로
          </button>
        </div>
      </form>

      <div style={{ marginTop: 14 }} className="pill">
        회원가입 후 로그인 → OTP 인증으로 진행됩니다.
      </div>
    </AuthShell>
  )
}

export default RegisterPage
