import Stage from "./components/Stage";
import StartPage from "./components/StartPage";
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import './style.css';

const App = () => {
  return (  <><header>
        <div className="header-text">Datluj</div>
      </header>
    <div className="container">
    
      <main>
        <Outlet />
      </main>
    </div>
    <footer>
        <p> © Tereza Ettlerová</p>
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
