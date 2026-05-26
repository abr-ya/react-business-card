import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BusinessCardPage, CityPage, HomePage, PeakHoursPage } from "./pages";
import { Layout } from "./components/";
import { ThemeProvider } from "./providers/theme-provider";

const App = () => (
  <BrowserRouter>
    <ThemeProvider defaultTheme="dark">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/business-card" element={<BusinessCardPage />} />
          <Route path="/city/:cityName" element={<CityPage />} />
          <Route path="/peak-hours" element={<PeakHoursPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
