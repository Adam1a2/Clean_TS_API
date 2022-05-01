import { SaveSurveyResultRepository } from "@/data/protocols/db/survey-result/save-survey-result-repository"
import { SaveSurveyResultParams, SurveyResultModel } from "@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols"
import { mockSurveyResultModel } from "@/domain/test"
import { LoadSurveyResultRepository } from "../protocols/db/survey-result/load-survey-result-repository"

export const mockSaveSurveyResultRepositoryStub = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel>{
      return await new Promise(resolve=> resolve(mockSurveyResultModel()))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

export const mockLoadSurveyResultRepositoryStub = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<SurveyResultModel>{
      return await new Promise(resolve=> resolve(mockSurveyResultModel()))
    }
    
  }
  return new LoadSurveyResultRepositoryStub()
}