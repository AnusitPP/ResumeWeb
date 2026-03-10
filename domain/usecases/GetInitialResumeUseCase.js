export class GetInitialResumeUseCase {
  /**
   * @param {import('../repositories/IResumeRepository').IResumeRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  async execute() {
    return await this.repository.getResumeData();
  }
}
