import { ActionFunctionArgs, Form, useNavigate, redirect, useFetcher } from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utilities";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
    product: Product
}

export async function action({params}: ActionFunctionArgs) {
    if(params.id !== undefined) {
        await deleteProduct(+params.id)

        return redirect('/')
    }

    return redirect('/')
}

const ProductDetails = ({product} : ProductDetailsProps) => {
  
  const fetcher = useFetcher()  
  const navigate = useNavigate()
  const isAvailable = product.availability

  return (
    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            { formatCurrency(product.price) }
        </td>
        <td className="p-3 text-lg text-gray-800 text-center">
            <fetcher.Form method="POST">
                <button
                    type="submit"
                    name="id"
                    value={product.id}
                    className={`${isAvailable ? 'bg-green-600' : 'bg-orange-600'} text-white rounded-lg p-2 uppercase font-bold text-xs w-full hover:cursor-pointer max-w-xs`}
                >
                    {isAvailable ? 'Disponible' : 'No Disponible'}
                </button>
            </fetcher.Form>
        </td>
        <td className="p-3 text-lg text-gray-800 ">
            <div className="flex gap-2 items-center">
                <button
                    className="bg-indigo-600 text-white rounded w-full p-2 uppercase font-bold text-xs text-center hover:bg-indigo-800 transition-all ease-out duration-500"
                    onClick={() => navigate(`/productos/${product.id}/editar`)}
                >Editar</button>

                <Form
                    method="POST"
                    action={`productos/${product.id}/eliminar`}
                    onSubmit={(e) => {
                        if( !confirm('¿Elimnar Producto?')) {
                            e.preventDefault()
                        }
                    }}
                    className="w-full"
                >
                    <input
                        type="submit"
                        value="Eliminar"
                        className="bg-red-600 text-white rounded w-full p-2 uppercase font-bold text-xs text-center hover:bg-red-700 transition-all ease-out duration-500 hover:cursor-pointer"
                    />
                </Form>
            </div>
        </td> 
    </tr> 
  )
}

export default ProductDetails;