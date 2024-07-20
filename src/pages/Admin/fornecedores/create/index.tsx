import AdminLayout from "../../../../components/Layouts/admin";
import Inputmask from "react-input-mask";
import BreadCrumb, { Page } from "../../../../components/breadCrumb";
import { useAuth } from "../../../../context/AuthContext";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

export default function AdicionarFornecedores() {
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
      link: "/admin/fornecedores/adicionar",
      name: "Adicionar fornecedores",
    },
  ];

  const { token } = useAuth();

  const navigate = useNavigate();

  const [providerField, setProviderField] = useState<ProviderField>({
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

  const { setValue } = useForm();

  const changeProvidersFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setProviderField({
      ...providerField,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProviderField({
        ...providerField,
        logo: e.target.files[0],
      });
    }
  };

  const onSubmitChange = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nome", providerField.nome);
      formData.append("cnpj", providerField.cnpj);
      formData.append("rua", providerField.rua);
      formData.append("bairro", providerField.bairro);
      formData.append("numero", providerField.numero);
      formData.append("cep", providerField.cep);
      formData.append("cidade", providerField.cidade);
      formData.append("estado", providerField.estado);
      formData.append("complemento", providerField.complemento);
      formData.append("email", providerField.email);
      formData.append("telefone", providerField.telefone);
      formData.append("celular", providerField.celular);
      formData.append("logo", providerField.logo);

      await axios.post(
        "https://mrferreira-api.vercel.app/api/api/providers/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Fornecedor criado com sucesso!");
      navigate("/admin/fornecedores");
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
    setValue("rua", providerField.rua || "");
    setValue("bairro", providerField.bairro || "");
    setValue("cidade", providerField.cidade || "");
    setValue("estado", providerField.estado || "");
  }, [providerField]);

  const checkCEP = (e: ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setProviderField({
          ...providerField,
          rua: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        });
      })
      .catch((error) => {
        toast.error("Erro ao obter informações do CEP: ", error);
      });
  };

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
              placeholder="Informe o nome do fornecedor"
              className="w-full p-2 rounded-lg border border-gray-300"
              onChange={(e) => changeProvidersFieldHandler(e)}
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">CNPJ</label>
            <Inputmask
              mask="99.999.999/9999-99"
              id="cnpj"
              name="cnpj"
              placeholder="__.___.___/____-__"
              className="w-full p-2 rounded-lg border border-gray-300"
              onChange={(e) => changeProvidersFieldHandler(e)}
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">CEP*</label>
            <Inputmask
              mask="99999-999"
              placeholder="_____-___"
              id="cep"
              name="cep"
              className="w-full p-2 rounded-lg border border-gray-300"
              value={providerField.cep}
              onChange={(e) => changeProvidersFieldHandler(e)}
              onBlur={checkCEP}
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <label className="block mb-2 font-medium">Rua*</label>
            <input
              type="text"
              id="rua"
              name="rua"
              placeholder="Informe o nome da rua"
              className="w-full p-2 rounded-lg border border-gray-300"
              value={providerField.rua}
              onChange={(e) => changeProvidersFieldHandler(e)}
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <label className="block mb-2 font-medium">Bairro*</label>
            <input
              type="text"
              id="bairro"
              name="bairro"
              placeholder="Informe o bairro"
              className="w-full p-2 rounded-lg border border-gray-300"
              value={providerField.bairro}
              onChange={(e) => changeProvidersFieldHandler(e)}
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-1">
            <label className="block mb-2 font-medium">Nº*</label>
            <input
              type="text"
              id="numero"
              name="numero"
              placeholder="Nº"
              className="w-full p-2 rounded-lg border border-gray-300"
              onChange={(e) => changeProvidersFieldHandler(e)}
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Cidade*</label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              placeholder="Informe a cidade"
              className="w-full p-2 rounded-lg border border-gray-300"
              value={providerField.cidade}
              onChange={(e) => changeProvidersFieldHandler(e)}
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-1">
            <label className="block mb-2 font-medium">Estado*</label>
            <input
              type="text"
              id="estado"
              name="estado"
              placeholder="UF"
              className="w-full p-2 rounded-lg border border-gray-300"
              value={providerField.estado}
              onChange={(e) => changeProvidersFieldHandler(e)}
              required
            />
          </div>
          <div className="col-span-12">
            <label className="block mb-2 font-medium">Complemento</label>
            <input
              type="complemento"
              id="complemento"
              name="complemento"
              placeholder="Informe o complemento"
              className="w-full p-2 rounded-lg border border-gray-300"
              onChange={(e) => changeProvidersFieldHandler(e)}
              required
            />
          </div>
          <div className="col-span-12">
            <label className="block mb-2 font-medium">E-mail*</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Informe o e-mail do fornecedor"
              className="w-full p-2 rounded-lg border border-gray-300"
              onChange={(e) => changeProvidersFieldHandler(e)}
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Telefone</label>
            <Inputmask
              mask="(99) 9999-9999"
              id="telefone"
              name="telefone"
              placeholder="(__) ____-____"
              className="w-full p-2 rounded-lg border border-gray-300"
              onChange={(e) => changeProvidersFieldHandler(e)}
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Celular</label>
            <Inputmask
              mask="(99) 99999-9999"
              id="celular"
              name="celular"
              placeholder="(__) _____-____"
              className="w-full p-2 rounded-lg border border-gray-300"
              onChange={(e) => changeProvidersFieldHandler(e)}
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Logo*</label>
            <input
              type="file"
              id="logo"
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
