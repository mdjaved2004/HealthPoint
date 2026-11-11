import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-password'
  }
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Medical Center API Server' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Validate inputs
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide name, email, and message' 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide a valid email address' 
    });
  }

  try {
    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'admin@medicalcenter.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    // Email to user (confirmation)
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your message - Medical Center',
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p><strong>Your Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <br>
        <p>Best regards,<br>Medical Center Team</p>
      `
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// Testimonials endpoint
app.get('/api/testimonials', (req, res) => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      position: 'Patient',
      image: '/assets/img/testimonial/user1.jpg',
      content: 'Excellent service and very professional doctors. Highly recommended!'
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'Patient',
      image: '/assets/img/testimonial/user2.jpg',
      content: 'Great care and attention. The staff is very friendly and helpful.'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      position: 'Patient',
      image: '/assets/img/testimonial/user3.jpg',
      content: 'Best medical center in the area. I trust them with my health.'
    }
  ];
  res.json(testimonials);
});

// Departments endpoint
app.get('/api/departments', (req, res) => {
  const departments = [
    {
      id: 1,
      name: 'Cardiology',
      description: 'Heart and cardiovascular health care',
      specialties: ['Arrhythmia', 'Heart Failure', 'Hypertension']
    },
    {
      id: 2,
      name: 'Neurology',
      description: 'Brain and nervous system care',
      specialties: ['Migraine', 'Stroke', 'Epilepsy']
    },
    {
      id: 3,
      name: 'Orthopedics',
      description: 'Bone and joint care',
      specialties: ['Fractures', 'Joint Replacement', 'Sports Medicine']
    }
  ];
  res.json(departments);
});

// Doctors endpoint
app.get('/api/doctors', (req, res) => {
  const doctors = [
    {
      id: 1,
      name: 'Dr. John Smith',
      specialty: 'Cardiology',
      image: '/assets/img/team/team1.png',
      experience: '15 years',
      bio: 'Specialist in cardiovascular medicine with extensive experience.'
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      specialty: 'Neurology',
      image: '/assets/img/team/team2.png',
      experience: '12 years',
      bio: 'Expert in neurological disorders and treatment.'
    }
  ];
  res.json(doctors);
});

// Services endpoint
app.get('/api/services', (req, res) => {
  const services = [
    {
      id: 1,
      name: 'Medical Checkup',
      description: 'Comprehensive medical checkups with our experienced doctors',
      icon: 'flaticon-stethoscope'
    },
    {
      id: 2,
      name: 'Pharmacy',
      description: 'Complete pharmacy services with quality medicines',
      icon: 'flaticon-pharmacy'
    },
    {
      id: 3,
      name: 'Surgery',
      description: 'Advanced surgical procedures with modern equipment',
      icon: 'flaticon-operating-room'
    }
  ];
  res.json(services);
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint not found' 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
