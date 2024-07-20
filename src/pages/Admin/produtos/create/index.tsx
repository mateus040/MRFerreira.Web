import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../../components/Layouts/admin";
import BreadCrumb, { Page } from "../../../../components/breadCrumb";
import { useAuth } from "../../../../context/AuthContext";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import FornecedorModel from "../../../../interface/models/FornecedorModel";

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
}

export default function AdicionarProdutos() {
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
      link: "/admin/produtos/adicionar",
      name: "Adicionar produtos",
    },
  ];

  const { token } = useAuth();

  const navigate = useNavigate();

  const [providers, setProviders] = useState<FornecedorModel[]>([]);

  const [productField, setProductField] = useState<ProductField>({
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
  });

  const changeProvidersFieldHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProductField({
      ...productField,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductField({
        ...productField,
        foto: e.target.files[0],
      });
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

  const onSubmitChange = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nome", productField.nome);
      formData.append("descricao", productField.descricao);
      formData.append("comprimento", productField.comprimento.toString());
      formData.append("altura", productField.altura.toString());
      formData.append("profundidade", productField.profundidade.toString());
      formData.append("peso", productField.peso.toString());
      formData.append("linha", productField.linha);
      formData.append("materiais", productField.materiais);
      formData.append("foto", productField.foto);
      formData.append("id_provider", productField.id_provider);

      await axios.post(
        "https://mrferreira-api.vercel.app/api/api/products/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Produto criado com sucesso!");
      navigate("/admin/produtos");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error("Erro de solicitação:", err.response?.data || err.message);
        toast.error(
          "Erro ao enviar solicitação: " +
            (err.response?.data?.message || err.message)
        );
      } else if (err instanceof Error) {
        toast.error("Erro desconhecido: " + err.message);
      } else {
        toast.error("Erro inesperado: " + err);
      }
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <AdminLayout>
      <div className="mb-3">
        <BreadCrumb history={breadCrumbHistory} />
      </div>

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
              onChange={(e) => changeProvidersFieldHandler(e)}
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Fornecedor*</label>
            <select
              id="id_provider"
              name="id_provider"
              className="w-full p-2 rounded-lg border border-gray-300"
              onChange={(e) => changeProvidersFieldHandler(e)}
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
          <div className="col-span-12">
            <label className="block mb-2 font-medium">Descrição*</label>
            <input
              type="text"
              id="descricao"
              name="descricao"
              placeholder="Informe a descrição"
              className="w-full p-2 rounded-lg border border-gray-300"
              onChange={(e) => changeProvidersFieldHandler(e)}
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Comprimento</label>
            <input
              type="text"
              id="comprimento"
              placeholder="Informe o comprimento"
              className="w-full p-2 rounded-lg border border-gray-300"
              onChange={(e) => changeProvidersFieldHandler(e)}
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Altura</label>
            <input
              type="text"
              id="altura"
              placeholder="Informe a altura"
              className="w-full p-2 rounded-lg border border-gray-300"
              onChange={(e) => changeProvidersFieldHandler(e)}
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Profundidade</label>
            <input
              type="text"
              id="profundidade"
              placeholder="Informe a profundidade"
              className="w-full p-2 rounded-lg border border-gray-300"
              onChange={(e) => changeProvidersFieldHandler(e)}
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Peso suportado</label>
            <input
              type="text"
              id="peso"
              placeholder="Informe o peso suportado"
              className="w-full p-2 rounded-lg border border-gray-300"
              onChange={(e) => changeProvidersFieldHandler(e)}
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Linha</label>
            <input
              type="text"
              id="linha"
              placeholder="Informe a linha do produto"
              className="w-full p-2 rounded-lg border border-gray-300"
              onChange={(e) => changeProvidersFieldHandler(e)}
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Foto</label>
            <input
              type="file"
              id="foto"
              accept="image/*"
              className="w-full p-2 rounded-lg border border-gray-300"
              onChange={(e) => handleLogoChange(e)}
              required
            />
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            onClick={(e) => onSubmitChange(e)}
            className="rounded-full px-8 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-all"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
