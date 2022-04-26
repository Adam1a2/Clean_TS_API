import { LoadSurveys, SurveyModel } from './load-surveys-controller-protocols'
import { LoadSurveysController } from './load-surveys-controller'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import MockDate from 'mockdate'

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'amy_answer'
    }],
    date: new Date()
  }, {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'amy_answer'
    }],
    date: new Date()
  }]
}

const makeLoad = (): LoadSurveys => {
  class LoadSurveystub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }
  return new LoadSurveystub()
}

type SutTypes = {
  sut: LoadSurveysController
  loadSurveystub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveystub = makeLoad()
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
    expect(httpResponse).toEqual(ok(makeFakeSurveys()))
  })

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveystub } = makeSut()
    jest.spyOn(loadSurveystub, 'load').mockReturnValueOnce(new Promise(resolve => resolve([])))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveystub } = makeSut()
    jest.spyOn(loadSurveystub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
