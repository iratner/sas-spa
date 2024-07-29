export const calculateAge = (birthDate: Date, type: 'year' | 'day' | 'hour' = 'year'): [number, number, number] => {
  let today = new Date();
      let yearDiff = today.getFullYear() - birthDate.getFullYear();
      let monthDiff = today.getMonth() - birthDate.getMonth();
      let dayDiff = today.getDate() - birthDate.getDate();
      
      if (monthDiff < 0)
        yearDiff -= 1

      if (monthDiff === 0 && dayDiff < 0)
        yearDiff -= 1

      const msDiff = today.getTime() - birthDate.getTime();
      const hoursAge = msDiff / 1000 / 3600;
      const daysAge = hoursAge / 24;

      return [yearDiff, daysAge, hoursAge];
}