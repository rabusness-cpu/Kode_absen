document.addEventListener('DOMContentLoaded', () => {
    const memberForm = document.getElementById('memberForm');
    const memberNameInput = document.getElementById('memberName');
    const memberTableBody = document.querySelector('#memberTable tbody');
    
    // Memuat data dari Local Storage saat halaman dimuat
    let members = JSON.parse(localStorage.getItem('memberData')) || [];

    // Fungsi untuk merender (menampilkan) tabel
    function renderTable() {
        memberTableBody.innerHTML = ''; // Mengosongkan isi tabel
        
        // Mengurutkan anggota berdasarkan nama
        members.sort((a, b) => a.name.localeCompare(b.name));

        members.forEach((member, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${member.name}</td>
                <td>${member.count}</td>
                <td><button class="delete-btn" data-name="${member.name}">Hapus</button></td>
            `;
            memberTableBody.appendChild(row);
        });
    }

    // Fungsi untuk menyimpan data ke Local Storage
    function saveData() {
        localStorage.setItem('memberData', JSON.stringify(members));
    }

    // Event listener saat form disubmit
    memberForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        const memberName = memberNameInput.value.trim();
        
        if (memberName) {
            const existingMember = members.find(m => m.name.toLowerCase() === memberName.toLowerCase());

            if (existingMember) {
                existingMember.count++;
            } else {
                members.push({
                    name: memberName,
                    count: 1
                });
            }

            saveData();
            renderTable();
            memberNameInput.value = '';
        }
    });

    // Event listener untuk tombol hapus (menggunakan event delegation)
    memberTableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const nameToDelete = event.target.getAttribute('data-name');
            
            const memberIndex = members.findIndex(m => m.name === nameToDelete);

            if (memberIndex !== -1) {
                members.splice(memberIndex, 1);
                
                saveData();
                renderTable();
            }
        }
    });

    // Panggil renderTable() untuk pertama kali saat halaman dimuat
    renderTable();
});
