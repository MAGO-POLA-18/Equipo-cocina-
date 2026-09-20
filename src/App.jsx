import { useState } from "react";
import {
  ClipboardList,
  ShoppingCart,
  Users,
  AlertCircle,
  ArrowLeft,
  Snowflake,
  Flame,
  CakeSlice,
  Wine,
  SprayCan,
  Plus,
  Check,
} from "lucide-react";

const productosFrioIniciales = [
  "Salmón",
  "Aguacate",
  "Limón",
  "Nata",
  "Mantequilla",
  "Huevos",
  "Queso",
  "Leche",
];

function App() {
  const [pantalla, setPantalla] = useState("home");
  const [productosFrio, setProductosFrio] = useState(productosFrioIniciales);
 const [seleccionados, setSeleccionados] = useState([]);
const [detallesCompra, setDetallesCompra] = useState({});
  const [comprados, setComprados] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState("");

const cambiarSeleccion = (producto) => {
  const estaSeleccionado = seleccionados.includes(producto);

  if (estaSeleccionado) {
    setSeleccionados((actuales) =>
      actuales.filter((item) => item !== producto)
    );

    setDetallesCompra((actuales) => {
      const copia = { ...actuales };
      delete copia[producto];
      return copia;
    });
  } else {
    setSeleccionados((actuales) => [...actuales, producto]);

    setDetallesCompra((actuales) => ({
      ...actuales,
      [producto]: {
        cantidad: "",
        unidad: "unidades",
        nota: "",
      },
    }));
  }
};

  const agregarProducto = (event) => {
    event.preventDefault();

    const nombre = nuevoProducto.trim();

    if (!nombre) return;

    const yaExiste = productosFrio.some(
      (producto) => producto.toLowerCase() === nombre.toLowerCase()
    );

    if (yaExiste) {
      setNuevoProducto("");
      return;
    }

    setProductosFrio((actuales) => [...actuales, nombre]);
    setNuevoProducto("");
  };
if (pantalla === "pedido") {
  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">COMPRAS</p>
          <h1>Pedido actual</h1>
        </div>

        <p className="subtitle">
          Marca los productos a medida que los vayas comprando.
        </p>
      </header>

      <div className="page-navigation">
        <button
          className="back-button"
          onClick={() => setPantalla("frio")}
        >
          <ArrowLeft size={18} />
          Volver
        </button>
      </div>

      <main className="shopping-page">
        <section className="order-section">
          <div className="order-section-title">
            <Snowflake size={18} />
            <h2>Frío</h2>
          </div>

          {seleccionados.length === 0 ? (
            <p className="empty-order">
              Todavía no hay productos en el pedido.
            </p>
          ) : (
            <div className="order-list">
              {seleccionados.map((producto) => {
                const comprado = comprados.includes(producto);
                const detalle = detallesCompra[producto] || {};

                return (
                  <button
                    key={producto}
                    className={`order-item ${comprado ? "purchased" : ""}`}
                    onClick={() =>
                      setComprados((actuales) =>
                        comprado
                          ? actuales.filter((item) => item !== producto)
                          : [...actuales, producto]
                      )
                    }
                  >
                    <span className="purchase-check">
                      {comprado && <Check size={18} />}
                    </span>

                    <span className="order-product-info">
                      <span className="order-product-main">
                        <strong>{producto}</strong>

                        {(detalle.cantidad || detalle.unidad) && (
                          <span className="order-quantity">
                            {detalle.cantidad || "—"} {detalle.unidad}
                          </span>
                        )}
                      </span>

                      {detalle.nota && (
                        <span className="order-note">
                          {detalle.nota}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
  if (pantalla === "frio") {
    return (
      <div className="app">
        <header className="header">
          <div>
            <p className="eyebrow">COMPRAS · FRÍO</p>
            <h1>Lista de Frío</h1>
          </div>

          <p className="subtitle">
            Toca los productos que hacen falta comprar.
          </p>
        </header>

        <div className="page-navigation">
          <button
            className="back-button"
            onClick={() => setPantalla("compras")}
          >
            <ArrowLeft size={18} />
            Sectores
          </button>
        </div>

        <main className="shopping-page">
        <button
  className="shopping-summary"
  onClick={() => setPantalla("pedido")}
>
         </button>
              <span className="summary-label">PEDIDO ACTUAL</span>
              <strong>
                {seleccionados.length}{" "}
                {seleccionados.length === 1 ? "producto" : "productos"}
              </strong>
            </div>

            <ShoppingCart size={24} />
          </div>

          <section className="product-list">
            {productosFrio.map((producto) => {
              const activo = seleccionados.includes(producto);

              return (
               <div key={producto} className={`product-row ${activo ? "selected" : ""}`}>
  <button
    className={`product-item ${activo ? "selected" : ""}`}
    onClick={() => cambiarSeleccion(producto)}
  >
    <span className="product-check">
      {activo && <Check size={18} />}
    </span>

    <span>{producto}</span>
  </button>

  {activo && (
    <div className="product-details">
      <div className="quantity-field">
        <label>Cantidad</label>

        <input
          type="number"
          min="0"
          step="0.1"
          placeholder="0"
          value={detallesCompra[producto]?.cantidad || ""}
          onChange={(event) =>
            setDetallesCompra((actuales) => ({
              ...actuales,
              [producto]: {
                ...actuales[producto],
                cantidad: event.target.value,
              },
            }))
          }
        />
      </div>

      <div className="unit-field">
        <label>Unidad</label>

        <select
          value={detallesCompra[producto]?.unidad || "unidades"}
          onChange={(event) =>
            setDetallesCompra((actuales) => ({
              ...actuales,
              [producto]: {
                ...actuales[producto],
                unidad: event.target.value,
              },
            }))
          }
        >
          <option value="unidades">Unidades</option>
          <option value="kg">Kg</option>
          <option value="g">Gramos</option>
          <option value="docenas">Docenas</option>
          <option value="litros">Litros</option>
          <option value="botellas">Botellas</option>
          <option value="cajas">Cajas</option>
          <option value="paquetes">Paquetes</option>
        </select>
      </div>
      <div className="note-field">
  <label>Nota opcional</label>

<textarea
  rows="3"
  placeholder="Ej. grandes, maduros, marca concreta..."
  value={detallesCompra[producto]?.nota || ""}
  onChange={(event) =>
    setDetallesCompra((actuales) => ({
      ...actuales,
      [producto]: {
        ...actuales[producto],
        nota: event.target.value,
      },
    }))
  }
/>
</div>
    </div>
  )}
</div>
              );
            })}
          </section>

          <form className="add-product-form" onSubmit={agregarProducto}>
            <input
              type="text"
              value={nuevoProducto}
              onChange={(event) => setNuevoProducto(event.target.value)}
              placeholder="Nuevo producto..."
              aria-label="Nombre del nuevo producto"
            />

            <button type="submit" className="add-product-button">
              <Plus size={18} />
              Añadir
            </button>
          </form>
        </main>
      </div>
    );
  }

  if (pantalla === "compras") {
    return (
      <div className="app">
        <header className="header">
          <div>
            <p className="eyebrow">COMPRAS</p>
            <h1>¿Qué sector necesita comprar?</h1>
          </div>

          <p className="subtitle">
            Selecciona un sector para cargar productos.
          </p>
        </header>

        <div className="page-navigation">
          <button
            className="back-button"
            onClick={() => setPantalla("home")}
          >
            <ArrowLeft size={18} />
            Volver
          </button>
        </div>

        <main className="dashboard">
          <section
            className="card"
            role="button"
            tabIndex={0}
            onClick={() => setPantalla("frio")}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                setPantalla("frio");
              }
            }}
          >
            <Snowflake size={24} />
            <h2>Frío</h2>
            <p>Productos y materias primas del sector frío.</p>
          </section>

          <section className="card">
            <Flame size={24} />
            <h2>Caliente</h2>
            <p>Productos y materias primas de cocina caliente.</p>
          </section>

          <section className="card">
            <CakeSlice size={24} />
            <h2>Pastelería</h2>
            <p>Ingredientes y productos de pastelería.</p>
          </section>

          <section className="card">
            <Wine size={24} />
            <h2>Barra</h2>
            <p>Bebidas y productos de barra.</p>
          </section>

          <section className="card">
            <SprayCan size={24} />
            <h2>Limpieza</h2>
            <p>Productos de limpieza e higiene.</p>
          </section>

          <section className="card add-card">
            <Plus size={24} />
            <h2>Crear sector</h2>
            <p>Añade un nuevo sector cuando sea necesario.</p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">OPERATIVA</p>
          <h1>Equipo Cocina</h1>
        </div>

        <p className="subtitle">
          Control diario de cocina y restaurante
        </p>
      </header>

      <main className="dashboard">
        <section
          className="card"
          onClick={() => setPantalla("compras")}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              setPantalla("compras");
            }
          }}
          role="button"
          tabIndex={0}
        >
          <ShoppingCart size={24} />
          <h2>Compras</h2>
          <p>Pedidos, proveedores y productos pendientes.</p>
        </section>

        <section className="card">
          <ClipboardList size={24} />
          <h2>Tareas</h2>
          <p>Organiza y controla las tareas del equipo.</p>
        </section>

        <section className="card">
          <Users size={24} />
          <h2>Equipo</h2>
          <p>Personal, responsables y turnos.</p>
        </section>

        <section className="card">
          <AlertCircle size={24} />
          <h2>Pendientes</h2>
          <p>Prioridades e incidencias que requieren atención.</p>
        </section>
      </main>
    </div>
  );
}

export default App;
