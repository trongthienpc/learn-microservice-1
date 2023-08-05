export const firstDateOfMonth = (date = null) => {
  // Get the current date
  const currentDate = date ? new Date(date) : new Date();

  // Set the date to the first day of the month
  currentDate.setDate(1);

  // Format the date as desired (e.g., yyyy-mm-dd)
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // Output the first date of the current month
  console.log(formattedDate);
};

export const getFirstDateOfMonth = (date) => {
  // Create a new Date object using the provided date input
  const currentDate = date ? new Date(date) : new Date();

  // Set the date to the first day of the month
  currentDate.setDate(1);

  // Return the first date of the month
  return currentDate;
};

export const getLastDateOfMonth = (date) => {
  // Create a new Date object using the provided date input
  const currentDate = date ? new Date(date) : new Date();

  // Get the month and year of the current date
  const month = currentDate.getMonth();

  // Set the date to the next month's first day
  currentDate.setMonth(month + 1, 1);

  // Subtract one day to get the last day of the current month
  currentDate.setDate(currentDate.getDate() - 1);

  // Return the last date of the month
  return currentDate;
};

// get current date with ISO8601 format
export const getTodayISODate = () => {
  return new Date().toISOString().split("T")[0];
};
