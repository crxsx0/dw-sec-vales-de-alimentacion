// src/pages/reportes/ReportesVales.jsx
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faSearch, faChartBar } from "@fortawesome/free-solid-svg-icons";

const ReportesVales = () => {
  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    tipoServicio: "",
    estado: ""
  });

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros({
      ...filtros,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para generar el reporte
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Reportes de Vales</h2>

      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="fechaInicio">
                  <Form.Label>Fecha Inicio</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaInicio"
                    value={filtros.fechaInicio}
                    onChange={handleFiltroChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="fechaFin">
                  <Form.Label>Fecha Fin</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaFin"
                    value={filtros.fechaFin}
                    onChange={handleFiltroChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="tipoServicio">
                  <Form.Label>Tipo de Servicio</Form.Label>
                  <Form.Control
                    as="select"
                    name="tipoServicio"
                    value={filtros.tipoServicio}
                    onChange={handleFiltroChange}
                  >
                    <option value="">Todos</option>
                    <option value="Comida">Comida</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Otros">Otros</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="estado">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    as="select"
                    name="estado"
                    value={filtros.estado}
                    onChange={handleFiltroChange}
                  >
                    <option value="">Todos</option>
                    <option value="Emitido">Emitido</option>
                    <option value="Usado">Usado</option>
                    <option value="Vencido">Vencido</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <Button variant="primary" type="submit">
                  <FontAwesomeIcon icon={faSearch} className="me-2" />
                  Generar Reporte
                </Button>
                <Button variant="success" className="ms-2">
                  <FontAwesomeIcon icon={faDownload} className="me-2" />
                  Exportar Excel
                </Button>
              </Col>
            </Row>
          </Form>

          <Row className="mb-4">
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <FontAwesomeIcon icon={faChartBar} size="2x" className="mb-3 text-primary" />
                  <Card.Title>Total Vales Emitidos</Card.Title>
                  <h3>1,234</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <FontAwesomeIcon icon={faChartBar} size="2x" className="mb-3 text-success" />
                  <Card.Title>Vales Utilizados</Card.Title>
                  <h3>987</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <FontAwesomeIcon icon={faChartBar} size="2x" className="mb-3 text-warning" />
                  <Card.Title>Vales Pendientes</Card.Title>
                  <h3>247</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>ID Vale</th>
                <th>Empleado</th>
                <th>Tipo Servicio</th>
                <th>Fecha Emisión</th>
                <th>Fecha Uso</th>
                <th>Estado</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#001</td>
                <td>Juan Pérez</td>
                <td>Comida</td>
                <td>2024-11-24</td>
                <td>2024-11-24</td>
                <td><span className="badge bg-success">Usado</span></td>
                <td>$50.00</td>
              </tr>
              <tr>
                <td>#002</td>
                <td>María García</td>
                <td>Transporte</td>
                <td>2024-11-24</td>
                <td>-</td>
                <td><span className="badge bg-warning">Pendiente</span></td>
                <td>$30.00</td>
              </tr>
              {/* Aquí puedes agregar más filas de datos */}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReportesVales;