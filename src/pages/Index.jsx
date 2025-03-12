
import React, { useEffect } from 'react';
import Hero from "@/components/Hero";
import FeaturedRecords from "@/components/FeaturedRecords";
import { ChevronRight } from "lucide-react";
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { records } from '../utils/data';

const Index = () => {
  const featuredRecords = records.filter(record => record.featured);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (

  <>
      <Navbar /> 
      
      <Hero />
      
      <FeaturedRecords />

      {/* About Preview Section */}
      <section className="about-section py-5 px-4 px-md-6 px-lg-8">
        <div className="container">
          <div className="row align-items-center g-4">
            {/* Text Section */}
            <div className="col-md-6">
              <div className="animate__animated animate__fadeIn">
                <h2 className="display-4 mb-3">The Authentic Vinyl Experience</h2>
                <p className="text-muted mb-4" style={{ textAlign: 'justify' }}>
                  At Vinyl Haven, we believe in the timeless quality of vinyl records. Our carefully curated collection brings together the best music across genres, offering both classic albums and new releases for the discerning music lover.
                </p>
                <p className="text-muted mb-4" style={{ textAlign: 'justify' }}>
                  Every record in our collection is selected for its musical value and pressing quality, ensuring you get the best possible listening experience.
                </p>
                <Link to="/about" className="btn-about d-inline-flex align-items-center">
                  Learn more about us
                </Link>
              </div>
            </div>

            {/* Image Section */}
            <div className="col-md-6">
              <div className="about-image">
                <div className="overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=2873&auto=format&fit=crop"
                    alt="Vinyl record being played" 
                    className="w-100 h-100 object-cover animate__animated animate__fadeIn animate__delay-1s"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  </>
  );
};

export default Index;
