import { CheckInsRepository } from "@/repositories/check-ins-respository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import dayjs from "dayjs";

interface ValidateCheckInUsecaseRequest {
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInsepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUsecaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreated = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );

    if (distanceInMinutesFromCheckInCreated > 20) {
      throw new Error();
    }

    checkIn.validated_at = new Date();

    await this.checkInsepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
