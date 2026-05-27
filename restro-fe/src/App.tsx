import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Home, Auth, Orders, Tables, Menu } from "./pages";
import Header from "./components/shared/Header";

function Layout() {
  // const isLoading = useLoadData();
  const location = useLocation();
  const hideHeaderRoutes = ["/auth"];
  // const { isAuth } = useSelector(state => state.user);

  // if(isLoading) return <FullScreenLoader />

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            // <ProtectedRoutes>
            <Home />
            // </ProtectedRoutes>
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/orders"
          element={
            // <ProtectedRoutes>
            <Orders />
            // </ProtectedRoutes>
          }
        />
        <Route
          path="/tables"
          element={
            // <ProtectedRoutes>
            <Tables />
            // </ProtectedRoutes>
          }
        />
        <Route
          path="/menu"
          element={
            // <ProtectedRoutes>
            <Menu />
            // </ProtectedRoutes>
          }
        />
        {/* <Route
          path="/dashboard"
          element={
            // <ProtectedRoutes>
              <Dashboard />
            // </ProtectedRoutes>
          }
        /> */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
