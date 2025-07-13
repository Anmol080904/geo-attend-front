import React, { useState, useEffect } from 'react';

export default function LeaveDashboard() {
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:8000/leave-approve/', {
        credentials: 'include',
      });
      const data = await res.json();

      if (data.status === 'success') {
        setLeaveData(data.leaves);
      } else {
        setError(data.message || 'Failed to fetch leave data');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const updateLeaveStatus = async (leaveId, newStatus) => {
    try {
      const res = await fetch('http://localhost:8000/update-leave/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ leave_id: leaveId, status: newStatus }),
      });

      const data = await res.json();
      if (data.status === 'success') {
        alert(data.message);
        fetchLeaves(); // Refresh
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📋 Leave Dashboard</h2>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Employee</th>
              <th className="p-2">Start</th>
              <th className="p-2">End</th>
              <th className="p-2">Days</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveData.map((leave) => (
              <tr key={leave.leave_id} className="border-t">
                <td className="p-2">{leave.employee}</td>
                <td className="p-2">{leave.start_date}</td>
                <td className="p-2">{leave.end_date}</td>
                <td className="p-2">{leave.days}</td>
                <td className="p-2">{leave.status}</td>
                <td className="p-2 space-x-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                    onClick={() => updateLeaveStatus(leave.leave_id, 'Approved')}
                  >
                    ✅ Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    onClick={() => updateLeaveStatus(leave.leave_id, 'Rejected')}
                  >
                    ❌ Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
