import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Tarjeta() {
  return (
    <Card style={{ width: '14rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Juego</Card.Title>
        <Card.Text>
          Precio: Muy caro para vos
        </Card.Text>
        <Button variant="primary">Comprar</Button>
      </Card.Body>
    </Card>
  );
}

export default Tarjeta;