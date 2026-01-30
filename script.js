let studentName = "", currentType = "", currentYear = "", currentSubject = "";

// ---------------- SUBJECTS ----------------
const subjects = {
  "1st Year": ["Math-1","Math-2","Physics","Chemistry","Electrical","Electronics","Mechanical","PPS","EVS","Soft Skills"],
  "2nd Year": ["Math-3","DS","OOP","DBMS","Electrical-II","Electronics-II","Mechanics","COA","Microprocessors","Communication Skills"],
  "3rd Year": ["AI","ML","Compiler","OS","Networks","Cloud","Software Engg","Cybersecurity","Data Science","IoT"],
  "4th Year": ["Project","Internship","Advanced AI","Robotics","Big Data","Entrepreneurship","Ethics","Cloud Apps","VLSI","Electives"]
};

// -------- SUBJECTS WITH UNITS (NOTES) --------
const unitSubjects = [
  "Physics","Chemistry","Electrical","Electronics","Mechanical",
  "Electrical-II","Electronics-II","Mechanics","Microprocessors",
  "Soft Skills","PPS","EVS"
];

// ---------------- DARK MODE ----------------
function toggleDarkMode(){
  document.body.classList.toggle("dark");
}

// ---------------- LOGIN ----------------
function loginStudent(){
  const name = document.getElementById("studentName").value.trim();
  if(!name){ alert("Enter name"); return; }
  sessionStorage.setItem("studentName", name);
  studentName = name;
  showHome();
}

// ---------------- HOME ----------------
function showHome(){
  document.getElementById("studentLogin").classList.add("hidden");
  document.getElementById("typeSection").classList.add("hidden");
  document.getElementById("subjectSection").classList.add("hidden");
  document.getElementById("pyqTable").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
  document.getElementById("welcomeName").innerText = studentName;
}

// ---------------- OPEN TYPE ----------------
function openType(type){
  currentType = type;
  document.getElementById("home").classList.add("hidden");
  document.getElementById("typeSection").classList.remove("hidden");
  document.getElementById("typeTitle").innerText = type.toUpperCase() + " - Select Year";

  const grid = document.getElementById("yearGrid");
  grid.innerHTML = "";

  Object.keys(subjects).forEach(year=>{
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = year;
    div.onclick = ()=>showSubjects(year);
    grid.appendChild(div);
  });
}

// ---------------- SHOW SUBJECTS ----------------
function showSubjects(year){
  currentYear = year;

  document.getElementById("typeSection").classList.add("hidden");
  document.getElementById("subjectSection").classList.remove("hidden");
  document.getElementById("subjectTitle").innerText =
    currentType.toUpperCase() + " - " + year;

  const grid = document.getElementById("subjectGrid");
  grid.innerHTML = "";

  subjects[year].forEach(subject=>{
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = subject;

    div.onclick = ()=>{
      if(currentType === "pyq") openPYQ(subject);
      else if(currentType === "notes") openNotes(subject);
      else if(currentType === "quantum") openDirectPDF("quantum", subject, "quantum.pdf");
      else if(currentType === "paid") openDirectPDF("paid", subject, "paid.pdf");
      else if(currentType === "important") openDirectPDF("important", subject, "important.pdf");
    };

    grid.appendChild(div);
  });
}

// ---------------- PYQ ----------------
function openPYQ(subject){
  currentSubject = subject;

  document.getElementById("subjectSection").classList.add("hidden");
  document.getElementById("pyqTable").classList.remove("hidden");
  document.getElementById("pyqHeading").innerText = subject + " - PYQs";

  const body = document.getElementById("pyqBody");
  body.innerHTML = "";

  ["2022","2023","2024","2025"].forEach(y=>{
    
    // 🔹 Math-1 → ONLY ODD
    if(subject === "Math-1"){
      body.innerHTML += `
        <tr>
          <td>${y}</td>
          <td colspan="2">
            <a href="pdf/pyq/${currentYear}/${subject}/${y}-odd.pdf" target="_blank">
              Odd
            </a>
          </td>
        </tr>
      `;
    }

    // 🔹 Math-2 → ONLY EVEN
    else if(subject === "Math-2"){
      body.innerHTML += `
        <tr>
          <td>${y}</td>
          <td colspan="2">
            <a href="pdf/pyq/${currentYear}/${subject}/${y}-even.pdf" target="_blank">
              Even
            </a>
          </td>
        </tr>
      `;
    }

    // 🔹 ALL OTHER SUBJECTS → ODD + EVEN
    else{
      body.innerHTML += `
        <tr>
          <td>${y}</td>
          <td>
            <a href="pdf/pyq/${currentYear}/${subject}/${y}-odd.pdf" target="_blank">Odd</a>
          </td>
          <td>
            <a href="pdf/pyq/${currentYear}/${subject}/${y}-even.pdf" target="_blank">Even</a>
          </td>
        </tr>
      `;
    }

  });
}
// ---------------- NOTES ----------------
function openNotes(subject){
  if(!unitSubjects.includes(subject)){
    window.open(`pdf/notes/${currentYear}/${subject}/Notes.pdf`, "_blank");
    return;
  }

  document.getElementById("subjectSection").classList.add("hidden");
  document.getElementById("pyqTable").classList.remove("hidden");
  document.getElementById("pyqHeading").innerText = subject + " - Units";

  const body = document.getElementById("pyqBody");
  body.innerHTML = "";

  ["Unit-1","Unit-2","Unit-3","Unit-4","Unit-5"].forEach(unit=>{
    body.innerHTML += `
      <tr>
        <td>${unit}</td>
        <td colspan="2">
          <a href="pdf/notes/${currentYear}/${subject}/${unit}.pdf" target="_blank">
            Open PDF
          </a>
        </td>
      </tr>
    `;
  });
}

// ---------------- DIRECT PDF (Quantum / Paid / Important) ----------------
function openDirectPDF(folder, subject, fileName){
  window.open(
    `pdf/${folder}/${currentYear}/${subject}/${fileName}`,
    "_blank"
  );
}

// ---------------- BACK ----------------
function goHome(){ showHome(); }
function goType(){
  document.getElementById("subjectSection").classList.add("hidden");
  document.getElementById("typeSection").classList.remove("hidden");
}
function goSubjects(){
  document.getElementById("pyqTable").classList.add("hidden");
  document.getElementById("subjectSection").classList.remove("hidden");
}

// ---------------- SYLLABUS ----------------
function openSyllabus(){
  window.open("pdf/syllabus.pdf","_blank");
}

// ---------------- AUTO LOGIN ----------------
window.onload = function(){
  const user = sessionStorage.getItem("studentName");
  if(user){
    studentName = user;
    showHome();
  }
};