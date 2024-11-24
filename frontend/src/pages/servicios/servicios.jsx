// src/pages/servicios/Servicios.jsx

import React, { useState } from "react";
import { Table, Button, Container, Row, Col, Form, Modal } from "react-bootstrap";

const Servicios = () => {
  const [servicios, setServicios] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
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
    setServicios([...servicios, formData]);
    setFormData({ nombre: "", descripcion: "" });
    handleClose();
  };

  return (
    <Container className="mt-4">
      <h2>Gestión de Servicios</h2>
      <Button variant="primary" onClick={handleShow}>
        Añadir Servicio
      </Button>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Nombre del Servicio</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio, index) => (
            <tr key={index}>
              <td>{servicio.nombre}</td>
              <td>{servicio.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre del Servicio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescripcion" className="mt-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa la descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
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

export default Servicios;