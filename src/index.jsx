import Stage from "./components/Stage";
import StartPage from "./components/StartPage";
import React, { useState } from 'react';
import Starter from "./components/Starter"
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import './style.css';
import Result from "./components/Results";
import { projectFirestore } from "./firebase/config";
import background from "../public/pictures/background.png"


const App = () => {
  return (  <><header>
        <div className="header-text"></div>
      </header>
    <div className="container">
    
      <main>
        <Outlet />
      </main>
    </div>
      <footer>
        <p className="footer-text">© Tereza Ettlerová</p>
      </footer></>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h3>Upss.....404 - MUCK</h3>,
    children: [
      {
        path: "/",
        element: <StartPage />,
      },
      {
        path: "/stage",
        element: <Stage />,
      },
      {
        path: "/starter",
        element: <Starter />,
      },
      {
        path: "/result",
        element: <Result/>,
      },
    ],
  },
]);

createRoot(document.querySelector("#app")).render(
  <RouterProvider router={router} />)


/*import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Stage from './components/Stage';
import './style.css';
import Countdown from 'react-countdown';

const App = () => {
  return (
    <div className="container">
      <h1>Datlování</h1>
      <Stage />
    </div>
  );
};

createRoot(
  document.querySelector('#app'),
).render(<App />);*/
