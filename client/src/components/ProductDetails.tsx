import { Product } from "../types";
import { formatCurrency } from "../utilities";

type ProductDetailsProps = {
    product: Product
}

const ProductDetails = ({product} : ProductDetailsProps) => {
  const isAvailable = product.availability
    

  return (
    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            { formatCurrency(product.price) }
        </td>
        <td className="p-3 text-lg text-gray-800">
            {product.availability}
        </td>
        <td className="p-3 text-lg text-gray-800 ">
            {isAvailable ? 'Disponible' : 'No Disponible'}
        </td>
    </tr> 
  )
}

export default ProductDetails;