import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useAuth } from "../../../../context/AuthContext";
import toast from "react-hot-toast";
import AdminLayout from "../../../../components/Layouts/admin";
import BreadCrumb, { Page } from "../../../../components/breadCrumb";
import Inputmask from "react-input-mask";
import Loading from "../../../../components/loading";

interface ProviderField {
  nome: string;
  cnpj: string;
  rua: string;
  bairro: string;
  numero: string;
  cep: string;
  cidade: string;
  estado: string;
  complemento: string;
  email: string;
  telefone: string;
  celular: string;
  logo: File | string;
}

export default function EditarFornecedor() {
  const { providerId } = useParams<{ providerId: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProviders, setLoadingProviders] = useState<boolean>(false);

  const [providerData, setProviderData] = useState<ProviderField>({
    nome: "",
    cnpj: "",
    rua: "",
    bairro: "",
    numero: "",
    cep: "",
    cidade: "",
    estado: "",
    complemento: "",
    email: "",
    telefone: "",
    celular: "",
    logo: "",
  });

  const breadCrumbHistory: Page[] = [
    {
      link: "/admin",
      name: "Início",
    },
    {
      link: "/admin/fornecedores",
      name: "Fornecedores",
    },
    {
      link: `/admin/fornecedores/editar/${providerId}`,
      name: `Editar fornecedor`,
    },
  ];

  const fetchProvider = async () => {
    setLoadingProviders(true);

    try {
      const response = await axios.get(
        `https://mrferreira-api.vercel.app/api/api/providers/${providerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProviderData(response.data.providers);
    } catch (error) {
      console.error("Erro ao buscar dados do fornecedor:", error);
      toast.error("Erro ao buscar dados do fornecedor.");
    } finally {
      setLoadingProviders(false);
    }
  };

  const changeProvidersFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    // Verifica se o valor é null ou undefined e define como string vazia
    const sanitizedValue = value === null || value === undefined ? "" : value;
    setProviderData((prevData) => ({
      ...prevData,
      [id]: sanitizedValue,
    }));
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProviderData({
        ...providerData,
        logo: e.target.files[0],
      });
    }
  };

  const onSubmitChange = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("nome", providerData.nome);
    formData.append("cnpj", providerData.cnpj);
    formData.append("rua", providerData.rua);
    formData.append("bairro", providerData.bairro);
    formData.append("numero", providerData.numero);
    formData.append("cep", providerData.cep);
    formData.append("cidade", providerData.cidade);
    formData.append("estado", providerData.estado);
    formData.append("complemento", providerData.complemento || "");
    formData.append("email", providerData.email);
    formData.append("telefone", providerData.telefone);
    formData.append("celular", providerData.celular);

    // Verifica se logo é uma instância de File e a adiciona ao FormData
    if (providerData.logo instanceof File) {
      formData.append("logo", providerData.logo);
    }

    toast.promise(
      new Promise((resolve, reject) => {
        axios
          .post(
            `https://mrferreira-api.vercel.app/api/api/providers/update/${providerId}`,
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
        loading: "Editando fornecedor...",
        success: () => {
          navigate("/admin/fornecedores");
          return "Fornecedor editado com sucesso!";
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
    fetchProvider();
  }, [providerId]);

  return (
    <AdminLayout>
      <div className="mb-3">
        <BreadCrumb history={breadCrumbHistory} />
      </div>

      {loadingProviders && <Loading centered />}

      {!loadingProviders && (
        <form className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-6">
            <div className="col-span-12 lg:col-span-8">
              <label className="block mb-2 font-medium">Nome*</label>
              <input
                type="text"
                id="nome"
                placeholder="Informe o nome do fornecedor"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProvidersFieldHandler(e)}
                value={
                  providerData && providerData.nome ? providerData.nome : ""
                }
                required
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">CNPJ</label>
              <Inputmask
                mask="99.999.999/9999-99"
                id="cnpj"
                placeholder="__.___.___/____-__"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProvidersFieldHandler(e)}
                value={
                  providerData && providerData.cnpj ? providerData.cnpj : ""
                }
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">CEP*</label>
              <Inputmask
                mask="99999-999"
                placeholder="_____-___"
                id="cep"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProvidersFieldHandler(e)}
                value={providerData && providerData.cep ? providerData.cep : ""}
                required
              />
            </div>
            <div className="col-span-12 lg:col-span-8">
              <label className="block mb-2 font-medium">Rua*</label>
              <input
                type="text"
                id="rua"
                placeholder="Informe o nome da rua"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProvidersFieldHandler(e)}
                value={providerData && providerData.rua ? providerData.rua : ""}
                required
              />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <label className="block mb-2 font-medium">Bairro*</label>
              <input
                type="text"
                id="bairro"
                placeholder="Informe o bairro"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProvidersFieldHandler(e)}
                value={
                  providerData && providerData.bairro ? providerData.bairro : ""
                }
                required
              />
            </div>
            <div className="col-span-12 lg:col-span-1">
              <label className="block mb-2 font-medium">Nº*</label>
              <input
                type="text"
                id="numero"
                placeholder="Nº"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProvidersFieldHandler(e)}
                value={
                  providerData && providerData.numero ? providerData.numero : ""
                }
                required
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">Cidade*</label>
              <input
                type="text"
                id="cidade"
                placeholder="Informe a cidade"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProvidersFieldHandler(e)}
                value={
                  providerData && providerData.cidade ? providerData.cidade : ""
                }
                required
              />
            </div>
            <div className="col-span-12 lg:col-span-1">
              <label className="block mb-2 font-medium">Estado*</label>
              <input
                type="text"
                id="estado"
                placeholder="UF"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProvidersFieldHandler(e)}
                value={
                  providerData && providerData.estado ? providerData.estado : ""
                }
                required
              />
            </div>
            <div className="col-span-12">
              <label className="block mb-2 font-medium">Complemento</label>
              <input
                type="text"
                id="complemento"
                placeholder="Informe o complemento"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProvidersFieldHandler(e)}
                value={
                  providerData && providerData.complemento !== null
                    ? providerData.complemento
                    : ""
                }
              />
            </div>
            <div className="col-span-12 lg:col-span-12">
              <label className="block mb-2 font-medium">Email*</label>
              <input
                type="email"
                id="email"
                placeholder="Informe o email"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProvidersFieldHandler(e)}
                value={
                  providerData && providerData.email ? providerData.email : ""
                }
                required
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">Telefone*</label>
              <Inputmask
                mask="(99) 9999-9999"
                id="telefone"
                placeholder="(__) _____-____"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProvidersFieldHandler(e)}
                value={
                  providerData && providerData.telefone
                    ? providerData.telefone
                    : ""
                }
                required
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">Celular*</label>
              <Inputmask
                mask="(99) 99999-9999"
                id="celular"
                placeholder="(__) _____-____"
                className="w-full p-2 rounded-lg border border-gray-300"
                onChange={(e) => changeProvidersFieldHandler(e)}
                value={
                  providerData && providerData.celular
                    ? providerData.celular
                    : ""
                }
                required
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block mb-2 font-medium">Logo</label>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                id="logo"
                onChange={handleLogoChange}
                className="w-full p-2 rounded-lg border border-gray-300"
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="rounded-full px-8 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-all"
              onClick={(e) => onSubmitChange(e)}
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
