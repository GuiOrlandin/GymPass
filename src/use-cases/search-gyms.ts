import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface SearchGymsUseCaseRequest {
  query: string;
  page: number;
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  constructor(private gymseRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymseRepository.searchMany(query, page);

    return {
      gyms,
    };
  }
}
