import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PersonField } from "typings";
import { csvLineArrayParser, parseBirthday } from "utils/csvUtils";
import { calculateAge } from "utils/dateUtils";

interface ICsvData {
  people: string[][];
  setCsvData: (data: string[]) => void;
}

export const CsvDataContext = createContext<ICsvData | null>(null);

interface CsvDataProviderProps {
  children: React.ReactNode;
}

export const CsvDataProvider = ({ children }: CsvDataProviderProps) => {
  const [csvData, setCsvData] = useState<string[]>([]);

  const people = useMemo(() => {
    const processed = csvLineArrayParser(csvData);
    // remove header
    processed.shift();
    processed.forEach((person) => {
      // generate consistent birthday format and calculate age
      const [birthday, birthDate] = parseBirthday(person);
      person.splice(PersonField.BIRTHDAY, 1, birthday);

      const [ageYears, ageDays, ageHours] = calculateAge(birthDate);
      person[PersonField.AGE_YEARS] = ageYears.toString();
      person[PersonField.AGE_DAYS] = ageDays.toString();
      person[PersonField.AGE_HOURS] = ageHours.toString();
    });
    return processed;
  }, [csvData]);

  return (
    <CsvDataContext.Provider value={{ people, setCsvData }}>
      {children}
    </CsvDataContext.Provider>
  );
};

export const useCsvData = () => {
  const context = useContext(CsvDataContext);
  if (!context) {
    throw new Error("useCsvData must be used within a CsvDataProvider");
  }
  return context;
};
