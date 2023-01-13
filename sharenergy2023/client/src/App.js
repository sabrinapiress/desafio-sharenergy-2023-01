import React from 'react';
import './index.css'
import { RouterProvider, } from "react-router-dom"
import { GlobalState } from "./global/GlobalState";

import { router } from './Router/Router';

function App() {
  return (
    <div className="App">
      <GlobalState>
        <RouterProvider router={router} />
      </GlobalState>
    </div>
  );
}

export default App;
