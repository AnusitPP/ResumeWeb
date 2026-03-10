/**
 * Interface for Resume Repository
 */
export class IResumeRepository {
  /**
   * Fetch the resume data
   * @returns {Promise<import('../entities/ResumeEntity').ResumeEntity>}
   */
  async getResumeData() {
    throw new Error("Method not implemented");
  }
}
