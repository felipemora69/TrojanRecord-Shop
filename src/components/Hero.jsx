import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero-section py-5 px-4 px-md-5 px-lg-6">
      <div className="container">
        <div className="row mb-4 mb-md-5">
          <div className="max-w-2xl animate__animated animate__fadeIn">
            <span className="d-inline-block mb-3 text-sm opacity-90 text-uppercase" style={{ color: 'var(--accent-color)' }}>
              Analog Sound. Digital Convenience.
            </span >
            <h1 className="display-4 mb-3" style={{ color: 'var(--primary-color)' }}>
              Discover the Authentic Sound <br></br> of Vinyl Records
            </h1>
            <p className="text-lg text-muted mb-8 max-w-xl" 
              style={{fontWeight: '400', color: 'var(--text-color)' }}>
              Curated selection of new releases and classic albums from artists <br></br> you love, delivered to your doorstep.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <Link 
                to="/records" 
                className="link-shop d-inline-flex align-items-center justify-content-center px-4 py-2 rounded-3 font-weight-medium transition-all hover:bg-primary-90"
              >
                Shop Collection
              </Link>
              <Link 
                to="/about" 
                className="link-about d-inline-flex align-items-center justify-content-center px-4 py-2 rounded-3 font-weight-medium transition-all hover:bg-secondary-80"
              >
                About Our Store
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}