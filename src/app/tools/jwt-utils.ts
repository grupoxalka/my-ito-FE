import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  sub?: string;        // Subject (usually user ID)
  email?: string;      // Email del usuario
  name?: string;       // Nombre del usuario
  role?: string;       // Rol del usuario
  exp?: number;        // Expiration time
  iat?: number;        // Issued at
  iss?: string;        // Issuer
  [key: string]: any;  // Para otros campos personalizados
}

/**
 * Decodifica un token JWT y devuelve su payload
 * @param token - El token JWT a decodificar
 * @returns El payload decodificado del token
 */
export function decodeToken(token: string): JwtPayload | null {
  try {
    if (!token) {
      console.warn('Token vacío o nulo');
      return null;
    }

    // Remover 'Bearer ' si está presente
    const cleanToken = token.replace('Bearer ', '');
    
    const decoded = jwtDecode<JwtPayload>(cleanToken);
    return decoded;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
}

/**
 * Verifica si un token ha expirado
 * @param token - El token JWT a verificar
 * @returns true si el token ha expirado, false en caso contrario
 */
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error al verificar la expiración del token:', error);
    return true;
  }
}

/**
 * Obtiene información específica del usuario desde el token
 * @param token - El token JWT
 * @returns Información del usuario
 */
export function getUserFromToken(token: string): {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
} | null {
  const decoded = decodeToken(token);
  if (!decoded) return null;

  return {
    id: decoded.sub,
    email: decoded.email,
    name: decoded.name,
    role: decoded.role
  };
}

/**
 * Obtiene el tiempo restante de vida del token en segundos
 * @param token - El token JWT
 * @returns Segundos restantes hasta la expiración, -1 si ya expiró o hay error
 */
export function getTokenTimeRemaining(token: string): number {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) {
      return -1;
    }

    const currentTime = Date.now() / 1000;
    const timeRemaining = decoded.exp - currentTime;
    
    return timeRemaining > 0 ? timeRemaining : -1;
  } catch (error) {
    console.error('Error al calcular el tiempo restante del token:', error);
    return -1;
  }
}
