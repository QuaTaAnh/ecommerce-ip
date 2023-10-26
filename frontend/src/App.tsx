import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import { Fragment } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import MainLayout from "./layouts/MainLayout/MainLayout";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer pauseOnHover={false} autoClose={2000} />
        <Routes>
          {publicRoutes.map((route, index) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                  <Layout>
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
