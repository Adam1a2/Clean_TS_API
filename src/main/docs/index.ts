import { loginPath, signUpPath, surveyPath, surveyResultPath } from "./paths";
import { loginParamsSchema, errorSchema, accountSchema, surveysSchema, surveyAnswerSchema, surveySchema, apiKeyAuthSchema, signUpParamsSchema, addSurveyParamsSchema, saveSurveyParamsSchema, surveyResultSchema } from "./schemas";
import { badRequest, serverError, unauthorized, notFound, forbidden } from "./components";

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node Ts API',
    description: 'API do curso do Mango para realizar enquetes entre programadores',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }, {
    name: 'Enquete'
  }],
  paths: {
    '/login': loginPath,
    '/signup': signUpPath,
    '/surveys': surveyPath,
    '/surveys/{surveyId}/results': surveyResultPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signUpParams: signUpParamsSchema,
    addSurveyParams: addSurveyParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    saveSurveyParams: saveSurveyParamsSchema,
    surveyResult: surveyResultSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden
  }
}