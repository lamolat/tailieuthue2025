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
      li.innerHTML = `${file} <a href="files/${file}" download>📥 Tải về</a>`;
      list.appendChild(li);
    });

    if (student.role === "admin") {
      document.getElementById("adminTools").style.display = "block";
    }
  } else {
    alert("Mã không hợp lệ. Vui lòng thử lại.");
  }
}

function checkPDF() {
  const fileInput = document.getElementById("pdfUpload");
  const result = document.getElementById("result");

  if (fileInput.files.length === 0) {
    alert("Vui lòng chọn file PDF");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const content = e.target.result;
    const text = new TextDecoder().decode(content);
    const match = text.match(/student:\d+/);

    if (match) {
      result.textContent = "✅ Mã học sinh phát hiện: " + match[0];
    } else {
      result.textContent = "⚠️ Không tìm thấy mã học sinh trong file.";
    }
  };

  reader.readAsArrayBuffer(file);
}
