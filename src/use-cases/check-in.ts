import { CheckInsRepository } from "@/repositories/check-ins-respository";
import { CheckIn } from "@prisma/client";

interface CheckInRequest {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(private CheckInsepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.CheckInsepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
