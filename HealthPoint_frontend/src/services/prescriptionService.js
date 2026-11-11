// Prescription Service - API calls to backend
const API_BASE_URL = 'http://localhost:8081/api/prescription';

export const prescriptionService = {
  // Create a prescription
  createPrescription: async (prescriptionData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prescriptionData),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to create prescription';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
          }
        } catch (parseError) {
          errorMessage = `Failed to create prescription: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating prescription:', error);
      throw error;
    }
  },

  // Get prescriptions for a patient
  getPrescriptionsForPatient: async (patientId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/patient/${patientId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch prescriptions: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      throw error;
    }
  },

  // Get prescription by ID
  getPrescriptionById: async (prescriptionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${prescriptionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch prescription: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching prescription:', error);
      throw error;
    }
  },
};
