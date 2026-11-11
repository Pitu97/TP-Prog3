import test from "node:test";
import assert from "node:assert/strict";
import { obtenerPrecio } from "./carrito.js";

test("devuelve el precio cuando es mayor que cero", () => {
  assert.equal(obtenerPrecio({ price: 15000 }), 15000);
});

test("devuelve null cuando el precio es cero", () => {
  assert.equal(obtenerPrecio({ price: 0 }), null);
});

test("devuelve null cuando el precio es negativo", () => {
  assert.equal(obtenerPrecio({ price: -100 }), null);
});

test("devuelve null cuando el precio no es numérico", () => {
  assert.equal(obtenerPrecio({ price: "abc" }), null);
});
