import { FaBars } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import CategoriaModel from "../../interface/models/CategoriaModel";
import { formatNameForURL } from "../../utils/formatNameForURL";

export default function Header() {
  const { token } = useAuth();

  const [menuResponsive, setMenuResponsive] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const [categories, setCategories] = useState<CategoriaModel[]>([]);

  const processedCategories = categories.map((category) => {
    const categoryNameURL = formatNameForURL(category.nome);

    return {
      ...category,
      categoryNameURL,
    };
  });

  const handleClick = () => {
    setMenuResponsive((state) => !state);
  };

  const handleOpenDropdown = () => {
    setOpenDropdown((state) => !state);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://mrferreira-api.vercel.app/api/api/categories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const categoriesData: CategoriaModel[] = response.data.results;

      setCategories(categoriesData);
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
      <div className="flex justify-between items-center px-8 lg:px-12 py-5 container mx-auto">
        <Link to="/">
          <p className="text-xl font-semibold">MR Ferreira</p>
          <p className="font-semibold mx-4" style={{ fontSize: "12px" }}>
            Representações
          </p>
          {/* <img src="/images/logo-transparente.png" alt="logo" className="h-20 w-20" /> */}
        </Link>
        <div
          className={`nav-links duration-500 lg:static absolute bg-white lg:min-h-fit min-h-[60vh] left-0 ${
            menuResponsive ? "top-full" : "top-[-500%]"
          } lg:w-auto w-full flex items-center px-5 shadow-lg lg:shadow-none`}
        >
          <ul className="flex lg:flex-row flex-col lg:items-center gap-8">
            <li className="mx-4 lg:mx-0">
              <a href="#home" className="hover:text-gray-500 font-semibold">
                Início
              </a>
            </li>
            <li className="mx-4 lg:mx-0">
              <a href="#produtos" className="hover:text-gray-500 font-semibold">
                Produtos
              </a>
            </li>
            <li className="mx-4 lg:mx-0 cursor-pointer">
              <span
                className="hover:text-gray-500 font-semibold"
                onClick={handleOpenDropdown}
              >
                Categorias
              </span>
              {openDropdown && (
                <ul className="absolute mt-3 w-48 bg-white border-gray-300 rounded-lg shadow-lg">
                  {processedCategories.map((category) => (
                    <Link to={`/categoria/${category.categoryNameURL}`}>
                      <li className="p-2.5 hover:bg-gray-100 cursor-pointer">
                        {category.nome}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </li>
            <li className="mx-4 lg:mx-0">
              <a href="#empresas" className="hover:text-gray-500 font-semibold">
                Empresas
              </a>
            </li>
            <li className="mx-4 lg:mx-0">
              <a href="#sobre" className="hover:text-gray-500 font-semibold">
                Sobre
              </a>
            </li>
            <li className="mx-4 lg:mx-0">
              <a href="#contato" className="hover:text-gray-500 font-semibold">
                Contato
              </a>
            </li>
          </ul>
        </div>

        <div className="flex lg:hidden items-center gap-6">
          <div className="hover:bg-white hover:text-black p-3 rounded transition-all">
            <FaBars
              className="text-xl cursor-pointer menu"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
