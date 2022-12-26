import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AllShoppingListsView } from "./views/AllShoppingListsView";
import { HomeView } from "./views/HomeView";
import { NotFoundView } from "./views/NotFoundView";
import { ShoppingListView } from "./views/ShoppingListView";

export const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/shopping-lists">
          <Route index element={<AllShoppingListsView />} />
          <Route path=":id" element={<ShoppingListView />} />
        </Route>
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
};