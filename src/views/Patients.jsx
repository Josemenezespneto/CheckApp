import React, { useState, useEffect } from "react";
import patientStore from "../stores/patient";

export default function PacientesView() {
  const [pacientes, setPacientes] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const perPage = 10; // quantos pacientes mostrar por página

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const apiResponse = await patientStore.getPatients(0, 0, "me.name", true, "", "");
        if (apiResponse && apiResponse.length > 0) {
          setPacientes(apiResponse[0]);
          setTotal(apiResponse[1]);
        }
      } catch (err) {
        console.error("Erro ao carregar pacientes:", err);
      }
    };

    fetchPatients();
  }, []);

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const currentPageData = pacientes.slice(start, end);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Pacientes</h1>
      <div className="overflow-x-auto bg-white shadow rounded-2xl">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">RG</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Telefone</th>
              <th className="px-4 py-2 text-left">Endereço</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{p.id}</td>
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.rg || "-"}</td>
                <td className="px-4 py-2">{p.email?.trim() || "-"}</td>
                <td className="px-4 py-2">{p.phone || "-"}</td>
                <td className="px-4 py-2">{p.rua || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <span>
          Página {page} de {Math.ceil(total / perPage)}
        </span>

        <button
          onClick={() =>
            setPage((prev) =>
              prev < Math.ceil(total / perPage) ? prev + 1 : prev
            )
          }
          disabled={page === Math.ceil(total / perPage)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
