
function Perfil() {
  return (
    <>
      
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ backgroundColor: "darkblue", height: "100px", width:"100px", borderRadius: "50%", textAlign: "center" }}>foto</div>
        <div>
            <h2>Nombre</h2>
            <p>user</p>
        </div>
        <button>Cerrar sesion</button>
      </div>
      <div>
        <h2>Historial de compra</h2>
        <ul>
            <li>Compra1</li>
            <li>Compra2</li>
            <li>Compra3</li>
        </ul>
      </div>
      
    </>
  );
}

export default Perfil;