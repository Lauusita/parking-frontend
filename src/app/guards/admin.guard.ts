import { CanActivateFn, Router } from "@angular/router";
// import { LoggedUser } from "../interfaces";
import { inject } from "@angular/core";

export const adminGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('user')!) as any

  const router = inject(Router)

  if (user.role === "ADMIN") return true

  router.navigateByUrl('/app/movies')
  
  return false
}