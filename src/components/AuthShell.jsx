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
            심플한 인증 흐름(회원가입 → 로그인 → OTP) 기반의 데모 핀테크 앱 UI.
            <br />
            실제 앱처럼 “깨끗하고 빠르게” 보이도록 구성했어.
          </p>

          <div className="heroStats">
            <div className="stat">
              <div className="statLabel">Flow</div>
              <div className="statValue">Register → Login → OTP</div>
            </div>
            <div className="stat">
              <div className="statLabel">Token</div>
              <div className="statValue">AccessToken 저장</div>
            </div>
            <div className="stat">
              <div className="statLabel">UI</div>
              <div className="statValue">Card · Glass · Mobile</div>
            </div>
          </div>
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
