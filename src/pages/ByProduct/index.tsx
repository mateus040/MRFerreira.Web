import { useEffect, useState } from "react";
import MainLayout from "../../components/Layouts/main";
import { useAuth } from "../../context/AuthContext";
import Contato from "../Main/components/contato";
import ProdutoModel from "../../interface/models/ProdutoModel";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getDownloadURL, ref } from "firebase/storage";
import { firebaseStorage } from "../../../firebaseConfig";
import Loading from "../../components/loading";
import CategoriaModel from "../../interface/models/CategoriaModel";
import { FaWhatsapp } from "react-icons/fa6";

export default function ByProduct() {
  const { productId } = useParams();
  const { token } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [productInfo, setProductInfo] = useState<ProdutoModel>();
  const [categories, setCategories] = useState<CategoriaModel[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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

  const fetchProductInfo = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://mrferreira-api.vercel.app/api/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const productData: ProdutoModel = response.data.product;

      setProductInfo(productData);

      const imagePath = productData.foto;

      if (imagePath) {
        const imageUrls: { [key: string]: string } = {};

        await Promise.all(
          [imagePath].map(async (path) => {
            try {
              const imageRef = ref(firebaseStorage, path);
              const imageUrl = await getDownloadURL(imageRef);
              imageUrls[path] = imageUrl;
            } catch (error) {
              console.error(`Erro ao buscar imagem ${path}:`, error);
            }
          })
        );

        setImageUrl(imageUrls[imagePath]);
      }
    } catch (error) {
      console.error("Erro ao buscar informações do produto", error);
      toast.error("Erro ao buscar informações do produto.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductInfo();
    fetchCategories();
  }, []);

  const whatsappMessage = productInfo
    ? `Olá! Gostaria de saber mais informações sobre o produto ${productInfo.nome}. Foto do produto: ${imageUrl}`
    : "";

  return (
    <MainLayout>
      {loading && <Loading centered className="mt-28" />}

      {!loading && productInfo && (
        <div className="bg-white">
          <div className="px-8 lg:px-12 py-12 mt-10 container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="col-span-6 flex items-center justify-center lg:-ms-10">
                {imageUrl && (
                  <img src={imageUrl} className="h-80 object-contain" />
                )}
                {/* <img src="/images/logo.png" className="h-80 object-contain" /> */}
              </div>

              <div className="col-span-6">
                <p className="text-sm mb-5 font-medium text-zinc-700 tracking-wider">
                  Home/
                  {
                    categories.find(
                      (provider) => provider.id === productInfo?.id_category
                    )?.nome
                  }
                  {/* Cadeiras */}
                </p>
                <p className="text-4xl font-bold uppercase mb-1">
                  {productInfo?.nome}
                  {/* Red Printed Tshirt by HRX */}
                </p>
                <p className="mt-5 font-bold text-lg">
                  Linha:{" "}
                  <span className="font-normal">
                    {productInfo?.linha}
                    {/* Linha do produto */}
                  </span>
                </p>
                <div className="flex flex-col lg:flex-row lg:items-center mt-5">
                  <p className="font-bold">
                    Altura:{" "}
                    <span className="font-normal">
                      {productInfo?.altura}
                      {/* 20 */}
                    </span>
                  </p>
                  <p className="font-bold lg:mx-4 mt-3 lg:mt-0">
                    Comprimento:{" "}
                    <span className="font-normal">
                      {productInfo?.comprimento}
                      {/* 20 */}
                    </span>
                  </p>
                  <p className="font-bold mt-3 lg:mt-0">
                    Profundidade:{" "}
                    <span className="font-normal">
                      {productInfo?.profundidade}
                      {/* 20 */}
                    </span>
                  </p>
                  <p className="font-bold lg:mx-4 mt-3 lg:mt-0">
                    Peso suportado:{" "}
                    <span className="font-normal">{productInfo?.peso}</span>
                    {/* <span className="font-normal">20</span> */}
                  </p>
                </div>
                <p className="mt-8 lg:mt-7 font-bold text-base">
                  Mateirais:{" "}
                  <span className="font-normal">
                    {productInfo?.materiais}
                    {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Aliquid nobis neque ab explicabo aut molestias rerum placeat
                  repellat expedita vel praesentium atque inventore nam, optio
                  commodi minima perferendis odit molestiae! */}
                  </span>
                </p>
              </div>
            </div>

            <p className="mt-12 text-xl tracking-widest font-bold uppercase">
              Detalhes do produto
            </p>

            <p className="mt-3">
              {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            eaque impedit minus maxime illo eum sit non doloribus harum, omnis,
            tenetur blanditiis assumenda iste voluptas aut qui animi officiis a. */}
              {productInfo?.descricao}
            </p>

            <div className="flex flex-col items-center justify-center mt-16">
              <p className="font-semibold text-base text-center">
                Entre em contato conosco pelo WhatsApp e saiba mais sobre o
                produto!
              </p>

              <Link
                to={`https://api.whatsapp.com/send?phone=5514991896619&text=${encodeURIComponent(
                  whatsappMessage
                )}`}
                target="_blank"
                className="mt-4 flex items-center justify-center w-full lg:w-[290px] rounded px-8 py-2 bg-[#25d366] hover:bg-[#1d9148] text-white transition-all"
              >
                <FaWhatsapp size={24} />
                <span className="mx-8">Saiba mais!</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {!loading && !productInfo && (
        <div className="flex items-center justify-center text-gray-500 text-xl mt-28">
          Informações do produto não encontradas.
        </div>
      )}

      <div className="lg:px-12 py-12">
        <Contato />
      </div>
    </MainLayout>
  );
}
