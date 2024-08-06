import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header';
import { Container, Row, Col, FormGroup, Form, Button } from 'react-bootstrap';
import estilos from '../css/estilos.module.css'
import { setDetalle } from '../reducers';

/*
const [formData, setFormData] = useState({
    titulo: datos.titulo,
});
*/

const Updatebook = () => {
    let datos = useSelector(state => state.bibloAPP.detalle)
    let disp = useDispatch();
    console.log(datos);

    useEffect(() => {
        console.log('Form Data Updated:', datos);
    }, [datos]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        disp(setDetalle({
            ...datos,
            [name]: value,
        }));
    };


    return (
        <div >
            <Header />
            <div className={estilos.caja}>
                <Container>
                    <Row className="justify-content-lg-center">
                        <Col>
                            <Form className={estilos.contenedor}>
                                <h3>Actualizar material bibliografico</h3>
                                <Row>

                                    <Form.Group className="mb-3" controlId="" as={Col}>
                                        <Form.Label>Tipo de material</Form.Label>
                                        <Form.Select name="tipo" onChange={handleChange} value={datos.tipo || ''}>
                                            <option value="libro">Libro</option>
                                            <option value="revista">Revista</option>
                                            <option value="articulo">Articulo</option>
                                            <option value="video">Video</option>
                                            <option value="audio">Audio</option>
                                        </Form.Select>

                                    </Form.Group>
                                    <FormGroup className="mb-3" controlId="" as={Col}>
                                        <Form.Label>Tipografico</Form.Label>
                                        <Form.Control type="text" onChange={handleChange} value={datos.topografico || ''} />
                                    </FormGroup>

                                </Row>
                                <FormGroup className="mb-3" controlId="">
                                    <Form.Label>Titulo</Form.Label>
                                    <Form.Control type="text" name='titulo' onChange={handleChange} value={datos.titulo || ''} />
                                </FormGroup>
                                <FormGroup className="mb-3" controlId="">
                                    <Form.Label>Autores</Form.Label>
                                    <Form.Control type="text" name='autores' onChange={handleChange} value={datos.autores || ''} />
                                </FormGroup>
                                <Row>
                                    <FormGroup className="mb-3" controlId="" as={Col}>
                                        <Form.Label>Editorial</Form.Label>
                                        <Form.Control type="text" name='editorial' onChange={handleChange} value={datos.editorial || ''} />
                                    </FormGroup>
                                    <FormGroup className="mb-3" controlId="" as={Col}>
                                        <Form.Label>ISBN</Form.Label>
                                        <Form.Control type="text" name='isbn' onChange={handleChange} value={datos.isbn || ''} />
                                    </FormGroup>
                                </Row>
                                <Row>
                                    <FormGroup className="mb-3" controlId="" as={Col}>
                                        <Form.Label>Paginas</Form.Label>
                                        <Form.Control type="number" name='paginas' onChange={handleChange} value={datos.paginas || ''} />
                                    </FormGroup>
                                    <FormGroup className="mb-3" controlId="" as={Col}>
                                        <Form.Label>Ejemplares</Form.Label>
                                        <Form.Control type="number" name='ejemplares' onChange={handleChange} value={datos.ejemplares || ''} />
                                    </FormGroup>
                                </Row>
                                <FormGroup className="mb-3" controlId="">
                                    <Form.Label>Resumen</Form.Label>
                                    <Form.Control as="textarea" rows={5} name='resumen' onChange={handleChange} value={datos.resumen || ''} />
                                </FormGroup>
                                <FormGroup className="mb-3" controlId="">
                                    <Form.Label>Tema</Form.Label>
                                    <Form.Control type="text" name='tema' onChange={handleChange} value={datos.tema || ''} />
                                </FormGroup>
                                <div>
                                    <Button type='submit'>Enviar</Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div >
    )
}

export default Updatebook