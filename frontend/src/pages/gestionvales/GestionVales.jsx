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
  Pagination,
} from "react-bootstrap";

import { FaPlus, FaTrash, FaEdit, FaSearch, FaFilter } from 'react-icons/fa';

const GestionVales = () => {
  const [vales, setVales] = useState([]);
  const [show, setShow] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    nombre: "",
    servicio: "",
    cantidad: 1,
    fecha: new Date().toISOString().split('T')[0],
    estado: "Pendiente",
    descripcion: ""
  });

  const valesPerPage = 5;
  const indexOfLastVale = currentPage * valesPerPage;
  const indexOfFirstVale = indexOfLastVale - valesPerPage;
  const currentVales = vales.slice(indexOfFirstVale, indexOfLastVale);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVales([...vales, { ...formData, id: Date.now() }]);
    setFormData({ 
      nombre: "", 
      servicio: "", 
      cantidad: 1,
      fecha: new Date().toISOString().split('T')[0],
      estado: "Pendiente",
      descripcion: ""
    });
    setAlert({
      show: true,
      message: 'Vale agregado exitosamente',
      variant: 'success'
    });
    setTimeout(() => setAlert({ show: false, message: '', variant: '' }), 3000);
    handleClose();
  };

  const handleDelete = (id) => {
    setVales(vales.filter(vale => vale.id !== id));
    setAlert({
      show: true,
      message: 'Vale eliminado exitosamente',
      variant: 'danger'
    });
    setTimeout(() => setAlert({ show: false, message: '', variant: '' }), 3000);
  };

  const filteredVales = vales.filter(vale =>
    vale.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vale.servicio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generar páginas para la paginación
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(vales.length / valesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container fluid className="mt-4 px-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Row className="align-items-center mb-4">
            <Col>
              <h2 className="mb-0">Gestión de Vales</h2>
            </Col>
            <Col xs="auto">
              <Button variant="success" onClick={handleShow}>
                <FaPlus /> Nuevo Vale
              </Button>
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
                  placeholder="Buscar vales..."
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
                      <Form.Label>Estado</Form.Label>
                      <Form.Select>
                        <option value="">Todos</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Aprobado">Aprobado</option>
                        <option value="Rechazado">Rechazado</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Fecha Desde</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Fecha Hasta</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}

          <Table responsive striped bordered hover className="mb-0">
            <thead className="bg-light">
              <tr>
                <th>ID</th>
                <th>Nombre del Empleado</th>
                <th>Servicio</th>
                <th>Cantidad</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentVales.map((vale) => (
                <tr key={vale.id}>
                  <td>#{vale.id}</td>
                  <td>{vale.nombre}</td>
                  <td>{vale.servicio}</td>
                  <td>${vale.cantidad}</td>
                  <td>{vale.fecha}</td>
                  <td>
                    <Badge bg={
                      vale.estado === 'Pendiente' ? 'warning' :
                      vale.estado === 'Aprobado' ? 'success' : 'danger'
                    }>
                      {vale.estado}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="info" size="sm" className="me-2">
                      <FaEdit />
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleDelete(vale.id)}
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
              Mostrando {indexOfFirstVale + 1} a {Math.min(indexOfLastVale, vales.length)} de {vales.length} registros
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
                onClick={() => setCurrentPage(curr => Math.min(curr + 1, Math.ceil(vales.length / valesPerPage)))}
                disabled={currentPage === Math.ceil(vales.length / valesPerPage)}
              />
              <Pagination.Last onClick={() => setCurrentPage(Math.ceil(vales.length / valesPerPage))} />
            </Pagination>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Vale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formNombre">
                  <Form.Label>Nombre del Empleado</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa el nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formServicio">
                  <Form.Label>Servicio</Form.Label>
                  <Form.Select
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona un servicio</option>
                    <option value="Desayuno">Desayuno</option>
                    <option value="Almuerzo">Almuerzo</option>
                    <option value="Once">Once</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId="formCantidad">
                  <Form.Label>Cantidad ($)</Form.Label>
                  <Form.Control
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formFecha">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formDescripcion" className="mt-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Ingresa una descripción detallada..."
              />
            </Form.Group>

            <div className="mt-4 text-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar Vale
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default GestionVales;