import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CityPage, HomePage } from "./pages";
import { Layout } from "./components/";
import { ThemeProvider } from "./providers/theme-provider";

const App = () => (
  <BrowserRouter>
    <ThemeProvider defaultTheme="dark">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/city/:cityName" element={<CityPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
