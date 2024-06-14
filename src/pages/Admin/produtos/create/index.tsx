import AdminLayout from "../../../../components/Layouts/admin";
import BreadCrumb, { Page } from "../../../../components/breadCrumb";

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
              placeholder="Informe o nome do produto"
              className="w-full p-2 rounded-lg border border-gray-300"
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Fornecedor*</label>
            <input
              type="text"
              id="fornecedor"
              placeholder="Selecione o fornecedor"
              className="w-full p-2 rounded-lg border border-gray-300"
              required
            />
          </div>
          <div className="col-span-12">
            <label className="block mb-2 font-medium">Descrição*</label>
            <input
              type="text"
              id="descricao"
              placeholder="Informe a descrição"
              className="w-full p-2 rounded-lg border border-gray-300"
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
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <label className="block mb-2 font-medium">Foto</label>
            <input
              type="text"
              id="foto"
              placeholder="Selecione a foto do produto"
              className="w-full p-2 rounded-lg border border-gray-300"
              required
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="rounded-full px-8 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-all"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
