// Appointment Service - API calls to backend
const API_BASE_URL = 'http://localhost:8081/api/appointment';

export const appointmentService = {
  // Book an appointment
  bookAppointment: async (appointmentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to book appointment';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
          }
        } catch (parseError) {
          errorMessage = `Failed to book appointment: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('Error booking appointment:', error);
      throw error;
    }
  },

  // Cancel an appointment
  cancelAppointment: async (appointmentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ appointmentId }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to cancel appointment';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
          }
        } catch (parseError) {
          errorMessage = `Failed to cancel appointment: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('Error canceling appointment:', error);
      throw error;
    }
  },

  // Confirm an appointment
  confirmAppointment: async (confirmData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/confirm`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(confirmData),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to confirm appointment';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
          }
        } catch (parseError) {
          errorMessage = `Failed to confirm appointment: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('Error confirming appointment:', error);
      throw error;
    }
  },
};
