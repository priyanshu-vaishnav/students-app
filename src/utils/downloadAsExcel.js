
// CSV = Comma Separated Values — Excel can open these files
function downloadAsExcel(students, filename = "students.csv") {
  // Row 1: headers
  const headers = ["Name", "Email", "Age"];

  // Remaining rows: one per student
  const rows = students.map((s) => [s.name, s.email, s.age]);

  // Join everything into one big string
  const csvContent = [headers, ...rows]
    .map((row) => row.join(","))
    .join("\n");

  // Create a temporary link and click it to trigger download
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href     = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default downloadAsExcel;
