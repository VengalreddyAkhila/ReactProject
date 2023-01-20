import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WidgetDetail from "./pages/WidgetDetails";
import WidgetsList from "./pages/WidgetList";
import ComponentsList from './pages/ComponentsList'
import Error from "./pages/error";
import WidgetEditPage from "./pages/editWidget";

const Apps = () => {
  return (
    <Router>
      <Routes>
       <Route  path="/" element={<WidgetsList/>} />
       <Route path="/widgets/:id" element={<WidgetDetail />} />
      <Route path="/widgets/create" element={<WidgetEditPage/>} />
      <Route path="/widgets/edit" element={<WidgetEditPage/>} />
      <Route path="/components" element={<ComponentsList/>} />
      <Route path="/error" element={<Error/>} />
      </Routes>
    </Router>

   
   
  );
};

export default Apps;
