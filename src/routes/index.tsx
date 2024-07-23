import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Admin from "../pages/Admin";
import Fornecedores from "../pages/Admin/fornecedores";
import AdicionarFornecedores from "../pages/Admin/fornecedores/create";
import Produtos from "../pages/Admin/produtos";
import AdicionarProdutos from "../pages/Admin/produtos/create";
import ProductsByProvider from "../pages/ProductsByProvider";
import ByProduct from "../pages/ByProduct";
import { AuthProvider, useAuth } from "../context/AuthContext";
import EditarFornecedor from "../pages/Admin/fornecedores/edit";
import EditarProduto from "../pages/Admin/produtos/edit";
import NotFound from "../pages/NotFound";

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Main />} />

          <Route
            path="/fornecedor/:providerId"
            element={<ProductsByProvider />}
          />

          <Route
            path="/fornecedor/:providerId/:productId"
            element={<ByProduct />}
          />

          {/* Private Routes */}
          <Route
            path="/admin"
            element={<PrivateRoute element={<Admin />}></PrivateRoute>}
          />
          <Route
            path="/admin/fornecedores"
            element={<PrivateRoute element={<Fornecedores />}></PrivateRoute>}
          />
          <Route
            path="/admin/fornecedores/adicionar"
            element={
              <PrivateRoute element={<AdicionarFornecedores />}></PrivateRoute>
            }
          />
          <Route
            path="/admin/fornecedores/editar/:providerId"
            element={
              <PrivateRoute element={<EditarFornecedor />}></PrivateRoute>
            }
          />

          <Route
            path="/admin/produtos"
            element={<PrivateRoute element={<Produtos />}></PrivateRoute>}
          />
          <Route
            path="/admin/produtos/adicionar"
            element={
              <PrivateRoute element={<AdicionarProdutos />}></PrivateRoute>
            }
          />
          <Route
            path="/admin/produtos/editar/:productId"
            element={<PrivateRoute element={<EditarProduto />}></PrivateRoute>}
          />

          {/* NotFound */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
