import "./ClickFerry.css";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ClickFerry = () => {
  const [date, setDate] = useState(new Date());
  const [savedData, setSavedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleFetch = async () => {
    try {
      const response = await fetch("http://localhost:8000/departures");
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        console.log("Success");
        setSavedData(data);
        setIsLoading(false);
      } else {
        console.log("Error to fetch data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
    console.log("useEffect");
  }, []);

  useEffect(() => {}, [savedData]);
  return (
    <div className="MainClickFerry">
      <div className="Header">
        <h1> - ClickFerry - </h1>
      </div>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <div className="Body">
          <Calendar onChange={setDate} value={date} />
          <Calendar onChange={setDate} value={date} />
        </div>
      )}
    </div>
  );
};

export default ClickFerry;
