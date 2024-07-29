import { useCallback, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PersonRow } from "./PersonRow";
import { useCsvData } from "contexts/CsvDataContext";
import { MonthFilter } from "atoms/MonthFilter";
import { PersonAgeType, PersonField } from "typings";
import { PERSON_HEADER_LABELS } from "app-constants";
import { HourglassIcon } from "atoms/HourglassIcon";

import "style/components/PeopleTableContainer.css";

const PeopleDataContainer = () => {
  const { people } = useCsvData();
  const [ageType, setAgeType] = useState<PersonAgeType>(PersonField.AGE_YEARS);
  const [filter, setFilter] = useState(new Date().getMonth() + 1);
  const [sortField, setSortField] = useState<PersonField>(
    PersonField.FIRST_NAME,
  );
  const [sortDirectionModifier, setSortDirectionModifier] = useState<1 | -1>(1);

  const filteredAndSortedPeople = useMemo(() => {
    let filteredPeople = [...people];
    if (filter !== 0) {
      filteredPeople = people.filter((person) => {
        const birthMonth =
          new Date(person[PersonField.BIRTHDAY]).getMonth() + 1;
        return birthMonth === filter;
      });
    }
    return filteredPeople.sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return -1 * sortDirectionModifier;
      }
      if (a[sortField] > b[sortField]) {
        return 1 * sortDirectionModifier;
      }
      return 0;
    });
  }, [filter, people, sortField, sortDirectionModifier]);

  const tableHeaders = useMemo(() => {
    return Object.entries(PERSON_HEADER_LABELS).filter(([key, _]) => {
      const keyAsPersonField = Number.parseInt(key);
      if (
        [
          PersonField.AGE_DAYS,
          PersonField.AGE_HOURS,
          PersonField.AGE_YEARS,
        ].includes(keyAsPersonField)
      ) {
        return keyAsPersonField === ageType;
      }
      return true;
    });
  }, [ageType]);

  const onUpdateAgeType = useCallback(() => {
    const newAgeType =
      ageType === PersonField.AGE_YEARS
        ? PersonField.AGE_DAYS
        : ageType === PersonField.AGE_DAYS
          ? PersonField.AGE_HOURS
          : PersonField.AGE_YEARS;
    setAgeType(newAgeType);
  }, [ageType]);

  const onSort = useCallback(
    (field: PersonField) => {
      if (field === sortField) {
        const newSortDirectionModifier = sortDirectionModifier === 1 ? -1 : 1;
        setSortDirectionModifier(newSortDirectionModifier);
        return;
      }
      setSortDirectionModifier(1);
      setSortField(field);
    },
    [sortDirectionModifier, sortField],
  );

  return (
    <div className="people-table-container">
      <header className="people-data-header">
        <h2>Employee Information</h2>
        <div className="people-data-header-right">
          <MonthFilter onChange={setFilter} startMonth={filter} />
          <HourglassIcon onClick={() => onUpdateAgeType()} />
        </div>
      </header>

      <div className="people-table-header">
        {tableHeaders.map(([key, value]) => (
          <span
            key={key}
            className="people-table-row-item"
            onClick={() => onSort(key as unknown as PersonField)}
          >
            {value}
            <FontAwesomeIcon icon="sort" className="sort-icon" />
          </span>
        ))}
      </div>
      <div className="people-table">
        {filteredAndSortedPeople.map((row, index) => (
          <PersonRow key={index} personRow={row} ageType={ageType} />
        ))}
      </div>
    </div>
  );
};

export { PeopleDataContainer as PeopleTable };
