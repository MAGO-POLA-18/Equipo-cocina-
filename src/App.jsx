import {
  ClipboardList,
  ShoppingCart,
  Users,
  AlertCircle,
} from "lucide-react";

function App() {
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
        <section className="card">
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
