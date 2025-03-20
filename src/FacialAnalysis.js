import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { useLocation } from "react-router-dom";

const FacialAnalysis = () => {
  const navigate = useNavigate();
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const location = useLocation();
  const { analysis_data } = location.state;

  console.log(analysis_data);
  
  // Emotion probabilities (sample data)
  // const emotionData = [
  //   {
  //     name: "Angry",
  //     value: 0.0832,
  //     description: "Displays signs of frustration or irritation",
  //   },
  //   {
  //     name: "Disgust",
  //     value: 0.0002,
  //     description: "Shows aversion or revulsion",
  //   },
  //   { name: "Fear", value: 0.0271, description: "Exhibits concern or anxiety" },
  //   {
  //     name: "Happy",
  //     value: 0.235,
  //     description: "Demonstrates joy or contentment",
  //   },
  //   {
  //     name: "Neutral",
  //     value: 0.3945,
  //     description: "Shows no particular emotional state",
  //   },
  //   {
  //     name: "Sad",
  //     value: 0.2591,
  //     description: "Displays melancholy or unhappiness",
  //   },
  //   {
  //     name: "Surprise",
  //     value: 0.0009,
  //     description: "Exhibits astonishment or shock",
  //   },
  // ];

  const emotionData = analysis_data;

  // Define colors for pie chart with better accessibility
  const COLORS = [
    "#FF5733", // Angry - Red
    "#9C27B0", // Disgust - Purple
    "#900C3F", // Fear - Dark Red
    "#FFC300", // Happy - Yellow
    "#36A2EB", // Neutral - Blue
    "#4CAF50", // Sad - Green
    "#8E44AD", // Surprise - Violet
  ];

  // Find the dominant emotion
  const dominantEmotion = [...emotionData].sort((a, b) => b.value - a.value)[0];

  // Custom label for pie chart
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Only show labels for emotions with more than 5% representation
    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontWeight="bold"
      >
        {name}
      </text>
    ) : null;
  };

  // Custom tooltip for improved visibility
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>{data.name}</p>
          <p style={{ margin: "5px 0 0" }}>{(data.value * 100).toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "32px 24px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            backgroundColor: "transparent",
            color: "#3498db",
            border: "1px solid #3498db",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#f0f9ff";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "transparent";
          }}
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "600",
            margin: 0,
            color: "#2c3e50",
          }}
        >
          Facial Emotion Analysis
        </h1>
        <div style={{ width: "85px" }}></div> {/* Spacer for alignment */}
      </header>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #e9ecef",
          }}
        >
          <Info size={20} color="#3498db" />
          <div>
            <p style={{ margin: 0, fontWeight: "500", color: "#2c3e50" }}>
              Dominant Emotion:{" "}
              <span
                style={{
                  fontWeight: "600",
                  color:
                    COLORS[
                      emotionData.findIndex(
                        (e) => e.name === dominantEmotion.name
                      )
                    ],
                }}
              >
                {dominantEmotion.name}
              </span>{" "}
              ({(dominantEmotion.value * 100).toFixed(1)}%)
            </p>
            <p
              style={{ margin: "4px 0 0", fontSize: "14px", color: "#5d6d7e" }}
            >
              {dominantEmotion.description}
            </p>
          </div>
        </div>

        <div style={{ height: "400px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={emotionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                onClick={(data) => setSelectedEmotion(data)}
              >
                {emotionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value, entry) => (
                  <span style={{ color: "#2c3e50", fontSize: "14px" }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #e9ecef",
          }}
        >
          <h3
            style={{ margin: "0 0 12px", fontSize: "18px", color: "#2c3e50" }}
          >
            Emotion Breakdown
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            {emotionData.map((emotion, index) => (
              <div
                key={emotion.name}
                style={{
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: `${COLORS[index]}15`,
                  border: `1px solid ${COLORS[index]}30`,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onClick={() => setSelectedEmotion(emotion)}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = `${COLORS[index]}25`;
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = `${COLORS[index]}15`;
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontWeight: "500", color: "#2c3e50" }}>
                    {emotion.name}
                  </span>
                  <span
                    style={{
                      fontWeight: "600",
                      color: COLORS[index],
                    }}
                  >
                    {(emotion.value * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedEmotion && (
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <h3
            style={{ margin: "0 0 12px", fontSize: "18px", color: "#2c3e50" }}
          >
            {selectedEmotion.name} Details
          </h3>
          <p style={{ margin: 0, color: "#5d6d7e" }}>
            {selectedEmotion.description}
          </p>
          <div
            style={{
              marginTop: "12px",
              height: "24px",
              backgroundColor: "#f1f3f5",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${selectedEmotion.value * 100}%`,
                backgroundColor:
                  COLORS[
                    emotionData.findIndex(
                      (e) => e.name === selectedEmotion.name
                    )
                  ],
                borderRadius: "12px",
              }}
            ></div>
          </div>
          <p
            style={{
              textAlign: "right",
              margin: "4px 0 0",
              fontSize: "14px",
              color: "#5d6d7e",
            }}
          >
            Confidence: {(selectedEmotion.value * 100).toFixed(1)}%
          </p>
        </div>
      )}
    </div>
  );
};

export default FacialAnalysis;
