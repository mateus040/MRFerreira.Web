import { Link } from "react-router-dom";
import AdminLayout from "../../../components/Layouts/admin";
import BreadCrumb, { Page } from "../../../components/breadCrumb";

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

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-3">
        <BreadCrumb history={breadCrumbHistory} />
        <Link
          to="/admin/fornecedores/adicionar"
          className="rounded-full px-8 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-all"
        >
          Adicionar
        </Link>
      </div>

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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="bg-white">
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Nome da empresa
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                19191981
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                17026-85
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                nome da Rua
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                nome do bairro
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                20
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                São Paulo
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                SP
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                email@email.com
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                14 998959691
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                14 998959691
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                logo
              </td>
            </tr>
            <tr className="bg-white">
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Nome da empresa
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                19191981
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                17026-85
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                nome da Rua
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                nome do bairro
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                20
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                São Paulo
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                SP
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                email@email.com
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                14 998959691
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                14 998959691
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                logo
              </td>
            </tr>
            <tr className="bg-white">
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Nome da empresa
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                19191981
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                17026-85
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                nome da Rua
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                nome do bairro
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                20
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                São Paulo
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                SP
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                email@email.com
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                14 998959691
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                14 998959691
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                logo
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        <div className="bg-white space-y-3 p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-sm">
            <div className="text-gray-500">Nome da empresa</div>
            <div>
              fornecedora
              {/* <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                Delivered
              </span> */}
            </div>
          </div>
          <div className="text-sm text-gray-700">descrição da cadeira</div>
          <div className="text-sm font-medium text-black">Compr.: 2 metros</div>
          <div className="text-sm font-medium text-black">Altura: 1 metro</div>
          <div className="text-sm font-medium text-black">Profun.: 50cm</div>
          <div className="text-sm font-medium text-black">Peso Sup.: 120KG</div>
          <div className="text-sm font-medium text-black">Foto: imagem</div>
        </div>
      </div>
    </AdminLayout>
  );
}
