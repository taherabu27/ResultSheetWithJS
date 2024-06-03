// Problems facing in the project...
// 1. Editing any information is leading to a new row.
// 2. Whenever we click on the "Edit Button", descending order data appear for editing.
// 3. Also delete the descending order data if it is clicked on "Delete Button".
// 4. Whenever we delete the data from row, data remains in the "Position Hold" area.



const results = [
    {
        // id: 'First Person',
        name: 'Abu Taher',
        age: 37,
        math: 87,
        english: 86,
        cse: 88,
        physics: 85,
        chemistry: 82,

    },


    {
        // id: 'Second Person',
        name: 'Nure Alam Siddiq',
        age: 41,
        math: 91,
        english: 85,
        cse: 90,
        physics: 85,
        chemistry: 84,

    },

    {
        // id: 'Third Person',
        name: 'Kamrul Hasan Tusher',
        age: 28,
        math: 95,
        english: 84,
        cse: 89,
        physics: 87,
        chemistry: 81,

    },

    {
        // id: 'Fourth Person',
        name: 'Nazaria Nazim',
        age: 33,
        math: 83,
        english: 89,
        cse: 90,
        physics: 85,
        chemistry: 86,


    },

    {
        // id: 'Fifth Person',
        name: 'Newaz Uddin Siddiqe',
        age: 45,
        math: 88,
        english: 84,
        cse: 86,
        physics: 88,
        chemistry: 83,

    },


];

let finalSubmission = [...results];
let editIndex = null;


// display who has secured first, second, third place....

// render position in the HTML 

function renderPosition() {
    const studentPosition = document.getElementById('position-hold');
    studentPosition.innerHTML = '';
    const positions = positionHold();
    positions.forEach(function (position, index) {
        const positionRow = document.createElement('tr');

        positionRow.innerHTML = `
        <td class=" text-center border-solid border-2 border-slate-500 px-2 m-2">${index + 1}</td>
        <td class=" text-center border-solid border-2 border-slate-500 px-2 m-2"> ${position.name}</td>
        <td class=" text-center border-solid border-2 border-slate-500 px-2 m-2"> ${position.totalMarks}</td>
        
        `;
        studentPosition.appendChild(positionRow);

    });
    // renderResult();

}

/// function call to sort out student marks and postitions...

function calculateTotalMarks(student) {
    return student.totalMarks = student.math + student.english + student.cse + student.chemistry + student.physics;

}
/// function to render student position...

function positionHold() {
    finalSubmission.forEach(function (student) {
        student.totalMarks = calculateTotalMarks(student);

    });
    // Sort the students based on total marks in descending order
    finalSubmission.sort(function (a, b) {
        return b.totalMarks - a.totalMarks;
    });


    /// select top three students
    const topThree = finalSubmission.slice(0, 3);
    return topThree;


}
//// add new data within the table

function addNewResult(event) {
    event.preventDefault();
    const studentName = document.getElementById('personName').value;
    const studentAge = parseFloat(document.getElementById('personAge').value);
    const studentMath = parseInt(document.getElementById('subjectMath').value);
    const studentEnglish = parseInt(document.getElementById('subjectEnglish').value);
    const studentCse = parseInt(document.getElementById('subjectCse').value);
    const studentPhysics = parseInt(document.getElementById('subjectPhysics').value);
    const studentChemistry = parseInt(document.getElementById('subjectChemistry').value);

    const addNewResultInTable = {
        name: studentName,
        age: studentAge,
        math: studentMath,
        english: studentEnglish,
        cse: studentCse,
        physics: studentPhysics,
        chemistry: studentChemistry,
    };

    if (editIndex !== null) {
        finalSubmission[editIndex] = addNewResultInTable;
        editIndex = null;
    } else {
        finalSubmission.push(addNewResultInTable);
    }

    // finalSubmission.push(addNewResultInTable);/// previously coded...

    renderResult();
    renderPosition();

    document.getElementById('resultForm').reset();
}

function editInformation(index) {
    const editedData = finalSubmission[index];
    document.getElementById('personName').value = editedData.name;
    document.getElementById('personAge').value = editedData.age;
    document.getElementById('subjectMath').value = editedData.math;
    document.getElementById('subjectEnglish').value = editedData.english;
    document.getElementById('subjectCse').value = editedData.cse;
    document.getElementById('subjectPhysics').value = editedData.physics;
    document.getElementById('subjectChemistry').value = editedData.chemistry;
    editIndex = index;

    // renderResult();

}

function removeData(index) {

    if (confirm('Are you sure to remove data?')) {
        finalSubmission.splice(index, 1);
    }
    renderResult();
    renderPosition();
}


//// render the final result after adding new element in table ....
function renderResult() {
    const resultContainer = document.getElementById('table-body-data');
    resultContainer.innerHTML = '';
    finalSubmission.forEach(function (result, index) {
        const resultDataRow = document.createElement('tr');
        resultDataRow.innerHTML =
            `
            <td class=" text-center border-solid border-2 border-slate-500 px-8 m-6">${result.name}</td>
            <td class="text-center border-solid border-2 border-slate-500 px-8 m-6">${result.age}</td>
            <td class="text-center border-solid border-2 border-slate-500 ppx-8 m-6">${result.math}</td>
            <td class=" text-centerborder-solid border-2 border-slate-500 px-8 m-6"> ${result.english}</td>
            <td class=" text-center border-solid border-2 border-slate-500 px-8 m-6">${result.cse}</td>
            <td class="text-center border-solid border-2 border-slate-500 px-8 m-6">${result.physics}</td>
            <td class="text-center border-solid border-2 border-slate-500 px-8 m-6">${result.chemistry}</td>
            <td class="text-center border-solid border-2 border-slate-500 px-8 m-6">
            ${calculateTotalMarks(result)}
            </td>      
            <td class="text-center border-solid border-2 border-slate-500 px-8 m-6">
             <button onclick="editInformation(${index})" class="bg-green-500 text-white p-2 rounded">Edit</button>
            <button onclick="removeData(${index})" class="bg-red-500 text-white p-1 px-3 rounded">Delete</button>
            </td>

            `
            ;
        resultContainer.appendChild(resultDataRow);
    }

    );

}

// initialize event listener for form submission....

document.getElementById('resultForm').addEventListener('submit', addNewResult);

/// initializing rendering of reults and position...
renderResult();
renderPosition();
// console.log();



// // save the edited information...

// 4. **Editing Information**: ///Tusher Comment///

//     - The `editInformation` function correctly populates form fields, but the form submission should be updated to reflect edits.
//     - The `saveEditedInfo` function contains logical errors:
//         - It assumes a specific DOM structure and doesn't correctly update the `finalSubmission` array.
//         - Direct DOM manipulation should be avoided in favor of updating the data array and re-rendering.

// function saveEditedInfo() {
//     const index = document.getElementById('studentId').value;
//     const editedRow= document.getElementById(`row-${index}`).value; // assume that each row has an specific ID like row-1, row-2...

//     editedRow.cell[0].textContent = document.getElementById('personName').value;
//     editedRow.cell[1].textContent = document.getElementById('personAge').value;
//     editedRow.cell[2].textContent = document.getElementById('subjectMath').value;
//     editedRow.cell[3].textContent = document.getElementById('subjectEnglish').value;
//     editedRow.cell[4].textContent = document.getElementById('subjectCse').value;
//     editedRow.cell[5].textContent = document.getElementById('subjectPhysics').value;
//     editedRow.cell[6].textContent = document.getElementById('subjectChemistry').value;

//     renderResult();
//     document.getElementById('resultForm').reset();/// reset the form after updating..
//     document.getElementById('studentId').value = ''; /// clear the student id.....

// }
