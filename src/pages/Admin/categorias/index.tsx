import { ChangeEvent, useEffect, useState } from "react";
import BreadCrumb, { Page } from "../../../components/breadCrumb";
import AdminLayout from "../../../components/Layouts/admin";
import { useAuth } from "../../../context/AuthContext";
import CategoriaModel from "../../../interface/models/CategoriaModel";
import axios, { AxiosResponse } from "axios";
import Loading from "../../../components/loading";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface CategoryFiled {
  nome: string;
}

export default function Categorias() {
  const breadCrumbHistory: Page[] = [
    {
      link: "/admin",
      name: "Início",
    },
    {
      link: "/admin/categorias",
      name: "Categorias",
    },
  ];

  const { token } = useAuth();

  const navigate = useNavigate();

  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [categories, setCategories] = useState<CategoriaModel[]>([]);
  const [categoryField, setCategoryField] = useState<CategoryFiled>({
    nome: "",
  });

  const navigateToEditPage = (category: CategoriaModel) => {
    navigate(`/admin/categorias/editar/${category.id}`);
  };

  const fetchCategories = async () => {
    setLoadingCategories(true);

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
    } finally {
      setLoadingCategories(false);
    }
  };

  const deleteCategories = async (categoryId: string) => {
    setLoadingDelete(true);

    toast.promise(
      new Promise((resolve, reject) => {
        axios
          .delete(
            `https://mrferreira-api.vercel.app/api/api/categories/delete/${categoryId}`,
            {
              headers: {
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
            setLoadingDelete(false);
          });
      }),
      {
        loading: "Excluindo categoria...",
        success: () => {
          const updatedCategories = categories.filter(
            (category) => category.id !== categoryId
          );
          setCategories(updatedCategories);
          fetchCategories();
          return "Categoria excluída com sucesso!";
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

  const changeCategoriesFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryField({
      ...categoryField,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitChange = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("nome", categoryField.nome);

    toast.promise(
      new Promise((resolve, reject) => {
        axios
          .post(
            "https://mrferreira-api.vercel.app/api/api/categories/add",
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
        loading: "Cadastrando categoria...",
        success: () => {
          fetchCategories();
          setCategoryField({ nome: "" });
          return "Categoria criada com sucesso!";
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
    fetchCategories();
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between mb-3">
        <BreadCrumb history={breadCrumbHistory} />
      </div>

      <form className="mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className="col-span-12 lg:col-span-10">
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Informe o nome da categoria"
              className="w-full p-2 rounded-lg border border-gray-300"
              value={categoryField.nome}
              onChange={(e) => changeCategoriesFieldHandler(e)}
              required
            />
          </div>

          <div className="col-span-12 lg:col-span-2">
            <button
              className="w-full px-8 py-2 flex items-center justify-center h-full bg-slate-900 text-white hover:bg-slate-800 transition-all rounded-full"
              type="submit"
              onClick={(e) => onSubmitChange(e)}
              disabled={loading}
            >
              Adicionar
            </button>
          </div>
        </div>
      </form>

      {loadingCategories && <Loading centered />}

      {!loadingCategories && (
        <>
          <div className="overflow-auto rounded-lg shadow hidden md:block mt-6">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Nome
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.map((category) => (
                  <tr className="bg-white" key={category.id}>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {category.nome}
                    </td>
                    <td className="px-3 py-6 whitespace-nowrap flex items-center text-center">
                      <AiOutlineEdit
                        className="text-blue-600 cursor-pointer"
                        onClick={() => navigateToEditPage(category)}
                        size={20}
                      />
                      <button disabled={loadingDelete}>
                        <AiOutlineDelete
                          className="text-red-600 cursor-pointer ml-2"
                          onClick={() => deleteCategories(category.id)}
                          size={20}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {!loadingCategories && categories.length === 0 && (
        <div className="text-center text-gray-500 mt-5">
          Nenhum categoria encontrada
        </div>
      )}
    </AdminLayout>
  );
}
