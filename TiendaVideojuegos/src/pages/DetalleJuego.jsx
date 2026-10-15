
import Tarjeta from "../components/Tarjeta";


function DetalleJuego() {
  return (
    <>

      <h2>Titulo Juego</h2>
      <div style={{ backgroundColor: "darkblue", height: "200px", display: "flex", justifyContent: "space-around" }}>
        <div style={{ backgroundColor: "darkgreen" }}>Imagen del juego</div>
       <div style={{ backgroundColor: "darkred" }}>
            <p>Precio</p>
            <p>Plataforma</p>
            <button>Agregar al carrito</button>
        </div>
      </div>
      <div>
        <h2>Descripcion</h2>
        <div style={{ backgroundColor: "darkblue", height: "200px", display: "flex", justifyContent: "space-around" }}>
            <div style={{ backgroundColor: "darkgreen" }}>Texto</div>
            <div style={{ backgroundColor: "darkred" }}>
                <p>Requerimientos</p>
                <ul>
                    <li>Req1</li>
                    <li>Req2</li>
                    <li>Req3</li>
                </ul>
            </div>
        </div>
      </div>
      <section>
        <h2>Juegos Relacionados</h2>
        <div className="Tarjetas">
          <Tarjeta />
          <Tarjeta />
          <Tarjeta />
          <Tarjeta />
        </div>
      </section>

    </>
  );
}

export default DetalleJuego;