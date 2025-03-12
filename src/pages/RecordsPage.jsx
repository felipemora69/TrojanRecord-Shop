
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { records, genres } from '../utils/data';
import { ChevronRight } from "lucide-react";
import RecordCard from '../components/RecordCard';

const RecordsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialGenre = queryParams.get('genre') || 'all';
  
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const recordsPerPage = 8;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    filterRecords();
  }, [selectedGenre, searchTerm]);

  const filterRecords = () => {
    let result = [...records];
    
    // Filter by genre
    if (selectedGenre !== 'all') {
      result = result.filter(record => record.genre === selectedGenre);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(record => 
        record.title.toLowerCase().includes(term) || 
        record.artist.toLowerCase().includes(term)
      );
    }
    
    setFilteredRecords(result);
    setCurrentPage(1); // Reset to first page on new filter
  };

  // Get current records for pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      
      <div className="container py-5 mt-5">
        <div className="row">
          <div className="col-lg-3 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Filters</h5>
                
                <div className="mb-4">
                  <label htmlFor="searchInput" className="form-label">Search</label>
                  <input
                    type="text"
                    className="form-control"
                    id="searchInput"
                    placeholder="Search records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="form-label">Genre</label>
                  <div className="d-flex flex-column gap-2">
                    {genres.map(genre => (
                      <div key={genre.id} className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="genre"
                          id={`genre-${genre.id}`}
                          value={genre.id}
                          checked={selectedGenre === genre.id}
                          onChange={() => setSelectedGenre(genre.id)}
                        />
                        <label className="form-check-label" htmlFor={`genre-${genre.id}`}>
                          {genre.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0">
                {selectedGenre === 'all' ? 'All Records' : genres.find(g => g.id === selectedGenre)?.name}
              </h2>
              <span className="text-muted">{filteredRecords.length} records found</span>
            </div>
            
            {filteredRecords.length === 0 ? (
              <div className="alert alert-info">
                No records found. Try adjusting your filters.
              </div>
            ) : (
              <>
                <div className="row g-4">
                  {currentRecords.map(record => (
                    <div key={record.id} className="col-12 col-md-6 col-lg-4">
                      {/* Use RecordCard to display each record */}
                      <RecordCard record={record} />
                    </div>
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <nav className="mt-5">
                    <ul className="pagination justify-content-center">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => paginate(currentPage - 1)}
                        >
                          Previous
                        </button>
                      </li>
                      
                      {[...Array(totalPages).keys()].map(number => (
                        <li 
                          key={number + 1} 
                          className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(number + 1)}
                          >
                            {number + 1}
                          </button>
                        </li>
                      ))}
                      
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => paginate(currentPage + 1)}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordsPage;
