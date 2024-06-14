import { Link } from "react-router-dom";
import MainLayout from "../../components/Layouts/main";

export default function ProductsByProvider() {
  return (
    <MainLayout>
      <div className="px-8 lg:px-12 py-12 container mx-auto">
        <form className="mt-8">
          <input
            type="text"
            name="search"
            className="w-full px-4 py-2 rounded-lg"
            placeholder="Pesquisar produto"
          />
        </form>

        <div className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="col-span-4">
              <div className="bg-white px-12 py-16 rounded-lg">
                <div className="flex flex-col items-center justify-center">
                  <div className="hover:scale-105 transtion-transform cursor-pointer">
                    <img
                      src="/images/cadeira.jpg"
                      className="h-52 object-contain"
                    />
                  </div>
                  <p className="mt-8 text-xl font-semibold text-center">
                    Cadeira de escrtório
                  </p>
                  <p className="mt-3 text-md text-center">Empresa</p>
                  <Link
                    to=""
                    className="mt-5 -mb-5 border-2 border-black rounded px-8 py-2 hover:bg-black hover:text-white transition-all"
                  >
                    Ver item
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="bg-white px-12 py-16 rounded-lg">
                <div className="flex flex-col items-center justify-center">
                  <div className="hover:scale-105 transtion-transform cursor-pointer">
                    <img
                      src="/images/cadeira.jpg"
                      className="h-52 object-contain"
                    />
                  </div>
                  <p className="mt-8 text-xl font-semibold text-center">
                    Cadeira de escrtório
                  </p>
                  <p className="mt-3 text-md text-center">Empresa</p>
                  <Link
                    to=""
                    className="mt-5 -mb-5 border-2 border-black rounded px-8 py-2 hover:bg-black hover:text-white transition-all"
                  >
                    Ver item
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="bg-white px-12 py-16 rounded-lg">
                <div className="flex flex-col items-center justify-center">
                  <div className="hover:scale-105 transtion-transform cursor-pointer">
                    <img
                      src="/images/cadeira.jpg"
                      className="h-52 object-contain"
                    />
                  </div>
                  <p className="mt-8 text-xl font-semibold text-center">
                    Cadeira de escrtório
                  </p>
                  <p className="mt-3 text-md text-center">Empresa</p>
                  <Link
                    to=""
                    className="mt-5 -mb-5 border-2 border-black rounded px-8 py-2 hover:bg-black hover:text-white transition-all"
                  >
                    Ver item
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
