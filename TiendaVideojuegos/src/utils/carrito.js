export const obtenerPrecio = (juego) => {
  const precio = Number(juego.price);

  return Number.isFinite(precio) && precio > 0 ? precio : null;
};
