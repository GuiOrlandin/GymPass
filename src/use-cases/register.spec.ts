import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repositiry";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

describe("Register Use Case ", () => {
  it("it should  be able to register", async () => {
    const usersRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "john@gmail.com",
      password: "1234567",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
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
    const usersRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({
      name: "John Doe",
      email: "john@gmail.com",
      password: "1234567",
    });

    await expect(() =>
      registerUseCase.execute({
        name: "John Doe",
        email: "john@gmail.com",
        password: "1234567",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
