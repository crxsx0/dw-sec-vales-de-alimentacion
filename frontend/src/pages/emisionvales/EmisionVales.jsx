// src/pages/emisionvales/EmisionVales.jsx

import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

const EmisionVales = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    servicio: '',
    cantidad: 1
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes añadir la lógica para emitir el vale
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <Container className="mt-4">
      <h2>Emisión de Vales</h2>
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          ¡Vale emitido con éxito!
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
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
          <Col>
            <Form.Group controlId="formServicio">
              <Form.Label>Servicio</Form.Label>
              <Form.Control
                as="select"
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un servicio</option>
                <option value="Comida">Comida</option>
                <option value="Transporte">Transporte</option>
                <option value="Otros">Otros</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formCantidad">
              <Form.Label>Cantidad</Form.Label>
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
        </Row>
        <Button variant="primary" type="submit">
          Emitir Vale
        </Button>
      </Form>
    </Container>
  );
};

export default EmisionVales;