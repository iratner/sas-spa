export type PersonType = [string, string, string, string, string, Date];

export enum PersonField {
    FIRST_NAME,
    LAST_NAME,    
    LOCATION,
    BIRTHDAY,
    AGE_YEARS,
    AGE_DAYS,
    AGE_HOURS
}

export type PersonAgeType = PersonField.AGE_YEARS | PersonField.AGE_DAYS | PersonField.AGE_HOURS;