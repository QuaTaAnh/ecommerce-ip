import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import { Fragment } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import MainLayout from "./layouts/MainLayout/MainLayout";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout: any = MainLayout;
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
                  <Layout title={route.title}>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
