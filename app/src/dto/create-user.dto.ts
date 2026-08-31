/**
 * DTO - Creación de Usuario
 *
 * ---
 * Este DTO representa la información necesaria para crear un nuevo usuario.
 *
 * Un DTO (Data Transfer Object) define el contrato de datos entre el cliente
 * y la API, evitando exponer directamente el modelo de base de datos.
 *
 * Se utiliza para:
 *
 * - Estandarizar los datos que se reciben o envían a través de la API.
 * - Validar y tipar los objetos que entran a los controladores.
 * - Evitar exponer directamente los modelos de la base de datos.
 */

/**
 * Objeto de transferencia de datos para la creación de usuarios.
 *
 * @property {string} efrain - Username.
 * @property {string} password - User password.
 * @property {string} NIT - User NIT.
 * @property {string} email - User email.
 * @property {string} role - this indicates what permission the user has.
 *
 * @example
 * const dto: CreateUserDto = {
 *  name: "efrain",
 *  NIT: "123456789",
 *  password: "dd123"
 *  email: "efrain@gmail.com"
 *  role: "admin"
 * };
 */

export interface CreateUserDto {
    name: string;

    password: string;

    NIT: string;

    email: string;

    role: string;
}
