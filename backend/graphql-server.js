import { gql, ApolloServer } from "apollo-server";
import axios from "axios";
import config from "./config/config.js";

const URL_API = `http://localhost:${config.PORT_API_SERVER}`;

const typeDefs = gql`
    type Usuario {
        _id: ID!
        nombre: String!
        codigoEmpleado: String!
        password: String!
        rol: String!
        turnos: Turno
        vales: [Vale]
        email: String!
        perfil: String!
        turnoActual: Int!
        sucursal: String!
    }

    type Vale {
        _id: ID!
        tipoServicio: String!
        estado: String!
        fechaEmision: String!
        fechaUso: String
        ubicacionUso: String
        usuarioAutorizado: Usuario!
    }

    type Servicio {
        _id: ID!
        tipoServicio: String!
        descripcion: String!
        valor: Int!
    }

    type Transaccion {
        _id: ID!
        codigoVale: Vale!
        fechaTransaccion: String!
        ubicacion: String!
    }

    type Turno {
        _id: ID!
        turno: Int!
        periodo: String!
        sucursal: String!
    }

    type Auditoria {
        _id: ID!
        usuarioId: Usuario!
        valesEmitidos: Int!
        valesUtilizados: Int!
        valesNoUtilizados: Int!
        periodo: String!
    }

    type Informe {
        _id: ID!
        servicios: [Servicio]!
    }

    type Mutation {
        crearUsuario(
            nombre: String!
            codigoEmpleado: String!
            password: String!
            rol: String!
            email: String!
            perfil: String!
            turnoActual: Int!
            sucursal: String!
        ): Usuario!
    
        editarUsuario(
            id: ID!
            nombre: String
            codigoEmpleado: String
            password: String
            rol: String
            email: String
            perfil: String
            turnoActual: Int
            sucursal: String
        ): Usuario!

        eliminarUsuario(id: ID!): Usuario!

        crearVale(
            tipoServicio: String!
            estado: String!
            fechaEmision: String!
            fechaUso: String
            ubicacionUso: String
            usuarioAutorizado: ID!
        ): Vale!

        editarVale(
            id: ID!
            tipoServicio: String
            estado: String
            fechaEmision: String
            fechaUso: String
            ubicacionUso: String
            usuarioAutorizado: ID
        ): Vale!

        eliminarVale(id: ID!): Vale!

        crearServicio(
            tipoServicio: String!
            descripcion: String!
            valor: Int!
        ): Servicio!

        editarServicio(
            id: ID!
            tipoServicio: String
            descripcion: String
            valor: Int
        ): Servicio!

        eliminarServicio(id: ID!): Servicio!

        crearTurno(
            turno: Int!
            periodo: String!
            sucursal: String!
        ): Turno!

        editarTurno(
            id: ID!
            turno: Int
            periodo: String
            sucursal: String
        ): Turno!

        eliminarTurno(id: ID!): Turno!

        crearTransaccion(
            codigoVale: ID!
            fechaTransaccion: String!
            ubicacion: String!
        ): Transaccion!

        editarTransaccion(
            id: ID!
            codigoVale: ID
            fechaTransaccion: String
            ubicacion: String
        ): Transaccion!

        eliminarTransaccion(id: ID!): Transaccion!

        crearAuditoria(
            usuarioId: ID!
        ): Auditoria!

        editarAuditoria(
            id: ID!
            usuarioId: ID
            valesEmitidos: Int
            valesUtilizados: Int
            valesNoUtilizados: Int
            periodo: String
        ): Auditoria!

        eliminarAuditoria(id: ID!): Auditoria!

    }

    type Query {
        obtenerUsuarios: [Usuario]!,
        findUserById(id: ID!): Usuario!
        obtenerTurnos: [Turno]!
        obtenerServicios: [Servicio]!
        obtenerAuditorias: [Auditoria]!
        obtenerTransacciones: [Transaccion]!
        obtenerVales: [Vale]!
    }
`

const resolvers = {
    Query: {
        obtenerUsuarios: async () => {
            const { data: usuariosAPI } = await axios.get(`${URL_API}/usuarios`);
            return usuariosAPI;
        },
        
        findUserById: async (_, { id }) => {
            const { data: usuarioAPI } = await axios.get(`${URL_API}/usuarios/${id}`);
            return usuarioAPI;
        },

        obtenerTurnos: async () => {
            const { data: turnosAPI } = await axios.get(`${URL_API}/turnos`);
            return turnosAPI;
        },

        obtenerServicios: async () => {
            const { data: serviciosAPI } = await axios.get(`${URL_API}/servicios`);
            return serviciosAPI;
        },

        obtenerAuditorias: async (_, args, {token}) => {
            const { data: auditoriasAPI } = await axios.get(`${URL_API}/auditorias`, {
                headers: {
                    'token': token
                }
            });

            return auditoriasAPI;
        },

        obtenerTransacciones: async (_, args, {token} ) => {
            const { data: transaccionesAPI } = await axios.get(`${URL_API}/transacciones`, {
                headers: {
                    'token': token
                }
            }
            );
            return transaccionesAPI;
        },

        obtenerVales: async () => {
            const { data: valesAPI } = await axios.get(`${URL_API}/vales`);
            return valesAPI;
        }

    },

    Mutation: {
        // Usuario
        crearUsuario: async (_, { nombre, codigoEmpleado, password, rol, email, perfil, turnoActual, sucursal }, { token }) => { 
            const { data: usuarioAPI } = await axios.post(`${URL_API}/usuarios`, {
                nombre,
                codigoEmpleado,
                password,
                rol,
                email,
                perfil,
                turnoActual,
                sucursal
            }, {
                headers: {
                    'token': token
                }
            });

            return usuarioAPI;
        },

        editarUsuario: async (_, { id, nombre, codigoEmpleado, password, rol, email, perfil, turnoActual, sucursal }, {token}) => {
            const { data: usuarioAPI } = await axios.put(`${URL_API}/usuarios/${id}`, {
                nombre,
                codigoEmpleado,
                password,
                rol,
                email,
                perfil,
                turnoActual,
                sucursal
            }, {
                headers: {
                    'token': token
                }
            });

            return usuarioAPI;
        },

        eliminarUsuario: async (_, { id }, {token}) => {
            const { data: usuarioAPI } = await axios.delete(`${URL_API}/usuarios/${id}`, {
                headers: {
                    'token': token
                }
            });

            return usuarioAPI;
        },
        // Vales
        crearVale: async (_, { tipoServicio, estado, fechaEmision, fechaUso, ubicacionUso, usuarioAutorizado }, { token }) => {
            const { data: valeAPI } = await axios.post(`${URL_API}/vales`, {
                tipoServicio,
                estado,
                fechaEmision,
                fechaUso,
                ubicacionUso,
                usuarioAutorizado
            }, {
                headers: {
                    'token': token
                }
            });

            return valeAPI;
        },

        editarVale: async (_, { id, tipoServicio, estado, fechaEmision, fechaUso, ubicacionUso, usuarioAutorizado }, { token }) => {
            const { data: valeAPI } = await axios.put(`${URL_API}/vales/${id}`, {
                tipoServicio,
                estado,
                fechaEmision,
                fechaUso,
                ubicacionUso,
                usuarioAutorizado
            }, {
                headers: {
                    'token': token
                }
            });

            return valeAPI;
        },

        eliminarVale: async (_, { id }, { token }) => {
            const { data: valeAPI } = await axios.delete(`${URL_API}/vales/${id}`, {
                headers: {
                    'token': token
                }
            });

            return valeAPI;
        },

        //Servicios
        crearServicio: async (_, { tipoServicio, descripcion, valor }, { token }) => {
            const { data: servicioAPI } = await axios.post(`${URL_API}/servicios`, {
                tipoServicio,
                descripcion,
                valor
            }, {
                headers: {
                    'token': token
                }
            });

            return servicioAPI;
        },

        editarServicio: async (_, { id, tipoServicio, descripcion, valor }, { token }) => {
            const { data: servicioAPI } = await axios.put(`${URL_API}/servicios/${id}`, {
                tipoServicio,
                descripcion,
                valor
            }, {
                headers: {
                    'token': token
                }
            });

            return servicioAPI;
        },

        eliminarServicio: async (_, { id }, { token }) => {
            const { data: servicioAPI } = await axios.delete(`${URL_API}/servicios/${id}`, {
                headers: {
                    'token': token
                }
            });

            return servicioAPI;
        },

        // Turnos
        crearTurno: async (_, { turno, periodo, sucursal }, { token }) => {
            const { data: turnoAPI } = await axios.post(`${URL_API}/turnos`, {
                turno,
                periodo,
                sucursal
            }, {
                headers: {
                    'token': token
                }
            });

            return turnoAPI;
        },

        editarTurno: async (_, { id, turno, periodo, sucursal }, { token }) => {
            const { data: turnoAPI } = await axios.put(`${URL_API}/turnos/${id}`, {
                turno,
                periodo,
                sucursal
            }, {
                headers: {
                    'token': token
                }
            });

            return turnoAPI;
        },

        eliminarTurno: async (_, { id }, { token }) => {
            const { data: turnoAPI } = await axios.delete(`${URL_API}/turnos/${id}`, {
                headers: {
                    'token': token
                }
            });

            return turnoAPI;
        },

        // Transacciones
        crearTransaccion: async (_, { codigoVale, fechaTransaccion, ubicacion }, { token }) => {
            const { data: transaccionAPI } = await axios.post(`${URL_API}/transacciones`, {
                codigoVale,
                fechaTransaccion,
                ubicacion
            }, {
                headers: {
                    'token': token
                }
            });

            return transaccionAPI;
        },

        editarTransaccion: async (_, { id, codigoVale, fechaTransaccion, ubicacion }, { token }) => {
            const { data: transaccionAPI } = await axios.put(`${URL_API}/transacciones/${id}`, {
                codigoVale,
                fechaTransaccion,
                ubicacion
            }, {
                headers: {
                    'token': token
                }
            });

            return transaccionAPI;
        },

        eliminarTransaccion: async (_, { id }, { token }) => {
            const { data: transaccionAPI } = await axios.delete(`${URL_API}/transacciones/${id}`, {
                headers: {
                    'token': token
                }
            });

            return transaccionAPI
        },

        // Auditorias

        crearAuditoria: async (_, { usuarioId }, { token }) => {
            
            const { data: valesAPI } = await axios.get(`${URL_API}/vales`);

            const valesEmitidos = valesAPI.filter(vale => vale.usuarioAutorizado === usuarioId).length;

            const valesUtilizados = valesAPI.filter(vale => vale.estado === 'Utilizado').length;

            const valesNoUtilizados = valesAPI.filter(vale => vale.estado === 'No utilizado').length;

            const { data: auditoriaAPI } = await axios.post(`${URL_API}/auditorias`, {
                usuarioId,
                valesEmitidos,
                valesUtilizados,
                valesNoUtilizados
            }, {
                headers: {
                    'token': token
                }
            });

            return auditoriaAPI;
        },

        editarAuditoria: async (_, { id, usuarioId, valesEmitidos, valesUtilizados, valesNoUtilizados, periodo }, { token }) => {
            const { data: auditoriaAPI } = await axios.put(`${URL_API}/auditorias/${id}`, {
                usuarioId,
                valesEmitidos,
                valesUtilizados,
                valesNoUtilizados,
                periodo
            }, {
                headers: {
                    'token': token
                }
            });

            return auditoriaAPI;
        },

        eliminarAuditoria: async (_, { id }, { token }) => {
            const { data: auditoriaAPI } = await axios.delete(`${URL_API}/auditorias/${id}`, {
                headers: {
                    'token': token
                }
            });

            return auditoriaAPI;
        }
    },

    Usuario: {
        turnos: async (usuario) => {
            const { data: turnosAPI } = await axios.get(`${URL_API}/turnos`);

            const turno = turnosAPI.find(turno => turno.turno === usuario.turnoActual);

            return turno;
        },

        vales: async (usuario) => {
            const { data: valesAPI } = await axios.get(`${URL_API}/vales`);

            const vales = valesAPI.filter(vale => vale.usuarioAutorizado === usuario._id);

            return vales;
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.token || '';

        if (!token) {
            throw new Error('Token no proporcionado');
        }

        return { token };
    }
});

server.listen().then(({ url }) => {
    console.log(`Servidor listo en ${url}`);
});
