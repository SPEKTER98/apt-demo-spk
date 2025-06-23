    // Initialize map
    const map = L.map('map').setView([10.494530, -66.831375], 50);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker([10.494530, -66.831375]).addTo(map)
        .bindPopup('APT TECNOLOGIA Y SISTEMAS C.A')
        .openPopup();


    map.scrollWheelZoom.disable(); // Desactiva el scroll

    // Animate marker
    gsap.to(marker._icon, {
        y: -0.1,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
;