import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function RecordCard({ record, className = "", featured = false }) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(record.price);

  return (
    <div 
      className={`record-card ${className} ${
      featured ? "bg-featured" : "bg-normal"
      }`}
    >
      {/* Link to product page */}
      <Link to={`/product/${record.id}`} className="d-block position-relative overflow-hidden">
        <div className="img-container" style={{ height: '300px' }}>
          {/* Image for the record */}
          <img
            src={record.cover}
            alt={`${record.title} by ${record.artist}`}
            className="w-100 h-100 object-fit-cover"
            loading="lazy"
          />
        </div>
        {featured && (
          <div className="image-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end p-3">
            <div className="text-white">
              <h3 className="fs-5 mb-1">{record.title}</h3>
              <p className="text-white-50 mb-0">{record.artist}</p>
            </div>
          </div>
        )}
      </Link>

      {/* Rendering Cards based on featured property */}
      {!featured && (
        <div className="mt-3 p-3">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h3 className="fs-6 mb-1">{record.title}</h3>
              <p className="text-muted mb-0">{record.artist}</p>
            </div>
          </div>
          <div className="d-flex align-items-center fs-6 fw-medium">
              <span className="me-3">{formattedPrice}</span>
              <Link 
                to={`/product/${record.id}`} 
                className="custom-btn ms-auto"
              >
                <ChevronRight className="h-4 w-4" />
              </Link>
          </div>
        </div>
      )}
    </div>
  );
}