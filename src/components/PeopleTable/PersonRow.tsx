import { PersonAgeType, PersonField } from "typings";
import "style/components/PersonRow.css";

export const PersonRow = ({
  personRow,
  ageType,
}: {
  personRow: string[];
  ageType: PersonAgeType;
}) => {
  let age = Number.parseInt(personRow[ageType]);

  return (
    <div className="people-table-row">
      <span className="people-table-row-item">
        {personRow[PersonField.FIRST_NAME]}
      </span>
      <span className="people-table-row-item">
        {personRow[PersonField.LAST_NAME]}
      </span>
      <span className="people-table-row-item">
        {personRow[PersonField.LOCATION]}
      </span>
      <span className="people-table-row-item">
        {personRow[PersonField.BIRTHDAY]}
      </span>
      <span className="people-table-row-item">{age}</span>
    </div>
  );
};
