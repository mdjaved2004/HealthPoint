// Medical History Service - API calls to backend
const API_BASE_URL = 'http://localhost:8081/api/history';

export const medicalHistoryService = {
  // Add medical history
  addMedicalHistory: async (historyData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(historyData),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to add medical history';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
          }
        } catch (parseError) {
          errorMessage = `Failed to add medical history: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding medical history:', error);
      throw error;
    }
  },

  // Get medical history for a patient
  getPatientHistory: async (patientId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/patient/${patientId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch medical history: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching medical history:', error);
      throw error;
    }
  },

  // Get medical history by ID
  getHistoryById: async (historyId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${historyId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch medical history: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching medical history:', error);
      throw error;
    }
  },
};
