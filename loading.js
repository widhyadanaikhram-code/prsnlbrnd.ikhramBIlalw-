// --- LOGIKA ANIMASI LOADING (PURE JAVASCRIPT) ---
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Menciptakan elemen "Layar Loading" secara virtual
    const loader = document.createElement("div");
    loader.textContent = "LOADING... 👾";

    // 2. Memberikan gaya desain (styling) langsung dari JS
    Object.assign(loader.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        backgroundColor: "var(--bg-color)", // Menyesuaikan tema gelap/terang otomatis
        color: "var(--border-color)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
        zIndex: "999999",
        pointerEvents: "none", // Agar tidak menghalangi klik
        opacity: "1",          // Layar penuh saat pertama kali dimuat
        visibility: "visible",
        transition: "opacity 0.5s ease-in, visibility 0.5s", // Animasi transisi
        fontFamily: "inherit"  // Mengikuti font 'Press Start 2P'
    });

    // Memasukkan elemen tersebut ke dalam halaman web
    document.body.appendChild(loader);

    // 3. Efek Saat Halaman Masuk (Loading Menghilang)
    // Ditahan 200ms (0.2 detik) agar tulisan sempat terbaca
    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
    }, 200);

    // 4. Efek Saat Pindah Halaman (Loading Muncul)
    const navLinks = document.querySelectorAll("nav a");
    
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const targetUrl = this.href;
            
            // Mencegah browser langsung pindah halaman
            e.preventDefault(); 
            
            // Memunculkan kembali layar loading
            loader.style.transition = "opacity 0.3s ease-out";
            loader.style.visibility = "visible";
            loader.style.opacity = "1";
            loader.style.pointerEvents = "all"; // Kunci layar
            
            // Menunggu 800ms sebelum benar-benar berpindah ke URL baru
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 800);
        });
    });
});