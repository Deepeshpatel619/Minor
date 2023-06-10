import React, { useContext, useEffect, useState } from "react";
import "./PerformanceAnalysis.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import setUserDetailsContext from "../../Context/setUserDetailsContext";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PerformanceAnalysis() {
  const [mathematicsData, setMathematicsData] = useState({
    score: [],
    labels: [],
  });
  const [cppData, setCppData] = useState({ score: [], labels: [] });
  const [osData, setOsData] = useState({ score: [], labels: [] });
  const [loading, setLoading] = useState(true);
  const { userDetails } = useContext(setUserDetailsContext);

  useEffect(() => {
    fetch(`/performance/${userDetails.id}`)
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        const cppdata = [];
        const osdata = [];
        const mathematicsdata = [];
        const cpplabel = [];
        const oslabel = [];
        const mathematicslabel = [];
        json.Scores.forEach((e) => {
          switch (e.subject) {
            case "C++ Programming":
              cppdata.push(e.marks);
              cpplabel.push(new Date(e.AttemptDate).toDateString());
              break;

            case "Mathematics":
              mathematicsdata.push(e.marks);
              mathematicslabel.push(new Date(e.AttemptDate).toDateString());
              break;
            case "Operating System":
              osdata.push(e.marks);
              oslabel.push(new Date(e.AttemptDate).toDateString());
              break;
            default:
              break;
          }
        });
        setCppData({ score: cppdata, labels: cpplabel });
        setMathematicsData({
          score: mathematicsdata,
          labels: mathematicslabel,
        });
        setOsData({ score: osdata, labels: oslabel });
        setLoading(false);
      });
  }, []);

  const data = function (label, score) {
    return {
      labels: label,
      datasets: [
        {
          label: "Quiz Score",
          data: score,
          fill: false,
          borderColor: "#3e95cd",
          tension: 0.1,
        },
      ],
    };
  };
  const options = function (subjectName) {
    return {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Performance Analysis",
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: subjectName + " Analysis",
          },
        },
        y: {
          title: {
            display: true,
            text: "Score",
          },
        },
      },
    };
  };

  return (
    <div className="d-flex flex-column flex-lg-row justify-content-around align-items-center m-3">
      
            <div className="performance-analysis-container m-2">
              <Line
                data={data(osData.labels, osData.score)}
                options={options("Operating System")}
              />
              </div>
       
            <div className="performance-analysis-container m-2">
              <Line
                data={data(cppData.labels, cppData.score)}
                options={options("C++")}
              />
            </div>
            
          <div className="performance-analysis-container m-2">
            <Line
              data={data(mathematicsData.labels, mathematicsData.score)}
              options={options("Mathematics")}
            />
          </div>
        </div>
        
  );
}

export default PerformanceAnalysis;
