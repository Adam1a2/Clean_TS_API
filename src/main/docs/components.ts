import { apiKeyAuthSchema } from "./schemas";
import { badRequest, serverError, forbidden, notFound, unauthorized } from "./components/";

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden
}