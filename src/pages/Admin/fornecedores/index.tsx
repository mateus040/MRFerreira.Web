import { Link } from "react-router-dom";
import AdminLayout from "../../../components/Layouts/admin";
import BreadCrumb, { Page } from "../../../components/breadCrumb";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  firebaseStorage,
  ref,
  getDownloadURL,
} from "../../../../firebaseConfig";
import Loading from "../../../components/loading";
import FornecedorModel from "../../../interface/models/FornecedorModel";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";

export default function Fornecedores() {
  const breadCrumbHistory: Page[] = [
    {
      link: "/admin",
      name: "Início",
    },
    {
      link: "/admin/fornecedores",
      name: "Fornecedores",
    },
  ];

  const { token } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [providers, setProviders] = useState<FornecedorModel[]>([]);
  const [logos, setLogos] = useState<{ [key: string]: string }>({});

  const fetchProviders = async () => {
    setLoading(true);

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
      setLoading(false);
    }
  };

  const deleteProvider = async (providerId: string) => {
    try {
      await axios.delete(
        `https://mrferreira-api.vercel.app/api/api/providers/delete/${providerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedProviders = providers.filter(
        (provider) => provider.id !== providerId
      );
      setProviders(updatedProviders);

      toast.success("Dados deletados com sucesso!");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error("Erro de solicitação:", err.response?.data || err.message);
      }
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between mb-3">
        <BreadCrumb history={breadCrumbHistory} />
        <Link
          to="/admin/fornecedores/adicionar"
          className="rounded-full px-8 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-all text-center mt-3 lg:mt-0 mb-2 lg:mb-0 w-full lg:w-[200px]"
        >
          Adicionar
        </Link>
      </div>

      {loading && <Loading centered />}

      {!loading && (
        <>
          <div className="overflow-auto rounded-lg shadow hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Nome
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    CNPJ
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    CEP
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Rua
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Bairro
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Número
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Cidade
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Estado
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Email
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Telefone
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Celular
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Logo
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Deletar
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {providers.map((provider) => (
                  <tr className="bg-white" key={provider.id}>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {provider.nome}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {provider.cnpj}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {provider.cep}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {provider.rua}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {provider.bairro}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {provider.numero}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {provider.cidade}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {provider.estado}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {provider.email}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {provider.telefone}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {provider.celular}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {logos[provider.logo] && (
                        <img
                          src={logos[provider.logo]}
                          className="max-w-[50px] max-h-[50px] object-cover"
                          alt="logo"
                        />
                      )}
                    </td>
                    <td className="flex items-center text-xl justify-center p-3 text-gray-700 whitespace-nowrap">
                      <AiOutlineDelete
                        className="text-red-600 cursor-pointer"
                        onClick={() => deleteProvider(provider.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {providers.map((provider) => (
              <div
                className="bg-white space-y-3 p-4 rounded-lg shadow"
                key={provider.id}
              >
                <div className="flex items-center space-x-2 text-sm">
                  <span>Nome:</span>
                  <span className="text-gray-500">{provider.nome}</span>
                </div>
                <div className="text-sm">
                  CNPJ: <span className="text-gray-700">{provider.cnpj}</span>
                </div>
                <div className="text-sm">
                  CEP: <span className="text-gray-700">{provider.cep}</span>
                </div>
                <div className="text-sm">
                  Rua: <span className="text-gray-700">{provider.rua}</span>
                </div>
                <div className="text-sm">
                  Bairro:{" "}
                  <span className="text-gray-700">{provider.bairro}</span>
                </div>
                <div className="text-sm">
                  Número:{" "}
                  <span className="text-gray-700">{provider.numero}</span>
                </div>
                <div className="text-sm">
                  Cidade:{" "}
                  <span className="text-gray-700">{provider.cidade}</span>
                </div>
                <div className="text-sm">
                  Estado:{" "}
                  <span className="text-gray-700">{provider.estado}</span>
                </div>
                <div className="text-sm">
                  Email: <span className="text-gray-700">{provider.email}</span>
                </div>
                <div className="text-sm">
                  Telefone:{" "}
                  <span className="text-gray-700">{provider.telefone}</span>
                </div>
                <div className="text-sm">
                  Celular:{" "}
                  <span className="text-gray-700">{provider.celular}</span>
                </div>
                {logos[provider.logo] && (
                  <img
                    src={logos[provider.logo]}
                    className="object-cover"
                    alt="logo"
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </AdminLayout>
  );
}
