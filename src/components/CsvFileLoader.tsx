import { useEffect, useState } from "react";
import { useCsvData } from "contexts/CsvDataContext";
import "style/components/CsvFileLoader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { textFileLineIterator } from "utils/csvUtils";

const CsvFileLoader = () => {
  const { setCsvData } = useCsvData();

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      setFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const readFile = async (file: File) => {
      const reader = await file.stream().getReader();
      const lines: string[] = [];
      for await (let line of textFileLineIterator(reader)) {
        lines.push(line);
      }
      setCsvData(lines);
    };

    if (file) {
      readFile(file);
    }
  }, [file, setCsvData]);

  return (
    <div
      className="csv-data-loader"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input type="file" onChange={handleFileChange} />
      <div className="file-drop">
        <FontAwesomeIcon icon="file-upload" />
        <p>or drop a file</p>
      </div>
    </div>
  );
};

export { CsvFileLoader };
