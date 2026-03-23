import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ width: '100%' }}>
      {/* Hero */}
      <section style={{
        padding: 'clamp(4rem, 10vw, 8rem) 2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #FFF 0%, #FFE4E6 50%, #FFF 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🩸</div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '800',
            color: '#111827',
            lineHeight: '1.1',
            marginBottom: '1.5rem'
          }}>
            Save a Life.<br />
            <span style={{ color: '#E11D48' }}>Be a Hero Today.</span>
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            color: '#6B7280',
            maxWidth: '650px',
            margin: '0 auto 3rem',
            lineHeight: '1.7'
          }}>
            BloodLink connects blood donors directly with those in critical need.
            No more waiting — just instant, reliable connections when it matters most.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/signup')}
              style={{
                padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: '700',
                background: '#E11D48', color: 'white', border: 'none', borderRadius: '8px',
                cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 14px rgba(225, 29, 72, 0.4)'
              }}
              onMouseOver={e => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={e => e.target.style.transform = 'translateY(0)'}
            >
              🚀 Get Started — It's Free
            </button>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: '700',
                background: 'white', color: '#E11D48', border: '2px solid #E11D48', borderRadius: '8px',
                cursor: 'pointer', transition: 'all 0.2s'
              }}
              onMouseOver={e => { e.target.style.background = '#E11D48'; e.target.style.color = 'white'; }}
              onMouseOut={e => { e.target.style.background = 'white'; e.target.style.color = '#E11D48'; }}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: '#111827', padding: '3rem 2rem', color: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem' }}>
          {[
            { num: '10,000+', label: 'Registered Donors' },
            { num: '50,000+', label: 'Lives Saved' },
            { num: '500+', label: 'Cities Covered' },
            { num: '100%', label: 'Free & Secure' }
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: '#E11D48' }}>{s.num}</div>
              <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.7, marginTop: '0.25rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '5rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.2rem', marginBottom: '0.75rem' }}>How It Works</h2>
          <p style={{ textAlign: 'center', color: '#6B7280', marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem' }}>
            Three simple steps to save a life or find a donor
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '📝', title: 'Create an Account', desc: 'Sign up for free. It takes less than 30 seconds to join the network.' },
              { icon: '🔍', title: 'Find or Register', desc: 'Search for blood donors near you using AI-powered filters, or register yourself as a willing donor.' },
              { icon: '🤝', title: 'Connect & Save', desc: 'Request help from verified donors directly. Get notified instantly when someone needs your blood type.' }
            ].map(step => (
              <div key={step.title} style={{
                background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px',
                padding: '2.5rem', textAlign: 'center', transition: 'transform 0.2s, box-shadow 0.2s'
              }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{step.icon}</div>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.3rem' }}>{step.title}</h3>
                <p style={{ color: '#6B7280', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '5rem 2rem', background: '#F9FAFB' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.2rem', marginBottom: '3rem' }}>Why Choose BloodLink?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '🤖', title: 'AI Smart Search', desc: 'Type naturally and let AI find the right donors for you.' },
              { icon: '⚡', title: 'Instant Alerts', desc: 'Get real-time notifications when someone needs your blood type.' },
              { icon: '🛡️', title: 'Verified Donors', desc: 'Every donor is authenticated. Trust when it matters most.' },
              { icon: '🚨', title: 'Emergency Alerts', desc: 'Generate shareable emergency blood request alerts instantly.' }
            ].map(f => (
              <div key={f.title} style={{
                background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px',
                padding: '2rem'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{f.icon}</div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.15rem' }}>{f.title}</h3>
                <p style={{ color: '#6B7280', fontSize: '0.95rem', lineHeight: '1.5' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        padding: '5rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #E11D48, #991B1B)',
        color: 'white'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '1rem', color: 'white' }}>
            Ready to Make a Difference?
          </h2>
          <p style={{ fontSize: '1.15rem', opacity: 0.9, marginBottom: '2.5rem', lineHeight: '1.6' }}>
            Join thousands of heroes saving lives every day. Create your free account and start connecting.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/signup')}
              style={{
                padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: '700',
                background: 'white', color: '#E11D48', border: 'none', borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Create Free Account
            </button>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: '700',
                background: 'transparent', color: 'white', border: '2px solid white', borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Log In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2rem', textAlign: 'center', background: '#111827', color: '#9CA3AF', fontSize: '0.9rem' }}>
        © 2026 BloodLink. Connecting Donors & Receivers. Built with ❤️
      </footer>
    </div>
  );
}

export default LandingPage;
