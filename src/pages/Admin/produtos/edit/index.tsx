import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb, { Page } from "../../../../components/breadCrumb";
import { useAuth } from "../../../../context/AuthContext";
import { ChangeEvent, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import AdminLayout from "../../../../components/Layouts/admin";
import Loading from "../../../../components/loading";
import FornecedorModel from "../../../../interface/models/FornecedorModel";
import CategoriaModel from "../../../../interface/models/CategoriaModel";

interface ProductField {
  nome: string;
  descricao: string;
  comprimento: number;
  altura: number;
  profundidade: number;
  peso: number;
  linha: string;
  materiais: string;
  foto: File | string;
  id_provider: string;
  id_category: string;
}

export default function EditarProduto() {
  const { productId } = useParams<{ productId: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);

  const breadCrumbHistory: Page[] = [
    {
      link: "/admin",
      name: "Início",
    },
    {
      link: "/admin/produtos",
      name: "Produtos",
    },
    {
      link: `/admin/fornecedores/editar/${productId}`,
      name: `Editar produto`,
    },
  ];

  const [productData, setProductData] = useState<ProductField>({
    nome: "",
    descricao: "",
    comprimento: 0,
    altura: 0,
    profundidade: 0,
    peso: 0,
    linha: "",
    materiais: "",
    foto: "",
    id_provider: "",
    id_category: "",
  });

  const [providers, setProviders] = useState<FornecedorModel[]>([]);
  const [categories, setCategories] = useState<CategoriaModel[]>([]);

  const fetchProducts = async () => {
    setLoadingProducts(true);

    try {
      const response = await axios.get(
        `https://mrferreira-api.vercel.app/api/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProductData(response.data.products);
    } catch (error) {
      console.error("Erro ao buscar dados do produto:", error);
      toast.error("Erro ao buscar dados do produto.");
    } finally {
      setLoadingProducts(false);
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

  const changeProductsFieldHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    // Verifica se o valor é null ou undefined e define como string vazia
    const sanitizedValue = value === null || value === undefined ? "" : value;
    setProductData((prevData) => ({
      ...prevData,
      [id]: sanitizedValue,
    }));
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductData({
        ...productData,
        foto: e.target.files[0],
      });
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
      const categoriesData: CategoriaModel[] = response.data.results;

      setCategories(categoriesData);
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
    }
  };

  const onSubmitChange = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("nome", productData.nome);
    formData.append("descricao", productData.descricao);
    formData.append("comprimento", productData.comprimento.toString());
    formData.append("altura", productData.altura.toString());
    formData.append("profundidade", productData.profundidade.toString());
    formData.append("peso", productData.peso.toString());
    formData.append("linha", productData.linha);
    formData.append("materiais", productData.materiais);
    formData.append("id_provider", productData.id_provider);
    formData.append("id_category", productData.id_category);

    // Verifica se foto é uma instância de File e a adiciona ao FormData
    if (productData.foto instanceof File) {
      formData.append("foto", productData.foto);
    }

    toast.promise(
      new Promise((resolve, reject) => {
        axios
          .post(
            `https://mrferreira-api.vercel.app/api/api/products/update/${productId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response: AxiosResponse) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }),
      {
        loading: "Editando produto...",
        success: () => {
          navigate("/admin/produtos");
          return "Produto editado com sucesso!";
        },
        error: (error) => {
          if (axios.isAxiosError(error)) {
            return (
              "Erro de solicitação: " + (error.response?.data || error.message)
            );
          } else if (error instanceof Error) {
            return "Erro desconhecido: " + error.message;
          } else {
            return "Erro inesperado: " + error;
          }
        },
      }
    );
  };

  useEffect(() => {
    fetchProducts();
  }, [productId]);

  useEffect(() => {
    fetchProviders();
    fetchCategories();
  }, []);

  return (
    <AdminLayout>
      <div className="mb-3">
        <BreadCrumb history={breadCrumbHistory} />
      </div>

      {loadingProducts && <Loading centered />}

      {!loadingProducts && (
        <form className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-6">
            <div className="col-span-12 lg:col-span-8">
              <label className="block mb-2 font-medium">Nome*</label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Informe o nome do produto"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProductsFieldHandler(e)}
                value={productData && productData.nome ? productData.nome : ""}
                required
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">Fornecedor*</label>
              <select
                id="id_provider"
                name="id_provider"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProductsFieldHandler(e)}
                value={
                  productData && productData.id_provider
                    ? productData.id_provider
                    : ""
                }
                required
              >
                <option value="">Selecione um fornecedor</option>
                {providers.map((provider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <label className="block mb-2 font-medium">Descrição*</label>
              <input
                type="text"
                id="descricao"
                name="descricao"
                placeholder="Informe a descrição"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProductsFieldHandler(e)}
                value={
                  productData && productData.descricao
                    ? productData.descricao
                    : ""
                }
                required
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">Categoria*</label>
              <select
                id="id_category"
                name="id_category"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProductsFieldHandler(e)}
                value={
                  productData && productData.id_category
                    ? productData.id_category
                    : ""
                }
                required
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-12">
              <label className="block mb-2 font-medium">Materiais</label>
              <input
                type="text"
                id="materiais"
                name="materiais"
                placeholder="Informe os materiais do produto"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProductsFieldHandler(e)}
                value={
                  productData && productData.materiais
                    ? productData.materiais
                    : ""
                }
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">Linha</label>
              <input
                type="text"
                id="linha"
                name="linha"
                placeholder="Informe a linha do produto"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProductsFieldHandler(e)}
                value={
                  productData && productData.linha ? productData.linha : ""
                }
                required
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">Comprimento</label>
              <input
                type="text"
                id="comprimento"
                name="comprimento"
                placeholder="Informe o comprimento"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProductsFieldHandler(e)}
                value={
                  productData && productData.comprimento
                    ? productData.comprimento
                    : ""
                }
                required
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">Altura</label>
              <input
                type="text"
                id="altura"
                name="altura"
                placeholder="Informe a altura"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProductsFieldHandler(e)}
                value={
                  productData && productData.altura ? productData.altura : ""
                }
                required
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">Profundidade</label>
              <input
                type="text"
                id="profundidade"
                name="profundidade"
                placeholder="Informe a profundidade"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProductsFieldHandler(e)}
                value={
                  productData && productData.profundidade
                    ? productData.profundidade
                    : ""
                }
                required
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">Peso suportado</label>
              <input
                type="text"
                id="peso"
                name="peso"
                placeholder="Informe o peso suportado"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProductsFieldHandler(e)}
                value={productData && productData.peso ? productData.peso : ""}
                required
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">Foto</label>
              <input
                type="file"
                id="foto"
                name="foto"
                accept="image/*"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => handleLogoChange(e)}
              />
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              onClick={(e) => onSubmitChange(e)}
              className="rounded-full px-8 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-all"
              disabled={loading}
            >
              Atualizar
            </button>
          </div>
        </form>
      )}
    </AdminLayout>
  );
}
