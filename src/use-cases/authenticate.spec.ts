import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repositiry";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUserRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case ", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "john@gmail.com",
      password_hash: await hash("1234567", 6),
    });

    const { user } = await sut.execute({
      email: "john@gmail.com",
      password: "1234567",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "john@gmail.com",
        password: "1234567",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "john@gmail.com",
      password_hash: await hash("1234567", 6),
    });

    await expect(() =>
      sut.execute({
        email: "john@gmail.com",
        password: "12341234124",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
