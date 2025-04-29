document.addEventListener('DOMContentLoaded', () => {
  const checkBtn = document.getElementById('checkAttendanceBtn');
  const rollNoInput = document.getElementById('studentRollNo');
  const resultDiv = document.getElementById('statusResult');
  const tableBody = document.getElementById('attendanceTableBody');

  // Check attendance button click
  checkBtn.addEventListener('click', checkAttendance);

  // Load all records when roll number changes
  rollNoInput.addEventListener('input', loadAttendanceHistory);

  // Check specific date attendance
  async function checkAttendance() {
      const rollNo = rollNoInput.value.trim();
      const date = document.getElementById('searchDate').value;

      if (!rollNo) {
          showResult('Please enter your roll number', 'error');
          return;
      }

      try {
          let url = `../backend/get_attendance.php?rollNo=${rollNo}`;
          if (date) url += `&date=${date}`;

          const response = await fetch(url);
          const data = await response.json();

          if (data.length > 0) {
              const record = data[0];
              showResult(`You were <strong>${record.status}</strong> on ${record.date}`, record.status.toLowerCase());
          } else {
              showResult('No attendance record found', 'error');
          }
      } catch (error) {
          showResult('Error fetching attendance data', 'error');
          console.error('Error:', error);
      }
  }

  // Load all attendance history
  async function loadAttendanceHistory() {
      const rollNo = rollNoInput.value.trim();

      if (!rollNo) {
          tableBody.innerHTML = '';
          return;
      }

      try {
          const response = await fetch(`../backend/get_attendance.php?rollNo=${rollNo}`);
          const data = await response.json();

          if (data.length > 0) {
              tableBody.innerHTML = data.map(record => `
                  <tr>
                      <td>${record.date}</td>
                      <td class="${record.status.toLowerCase()}">${record.status}</td>
                  </tr>
              `).join('');
          } else {
              tableBody.innerHTML = '<tr><td colspan="2">No attendance records found</td></tr>';
          }
      } catch (error) {
          tableBody.innerHTML = '<tr><td colspan="2">Error loading records</td></tr>';
          console.error('Error:', error);
      }
  }

  // Show result message
  function showResult(message, status) {
      resultDiv.innerHTML = message;
      resultDiv.className = 'result-box';
      if (status) resultDiv.classList.add(status);
  }
});