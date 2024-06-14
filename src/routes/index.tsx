import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Admin from "../pages/Admin";
import Fornecedores from "../pages/Admin/fornecedores";
import AdicionarFornecedores from "../pages/Admin/fornecedores/create";
import Produtos from "../pages/Admin/produtos";
import AdicionarProdutos from "../pages/Admin/produtos/create";
import ProductsByProvider from "../pages/ProductsByProvider";
import ByProduct from "../pages/ByProduct";

export default function AppRouter() {
  return (
    <Router>
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
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/fornecedores" element={<Fornecedores />} />
        <Route
          path="/admin/fornecedores/adicionar"
          element={<AdicionarFornecedores />}
        />
        <Route path="/admin/produtos" element={<Produtos />} />
        <Route
          path="/admin/produtos/adicionar"
          element={<AdicionarProdutos />}
        />
      </Routes>
    </Router>
  );
}
