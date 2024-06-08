export function insertMaskOnCep(cep: string) {
  if (!cep) return "";

  const novocep = cep.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2");
  return novocep;
}
