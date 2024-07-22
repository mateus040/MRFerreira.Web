import { useEffect, useState } from "react";
import MainLayout from "../../components/Layouts/main";
import { useAuth } from "../../context/AuthContext";
import Contato from "./components/contato";
import Empresas from "./components/empresas";
import Home from "./components/home";
import Produtos from "./components/produtos";
import Sobre from "./components/sobre";
import ProdutoModel from "../../interface/models/ProdutoModel";
import FornecedorModel from "../../interface/models/FornecedorModel";
import { getDownloadURL, ref } from "firebase/storage";
import { firebaseStorage } from "../../../firebaseConfig";
import axios from "axios";

export default function Main() {
  const { token } = useAuth();

  // const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  // const [loadingProviders, setLoadingProviders] = useState<boolean>(false);

  const [products, setProducts] = useState<ProdutoModel[]>([]);
  const [providers, setProviders] = useState<FornecedorModel[]>([]);

  const [logos, setLogos] = useState<{ [key: string]: string }>({});
  const [fotos, setFotos] = useState<{ [key: string]: string }>({});

  const fetchProducts = async () => {
    //setLoadingProducts(true);

    try {
      const response = await axios.get(
        "https://mrferreira-api.vercel.app/api/api/products",
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
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    } finally {
      //setLoadingProducts(false);
    }
  };

  const fetchProviders = async () => {
    //setLoadingProviders(true);

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

      // Get all unique logo paths
      const logoPaths = providersData
        .map((provider) => provider.logo)
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

      setLogos(logosTemp);
    } catch (err) {
      console.error("Erro ao buscar fornecedores:", err);
    } finally {
      //setLoadingProviders(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchProviders();
  }, []);

  return (
    <MainLayout>
      <div className="w-full overflow-x-hidden">
        <Home />

        <Produtos
          products={products}
          providers={providers}
          fotos={fotos}
          //loading={loadingProducts}
        />

        <Empresas
          providers={providers}
          logos={logos}
          //loading={loadingProviders}
        />

        <Sobre />
        <Contato />
      </div>
    </MainLayout>
  );
}
