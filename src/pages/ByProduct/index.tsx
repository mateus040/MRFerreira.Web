import MainLayout from "../../components/Layouts/main";
import Contato from "../Main/components/contato";

export default function ByProduct() {
  return (
    <MainLayout>
      <div className="bg-white">
        <div className="px-8 lg:px-12 py-12 mt-10 container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="col-span-6 flex items-center justify-center lg:-ms-10">
              <img src="/images/cadeira.jpg" className="h-96 object-contain" />
            </div>

            <div className="col-span-6">
              <p className="text-2xl font-semibold uppercase">
                Cadeira para escritório
              </p>
              <p className="text-xl mt-5 tracking-wider">Descrição</p>
              <p className="text-md mt-4">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
                quam explicabo adipisci. Cupiditate excepturi rerum ipsam saepe
                obcaecati quos, neque quibusdam labore ea aut quo sapiente
                maiores eveniet, odit totam.
              </p>
              <div className="flex flex-col lg:flex-row lg:items-center">
                <p className="mt-8 font-semibold">
                  Largura: <span className="font-normal">12</span>
                </p>
                <p className="mt-8 font-semibold lg:mx-4">
                  Comprimento: <span className="font-normal">12</span>
                </p>
                <p className="mt-8 font-semibold">
                  Profundidade: <span className="font-normal">12</span>
                </p>
                <p className="mt-8 font-semibold lg:mx-4">
                  Peso suportado: <span className="font-normal">12</span>
                </p>
              </div>
              <p className="mt-6 font-semibold">
                Linha: <span className="font-normal">Linha da cadeira</span>
              </p>
              <p className="mt-8 lg:mt-6 font-semibold">
                Mateirais:{" "}
                <span className="font-normal text-sm">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Obcaecati modi quidem quos libero soluta cupiditate molestiae
                  alias excepturi quia consequatur veniam, vel ratione tempora,
                  voluptatem ex eaque, nisi pariatur in!
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:px-12 py-12">
        <Contato />
      </div>
    </MainLayout>
  );
}
