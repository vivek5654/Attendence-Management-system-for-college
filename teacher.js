document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('attendanceForm');
  const attendanceList = document.getElementById('attendanceList');

  // Load all attendance records
  loadAttendance();

  // Form submission
  form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const attendanceData = {
          roll_no: document.getElementById('rollNumber').value,
          name: document.getElementById('studentName').value,
          date: document.getElementById('attendanceDate').value,
          status: document.getElementById('attendanceStatus').value
      };

      try {
          const response = await fetch('../backend/add_attendance.php', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(attendanceData)
          });

          const result = await response.json();

          if (result.success) {
              alert('Attendance marked successfully!');
              form.reset();
              loadAttendance();
          } else {
              throw new Error(result.error || 'Failed to mark attendance');
          }
      } catch (error) {
          alert(`Error: ${error.message}`);
          console.error('Error:', error);
      }
  });

  // Load attendance records
  async function loadAttendance() {
      try {
          const response = await fetch('../backend/get_attendance.php');
          const data = await response.json();

          attendanceList.innerHTML = data.map(record => `
              <tr>
                  <td>${record.id}</td>
                  <td>${record.roll_no}</td>
                  <td>${record.name}</td>
                  <td>${record.date}</td>
                  <td><span class="status-badge status-${record.status.toLowerCase()}">${record.status}</span></td>
                  <td>
                      <button class="action-btn delete-btn" onclick="deleteAttendance(${record.id})">
                          <i class="fas fa-trash"></i> Delete
                      </button>
                  </td>
              </tr>
          `).join('');
      } catch (error) {
          console.error('Error loading attendance:', error);
      }
  }
});

// Delete attendance record
async function deleteAttendance(id) {
  if (!confirm('Are you sure you want to delete this record?')) return;

  try {
      const response = await fetch('../backend/delete_attendance.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
      });

      const result = await response.json();

      if (result.success) {
          alert('Record deleted successfully!');
          document.getElementById('attendanceList').innerHTML = '';
          loadAttendance();
      } else {
          throw new Error(result.error || 'Failed to delete record');
      }
  } catch (error) {
      alert(`Error: ${error.message}`);
      console.error('Error:', error);
  }
}