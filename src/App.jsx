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
} from "lucide-react";

function App() {
  const [pantalla, setPantalla] = useState("home");

  if (pantalla === "compras") {
    return (
      <div className="app">
        <header className="header">
          <button
            className="back-button"
            onClick={() => setPantalla("home")}
          >
            <ArrowLeft size={20} />
            Volver
          </button>

          <div>
            <p className="eyebrow">COMPRAS</p>
            <h1>¿Qué sector necesita comprar?</h1>
          </div>

          <p className="subtitle">
            Selecciona un sector para cargar productos.
          </p>
        </header>

        <main className="dashboard">
          <section className="card">
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
        <p className="subtitle">Control diario de cocina y restaurante</p>
      </header>

      <main className="dashboard">
        <section
          className="card"
          onClick={() => setPantalla("compras")}
          role="button"
          tabIndex="0"
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
