# Url Shortner

## API Features

### Auth
- `LoginAsync(LoginDto dto)`: Authenticates the user via ASP.NET Identity, using `SignInManager` to sign in with a cookie.
- `LogoutAsync()`: Signs the user out via ASP.NET Identity's `SignOutManager`.
- `RegisterAsync(RegisterDto)`: Register a user, add to role, and send email confirmation link

### Common
- `Result<T> Pattern`: Wraps success/failure state with data or error details, avoiding exception-based flow.
- `PagedList`: Used to retrieve data from the database efficiently, applying pagination based on `PaginationParams`.

### Url 
- `CreateUrlShortCodeAsync(CreateUrlShortCodeDto dto)`: creates a code of 5 digit and add to db.
- `GetUrlByUrlShortCodeAsync(string shortCode)`: Retrives a UrlDto after finding Url by shortCode
- `GeCurrentUserUrls(PaginationParams)`: Retrieves current user urls with in pagedList
- `RedirectFromRouteAsync(string shortCode)`: returns long url and add click count to url.

### User 
- `GetCurrentUserAsync()`: Retrieves the current user by getting the user ID from `IHttpContextAccessor`.

### Data
- `DataSeeder`: Seeds fake data for initial entities

### Click
- `AddClickAsync(string urlId)`: Add +1 click to url
- `GetClicksCountAsync(string urlId)`: Returns the clicks count of an url
---
## Web Features

### Auth
- `RequireAuth`: Guards authorized routes, preventing unauthenticated users from accessing them.
- `LoginForm`: Takes email, password, and isPersistence, it sends them to the backend for validation. Navigates to the dashboard on success.
- `LogoutButton`: Deletes the auth cookie from storage and navigates to the login page.

### App
- `Header`: Uses a ready-made MUI template. Contains the navigation bar. Valid on large screens.
- `TemporaryDrawer`: Uses a ready-made MUI template. Inherits navigation items from `Header`. Valid on small screens.
- `Footer`: Always stays at the bottom of the page. Contains copyright info.
- `Dashboard`: The initial page shown after a user successfully logs in.
- `Router`: Provides the routes of the project with `react-router` libary
### Url
- `CreateUrlShortCodeForm()`: Creating a url short code component.
- `ReadUrlByShortCodeForm()`: Provides a search button and text field. If success shows the Url Information.
- `RedirectToOriginalUrl()`: Takes a short code parameter from the route then redirect to original url
- `CurrentUserUrls()`: Shows the current user urls in pagedList

### Error
- `NotFound`: Shown when the user enters an invalid URL, handled via React Router.
- `ErrorPage`: Shown in case of any error scenario, handled via React Router.

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
