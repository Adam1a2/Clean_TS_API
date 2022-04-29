import { AddAccount, AddAccountParams, AccountModel, Hasher, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account-protocols'
export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const accountByEmail = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!accountByEmail) {
      const hashedPassword = await this.encrypter.hash(accountData.password)
      const Newaccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
      return Newaccount
    }
    return null
  }
}
