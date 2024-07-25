import { useEffect, useState } from "react";
import { useCsvData } from "../contexts/CsvDataContext";
import { CsvFileLoader } from "./CsvFileLoader";
import { PeopleTable } from "./PeopleTable/PeopleTableContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

import "style/components/SassyRootContainer.css";
import "style/base.css";

export const SassyRootContainer = () => {
  const { people } = useCsvData();
  const [theme, setTheme] = useState("theme-light");

  const [themeDark, setThemeDark] = useState(false);

  useEffect(() => {
    if (themeDark) {
      setTheme("theme-dark");
    } else {
      setTheme("theme-light");
    }
  }, [themeDark]);

  return (
    <div className={classNames("app", { [`${theme}`]: true })}>
      <div
        className="theme-button"
        onClick={() => setThemeDark((_prev) => !_prev)}
      >
        <FontAwesomeIcon icon="palette" />
      </div>
      {people.length === 0 ? <CsvFileLoader /> : <PeopleTable />}
    </div>
  );
};
