const results = [];

let finalSubmission = [...results];


// display who has secured first, second, third place....

// render position in the HTML 

function renderPosition() {
    const studentPosition = document.getElementById('position-hold');
    studentPosition.innerHTML = '';
    const positions= positionHold();
    positions.forEach(function (position,index){
        const positionRow=document.createElement('tr');

        positionRow.innerHTML=`
        <td class=" text-center border-solid border-2 border-slate-500 px-2 m-2">${index+1}</td>
        <td class=" text-center border-solid border-2 border-slate-500 px-2 m-2"> ${position.name}</td>
        <td class=" text-center border-solid border-2 border-slate-500 px-2 m-2"> ${position.totalMarks}</td>
        
        `;
        studentPosition.appendChild(positionRow);   
        
    });
   
}

/// function call to sort out student position...

function positionHold() {
    finalSubmission.forEach(function (student) {

        student.totalMarks = student.math + student.english + student.cse + student.chemistry + student.physics;

    });
  // Sort the students based on total marks in descending order
    finalSubmission.sort(function (a, b) {
        return b.totalMarks - a.totalMarks;


    });
    const topThree = finalSubmission.slice(0, 3);
    return topThree;
}

function addNewResult(event) {
    event.preventDefault();
    const studentName = document.getElementById('personName').value;
    const studentAge = document.getElementById('personAge').value;
    const studentMath = document.getElementById('subjectMath').value;
    const studentEnglish = document.getElementById('subjectEnglish').value;
    const studentCse = document.getElementById('subjectCse').value;
    const studentPhysics = document.getElementById('subjectPhysics').value;
    const studentChemistry = document.getElementById('subjectChemistry').value;

    const addNewResultInTable = {
        name: studentName,
        age: parseInt(studentAge),
        math: parseInt(studentMath),
        english: parseInt(studentEnglish),
        cse: parseInt(studentCse),
        physics: parseInt(studentPhysics),
        chemistry: parseInt(studentChemistry),
    };

    finalSubmission.push(addNewResultInTable);
    showResult();
    renderPosition();
    document.getElementById('resultForm').reset();
}

function showResult() {
    const resultContainer = document.getElementById('table-body-data');
    resultContainer.innerHTML = '';
    finalSubmission.forEach(function (result) {
        const resultDataRow = document.createElement('tr');
        resultDataRow.innerHTML = `
            <td class="text-center border-solid border-2 border-slate-500 px-8 m-6">${result.name}</td>
            <td class="text-center border-solid border-2 border-slate-500 px-8 m-6">${result.age}</td>
            <td class="text-center border-solid border-2 border-slate-500 px-8 m-6">${result.math}</td>
            <td class="text-center border-solid border-2 border-slate-500 px-8 m-6">${result.english}</td>
            <td class="text-center border-solid border-2 border-slate-500 px-8 m-6">${result.cse}</td>
            <td class="text-center border-solid border-2 border-slate-500 px-8 m-6">${result.physics}</td>
            <td class="text-center border-solid border-2 border-slate-500 px-8 m-6">${result.chemistry}</td>
            <td class="text-center border-solid border-2 border-slate-500 px-8 m-6">
                ${result.math + result.english + result.cse + result.chemistry + result.physics}
            </td>
            <td class="text-center border-solid border-2 border-slate-500 px-8 m-6">
                <button onclick="amendResult()" class="bg-green-500 text-white p-2 rounded">Edit</button>
                <button onclick="deleteResult()" class="bg-red-500 text-white p-1 px-3 rounded">Delete</button>
            </td>
        `;
        resultContainer.appendChild(resultDataRow);
    });
}

document.getElementById('resultForm').addEventListener('submit', addNewResult);

showResult();
renderPosition();
