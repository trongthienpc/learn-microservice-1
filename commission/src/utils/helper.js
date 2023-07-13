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
