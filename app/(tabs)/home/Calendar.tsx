import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Calendar = ({ onSelectDate }:any) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const today = new Date();
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  const daysInMonth = (month:any, year:any) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = daysInMonth(currentMonth, currentYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.emptyDay}></View>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === today.toDateString();
      const isDisabled = date < today;

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayButton,
            isToday && styles.todayButton,
            isDisabled && styles.disabledButton,
          ]}
          onPress={() => {
            setSelectedDate(date);
            onSelectDate(date);
          }}
          disabled={isDisabled}
        >
          <Text style={[styles.dayText, isToday && styles.todayText]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  const goToPreviousMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth + 1, 1));
  };

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {selectedDate.toLocaleString("default", { month: "long" })}{" "}
          {selectedDate.getFullYear()}
        </Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.daysContainer}>
        <View style={styles.daysHeader}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <Text key={index} style={styles.dayHeaderText}>
                {day}
              </Text>
            )
          )}
        </View>
        <View style={styles.days}>{generateDays()}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: "#fff8e6",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginHorizontal:16
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  monthText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  daysContainer: {},
  daysHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  dayHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    width: 32,
  },
  days: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  dayButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
  },
  emptyDay: {
    width: 32,
    height: 32,
    marginVertical: 4,
  },
  todayButton: {
    backgroundColor: "#FF725E",
  },
  todayText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.5,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "semibold",
  },
});

export default Calendar;
