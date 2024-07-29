export type PersonType = [string, string, string, string, string, Date];

/**
 * The fields/indexes of a person row string array
 */
export enum PersonField {
    FIRST_NAME,
    LAST_NAME,    
    LOCATION,
    BIRTHDAY,
    AGE_YEARS,
    AGE_DAYS,
    AGE_HOURS
}

/**
 * The types of age that can be displayed
 */
export type PersonAgeType = PersonField.AGE_YEARS | PersonField.AGE_DAYS | PersonField.AGE_HOURS;