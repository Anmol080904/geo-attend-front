import React, { useEffect, useState } from "react";

const AttendancePage = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [showError, setShowError] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Location error:", error);
        setShowError(true);
      }
    );
  }, []);

  const markAttendance = async (type) => {
    if (!currentPosition) {
      setAttendanceStatus("Location not available");
      setShowError(true);
      return;
    }

    try {
      const response = await fetch("https://geo-attend-backend.onrender.com/mark-attendance/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: currentPosition.lat,
          lng: currentPosition.lng,
          username: username,
          type: type,
        }),
        credentials: "include",
      });

      const data = await response.json();
      if (data.status === "success") {
        setAttendanceStatus(`Attendance ${type} marked successfully!`);
        setShowError(false);
      } else {
        setAttendanceStatus(data.message || "Failed to mark attendance.");
        setShowError(true);
      }
    } catch (error) {
      console.error("Mark error:", error);
      setAttendanceStatus("Error marking attendance.");
      setShowError(true);
    }
  };

  return (
    <div
      style={{
        background: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Roboto', sans-serif",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px",
            borderBottom: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "20px", fontWeight: "500", margin: 0 }}>Attendance</h1>
          {currentPosition && (
            <span style={{ fontSize: "14px", color: "#666" }}>
              {currentPosition.lat.toFixed(4)}°N {currentPosition.lng.toFixed(4)}°E
            </span>
          )}
        </div>

        {currentPosition ? (
          <>
            <div
              style={{
                height: "250px",
                width: "100%",
                position: "relative",
              }}
            >
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://maps.google.com/maps?q=${currentPosition.lat},${currentPosition.lng}&z=15&output=embed`}
                allowFullScreen
                title="Your Location"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  backgroundColor: "white",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
              >
                <a
                  href={`https://maps.google.com/maps?q=${currentPosition.lat},${currentPosition.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#4285F4", textDecoration: "none" }}
                >
                  View larger map
                </a>
              </div>
            </div>

            <div style={{ padding: "16px" }}>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #e0e0e0",
                  marginBottom: "16px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <button
                  onClick={() => markAttendance("IN")}
                  style={{
                    flex: 1,
                    backgroundColor: "#34a853",
                    border: "none",
                    padding: "12px",
                    borderRadius: "4px",
                    color: "#fff",
                    fontWeight: "500",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  Mark IN
                </button>
                <button
                  onClick={() => markAttendance("OUT")}
                  style={{
                    flex: 1,
                    backgroundColor: "#ea4335",
                    border: "none",
                    padding: "12px",
                    borderRadius: "4px",
                    color: "#fff",
                    fontWeight: "500",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  Mark OUT
                </button>
              </div>
            </div>
          </>
        ) : (
          <div style={{ padding: "20px", textAlign: "center" }}>
            <p>Loading your location...</p>
          </div>
        )}

        {attendanceStatus && (
          <div
            style={{
              padding: "12px 16px",
              backgroundColor: showError ? "#fce8e6" : "#e6f4ea",
              color: showError ? "#d93025" : "#34a853",
              fontSize: "14px",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            {attendanceStatus}
          </div>
        )}

        <div
          style={{
            padding: "8px 16px",
            backgroundColor: "#f5f5f5",
            fontSize: "12px",
            color: "#666",
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <span>Map data ©2025</span>
          <div>
            <a href="#" style={{ color: "#666", marginRight: "12px" }}>
              Terms
            </a>
            <a href="#" style={{ color: "#666" }}>
              Report a map error
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;