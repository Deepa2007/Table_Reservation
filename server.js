const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let bookings = [];

const generateAvailableSlots = () => [
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
];

const getTableRecommendation = (guests) => {
  if (guests <= 2) return 'Small table';
  if (guests <= 4) return 'Medium table';
  if (guests <= 6) return 'Large table';
  return 'Multiple tables or special arrangement';
};

app.get('/api/bookings', (req, res) => {
  const { date } = req.query;
  const dayBookings = bookings.filter((b) => b.date === date);
  const bookedSlots = dayBookings.map((b) => b.time);
  const availableSlots = generateAvailableSlots().filter(
    (slot) => !bookedSlots.includes(slot)
  );
  res.json({ availableSlots });
});

app.post('/api/bookings', (req, res) => {
  const { date, time, guests, name, contact } = req.body;
  const isSlotTaken = bookings.some((b) => b.date === date && b.time === time);
  if (isSlotTaken) {
    return res.status(400).json({ message: 'Slot already booked' });
  }
  const tableRecommendation = getTableRecommendation(parseInt(guests));
  const booking = { id: bookings.length + 1, date, time, guests: parseInt(guests), name, contact, tableRecommendation };
  bookings.push(booking);
  res.json(booking);
});

app.delete('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  bookings = bookings.filter((b) => b.id !== parseInt(id, 10));
  res.json({ message: 'Booking deleted' });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

