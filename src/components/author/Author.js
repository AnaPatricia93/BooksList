import React from 'react';
import { Card, Button, Badge, ListGroup } from 'react-bootstrap';
import niceguy from '../../assets/niceguy.jpg';

export default class AuthorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            isAvailable: true,
            skills: ["Javacript", "NodeJS", "React"],
        };
    }

    componentDidMount() {
        this.timer = setInterval(this.thick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    thick = () => {
        this.setState({ date: new Date() })
    }

    handleClick = e => {
        this.setState(state => ({ isAvailable: !state.isAvailable }));
    }

    render() {
        return (
            <Card style={{ width: '13rem' }}>
                <Card.Img variant="top" src={niceguy} />
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.info.work}</Card.Subtitle>
                    <Card.Text>
                        {this.state.date.toLocaleTimeString()}<br />
                        {this.props.info.description}
                    </Card.Text>
                    <Button variant="primary" onClick={this.handleClick}>Switch availability</Button>
                    {this.state.isAvailable
                        ? <Badge variant="success">Available</Badge>
                        : <Badge variant="danger">Unavailable</Badge>}
                    <ListGroup>
                        {this.state.skills.map((skill, index) => {
                            console.log("skill" + index.toString());
                            return <ListGroup.Item key={"skill" + index.toString()}>{skill}</ListGroup.Item>;
                        })}
                        
                    </ListGroup>
                </Card.Body>
            </Card>
        )
    }
}
