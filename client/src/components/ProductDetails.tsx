import { useNavigate } from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utilities";

type ProductDetailsProps = {
    product: Product
}

const ProductDetails = ({product} : ProductDetailsProps) => {
  
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
            {isAvailable ? 'Disponible' : 'No Disponible'}
        </td>
        <td className="p-3 text-lg text-gray-800 ">
            <div className="flex gap-2 items-center">
                <button
                    className="bg-indigo-600 text-white rounded w-full p-2 uppercase font-bold text-xs text-center hover:bg-indigo-800 transition-all ease-out duration-500"
                    onClick={() => navigate(`/productos/${product.id}/editar`)}
                >Editar</button>
            </div>
        </td> 
    </tr> 
  )
}

export default ProductDetails;