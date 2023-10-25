import "./ClickFerry.css";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Spinner from "../../Assets/Spinner/Spinner";
const ClickFerry = () => {
  const [date, setDate] = useState(new Date("2023-11-01"));
  const [nextMonth, setNextMonth] = useState(
    new Date(date.getFullYear(), date.getMonth() + 1, 1)
  );
  const [savedData, setSavedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDaysNov, setSelectedDaysNov] = useState([]);
  const [selectedDaysDec, setSelectedDaysDec] = useState([]);
  const [error, setError] = useState(false);

  // Obtener los datos de la API

  const handleFetch = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/departures");
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("all_data", JSON.stringify(data.data));
        setSavedData(localStorage.getItem("all_data"));
        setIsLoading(false);
      } else {
        throw new Error("Error to fetch data");
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setNextMonth(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 1));
  };

  // Obtener los días con disponibilidad de noviembre

  const handleSelectedNov = (date) => {
    const month = date.getMonth() + 1;
    const selectedDays = Object.values(savedData);
    const joinedString = selectedDays.join("");
    const dataArray = JSON.parse("[" + joinedString + "]");
    const arrayDates = Object.keys(dataArray[0]);
    const filteredDates = arrayDates.filter((item) => {
      const date = item.split("-")[1];
      return date === month.toString();
    });
    const filteredDays = filteredDates.map((item) => {
      const day = item.split("-")[2];
      return day;
    });
    setSelectedDaysNov(filteredDays.map(Number));
  };

  // Obtener los días con disponibilidad de diciembre

  const handleSelectedDec = (date) => {
    const month = date.getMonth() + 2;
    const selectedDays = Object.values(savedData);
    const joinedString = selectedDays.join("");
    const dataArray = JSON.parse("[" + joinedString + "]");
    const arrayDates = Object.keys(dataArray[0]);
    const filteredDates = arrayDates.filter((item) => {
      const date = item.split("-")[1];
      return date === month.toString();
    });
    const filteredDays = filteredDates.map((item) => {
      const day = item.split("-")[2];
      return day;
    });
    setSelectedDaysDec(filteredDays.map(Number));
  };

  // Realizar get cada vez que inicia la página

  useEffect(() => {
    handleFetch();
  }, []);

  // Establecer datos una vez cargados

  useEffect(() => {
    if (!isLoading) {
      handleSelectedNov(date);
      handleSelectedDec(date);
    }
  }, [!isLoading]);

  return (
    <div className="MainClickFerry">
      <div className="Header">
        <h1>ClickFerry</h1>
      </div>
      {isLoading ? (
        <>
          <span className="loading">Loading...</span>
          <Spinner />
        </>
      ) : (
        <div className="Body">
          <div className="calendar1">
            <Calendar
              tileClassName={({ date }) =>
                selectedDaysNov.includes(date.getDate())
                  ? "custom-tile"
                  : "no-tile"
              }
              onChange={handleDateChange}
              value={date}
            />
          </div>
          <div>
            <Calendar
              tileClassName={({ date }) =>
                selectedDaysDec.includes(date.getDate())
                  ? "custom-tile"
                  : "no-tile"
              }
              onChange={setDate}
              value={nextMonth}
            />
          </div>
        </div>
      )}
      {error && <span className="error">Error to fetch data</span>}
    </div>
  );
};

export default ClickFerry;
