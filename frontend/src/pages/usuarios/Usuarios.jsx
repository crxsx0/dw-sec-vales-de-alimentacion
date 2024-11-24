// src/pages/usuarios/Usuarios.jsx

import React, { useState } from "react";
import { 
  Table, 
  Button, 
  Container, 
  Row, 
  Col, 
  Form, 
  Modal, 
  Badge, 
  Card,
  Alert,
  InputGroup,
  Pagination
} from "react-bootstrap";
import { 
  FaTrash, 
  FaEdit, 
  FaSearch, 
  FaFilter, 
  FaSave, 
  FaEye, 
  FaUserPlus,
  FaUserCog,
  FaBuilding,
  FaEnvelope,
  FaIdCard,
  FaClock
} from 'react-icons/fa';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([
    {
      id: "507f1f77bcf86cd799439011",
      nombre: "Juan Pérez",
      codigoEmpleado: "EMP001",
      password: "********",
      rol: "ADMIN",
      email: "juan.perez@empresa.com",
      turnoActual: 1,
      sucursal: "Central"
    },
    {
      id: "507f1f77bcf86cd799439012",
      nombre: "María González",
      codigoEmpleado: "EMP002",
      password: "********",
      rol: "USUARIO",
      email: "maria.gonzalez@empresa.com",
      turnoActual: 2,
      sucursal: "Norte"
    }
  ]);

  const [show, setShow] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    codigoEmpleado: "",
    password: "",
    rol: "USUARIO",
    email: "",
    turnoActual: 1,
    sucursal: ""
  });

  const rolesDisponibles = ["ADMIN", "USUARIO", "SUPERVISOR"];
  const turnosDisponibles = [1, 2, 3];
  const sucursalesDisponibles = ["Central", "Norte", "Sur", "Este", "Oeste"];

  const usuariosPorPagina = 5;
  const indexOfLastUser = currentPage * usuariosPorPagina;
  const indexOfFirstUser = indexOfLastUser - usuariosPorPagina;
  const currentUsuarios = usuarios.slice(indexOfFirstUser, indexOfLastUser);

  const handleClose = () => {
    setShow(false);
    setEditMode(false);
    setFormData({
      nombre: "",
      codigoEmpleado: "",
      password: "",
      rol: "USUARIO",
      email: "",
      turnoActual: 1,
      sucursal: ""
    });
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = (usuario) => {
    setSelectedUser(usuario);
    setFormData({
      ...usuario,
      password: "" // No mostramos la contraseña actual por seguridad
    });
    setEditMode(true);
    setShow(true);
  };

  const handlePreview = (usuario) => {
    setSelectedUser(usuario);
    setShowPreview(true);
  };

  const handleDelete = (id) => {
    setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    setAlert({
      show: true,
      message: 'Usuario eliminado exitosamente',
      variant: 'danger'
    });
    setTimeout(() => setAlert({ show: false }), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setUsuarios(usuarios.map(usuario => 
        usuario.id === formData.id ? { 
          ...formData,
          password: formData.password || usuario.password // Mantener la contraseña anterior si no se cambió
        } : usuario
      ));
      setAlert({
        show: true,
        message: 'Usuario actualizado exitosamente',
        variant: 'success'
      });
    }
    setTimeout(() => setAlert({ show: false }), 3000);
    handleClose();
  };

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.codigoEmpleado.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generar páginas para la paginación
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(usuarios.length / usuariosPorPagina); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container fluid className="mt-4 px-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Row className="align-items-center mb-4">
            <Col>
              <h2 className="mb-0">Gestión de Usuarios</h2>
            </Col>
          </Row>

          {alert.show && (
            <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
              {alert.message}
            </Alert>
          )}

          <Row className="mb-3">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <Button variant="outline-secondary" onClick={() => setShowFilter(!showFilter)}>
                <FaFilter /> Filtros
              </Button>
            </Col>
          </Row>

          {showFilter && (
            <Card className="mb-3">
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Rol</Form.Label>
                      <Form.Select>
                        <option value="">Todos</option>
                        {rolesDisponibles.map(rol => (
                          <option key={rol} value={rol}>{rol}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Sucursal</Form.Label>
                      <Form.Select>
                        <option value="">Todas</option>
                        {sucursalesDisponibles.map(sucursal => (
                          <option key={sucursal} value={sucursal}>{sucursal}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Turno</Form.Label>
                      <Form.Select>
                        <option value="">Todos</option>
                        {turnosDisponibles.map(turno => (
                          <option key={turno} value={turno}>Turno {turno}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}

          <Table responsive striped bordered hover className="mb-0">
            <thead className="bg-light">
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Turno</th>
                <th>Sucursal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentUsuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.codigoEmpleado}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>
                    <Badge bg={
                      usuario.rol === 'ADMIN' ? 'danger' :
                      usuario.rol === 'SUPERVISOR' ? 'warning' : 'info'
                    }>
                      {usuario.rol}
                    </Badge>
                  </td>
                  <td>Turno {usuario.turnoActual}</td>
                  <td>{usuario.sucursal}</td>
                  <td>
                    <Button 
                      variant="info" 
                      size="sm" 
                      className="me-2"
                      onClick={() => handleEdit(usuario)}
                    >
                      <FaEdit />
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="me-2"
                      onClick={() => handlePreview(usuario)}
                    >
                      <FaEye />
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleDelete(usuario.id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              Mostrando {indexOfFirstUser + 1} a {Math.min(indexOfLastUser, usuarios.length)} de {usuarios.length} usuarios
            </div>
            <Pagination>
              <Pagination.First onClick={() => setCurrentPage(1)} />
              <Pagination.Prev 
                onClick={() => setCurrentPage(curr => Math.max(curr - 1, 1))}
                disabled={currentPage === 1}
              />
              {pageNumbers.map(number => (
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </Pagination.Item>
              ))}
              <Pagination.Next 
                onClick={() => setCurrentPage(curr => 
                  Math.min(curr + 1, Math.ceil(usuarios.length / usuariosPorPagina))
                )}
                disabled={currentPage === Math.ceil(usuarios.length / usuariosPorPagina)}
              />
              <Pagination.Last 
                onClick={() => setCurrentPage(Math.ceil(usuarios.length / usuariosPorPagina))} 
              />
            </Pagination>
          </div>
        </Card.Body>
      </Card>

      {/* Modal de Edición */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? 'Editar Usuario' : 'Detalles del Usuario'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formNombre">
                  <Form.Label>Nombre Completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formCodigoEmpleado">
                  <Form.Label>Código de Empleado</Form.Label>
                  <Form.Control
                    type="text"
                    name="codigoEmpleado"
                    value={formData.codigoEmpleado}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPassword">
                  <Form.Label>Contraseña {editMode && '(Dejar en blanco para mantener)'}</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    {...(!editMode && { required: true })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={4}>
                <Form.Group controlId="formRol">
                  <Form.Label>Rol</Form.Label>
                  <Form.Select
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    required
                  >
                    {rolesDisponibles.map(rol => (
                      <option key={rol} value={rol}>{rol}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formTurno">
                  <Form.Label>Turno Actual</Form.Label>
                  <Form.Select
                    name="turnoActual"
                    value={formData.turnoActual}
                    onChange={handleChange}
                    required
                  >
                    {turnosDisponibles.map(turno => (
                      <option key={turno} value={turno}>Turno {turno}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formSucursal">
                  <Form.Label>Sucursal</Form.Label>
                  <Form.Select
                    name="sucursal"
                    value={formData.sucursal}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione una sucursal</option>
                    {sucursalesDisponibles.map(sucursal => (
                      <option key={sucursal} value={sucursal}>{sucursal}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="mt-4 text-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Cancelar
              </Button>
              {editMode && (
                <Button variant="primary" type="submit">
                  <FaSave className="me-2" />
                  Guardar Cambios
                </Button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal de Vista Previa */}
      <Modal show={showPreview} onHide={() => setShowPreview(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaUserCog className="me-2" />
            Detalles del Usuario
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div className="user-details">
              <p>
                <FaIdCard className="me-2" />
                <strong>Código de Empleado:</strong> {selectedUser.codigoEmpleado}
              </p>
              <p>
                <FaUserCog className="me-2" />
                <strong>Nombre:</strong> {selectedUser.nombre}
              </p>
              <p>
                <FaEnvelope className="me-2" />
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <FaUserCog className="me-2" />
                <strong>Rol:</strong>{' '}
                <Badge bg={
                  selectedUser.rol === 'ADMIN' ? 'danger' :
                  selectedUser.rol === 'SUPERVISOR' ? 'warning' : 'info'
                }>
                  {selectedUser.rol}
                </Badge>
              </p>
              <p>
                <FaClock className="me-2" />
                <strong>Turno Actual:</strong> Turno {selectedUser.turnoActual}
              </p>
              <p>
                <FaBuilding className="me-2" />
                <strong>Sucursal:</strong> {selectedUser.sucursal}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPreview(false)}>
            Cerrar
          </Button>
          <Button 
            variant="info" 
            onClick={() => {
              setShowPreview(false);
              handleEdit(selectedUser);
            }}
          >
            <FaEdit className="me-2" />
            Editar Usuario
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Usuarios;