import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDoctorService } from '../services/doctorService';
import { appointmentService } from '../services/appointmentService';
import { useAuth } from '../contexts/AuthContext';
import './Doctor.css';

const Doctor = () => {
  const { user, isAuthenticated } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [showConsultantModal, setShowConsultantModal] = useState(false);
  const [consultantLoading, setConsultantLoading] = useState(false);
  const [consultantError, setConsultantError] = useState(null);
  const [consultantForm, setConsultantForm] = useState({
    specialization: '',
    licenseNumber: '',
    experience: '',
    description: '',
    hospitalName: '',
    fees: '',
    languages: '',
    availableStartTime: '09:00',
    availableEndTime: '17:00',
    slotDuration: '20',
  });

  // Appointment booking state
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentLoading, setAppointmentLoading] = useState(false);
  const [appointmentError, setAppointmentError] = useState(null);
  const [appointmentForm, setAppointmentForm] = useState({
    patientId: '',
    doctorId: '',
  });

  // Filter state
  const [filters, setFilters] = useState({
    specialization: '',
    location: '',
    language: '',
    minFees: '',
    maxFees: '',
  });

  // Fetch doctors on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const data = await getDoctorService.getAllDoctors();
        console.log('Doctors fetched:', data);
        
        // Ensure we have an array
        const doctorsArray = Array.isArray(data) ? data : (data.doctors || []);
        
        setDoctors(doctorsArray);
        setFilteredDoctors(doctorsArray);
        setError(null);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        console.error('Full error object:', err);
        
        // Fallback static data matching API structure
        const staticDoctors = [
          { doctorId: 1, name: 'Dr. Amit Sharma', email: 'amit@gmail.com', mobileNumber: '9876543210', specialization: 'Cardiologist', experience: 10, fees: 800, hospitalName: 'Apollo Hospital', languages: 'English,Hindi', rating: 4.5, description: 'Expert in heart diseases' },
          { doctorId: 2, name: 'Dr. Sarah Johnson', email: 'sarah@gmail.com', mobileNumber: '9876543211', specialization: 'Neurology', experience: 8, fees: 600, hospitalName: 'City Medical Center', languages: 'English,Spanish', rating: 4.7, description: 'Brain and nervous system specialist' },
          { doctorId: 3, name: 'Dr. Mike Brown', email: 'mike@gmail.com', mobileNumber: '9876543212', specialization: 'Orthopedics', experience: 12, fees: 550, hospitalName: 'Central Hospital', languages: 'English,Urdu', rating: 4.6, description: 'Bone and joint specialist' },
          { doctorId: 4, name: 'Dr. Emily Davis', email: 'emily@gmail.com', mobileNumber: '9876543213', specialization: 'Pediatrics', experience: 7, fees: 400, hospitalName: 'Children Hospital', languages: 'English,Hindi', rating: 4.8, description: 'Children health expert' },
          { doctorId: 5, name: 'Dr. Robert Wilson', email: 'robert@gmail.com', mobileNumber: '9876543214', specialization: 'General Surgery', experience: 15, fees: 700, hospitalName: 'City Medical Center', languages: 'English', rating: 4.4, description: 'Surgical procedures specialist' },
          { doctorId: 6, name: 'Dr. Jessica Lee', email: 'jessica@gmail.com', mobileNumber: '9876543215', specialization: 'Dermatology', experience: 9, fees: 450, hospitalName: 'Skin Care Clinic', languages: 'English,Mandarin', rating: 4.9, description: 'Skin health expert' },
        ];
        
        setDoctors(staticDoctors);
        setFilteredDoctors(staticDoctors);
        
        // Set error message but data will still display
        setError(`⚠️ Using sample data. Backend connection issue: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Monitor authentication changes and update form
  useEffect(() => {
    console.log('Auth state changed:', { isAuthenticated, userId: user?.userId });
    // Form will automatically use the latest auth state from context
  }, [isAuthenticated, user]);

  // Apply filters and search
  const applyFilters = async () => {
    try {
      setLoading(true);
      
      // Check if any filter is active
      const hasActiveFilter = Object.values(filters).some(
        (val) => val !== '' && val !== null && val !== undefined
      );

      if (!hasActiveFilter) {
        // If no filters, show all doctors
        setFilteredDoctors(doctors);
      } else {
        // Call search endpoint with filters
        const searchFilters = {
          specialization: filters.specialization || undefined,
          location: filters.location || undefined,
          language: filters.language || undefined,
          minFees: filters.minFees ? parseInt(filters.minFees) : undefined,
          maxFees: filters.maxFees ? parseInt(filters.maxFees) : undefined,
        };

        const results = await getDoctorService.searchDoctors(searchFilters);
        setFilteredDoctors(results);
      }
      setError(null);
    } catch (err) {
      console.error('Error applying filters:', err);
      setError('Failed to search doctors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      specialization: '',
      location: '',
      language: '',
      minFees: '',
      maxFees: '',
    });
    setFilteredDoctors(doctors);
    setSortBy('name');
  };

  // Sort doctors
  const sortDoctors = (docsToSort, sortType) => {
    const sorted = [...docsToSort];
    
    switch (sortType) {
      case 'name':
        return sorted.sort((a, b) =>
          (a.name || '').localeCompare(b.name || '')
        );
      case 'specialty':
        return sorted.sort((a, b) =>
          (a.specialization || '').localeCompare(b.specialization || '')
        );
      case 'location':
        return sorted.sort((a, b) =>
          (a.hospitalName || '').localeCompare(b.hospitalName || '')
        );
      case 'fees-low':
        return sorted.sort((a, b) => (a.fees || 0) - (b.fees || 0));
      case 'fees-high':
        return sorted.sort((a, b) => (b.fees || 0) - (a.fees || 0));
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return sorted;
    }
  };

  const handleSortChange = (e) => {
    const newSortType = e.target.value;
    setSortBy(newSortType);
    setFilteredDoctors(sortDoctors(filteredDoctors, newSortType));
  };

  // Get unique values for filter dropdowns
  const uniqueSpecializations = [
    ...new Set(doctors.map((doc) => doc.specialization).filter(Boolean)),
  ].sort();

  const uniqueLocations = [
    ...new Set(doctors.map((doc) => doc.hospitalName).filter(Boolean)),
  ].sort();

  const uniqueLanguages = [
    ...new Set(
      doctors
        .flatMap((doc) => (doc.languages ? doc.languages.split(',') : []))
        .map((lang) => lang.trim())
        .filter(Boolean)
    ),
  ].sort();

  // Consultant form handlers
  const handleConsultantFormChange = (e) => {
    const { name, value } = e.target;
    setConsultantForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConsultantSubmit = async (e) => {
    e.preventDefault();
    setConsultantLoading(true);
    setConsultantError(null);

    try {
      const formData = {
        specialization: consultantForm.specialization,
        licenseNumber: consultantForm.licenseNumber,
        experience: parseInt(consultantForm.experience),
        description: consultantForm.description,
        hospitalName: consultantForm.hospitalName,
        fees: parseInt(consultantForm.fees),
        languages: consultantForm.languages,
        availableStartTime: consultantForm.availableStartTime,
        availableEndTime: consultantForm.availableEndTime,
        slotDuration: parseInt(consultantForm.slotDuration),
      };

      const result = await getDoctorService.createDoctorProfile(formData);
      console.log('Consultant registered successfully:', result);
      
      // Reset form and close modal
      setConsultantForm({
        specialization: '',
        licenseNumber: '',
        experience: '',
        description: '',
        hospitalName: '',
        fees: '',
        languages: '',
        availableStartTime: '09:00',
        availableEndTime: '17:00',
        slotDuration: '20',
      });
      setShowConsultantModal(false);
      alert('Your consultant profile has been submitted successfully!');
    } catch (err) {
      console.error('Error submitting consultant form:', err);
      setConsultantError(err.message || 'Failed to submit consultant profile. Please try again.');
    } finally {
      setConsultantLoading(false);
    }
  };

  // Appointment handlers
  const handleAppointmentFormChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    
    // Auto-populate form if user is logged in
    if (isAuthenticated && user) {
      console.log('========== OPENING APPOINTMENT MODAL ==========');
      console.log('Full user object:', JSON.stringify(user, null, 2));
      console.log('user.userId:', user.userId);
      console.log('user.id:', user.id);
      console.log('user.patientId:', user.patientId);
      console.log('isAuthenticated:', isAuthenticated);
      
      // Get patient ID from user object - prioritize userId
      let patientId = '';
      if (user.userId) {
        patientId = String(user.userId);
        console.log('✓ Using user.userId:', patientId);
      } else if (user.id) {
        patientId = String(user.id);
        console.log('✓ Using user.id:', patientId);
      } else if (user.patientId) {
        patientId = String(user.patientId);
        console.log('✓ Using user.patientId:', patientId);
      }
      
      console.log('Final patientId to set:', patientId);
      
      const newAppointmentForm = {
        patientId: patientId || '',
        doctorId: String(doctor.doctorId || doctor.id),
      };
      
      console.log('Setting appointment form to:', newAppointmentForm);
      setAppointmentForm(newAppointmentForm);
    } else {
      console.log('❌ User not authenticated or user data missing:', { isAuthenticated, user });
      setAppointmentForm({
        patientId: '',
        doctorId: String(doctor.doctorId || doctor.id),
      });
    }
    
    setAppointmentError(null);
    setShowAppointmentModal(true);
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setAppointmentLoading(true);
    setAppointmentError(null);

    try {
      console.log('========== APPOINTMENT SUBMISSION DEBUG ==========');
      console.log('isAuthenticated:', isAuthenticated);
      console.log('user object:', JSON.stringify(user, null, 2));
      console.log('appointmentForm:', JSON.stringify(appointmentForm, null, 2));
      console.log('Token from localStorage:', localStorage.getItem('authToken'));
      console.log('Stored user from localStorage:', localStorage.getItem('authUser'));
      console.log('================================================');
      
      // Check if user is logged in - use multiple sources to verify authentication
      const hasToken = !!localStorage.getItem('authToken');
      const hasStoredUser = !!localStorage.getItem('authUser');
      const hasUserObject = !!user;
      
      console.log('Auth checks:', { hasToken, hasStoredUser, hasUserObject, isAuthenticated });
      
      if (!isAuthenticated && !hasToken && !hasStoredUser) {
        throw new Error('Please login first to book an appointment');
      }

      // Get patient ID - prioritize appointmentForm.patientId which is set from userId
      const patientId = appointmentForm.patientId || user?.userId || user?.id || user?.patientId;
      
      console.log('Patient ID resolved from:', { appointmentFormPatientId: appointmentForm.patientId, userUserId: user?.userId, userId: user?.id, patientId: user?.patientId, finalPatientId: patientId });
      
      if (!patientId) {
        throw new Error('Patient ID not found. Please ensure you are logged in properly.');
      }

      if (!appointmentForm.doctorId) {
        throw new Error('Doctor information is missing.');
      }

      const appointmentData = {
        patientId: parseInt(patientId),
        doctorId: parseInt(appointmentForm.doctorId),
      };

      console.log('Booking appointment with data:', appointmentData);
      const result = await appointmentService.bookAppointment(appointmentData);
      console.log('Appointment booked successfully:', result);
      
      setShowAppointmentModal(false);
      setAppointmentForm({
        patientId: '',
        doctorId: '',
      });
      alert('Appointment booked successfully! Confirmation will be sent to your email.');
    } catch (err) {
      console.error('Error booking appointment:', err);
      setAppointmentError(err.message || 'Failed to book appointment. Please try again.');
    } finally {
      setAppointmentLoading(false);
    }
  };

  return (
    <>
      {/* Doctor Search & Filter Section */}
      <section className="doctor-search-section section-padding">
        <div className="container">
          {/* Be a Consultant Button */}
          <div className="mb-40 text-center">
            <button
              className="btn btn-success btn-lg"
              onClick={() => setShowConsultantModal(true)}
            >
              <i className="fas fa-user-md"></i> Be a Consultant
            </button>
          </div>

          {error && filteredDoctors.length > 0 && (
            <div className="alert alert-warning" role="alert">
              <strong>⚠️ Notice:</strong> {error}
            </div>
          )}

          {error && filteredDoctors.length === 0 && (
            <div className="alert alert-danger" role="alert">
              <strong>❌ Error:</strong> {error}
            </div>
          )}

          {/* Filter Panel */}
          <div className="filter-panel card mb-40">
            <div className="card-body">
              <h4 className="filter-title mb-30">Search & Filter Doctors</h4>

              <div className="row">
                {/* Specialization Filter */}
                <div className="col-lg-2 col-md-6 mb-20">
                  <div className="form-group">
                    <label htmlFor="specialization" className="form-label">
                      Specialization
                    </label>
                    <select
                      id="specialization"
                      name="specialization"
                      className="form-control"
                      value={filters.specialization}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Specialties</option>
                      {uniqueSpecializations.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Location Filter */}
                <div className="col-lg-2 col-md-6 mb-20">
                  <div className="form-group">
                    <label htmlFor="location" className="form-label">
                      Location/Hospital
                    </label>
                    <select
                      id="location"
                      name="location"
                      className="form-control"
                      value={filters.location}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Locations</option>
                      {uniqueLocations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Language Filter */}
                <div className="col-lg-2 col-md-6 mb-20">
                  <div className="form-group">
                    <label htmlFor="language" className="form-label">
                      Language
                    </label>
                    <select
                      id="language"
                      name="language"
                      className="form-control"
                      value={filters.language}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Languages</option>
                      {uniqueLanguages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Min Fees Filter */}
                <div className="col-lg-2 col-md-6 mb-20">
                  <div className="form-group">
                    <label htmlFor="minFees" className="form-label">
                      Min Fees
                    </label>
                    <input
                      id="minFees"
                      type="number"
                      name="minFees"
                      className="form-control"
                      placeholder="Min"
                      value={filters.minFees}
                      onChange={handleFilterChange}
                      min="0"
                    />
                  </div>
                </div>

                {/* Max Fees Filter */}
                <div className="col-lg-2 col-md-6 mb-20">
                  <div className="form-group">
                    <label htmlFor="maxFees" className="form-label">
                      Max Fees
                    </label>
                    <input
                      id="maxFees"
                      type="number"
                      name="maxFees"
                      className="form-control"
                      placeholder="Max"
                      value={filters.maxFees}
                      onChange={handleFilterChange}
                      min="0"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="col-lg-2 col-md-6 mb-20">
                  <div className="form-group d-flex gap-2 pt-32">
                    <button
                      className="btn btn-primary btn-sm flex-grow-1"
                      onClick={applyFilters}
                      disabled={loading}
                    >
                      {loading ? 'Searching...' : 'Search'}
                    </button>
                    <button
                      className="btn btn-secondary btn-sm flex-grow-1"
                      onClick={resetFilters}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="sort-section mb-30">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h5>
                  Found <strong>{filteredDoctors.length}</strong> Doctor(s)
                </h5>
              </div>
              <div className="col-md-6 text-end">
                <div className="sort-dropdown">
                  <label htmlFor="sortBy" className="me-2">
                    Sort by:
                  </label>
                  <select
                    id="sortBy"
                    className="form-control d-inline-block"
                    style={{ width: '200px' }}
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="specialty">Specialization</option>
                    <option value="location">Location</option>
                    <option value="fees-low">Fees (Low to High)</option>
                    <option value="fees-high">Fees (High to Low)</option>
                    <option value="rating">Rating (High to Low)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Doctors Grid */}
          {loading ? (
            <div className="text-center py-5">
              <p>Loading doctors...</p>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="alert alert-info text-center" role="alert">
              <h5>No doctors found matching your criteria.</h5>
              <p>Try adjusting your filters and search again.</p>
            </div>
          ) : (
            <div className="row">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.doctorId || doctor.id} className="col-lg-4 col-md-6 mb-30">
                  <div className="doctor-card">
                    <div className="doctor-image">
                      <img
                        src={doctor.image || '/assets/img/gallery/team1.png'}
                        alt={doctor.name}
                        className="img-fluid"
                      />
                    </div>
                    <div className="doctor-content">
                      <h4>{doctor.name}</h4>
                      <p className="specialty-badge">
                        <span className="badge bg-primary">{doctor.specialization}</span>
                      </p>

                      <div className="doctor-info mb-15">
                        {doctor.experience && (
                          <p className="info-item">
                            <i className="fas fa-briefcase"></i> {doctor.experience} Years Experience
                          </p>
                        )}
                        {doctor.hospitalName && (
                          <p className="info-item">
                            <i className="fas fa-hospital"></i> {doctor.hospitalName}
                          </p>
                        )}
                        {doctor.languages && (
                          <p className="info-item">
                            <i className="fas fa-language"></i> {doctor.languages}
                          </p>
                        )}
                        {doctor.fees && (
                          <p className="info-item">
                            <i className="fas fa-money-bill"></i> Rs. {doctor.fees}/Consultation
                          </p>
                        )}
                        {doctor.rating && (
                          <p className="info-item">
                            <i className="fas fa-star" style={{ color: '#ffc107' }}></i>{' '}
                            {doctor.rating.toFixed(1)} Rating
                          </p>
                        )}
                      </div>

                      {doctor.description && (
                        <p className="description">{doctor.description}</p>
                      )}

                      <div className="doctor-actions">
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => openBookAppointment(doctor)}
                        >
                          <i className="fas fa-calendar"></i> Book Appointment
                        </button>
                      </div>

                      <div className="doctor-social mt-15">
                        <a href="#" title="Facebook">
                          <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" title="Twitter">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" title="LinkedIn">
                          <i className="fab fa-linkedin"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Consultant Modal */}
      {showConsultantModal && (
        <div className="modal-overlay" style={{ display: 'block' }}>
          <div className="modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Be a Consultant</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConsultantModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {consultantError && (
                  <div className="alert alert-danger">{consultantError}</div>
                )}

                <form onSubmit={handleConsultantSubmit}>
                  <div className="mb-3">
                    <label htmlFor="specialization" className="form-label">
                      Specialization <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="specialization"
                      name="specialization"
                      value={consultantForm.specialization}
                      onChange={handleConsultantFormChange}
                      placeholder="e.g., Cardiologist"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="licenseNumber" className="form-label">
                      License Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="licenseNumber"
                      name="licenseNumber"
                      value={consultantForm.licenseNumber}
                      onChange={handleConsultantFormChange}
                      placeholder="e.g., LIC123454"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="experience" className="form-label">
                      Experience (Years) <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="experience"
                      name="experience"
                      value={consultantForm.experience}
                      onChange={handleConsultantFormChange}
                      placeholder="e.g., 10"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={consultantForm.description}
                      onChange={handleConsultantFormChange}
                      placeholder="e.g., Heart specialist"
                      rows="3"
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="hospitalName" className="form-label">
                      Hospital Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="hospitalName"
                      name="hospitalName"
                      value={consultantForm.hospitalName}
                      onChange={handleConsultantFormChange}
                      placeholder="e.g., City Hospital"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="fees" className="form-label">
                      Consultation Fees (Rs.) <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="fees"
                      name="fees"
                      value={consultantForm.fees}
                      onChange={handleConsultantFormChange}
                      placeholder="e.g., 500"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="languages" className="form-label">
                      Languages (comma separated) <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="languages"
                      name="languages"
                      value={consultantForm.languages}
                      onChange={handleConsultantFormChange}
                      placeholder="e.g., English,Hindi"
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="availableStartTime" className="form-label">
                        Available Start Time <span className="text-danger">*</span>
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        id="availableStartTime"
                        name="availableStartTime"
                        value={consultantForm.availableStartTime}
                        onChange={handleConsultantFormChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="availableEndTime" className="form-label">
                        Available End Time <span className="text-danger">*</span>
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        id="availableEndTime"
                        name="availableEndTime"
                        value={consultantForm.availableEndTime}
                        onChange={handleConsultantFormChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="slotDuration" className="form-label">
                      Slot Duration (Minutes) <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="slotDuration"
                      name="slotDuration"
                      value={consultantForm.slotDuration}
                      onChange={handleConsultantFormChange}
                      placeholder="e.g., 20"
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConsultantModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConsultantSubmit}
                  disabled={consultantLoading}
                >
                  {consultantLoading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Booking Modal */}
      {showAppointmentModal && (
        <div className="modal-overlay" style={{ display: 'block' }}>
          <div className="modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Book Appointment
                  {selectedDoctor && <span> - {selectedDoctor.name}</span>}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAppointmentModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {appointmentError && (
                  <div className="alert alert-danger">{appointmentError}</div>
                )}

                {selectedDoctor && (
                  <div className="doctor-details mb-4">
                    <h5 className="mb-3">{selectedDoctor.name}</h5>
                    <div className="row">
                      <div className="col-md-6">
                        <p>
                          <strong>Specialization:</strong> {selectedDoctor.specialization}
                        </p>
                        <p>
                          <strong>Experience:</strong> {selectedDoctor.experience} years
                        </p>
                        <p>
                          <strong>Fees:</strong> Rs. {selectedDoctor.fees}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p>
                          <strong>Hospital:</strong> {selectedDoctor.hospitalName}
                        </p>
                        <p>
                          <strong>Languages:</strong> {selectedDoctor.languages}
                        </p>
                        <p>
                          <strong>Rating:</strong> ⭐ {selectedDoctor.rating}
                        </p>
                      </div>
                    </div>
                    {selectedDoctor.email && (
                      <p className="mt-2">
                        <strong>Email:</strong> {selectedDoctor.email}
                      </p>
                    )}
                  </div>
                )}

                <form onSubmit={handleAppointmentSubmit}>
                  {isAuthenticated && (user?.userId || user?.id || user?.patientId || appointmentForm.patientId) ? (
                    <div className="alert alert-success">
                      <strong>✓ Auto-filled:</strong> Patient ID ({appointmentForm.patientId || user?.userId || user?.id || user?.patientId}) is automatically filled from your login. Doctor has been selected.
                      <br />
                      <small>Click "Book Appointment" to proceed with the booking.</small>
                    </div>
                  ) : (
                    <>
                      <div className="mb-3">
                        <label htmlFor="patientId" className="form-label">
                          Patient ID <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="patientId"
                          name="patientId"
                          value={appointmentForm.patientId}
                          onChange={handleAppointmentFormChange}
                          placeholder="Enter your patient ID"
                          required
                        />
                      </div>

                      <div className="alert alert-warning">
                        <small>
                          ℹ️ <strong>Please login first</strong> to book an appointment. If you don't have an account, please register.
                        </small>
                      </div>
                    </>
                  )}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAppointmentModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAppointmentSubmit}
                  disabled={appointmentLoading}
                >
                  {appointmentLoading ? 'Booking...' : 'Book Appointment'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Doctor;
