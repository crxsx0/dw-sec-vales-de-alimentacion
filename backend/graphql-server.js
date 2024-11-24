import { gql, ApolloServer } from "apollo-server";
import axios from "axios";

const URL_API = "http://localhost:3000";

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

    type Query {
        obtenerUsuarios: [Usuario]!,
        findUserById(id: ID!): Usuario!
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
});

server.listen().then(({ url }) => {
    console.log(`Servidor listo en ${url}`);
});
