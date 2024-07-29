import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "style/atoms/HourglassIcon.css";

export const HourglassIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="hourglass-icon" onClick={onClick}>
      <FontAwesomeIcon icon="hourglass-half" />
    </div>
  );
};
