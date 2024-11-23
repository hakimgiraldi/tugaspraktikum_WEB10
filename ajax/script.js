// Fungsi untuk memvalidasi input secara langsung
function validateName() {
    const name = document.getElementById("nameInput").value;
    const messageElement = document.getElementById("greetingMessage");

    if (!name) {
        // Jika input kosong, tampilkan pesan peringatan
        messageElement.textContent = "Nama tidak boleh kosong!";
        messageElement.className = "message error"; // Tambahkan styling error
    } else {
        // Hapus pesan error jika input terisi
        messageElement.textContent = "";
        messageElement.className = "message";
    }
}

// Fungsi untuk mengirimkan sapaan
function sendGreeting() {
    const name = document.getElementById("nameInput").value;
    const messageElement = document.getElementById("greetingMessage");

    // Validasi jika input masih kosong
    if (!name) {
        messageElement.textContent = "Nama tidak boleh kosong!";
        messageElement.className = "message error";
        return;
    }

    // Membaca file ajax_info.txt
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "ajax_info.txt", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            // Mengganti placeholder {name} dengan input pengguna
            const template = xhr.responseText;
            const personalizedMessage = template.replace("{name}", name);

            // Menampilkan pesan sapaan
            messageElement.textContent = personalizedMessage;
            messageElement.className = "message success"; // Tambahkan styling success

            // Tampilkan animasi toast
            showToast("Data berhasil dikirim!");
        } else {
            messageElement.textContent = "Gagal memuat pesan sapaan.";
            messageElement.className = "message error";
        }
    };

    xhr.onerror = function () {
        messageElement.textContent = "Terjadi kesalahan saat mengakses file.";
        messageElement.className = "message error";
    };

    xhr.send();
}

// Fungsi untuk menampilkan animasi toast
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show";

    // Hilangkan toast setelah 3 detik
    setTimeout(() => {
        toast.className = "toast";
    }, 3000);
}
