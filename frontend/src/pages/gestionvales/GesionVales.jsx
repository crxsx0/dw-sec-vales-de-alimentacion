// src/pages/gestionvales/GestionVales.jsx

import React, { useState } from "react";
import { Table, Button, Container, Row, Col, Form, Modal } from "react-bootstrap";

const GestionVales = () => {
  const [vales, setVales] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    servicio: "",
    cantidad: 1,
  });

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
    setVales([...vales, formData]);
    setFormData({ nombre: "", servicio: "", cantidad: 1 });
    handleClose();
  };

  return (
    <Container className="mt-4">
      <h2>Gestión de Vales</h2>
      <Button variant="primary" onClick={handleShow}>
        Añadir Vale
      </Button>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Nombre del Empleado</th>
            <th>Servicio</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {vales.map((vale, index) => (
            <tr key={index}>
              <td>{vale.nombre}</td>
              <td>{vale.servicio}</td>
              <td>{vale.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Vale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
            <Form.Group controlId="formServicio" className="mt-3">
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
            <Form.Group controlId="formCantidad" className="mt-3">
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
            <Button variant="primary" type="submit" className="mt-3">
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default GestionVales;