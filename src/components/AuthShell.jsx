// src/components/AuthShell.jsx
export default function AuthShell({ title, subtitle, children, rightHint = 'Security · OTP · JWT' }) {
  return (
    <div className="authShell">
      <div className="authGrid">
        {/* LEFT: Hero */}
        <div className="heroCard">
          <div className="heroBadge">
            <span className="brandDot" />
            <span>{rightHint}</span>
          </div>

          <h1 className="heroTitle">SubinBank</h1>
          <p className="heroDesc">
            수빈 은행에 오신것을 환영합니다!
          </p>
        </div>

        {/* RIGHT: Form Card */}
        <div className="card">
          <h2 className="cardTitle">{title}</h2>
          <p className="cardSub">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  )
}
