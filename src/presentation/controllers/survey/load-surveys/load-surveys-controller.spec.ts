import { LoadSurveys } from './load-surveys-controller-protocols'
import { LoadSurveysController } from './load-surveys-controller'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { mockSurveyModels, throwError } from '@/domain/test'
import MockDate from 'mockdate'
import { mockLoad } from '@/presentation/test'

type SutTypes = {
  sut: LoadSurveysController
  loadSurveystub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveystub = mockLoad()
  const sut = new LoadSurveysController(loadSurveystub)
  return {
    sut,
    loadSurveystub
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveystub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveystub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalledWith()
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(mockSurveyModels()))
  })

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveystub } = makeSut()
    jest.spyOn(loadSurveystub, 'load').mockReturnValueOnce(new Promise(resolve => resolve([])))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveystub } = makeSut()
    jest.spyOn(loadSurveystub, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
