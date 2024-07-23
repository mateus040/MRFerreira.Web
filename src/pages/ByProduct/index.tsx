import { useEffect, useState } from "react";
import MainLayout from "../../components/Layouts/main";
import { useAuth } from "../../context/AuthContext";
import Contato from "../Main/components/contato";
import ProdutoModel from "../../interface/models/ProdutoModel";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getDownloadURL, ref } from "firebase/storage";
import { firebaseStorage } from "../../../firebaseConfig";
import Loading from "../../components/loading";

export default function ByProduct() {
  const { productId } = useParams();
  const { token } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [productInfo, setProductInfo] = useState<ProdutoModel>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [searchParams] = useSearchParams();

  const query = searchParams.get("idProduct") || productId;

  const fetchProductInfo = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://mrferreira-api.vercel.app/api/api/products/${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const productData: ProdutoModel = response.data.products;

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
  }, []);

  return (
    <MainLayout>
      <div className="bg-white">
        <div className="px-8 lg:px-12 py-12 mt-10 container mx-auto">
          {loading && <Loading centered />}
          {!loading && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="col-span-6 flex items-center justify-center lg:-ms-10">
                {imageUrl && (
                  <img src={imageUrl} className="h-80 object-contain" />
                )}
              </div>

              <div className="col-span-6">
                <p className="text-2xl font-semibold uppercase">
                  {productInfo?.nome}
                </p>
                <p className="text-xl mt-5 tracking-wider">Descrição</p>
                <p className="text-md mt-4">{productInfo?.descricao}</p>
                <div className="flex flex-col lg:flex-row lg:items-center">
                  <p className="mt-8 font-semibold">
                    Altura:{" "}
                    <span className="font-normal">{productInfo?.altura}</span>
                  </p>
                  <p className="mt-8 font-semibold lg:mx-4">
                    Comprimento:{" "}
                    <span className="font-normal">
                      {productInfo?.comprimento}
                    </span>
                  </p>
                  <p className="mt-8 font-semibold">
                    Profundidade:{" "}
                    <span className="font-normal">
                      {productInfo?.profundidade}
                    </span>
                  </p>
                  <p className="mt-8 font-semibold lg:mx-4">
                    Peso suportado:{" "}
                    <span className="font-normal">{productInfo?.peso}</span>
                  </p>
                </div>
                <p className="mt-6 font-semibold">
                  Linha:{" "}
                  <span className="font-normal">{productInfo?.linha}</span>
                </p>
                <p className="mt-8 lg:mt-6 font-semibold">
                  Mateirais:{" "}
                  <span className="font-normal text-sm">
                    {productInfo?.materiais}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {!loading && !productInfo && (
        <div className="flex items-center justify-center text-gray-500 text-xl">
          Informações do produto não encontradas.
        </div>
      )}

      <div className="lg:px-12 py-12">
        <Contato />
      </div>
    </MainLayout>
  );
}
