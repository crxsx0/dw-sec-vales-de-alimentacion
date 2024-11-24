import React, { useState } from "react";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Form,
  Modal,
  Card,
  Badge,
  Alert,
  InputGroup
} from "react-bootstrap";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaClock,
  FaUtensils,
  FaSearch,
  FaSave,
  FaTimes,
  FaCalendarAlt
} from "react-icons/fa";

const Servicios = () => {
  const [servicios, setServicios] = useState([
    {
      id: 1,
      nombre: "Desayuno",
      descripcion: "Servicio de desayuno para empleados",
      horaInicio: "07:00",
      horaFin: "09:30",
      estado: "Activo",
      precio: 2500,
      capacidadMaxima: 50
    },
    {
      id: 2,
      nombre: "Almuerzo",
      descripcion: "Servicio de almuerzo para empleados",
      horaInicio: "12:00",
      horaFin: "14:30",
      estado: "Activo",
      precio: 4500,
      capacidadMaxima: 100
    },
    {
      id: 3,
      nombre: "Once",
      descripcion: "Servicio de once para empleados",
      horaInicio: "16:00",
      horaFin: "17:30",
      estado: "Activo",
      precio: 3000,
      capacidadMaxima: 40
    }
  ]);

  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    horaInicio: "",
    horaFin: "",
    estado: "Activo",
    precio: "",
    capacidadMaxima: ""
  });

  const handleClose = () => {
    setShow(false);
    setEditMode(false);
    setFormData({
      nombre: "",
      descripcion: "",
      horaInicio: "",
      horaFin: "",
      estado: "Activo",
      precio: "",
      capacidadMaxima: ""
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

  const handleEdit = (servicio) => {
    setFormData(servicio);
    setEditMode(true);
    setSelectedService(servicio);
    setShow(true);
  };

  const handleDelete = (servicio) => {
    setSelectedService(servicio);
    setShowDelete(true);
  };

  const confirmDelete = () => {
    setServicios(servicios.filter((s) => s.id !== selectedService.id));
    setShowDelete(false);
    setAlert({
      show: true,
      message: "Servicio eliminado exitosamente",
      variant: "success"
    });
    setTimeout(() => setAlert({ show: false, message: "", variant: "" }), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setServicios(
        servicios.map((servicio) =>
          servicio.id === selectedService.id ? { ...formData } : servicio
        )
      );
      setAlert({
        show: true,
        message: "Servicio actualizado exitosamente",
        variant: "success"
      });
    } else {
      setServicios([
        ...servicios,
        { ...formData, id: servicios.length + 1 }
      ]);
      setAlert({
        show: true,
        message: "Servicio añadido exitosamente",
        variant: "success"
      });
    }
    handleClose();
    setTimeout(() => setAlert({ show: false, message: "", variant: "" }), 3000);
  };

  const filteredServicios = servicios.filter(
    (servicio) =>
      servicio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="mt-4 px-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Row className="align-items-center mb-4">
            <Col>
              <h2 className="mb-0">Gestión de Servicios</h2>
            </Col>
            <Col xs="auto">
              <Button variant="success" onClick={handleShow}>
                <FaPlus className="me-2" />
                Nuevo Servicio
              </Button>
            </Col>
          </Row>

          {alert.show && (
            <Alert
              variant={alert.variant}
              onClose={() => setAlert({ show: false })}
              dismissible
            >
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
                  placeholder="Buscar servicios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>

          <Table responsive striped bordered hover>
            <thead className="bg-light">
              <tr>
                <th>Servicio</th>
                <th>Descripción</th>
                <th>Horario</th>
                <th>Estado</th>
                <th>Precio</th>
                <th>Capacidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredServicios.map((servicio) => (
                <tr key={servicio.id}>
                  <td>
                    <FaUtensils className="me-2" />
                    {servicio.nombre}
                  </td>
                  <td>{servicio.descripcion}</td>
                  <td>
                    <FaClock className="me-2" />
                    {servicio.horaInicio} - {servicio.horaFin}
                  </td>
                  <td>
                    <Badge bg={servicio.estado === "Activo" ? "success" : "danger"}>
                      {servicio.estado}
                    </Badge>
                  </td>
                  <td>${servicio.precio}</td>
                  <td>{servicio.capacidadMaxima} personas</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(servicio)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(servicio)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal para Agregar/Editar Servicio */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? "Editar Servicio" : "Nuevo Servicio"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formNombre">
                  <Form.Label>Nombre del Servicio</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaUtensils />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Ingresa el nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEstado">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formDescripcion" className="mt-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingresa la descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId="formHoraInicio">
                  <Form.Label>Hora de Inicio</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaClock />
                    </InputGroup.Text>
                    <Form.Control
                      type="time"
                      name="horaInicio"
                      value={formData.horaInicio}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formHoraFin">
                  <Form.Label>Hora de Fin</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaClock />
                    </InputGroup.Text>
                    <Form.Control
                      type="time"
                      name="horaFin"
                      value={formData.horaFin}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId="formPrecio">
                  <Form.Label>Precio</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="precio"
                      value={formData.precio}
                      onChange={handleChange}
                      required
                      min="0"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formCapacidadMaxima">
                  <Form.Label>Capacidad Máxima</Form.Label>
                  <Form.Control
                    type="number"
                    name="capacidadMaxima"
                    value={formData.capacidadMaxima}
                    onChange={handleChange}
                    required
                    min="1"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="mt-4 text-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                <FaTimes className="me-2" />
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                <FaSave className="me-2" />
                {editMode ? "Guardar Cambios" : "Crear Servicio"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal de Confirmación de Eliminación */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro que desea eliminar el servicio "{selectedService?.nombre}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Servicios;