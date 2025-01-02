'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { BookingForm } from './components/BookingForm'
import { BookingSummary } from './components/BookingSummary'
import { TableRecommendation } from './components/TableRecommendation'

export default function Home() {
  const [date, setDate] = useState(new Date())
  const [availableSlots, setAvailableSlots] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    fetchAvailableSlots()
  }, [date])

  const fetchAvailableSlots = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get(
        `http://localhost:5000/api/bookings?date=${date.toISOString().split('T')[0]}`
      )
      setAvailableSlots(response.data.availableSlots)
    } catch (err) {
      setError('Failed to fetch available slots. Please try again.')
    }
    setLoading(false)
  }

  const handleBooking = async (bookingDetails) => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.post('http://localhost:5000/api/bookings', {
        ...bookingDetails,
        date: date.toISOString().split('T')[0]
      })
      setSummary(response.data)
    } catch (err) {
      setError('Failed to book the table. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Restaurant Table Booking</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
          <input
            type="date"
            value={date.toISOString().split('T')[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
            className="w-full p-2 border rounded"
          />
          {loading && <p className="text-gray-600 mt-2">Loading available slots...</p>}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div>
          <BookingForm
            availableSlots={availableSlots}
            onSubmit={handleBooking}
            loading={loading}
          />
        </div>
      </div>
      {summary && (
        <div className="mt-8">
          <BookingSummary summary={summary} />
        </div>
      )}
      <TableRecommendation />
    </div>
  )
}

