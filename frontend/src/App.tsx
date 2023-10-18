import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import MainLayout from "./layouts/MainLayout";
import { Fragment } from "react";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="dark:bg-bgDark dark:text-white text-black h-full transition duration-300 ease-in-out">
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = MainLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
