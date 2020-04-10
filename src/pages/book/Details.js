import React from 'react';
import { Container, Jumbotron, Row, Col, Badge, Spinner, Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUnderline } from '@fortawesome/free-solid-svg-icons';

import bookService from '../../services/book';
import RemoveDialogComponent from '../../components/books/RemoveDialog';
import SubmitDialogComponent from '../../components/books/SubmitDialog';

export default class BookDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: undefined,
            error: undefined,
            toRemove: false,
            toUpdate: false,
        }
    }

    componentDidMount() {
        bookService.getOne(this.props.match.params.id)
            .then(value => { this.setState({ book: value }) })
            .catch(err => this.setState({ error: err }));
    }

    render() {
        const { book, error, toRemove, toUpdate} = this.state;
        const { sure } = this.state;

        return <Container>
            <Button variant="outline-primary" style={{ margin: '10px 0' }} onClick={() => this.props.history.push("/book/list")}>
                <FontAwesomeIcon icon={faArrowLeft} />&nbsp;Back to List
            </Button>

            {error !== undefined &&
                <Alert variant="danger">
                    {error}
                </Alert>}

            {book !== undefined ?
                <div>
                    <Jumbotron>
                        <h1>{book.title}</h1>
                        <h5>{book._id}</h5>
                        <Row>
                            <Col xs={4} md={3} lg={2}><Badge variant="secondary">Author</Badge></Col>
                            <Col xs={8} md={9} lg={10}>{book.author}</Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={3} lg={2}><Badge variant="secondary">Collection</Badge></Col>
                            <Col xs={8} md={9} lg={10}>{book.collection}</Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={3} lg={2}><Badge variant="secondary">Publish Year</Badge></Col>
                            <Col xs={8} md={9} lg={10}>{book.publish_year}</Col>
                        </Row>
                        <br></br>
                        <p>
                            <Button variant="dark" onClick={() => this.setState({ toUpdate: true })}>Update</Button>&nbsp;
                            <Button variant="danger" onClick={() => this.setState({ toRemove: true })}>Remove</Button>
                        </p>
                    </Jumbotron>

                    <RemoveDialogComponent bookId={book._id} show={toRemove}
                        handleClose={() => this.setState({ toRemove: false })}
                        removed={() => this.props.history.push('/book/list')}
                    />

                    <SubmitDialogComponent
                        book={book}
                        show={toUpdate}
                        handleClose={() => this.setState({ toUpdate: false })}
                        submited={updatedBok => this.setState({ book: updatedBok, toUpdate: false })}
                    />
                </div>
                :
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>}

        </Container>;
    }
}