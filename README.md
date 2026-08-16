# Url Shortner

## API Features

### Auth
- `LoginAsync(LoginDto dto)`: Authenticates the user via ASP.NET Identity, using `SignInManager` to sign in with a cookie.
- `LogoutAsync()`: Signs the user out via ASP.NET Identity's `SignOutManager`.
- `RegisterAsync(RegisterDto)`: Register a user, add to role, and send email confirmation link

### Common
- `Result<T> Pattern`: Wraps success/failure state with data or error details, avoiding exception-based flow.

### Data
- `DataSeeder`: Seeds fake data for entities using the Bogus library.
---
## Run Database Migrations

Run these commands from the **solution root**.

**Add a migration:**

```powershell
dotnet ef migrations add Mig_1 `
  --project .\DataAccess\DataAccess.csproj `
  --startup-project .\API\API.csproj
```

**Apply migrations:**

```powershell
dotnet ef database update `
  --project .\DataAccess\DataAccess.csproj `
  --startup-project .\API\API.csproj
```
