async function login() {
  const code = document.getElementById("codeInput").value.trim();
  const res = await fetch("data/students.json");
  const data = await res.json();
  const student = data.students.find(s => s.code === code);

  if (student) {
    document.getElementById("fileList").style.display = "block";
    const pdfs = ["bai1.pdf", "bai2.pdf", "bai3.pdf"];
    const list = document.getElementById("pdfList");
    list.innerHTML = "";

    pdfs.forEach(file => {
      const li = document.createElement("li");

      // Tạo link gọi Supabase Function thay vì file tĩnh
      const functionUrl = `https://bmgdjrnqjoymyoaiwhlt.functions.supabase.co/download?code=${code}&file=${encodeURIComponent(file)}`;

      li.innerHTML = `${file} <a href="${functionUrl}" download>📥 Tải về</a>`;
      list.appendChild(li);
    });

    if (student.role === "admin") {
      document.getElementById("adminTools").style.display = "block";
    }
  } else {
    alert("Mã không hợp lệ. Vui lòng thử lại.");
  }
}
