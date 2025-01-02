export function BookingSummary({ summary }) {
  return (
    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
      <h2 className="text-lg font-semibold mb-2">Booking Summary</h2>
      <p>Date: {new Date(summary.date).toLocaleDateString()}</p>
      <p>Time: {summary.time}</p>
      <p>Guests: {summary.guests}</p>
      <p>Name: {summary.name}</p>
      <p>Contact: {summary.contact}</p>
      {summary.tableRecommendation && (
        <p className="mt-2 font-semibold">
          Recommended Table: {summary.tableRecommendation}
        </p>
      )}
    </div>
  )
}

