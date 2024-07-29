import { PersonField } from './typings';
export const MONTHS = [  
  "All months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",  
];

export const PERSON_HEADER_LABELS : Partial<Record<PersonField, string>> = {
  [PersonField.FIRST_NAME]: "First Name",
  [PersonField.LAST_NAME]: "Last Name",
  [PersonField.LOCATION]: "Location",
  [PersonField.BIRTHDAY]: "Birthday",
  [PersonField.AGE_YEARS]: "Age",
  [PersonField.AGE_DAYS]: "Age in Days",
  [PersonField.AGE_HOURS]: "Age in Hours",
}
