import React, { useState } from 'react'
import { Button, Col, Container, Form, FormGroup, Row } from 'react-bootstrap'
import estilos from '../css/estilos.module.css'
import Header from './Header'
import iAx from '../ConfigAXIOS';


const Createbook = () => {
    const [nuevoAutor, setNuevoAutor] = useState('');
    const [autorSeleccionado, setAutorSeleccionado] = useState('');
    const [tipoMaterial, setTipoMaterial] = useState('');
    const [categoria, setCategoria] = useState('');

    const handleTipoMaterialChange = (event) => {
        setTipoMaterial(event.target.value);
    };

    const handleCategoriaChange = (event) => {
        setCategoria(event.target.value);
    };

    const validarFormulario = async (event) => {
        console.log("Validando el formulario")
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            console.log("Formulario presenta errores")
        } else {

            const datos = {
                topografico: form.elements.topografico.value,
                titulo: form.elements.titulo.value,
                autor: autorSeleccionado,
                material: tipoMaterial,
                isbn: form.elements.isbn.value,
                editorial: form.elements.editorial.value,
                anno: form.elements.anno.value,
                paginas: form.elements.paginas.value,
                ejemplares: form.elements.ejemplares.value,
                resumen: form.elements.resumen.value,
                categoria: categoria
            }

            console.log(JSON.stringify(datos));

            // se guarda el libro
            await crearLibro(datos);
        }

    }

    // Funciones para crear documentos
    const handleCrearAutor = async () => {
        if (nuevoAutor) {
            try {
                const rta = await iAx.post('/autor/addAut', { nombre: nuevoAutor });

                // Verifica si el autor ya existe o si fue creado
                const autorId = rta.data.autorId;
                if (autorId) {
                    // Actualiza el autor seleccionado
                    setAutorSeleccionado(autorId);
                } else {
                    console.log("No se recibió un ID de autor en la respuesta");
                }
            } catch (error) {
                console.log("ERROR: " + error.message);
            }
        }
    };

    async function crearLibro(datos) {
        try {
            // creamos o usamos el documento de material para obtener el ID
            const materialRta = await iAx.post('/material/addMat', { tipo: datos.material });
            const materialId = materialRta.data.materialId;
            datos.material = materialId;  // Actualizamos el ID del material en los datos del libro

            // creamos o usamos el documento de categoria para obtener el ID
            const catRta = await iAx.post('/categoria/addCat', { nombre: datos.categoria });
            const catId = catRta.data.categoriaId;
            datos.categoria = catId;  // Actualizamos el ID de la categria en los datos del libro

            // se crea el libro
            const rta = await iAx.post('/addLibro', datos);
            console.log("RTA: " + (JSON.stringify(rta.data)));
        } catch (error) {
            console.log("ERROR: " + error.message);

        }
    }


    return (

        <div >
            <Header />
            <div className={estilos.caja}>
                <Container>
                    <Row className="justify-content-lg-center">
                        <Col>
                            <Form className={estilos.contenedor} onSubmit={validarFormulario}>
                                <h3>Nuevo material bibliografico</h3>
                                <Row>

                                    <Form.Group className="mb-3" controlId="tipo" as={Col}>
                                        <Form.Label>Tipo de material</Form.Label>
                                        <Form.Select aria-label="Default select example" value={tipoMaterial} onChange={handleTipoMaterialChange}>
                                            <option value="libro">Libro</option>
                                            <option value="revista">Revista</option>
                                            <option value="articulo">Articulo</option>
                                            <option value="video">Video</option>
                                            <option value="audio">Audio</option>
                                        </Form.Select>

                                    </Form.Group>
                                    <FormGroup className="mb-3" as={Col}>
                                        <Form.Label>Topografico</Form.Label>
                                        <Form.Control type="text" id="topografico" name='topografico' placeholder="Topografico" />
                                    </FormGroup>

                                </Row>
                                <FormGroup className="mb-3">
                                    <Form.Label>Titulo</Form.Label>
                                    <Form.Control type="text" id="titulo" name='titulo' placeholder="Titulo" />
                                </FormGroup>


                                <FormGroup className="mb-3">
                                    <Row>
                                        <Form.Label>Autor</Form.Label>
                                        <Col className="mb-3"  >
                                            <Form.Control
                                                type="text"
                                                id="autor"
                                                name='autor'
                                                placeholder="Autor"
                                                value={nuevoAutor}
                                                onChange={(e) => setNuevoAutor(e.target.value)}
                                            />
                                            <Button onClick={handleCrearAutor}>Crear Autor</Button>
                                        </Col>


                                    </Row>
                                </FormGroup>


                                <Row>
                                    <FormGroup className="mb-3" as={Col}>
                                        <Form.Label>Editorial</Form.Label>
                                        <Form.Control type="text" id="editorial" name='editorial' placeholder="Editorial" />
                                    </FormGroup>
                                    <FormGroup className="mb-3" as={Col}>
                                        <Form.Label>ISBN</Form.Label>
                                        <Form.Control type="text" id="isbn" name='isbn' placeholder="ISBN" />
                                    </FormGroup>
                                    <FormGroup className="mb-3" as={Col}>
                                        <Form.Label>Año de publicación</Form.Label>
                                        <Form.Control type="number" id="anno" name='anno' placeholder="Año de publicacion" />
                                    </FormGroup>
                                </Row>
                                <Row>
                                    <FormGroup className="mb-3" as={Col}>
                                        <Form.Label>Paginas</Form.Label>
                                        <Form.Control type="number" id="paginas" name='paginas' />
                                    </FormGroup>
                                    <FormGroup className="mb-3" as={Col}>
                                        <Form.Label>Ejemplares</Form.Label>
                                        <Form.Control type="number" id="ejemplares" name='ejemplares' />
                                    </FormGroup>
                                </Row>
                                <FormGroup className="mb-3" >
                                    <Form.Label>Resumen</Form.Label>
                                    <Form.Control as="textarea" id="resumen" name='resumen' rows={3} />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Form.Label>Categoria</Form.Label>
                                    <Form.Control type="text" id="gategoria" name='categoria' placeholder="Categoria" value={categoria} onChange={handleCategoriaChange} />
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

export default Createbook