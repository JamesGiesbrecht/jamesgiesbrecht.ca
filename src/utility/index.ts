// Expects a date string in the format YYYY-MM-DD
export const getDateFromString = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-')
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  return date
}
