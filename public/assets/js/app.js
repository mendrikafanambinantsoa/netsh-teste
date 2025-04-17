async function chargerProfils() {
    const res = await fetch('/wifi-profiles');
    const profils = await res.json();
    const liste = document.getElementById('liste');
    liste.innerHTML = '';

    profils.forEach(profil => {
        const btn = document.createElement('button');
        btn.textContent = profil;
        btn.className = 'wifi-btn'; // Ajoute une classe CSS
        btn.onclick = () => chargerDetails(profil);
        liste.appendChild(btn);
    });
  }

  async function chargerDetails(profil) {
    const res = await fetch(`/wifi-details/${encodeURIComponent(profil)}`);
    const text = await res.text();
    document.getElementById('details').textContent = text;
  }