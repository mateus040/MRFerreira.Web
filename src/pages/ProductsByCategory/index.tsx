import { Link, useParams } from "react-router-dom";
import MainLayout from "../../components/Layouts/main";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import CategoriaModel from "../../interface/models/CategoriaModel";
import ProdutoModel from "../../interface/models/ProdutoModel";
import { formatNameForURL } from "../../utils/formatNameForURL";
import axios from "axios";
import { getDownloadURL, ref } from "firebase/storage";
import { firebaseStorage } from "../../../firebaseConfig";
import Loading from "../../components/loading";
import FornecedorModel from "../../interface/models/FornecedorModel";

export default function ProductsByCategory() {
  const { token } = useAuth();
  const { categoryId } = useParams();

  const [loading, setLoading] = useState<boolean>(false);

  const [categories, setCategories] = useState<CategoriaModel[]>([]);
  const [products, setProducts] = useState<ProdutoModel[]>([]);
  const [providers, setProviders] = useState<FornecedorModel[]>([]);

  const [fotos, setFotos] = useState<{ [key: string]: string }>({});

  const processedProducts = products.map((product) => {
    const productNameURL = formatNameForURL(product.nome);

    return {
      ...product,
      productNameURL,
    };
  });

  const fetchProductsByCategory = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://mrferreira-api.vercel.app/api/api/category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const productsData: ProdutoModel[] = response.data.results;

      setProducts(productsData);

      // Get all unique logo paths
      const logoPaths = productsData
        .map((product) => product.foto)
        .filter((logoPath) => logoPath !== null) as string[];

      // Fetch URLs for all logos
      const logosTemp: { [key: string]: string } = {};
      await Promise.all(
        logoPaths.map(async (logoPath) => {
          try {
            const logoRef = ref(firebaseStorage, logoPath);
            const logoUrl = await getDownloadURL(logoRef);
            logosTemp[logoPath] = logoUrl;
          } catch (error) {
            console.error(`Error fetching logo for path ${logoPath}:`, error);
          }
        })
      );

      setFotos(logosTemp);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
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
      const providersData: CategoriaModel[] = response.data.results;

      setCategories(providersData);
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
    }
  };

  const fetchProviders = async () => {
    try {
      const response = await axios.get(
        "https://mrferreira-api.vercel.app/api/api/providers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const providersData: FornecedorModel[] = response.data.results;

      setProviders(providersData);
    } catch (err) {
      console.error("Erro ao buscar fornecedores:", err);
    }
  };

  useEffect(() => {
    fetchProductsByCategory();
    fetchCategories();
    fetchProviders();
  }, []);

  return (
    <MainLayout>
      <div className="px-8 lg:px-12 py-12 container mx-auto">
        <p className="mt-10 text-2xl sm:text-3xl font-semibold text-center">
          Categoria {categoryId}
        </p>
        <p className="text-md mt-3 text-gray-600 text-center">
          Veja todos os produtos dessa categoria
        </p>
        <form className="mt-8">
          <input
            type="text"
            name="search"
            className="w-full px-4 py-2 rounded-lg"
            placeholder="Pesquisar produto"
          />
        </form>

        <div className="mt-8">
          {loading && <Loading centered />}

          {!loading && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {processedProducts.map((product) => (
                <div className="col-span-4" key={product.id}>
                  <div className="col-span-4" key={product.id}>
                    <div className="bg-white px-12 py-16 rounded-lg">
                      <div className="flex flex-col items-center justify-center">
                        <div className="hover:scale-105 transtion-transform cursor-pointer">
                          {fotos[product.foto] && (
                            <img
                              src={fotos[product.foto]}
                              className="h-52 object-contain"
                            />
                          )}
                        </div>
                        <p className="mt-8 text-xl font-semibold text-center">
                          {product.nome}
                        </p>
                        <p className="mt-3 text-md text-center">
                          {
                            providers.find(
                              (provider) => provider.id === product.id_provider
                            )?.nome
                          }
                        </p>
                        <Link
                          to={`/fornecedor/${
                            providers.find(
                              (provider) => provider.id === product.id_provider
                            )?.id
                          }/${product.productNameURL}?idProduct=${product.id}`}
                          className="mt-5 -mb-5 border-2 border-black rounded px-8 py-2 hover:bg-black hover:text-white transition-all"
                        >
                          Detalhes
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
