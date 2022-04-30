import { mockSurveyModel, mockSurveyModels } from "@/domain/test"
import { LoadSurveyById } from "../controllers/survey-result/save-survey-result/save-survey-result-controller-protocols"
import { AddSurvey, AddSurveyParams } from "../controllers/survey/add-survey/add-survey-controller-protocols"
import { LoadSurveys, SurveyModel } from "../controllers/survey/load-surveys/load-surveys-controller-protocols"

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyParams): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddSurveyStub()
}


export const mockLoad = (): LoadSurveys => {
  class LoadSurveystub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveyModels())
    }
  }
  return new LoadSurveystub()
}


export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById(id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel())
    }
  }
  return new LoadSurveyByIdStub()
}