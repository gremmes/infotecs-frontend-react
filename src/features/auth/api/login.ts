interface LoginCredentials {
  username: string;
  password: string;
}

export const simulateLogin = (credentials: LoginCredentials): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.username === "admin" && credentials.password === "admin") {
        resolve("fake-token-" + Date.now());
      } else {
        reject(new Error("Неверный логин или пароль"));
      }
    }, 2000);
  });
};