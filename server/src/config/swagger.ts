import swaggerJSDoc from "swagger-jsdoc"
import { SwaggerUiOptions } from "swagger-ui-express"

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        tags: [
            {
                name: 'Products',
                description: 'API Operations Related To Products'
            }
        ],
        info: {
            title: "REST API Node.js / Express / TypeScript",
            version: "1.0.0",
            description: "API docs for products"
        }
    },
    apis: ["./src/router.ts"]
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('');
            height: 80px;
            width: auto;
        }
    `,
    customSiteTitle: 'Documentación API'
}

export default swaggerSpec
export {
    swaggerUiOptions
}