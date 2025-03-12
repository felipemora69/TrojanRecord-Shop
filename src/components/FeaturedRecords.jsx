import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { records } from "../utils/data";
import RecordCard from "./RecordCard";

export default function FeaturedRecords() {
  const [featuredRecords, setFeaturedRecords] = useState([]);
  
  useEffect(() => {
    // In a real app, this would be fetched from an API
    setFeaturedRecords(records.slice(0, 8));
  }, []);
  
  return (
    <section className="featured-sec py-5 px-4 px-md-5 px-lg-6">
      <div className="container">
        <div className="row mb-4 mb-md-5">
          <div className="col-12 col-md-8 animate-slide-in">
            <h2 className="display-4 mb-3" style={{ fontWeight: 'bold' }}>Featured Records</h2>
            <p className="mb-3" style={{ fontSize: '1.25rem' }}>
              Hand-picked selection of vinyl records from our collection, featuring new releases and timeless classics.
            </p>
          </div>
          
          <div className="col-12 mt-1 mb-5">
            <div className="d-flex justify-content-end align-items-center">
              <Link
                to="/records"
                className="d-flex align-items-center text-primary text-decoration-none"
                style={{ fontSize: '1.25rem' }}
              >
                View all records
                <ChevronRight className="ms-2" style={{ height: '16px', width: '16px' }} />
              </Link>
            </div>
          </div>
        </div>

        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
          {featuredRecords.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </div>
      </div>
    </section>
  );
}