/* eslint-disable no-unused-vars */

export enum Role {
  Administrador = 1,
  Analista = 2,
  Gerente = 3,
  Desarrollador = 4
}

export function getRoleName(roleEnum: Role) {
  let role: string;

  switch (roleEnum) {
    case Role.Administrador:
      role = 'Administrador';
      break;
    case Role.Analista:
      role = 'Analista';
      break;
    case Role.Gerente:
      role = 'Gerente';
      break;
    case Role.Desarrollador:
      role = 'Desarrollador';
      break;
    default:
      role = 'Desarrollador';
      break;
  }

  return role;
}
