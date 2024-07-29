import { MONTHS } from "app-constants";
import { useState } from "react";
import "style/atoms/MonthFilter.css";

interface MonthFilterProps {
  startMonth?: number;
  onChange: (month: number) => void;
}

export const MonthFilter = ({
  startMonth = MONTHS.length - 1,
  onChange,
}: MonthFilterProps) => {
  const [month, setMonth] = useState(startMonth);

  return (
    <div className="month-filter">
      <label htmlFor="month-filter">Filter by Month:</label>
      <select
        id="month-filter"
        value={month}
        onChange={(e) => setMonth(Number.parseInt(e.target.value))}
      >
        {MONTHS.map((label, index) => (
          <option key={index} value={index}>
            {label}
          </option>
        ))}
      </select>
      <button onClick={() => onChange(month)}>Apply</button>
    </div>
  );
};
