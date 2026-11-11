// Doctor Service - API calls to backend
const API_BASE_URL = 'http://localhost:8081/api/doctor';

export const getDoctorService = {
  // Get all available doctors
  getAllDoctors: async () => {
    try {
      console.log('Fetching doctors from:', `${API_BASE_URL}/all`);
      
      const response = await fetch(`${API_BASE_URL}/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch doctors: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Fetched data:', data);
      
      // Handle response structure - if doctors array is nested, extract it
      if (data.doctors && Array.isArray(data.doctors)) {
        console.log('Doctors found (nested):', data.doctors.length);
        return data.doctors;
      }
      
      // If response is directly an array, return it
      if (Array.isArray(data)) {
        console.log('Doctors found (array):', data.length);
        return data;
      }
      
      // If response has data property, try to extract from there
      if (data.data && Array.isArray(data.data)) {
        console.log('Doctors found (data.data):', data.data.length);
        return data.data;
      }
      
      // Otherwise assume the entire response is what we need
      console.log('Using entire response as data');
      return data;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      throw error;
    }
  },

  // Search doctors with filters
  searchDoctors: async (filters) => {
    try {
      // First get all doctors
      const allDoctors = await getDoctorService.getAllDoctors();
      
      // Apply filters locally
      let filtered = allDoctors;
      
      if (filters.specialization) {
        filtered = filtered.filter(doc =>
          doc.specialization && doc.specialization.toLowerCase().includes(filters.specialization.toLowerCase())
        );
      }
      
      if (filters.location) {
        filtered = filtered.filter(doc =>
          doc.hospitalName && doc.hospitalName.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
      
      if (filters.language) {
        filtered = filtered.filter(doc => {
          if (!doc.languages) return false;
          const langs = doc.languages.split(',').map(l => l.trim().toLowerCase());
          return langs.includes(filters.language.toLowerCase());
        });
      }
      
      if (filters.minFees !== undefined && filters.minFees !== null) {
        filtered = filtered.filter(doc => doc.fees >= filters.minFees);
      }
      
      if (filters.maxFees !== undefined && filters.maxFees !== null) {
        filtered = filtered.filter(doc => doc.fees <= filters.maxFees);
      }
      
      return filtered;
    } catch (error) {
      console.error('Error searching doctors:', error);
      throw error;
    }
  },

  // Create doctor profile
  createDoctorProfile: async (doctorData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/doctorProfile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to create doctor profile';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
          }
        } catch (parseError) {
          errorMessage = `Failed to create doctor profile: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating doctor profile:', error);
      throw error;
    }
  },

  // Get pending appointments for doctor
  getPendingAppointments: async (doctorId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/doctor/appointments/pending`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctorId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch appointments: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },
};
