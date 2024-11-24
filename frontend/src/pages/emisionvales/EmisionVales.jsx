import React, { useState } from "react";
import { 
  Form, 
  Button, 
  Container, 
  Row, 
  Col, 
  Alert, 
  Card,
  InputGroup,
  Table,
  Badge,
  Modal
} from "react-bootstrap";
import { 
  FaUserAlt, 
  FaUtensils, 
  FaCalendarAlt, 
  FaClock, 
  FaPrint,
  FaSave,
  FaTimes
} from 'react-icons/fa';
import { useDashboard } from '../../context/DashboardContext';

const EmisionVales = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    servicio: '',
    cantidad: 1,
    fecha: new Date().toISOString().split('T')[0],
    hora: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    observaciones: ''
  });

  const [valesEmitidos, setValesEmitidos] = useState([]);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', variant: 'success' });
  const [showPreview, setShowPreview] = useState(false);

  const servicios = [
    { id: 'desayuno', nombre: 'Desayuno', horario: '07:00 - 09:30' },
    { id: 'almuerzo', nombre: 'Almuerzo', horario: '12:00 - 14:30' },
    { id: 'once', nombre: 'Once', horario: '16:00 - 17:30' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validarHorarioServicio = (servicio) => {
    const hora = new Date().getHours();
    switch(servicio) {
      case 'Desayuno':
        return hora >= 7 && hora < 9.5;
      case 'Almuerzo':
        return hora >= 12 && hora < 14.5;
      case 'Once':
        return hora >= 16 && hora < 17.5;
      default:
        return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validarHorarioServicio(formData.servicio)) {
      setShowAlert({
        show: true,
        message: 'Fuera del horario permitido para este servicio',
        variant: 'warning'
      });
      return;
    }

    const nuevoVale = {
      ...formData,
      id: Date.now(),
      estado: 'Emitido'
    };

    setValesEmitidos([nuevoVale, ...valesEmitidos]);
    setShowAlert({
      show: true,
      message: '¡Vale emitido con éxito!',
      variant: 'success'
    });

    setFormData({
      nombre: '',
      servicio: '',
      cantidad: 1,
      fecha: new Date().toISOString().split('T')[0],
      hora: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      observaciones: ''
    });

    setTimeout(() => setShowAlert({ show: false, message: '', variant: 'success' }), 3000);
  };

  return (
    <Container fluid className="mt-4 px-4">
      <Row>
        <Col md={8}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h2 className="mb-4">Emisión de Vales</h2>
              {showAlert.show && (
                <Alert 
                  variant={showAlert.variant} 
                  onClose={() => setShowAlert({ ...showAlert, show: false })} 
                  dismissible
                >
                  {showAlert.message}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formNombre">
                      <Form.Label>Nombre del Empleado</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaUserAlt />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Ingresa el nombre completo"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formServicio">
                      <Form.Label>Tipo de Servicio</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaUtensils />
                        </InputGroup.Text>
                        <Form.Select
                          name="servicio"
                          value={formData.servicio}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Selecciona un servicio</option>
                          {servicios.map(servicio => (
                            <option key={servicio.id} value={servicio.nombre}>
                              {servicio.nombre} ({servicio.horario})
                            </option>
                          ))}
                        </Form.Select>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group controlId="formFecha">
                      <Form.Label>Fecha</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaCalendarAlt />
                        </InputGroup.Text>
                        <Form.Control
                          type="date"
                          name="fecha"
                          value={formData.fecha}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formHora">
                      <Form.Label>Hora</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaClock />
                        </InputGroup.Text>
                        <Form.Control
                          type="time"
                          name="hora"
                          value={formData.hora}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formCantidad">
                      <Form.Label>Cantidad</Form.Label>
                      <Form.Control
                        type="number"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={handleChange}
                        min="1"
                        max="10"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formObservaciones">
                  <Form.Label>Observaciones</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="observaciones"
                    value={formData.observaciones}
                    onChange={handleChange}
                    placeholder="Ingrese observaciones adicionales si es necesario..."
                  />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit">
                    <FaSave className="me-2" />
                    Emitir Vale
                  </Button>
                  <Button variant="secondary" onClick={() => setShowPreview(true)}>
                    <FaPrint className="me-2" />
                    Vista Previa
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h4>Horarios de Servicios</h4>
              <Table striped bordered hover size="sm" className="mt-3">
                <thead>
                  <tr>
                    <th>Servicio</th>
                    <th>Horario</th>
                  </tr>
                </thead>
                <tbody>
                  {servicios.map(servicio => (
                    <tr key={servicio.id}>
                      <td>{servicio.nombre}</td>
                      <td>{servicio.horario}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mt-4">
            <Card.Body>
              <h4>Últimos Vales Emitidos</h4>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {valesEmitidos.slice(0, 5).map(vale => (
                  <Card key={vale.id} className="mb-2">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{vale.nombre}</strong>
                          <br />
                          <small>{vale.servicio}</small>
                        </div>
                        <Badge bg="success">
                          {vale.cantidad} {vale.cantidad > 1 ? 'vales' : 'vale'}
                        </Badge>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Vista Previa del Vale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-4 border rounded">
            <div className="text-center mb-4">
              <h3>Vale de Consumo</h3>
              <p className="text-muted">#{Date.now()}</p>
            </div>
            <Row className="mb-3">
              <Col md={6}>
                <strong>Empleado:</strong> {formData.nombre}
              </Col>
              <Col md={6}>
                <strong>Servicio:</strong> {formData.servicio}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <strong>Fecha:</strong> {formData.fecha}
              </Col>
              <Col md={6}>
                <strong>Hora:</strong> {formData.hora}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <strong>Cantidad:</strong> {formData.cantidad}
              </Col>
            </Row>
            {formData.observaciones && (
              <Row className="mb-3">
                <Col md={12}>
                  <strong>Observaciones:</strong>
                  <p className="mt-1">{formData.observaciones}</p>
                </Col>
              </Row>
            )}
            <div className="border-top pt-3 mt-3">
              <Row>
                <Col md={6} className="text-center">
                  <div className="mt-4">_________________</div>
                  <div>Firma Empleado</div>
                </Col>
                <Col md={6} className="text-center">
                  <div className="mt-4">_________________</div>
                  <div>Firma Autorizada</div>
                </Col>
              </Row>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPreview(false)}>
            <FaTimes className="me-2" />
            Cerrar
          </Button>
          <Button variant="primary">
            <FaPrint className="me-2" />
            Imprimir
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EmisionVales;