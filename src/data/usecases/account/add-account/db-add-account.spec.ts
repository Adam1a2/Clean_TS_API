import { AccountModel, AddAccountRepository, Hasher, LoadAccountByEmailRepository } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'
import { mockAccountModel, mockAddAccountParams, throwError } from '@/domain/test'
import { mockAddAccountRepository, mockHasher } from '@/data/test'

type SutTypes = {
  sut: DbAddAccount
  encrypterStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = mockHasher()
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'hash')
    await sut.add(mockAddAccountParams())
    expect(encryptSpy).toHaveBeenCalledWith('any_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(mockAddAccountParams())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'hashed_password'
    })
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should returns an account on sucess', async () => {
    const { sut } = makeSut()
    const account = await sut.add(mockAddAccountParams())
    expect(account).toEqual(mockAccountModel())
  })

  test('Should returns null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(mockAccountModel())))
    const account = await sut.add(mockAddAccountParams())
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockAddAccountParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
