import { useState } from "react";

export default function CrohnCDAIForm() {
  const [form, setForm] = useState({
    evacuacoes: 0,
    dor: 0,
    bemEstar: 0,
    complicacoes: [],
    antidiarreico: false,
    massa: "0", // 0 = Não, duvidosa, definitiva
    hematocrito: "",
    hematocritoNormal: 42,
    pesoAtual: "",
    pesoHabitual: "",
  });

  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (type === "checkbox" && name === "complicacoes") {
      // checkbox múltiplo
      setForm((prev) => ({
        ...prev,
        complicacoes: checked
          ? [...prev.complicacoes, value]
          : prev.complicacoes.filter((c) => c !== value),
      }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const calcularCDAI = () => {
    const evac = Number(form.evacuacoes) * 2 * 7;
    const dor = Number(form.dor) * 5 * 7;
    const bem = Number(form.bemEstar) * 7 * 7;
    const complic = 20 * form.complicacoes.length;
    const anti = form.antidiarreico ? 30 : 0;

    let massa = 0;
    if (form.massa === "duvidosa") massa = 50;
    if (form.massa === "definitiva") massa = 70;

    const hemat = form.hematocrito
      ? 6 * (form.hematocritoNormal - Number(form.hematocrito))
      : 0;

    const peso =
      form.pesoAtual && form.pesoHabitual
        ? ((form.pesoHabitual - form.pesoAtual) * 100) /
          form.pesoHabitual
        : 0;

    const pesoCalc = peso > 0 ? peso : 0;

    const total =
      evac + dor + bem + complic + anti + massa + hemat + pesoCalc;

    let interpretacao = "";
    if (total < 150) interpretacao = "Remissão";
    else if (total < 220) interpretacao = "Atividade leve";
    else if (total <= 450) interpretacao = "Atividade moderada";
    else interpretacao = "Atividade grave";

    setResultado({ total, interpretacao });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calcularCDAI();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      <h2 className="text-2xl font-bold mb-4">
        Avaliação Semanal – Doença de Crohn (CDAI)
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">
            Nº médio de evacuações líquidas por dia:
          </label>
          <input
            type="number"
            name="evacuacoes"
            min="0"
            value={form.evacuacoes}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">
            Dor abdominal (0=Nenhuma, 3=Intensa):
          </label>
          <select
            name="dor"
            value={form.dor}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="0">Nenhuma</option>
            <option value="1">Leve</option>
            <option value="2">Moderada</option>
            <option value="3">Intensa</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">
            Bem-estar geral (0=Muito bem, 4=Muito mal):
          </label>
          <select
            name="bemEstar"
            value={form.bemEstar}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="0">Muito bem</option>
            <option value="1">Bem</option>
            <option value="2">Regular</option>
            <option value="3">Mal</option>
            <option value="4">Muito mal</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Complicações:</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              "febre",
              "artrite",
              "irite",
              "eritema",
              "pioderma",
              "fissura",
              "fistula",
              "outros",
            ].map((c) => (
              <label key={c} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="complicacoes"
                  value={c}
                  checked={form.complicacoes.includes(c)}
                  onChange={handleChange}
                />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-semibold">
            Uso de antidiarreicos:
          </label>
          <input
            type="checkbox"
            name="antidiarreico"
            checked={form.antidiarreico}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-semibold">
            Massa abdominal palpável:
          </label>
          <select
            name="massa"
            value={form.massa}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="0">Não</option>
            <option value="duvidosa">Duvidosa</option>
            <option value="definitiva">Definitiva</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Hematócrito (%):</label>
          <input
            type="number"
            step="0.1"
            name="hematocrito"
            value={form.hematocrito}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Peso habitual (kg):</label>
          <input
            type="number"
            step="0.1"
            name="pesoHabitual"
            value={form.pesoHabitual}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Peso atual (kg):</label>
          <input
            type="number"
            step="0.1"
            name="pesoAtual"
            value={form.pesoAtual}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-700"
        >
          Calcular CDAI
        </button>
      </form>

      {resultado && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <p className="text-lg font-semibold">
            CDAI: {resultado.total.toFixed(1)}
          </p>
          <p className="text-md">Interpretação: {resultado.interpretacao}</p>
        </div>
      )}
    </div>
  );
}
