import "assets/icons/FaInit";
import "style/utility/theme.css";
import "style/components/App.css";
import "style/reset.css";
import "style/theme.css";

import { CsvDataProvider } from "./contexts/CsvDataContext";
import { SassyRootContainer } from "./components/SassyRootContainer";

function App() {
  return (
    <CsvDataProvider>
      <SassyRootContainer />
    </CsvDataProvider>
  );
}

export default App;
