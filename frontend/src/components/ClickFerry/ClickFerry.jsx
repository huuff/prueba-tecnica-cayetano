import "./ClickFerry.css";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const ClickFerry = () => {
  const [date, setDate] = useState(new Date());
  const [nextMonth, setNextMonth] = useState(
    new Date(date.getFullYear(), date.getMonth() + 1, 1)
  );
  const [savedData, setSavedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDaysTrue, setSelectedDaysTrue] = useState([]);
  const [selectedDaysTrue2, setSelectedDaysTrue2] = useState([]);

  const handleFetch = async () => {
    try {
      const response = await fetch("http://localhost:8000/departures");
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("all_data", JSON.stringify(data.data));
        setSavedData(localStorage.getItem("all_data"));
        setIsLoading(false);
      } else {
        console.log("Error to fetch data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setNextMonth(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 1));
  };

  const handleSelectedDays = (date) => {
    const month = date.getMonth() + 1;
    const selectedDays = Object.values(savedData);
    const joinedString = selectedDays.join("");
    const dataArray = JSON.parse("[" + joinedString + "]");
    const arrayDates = Object.keys(dataArray[0]);
    // console.log(arrayDates);
    const filteredDates = arrayDates.filter((item) => {
      const date = item.split("-")[1];
      return date === month.toString();
    });
    // console.log(filteredDates);
    const filteredDays = filteredDates.map((item) => {
      const day = item.split("-")[2];
      return day;
    });
    setSelectedDaysTrue(filteredDays.map(Number));
  };
  const handleSelectedDays2 = (date) => {
    const month = date.getMonth() + 2;
    const selectedDays = Object.values(savedData);
    const joinedString = selectedDays.join("");
    const dataArray = JSON.parse("[" + joinedString + "]");
    const arrayDates = Object.keys(dataArray[0]);
    // console.log(arrayDates);
    const filteredDates = arrayDates.filter((item) => {
      const date = item.split("-")[1];
      return date === month.toString();
    });
    // console.log(filteredDates);
    const filteredDays = filteredDates.map((item) => {
      const day = item.split("-")[2];
      return day;
    });
    setSelectedDaysTrue2(filteredDays.map(Number));
  };

  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      handleSelectedDays(date);
      handleSelectedDays2(date);
    }
  }, [!isLoading]);

  useEffect(() => {
    console.log(selectedDaysTrue);
    console.log(selectedDaysTrue.includes(date.getDate()));
    // console.log(selectedDaysTrue.map(Number));
  }, [selectedDaysTrue]);

  return (
    <div className="MainClickFerry">
      <div className="Header">
        <h1>ClickFerry</h1>
      </div>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <div className="Body">
          <div className="calendar1">
            <Calendar
              tileClassName={({ date }) =>
                selectedDaysTrue.includes(date.getDate())
                  ? "custom-tile"
                  : "no-tile"
              }
              onChange={handleDateChange}
              value={date}
            />
          </div>
          <Calendar
            tileClassName={({ date }) =>
              selectedDaysTrue2.includes(date.getDate())
                ? "custom-tile"
                : "no-tile"
            }
            onChange={setDate}
            value={nextMonth}
          />
        </div>
      )}
    </div>
  );
};

export default ClickFerry;
