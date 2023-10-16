import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repositiry";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

let usersRepository: InMemoryUserRepository;
let sut: RegisterUseCase;

describe("Register Use Case ", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new RegisterUseCase(usersRepository);
  });
  it("it should  be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "john@gmail.com",
      password: "1234567",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "john@gmail.com",
      password: "1234567",
    });

    const isPasswordCorrectlyHashed = await compare(
      "1234567",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register user with same email twice", async () => {
    await sut.execute({
      name: "John Doe",
      email: "john@gmail.com",
      password: "1234567",
    });

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email: "john@gmail.com",
        password: "1234567",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
