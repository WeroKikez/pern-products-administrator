import { Router} from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { body, param } from 'express-validator'
import { handleInputErrors } from "./middleware";

const router = Router()

/**
 * @swagger 
 * components: 
 *   schemas:
 *      Product:
 *        type: object
 *        properties: 
 *          id:
 *              type: integer
 *              description: The Product ID
 *              exmaple: 1
 *          name: 
 *              type: string
 *              description: The Product Name
 *              exmaple: Monitor Curvo de 27 pulgadas
 *          price:
 *              type: number
 *              description: The Product Price
 *              exmaple: 300
 *          availability:
 *              type: boolean
 *              description: The Product Availability
 *              exmaple: true
 */ 

/**
 * @swagger
 * /api/products: 
 *   get: 
 *      summary: Get all products
 *      tags:
 *          - Products
 *      description: It returns a list with all the products
 *      responses: 
 *          200:
 *              description: Successful response
 *              content: 
 *                  application/json: 
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 */

// Routing
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *      summary: Get a single product
 *      tags:
 *          - Products
 *      description: It returns a single product by its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The unique ID of the product to get
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json: 
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product not found
 *          400:
 *              description: Bad Request -Invalid ID
 */
router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById
)


/**
 * @swagger
 * /api/products: 
 *   post:
 *      summary: Create a new product
 *      tags:
 *          - Products
 *      description: Itc creates a new product and returns a new record in the database
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties: 
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo de 27 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 349
 *      responses: 
 *          201:
 *              description: Products created and saved to database successfully
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400: 
 *              description: Bad Request - Invalid input data
 */
router.post('/', 
    // Validación
    body('name')
        .notEmpty().withMessage('El nombre del producto es obligatorio'),
        
    body('price')
        .isNumeric().withMessage('El precio debe ser un número')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom( value =>  value > 0).withMessage('Precio no válido'),

    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *      summary: Update a product
 *      tags:
 *          - Products
 *      description: It updates a single product with user input and returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The unique ID of the product to update
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties: 
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo de 27 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 349
 *                          availability: 
 *                              type: boolean
 *                              exmaple: true
 *      responses:
 *          200: 
 *              description: Product updated and saved to database successfully
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID or invalid input data
 *          404:
 *              description: Product not found
 */
router.put('/:id', 
    // Validación
    param('id').isInt().withMessage('ID no valido'),
    body('name')
        .notEmpty().withMessage('El nombre del producto es obligatorio'),

    body('price')
        .isNumeric().withMessage('El precio debe ser un número')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom( value =>  value > 0).withMessage('Precio no válido'),

    body('availability')
        .isBoolean().withMessage('La disponibilidad debe ser un valor booleano'),

    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *      summary: Update product availability
 *      tags:
 *          - Products
 *      description: It updates and returns the availability of a single product by its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The unique ID of the product to update its availability
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200: 
 *              description: Availability successfully updated
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product not found
 */ 
router.patch('/:id', 
    // Validación
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *      summary: Delete a product
 *      tags:
 *          - Products
 *      description: It deletes a product by  a giving ID and returns a string "Product deleted"
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The unique ID of the product to delete
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200: 
 *              description: Product deleted successfully
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto Eliminado'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product not found
 */
router.delete('/:id', 
    // Validación
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)

export default router