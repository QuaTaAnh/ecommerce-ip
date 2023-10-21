import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import MainLayout from "./layouts/MainLayout";
import { Fragment } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="dark:bg-bgDark dark:text-white text-black h-screen transition duration-300 ease-in-out">
          <ToastContainer />
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
    </Provider>
  );
};

export default App;
