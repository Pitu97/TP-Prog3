import Carousel from "react-bootstrap/Carousel";

function Carrusel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          src="https://picsum.photos/800/400?random=1"
          alt="Elden Ring"
          className="d-block w-100"
        />

        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          src="https://picsum.photos/800/400?random=2"
          alt="Cyberpunk 2077"
          className="d-block w-100"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          src="https://picsum.photos/800/400?random=3"
          alt="God of War"
          className="d-block w-100"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrusel;
