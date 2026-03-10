import { GetInitialResumeUseCase } from "~/domain/usecases/GetInitialResumeUseCase.js";
import { MockResumeRepository } from "~/data/repositories/MockResumeRepository.js";
import { ResumeEntity } from "~/domain/entities/ResumeEntity.js";

export function useResume() {
  const resumeData = ref(new ResumeEntity());
  const isLoading = ref(true);

  // Use dependency injection conceptually
  const repository = new MockResumeRepository();
  const getResumeUseCase = new GetInitialResumeUseCase(repository);

  const loadData = async () => {
    isLoading.value = true;
    try {
      const data = await getResumeUseCase.execute();
      resumeData.value = data;
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    loadData();
  });

  return {
    resumeData,
    isLoading,
  };
}
