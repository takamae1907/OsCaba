document.addEventListener('DOMContentLoaded', () => {

    // Lógica do botão "Amo Você"
    const loveButton = document.getElementById('loveButton');
    loveButton.addEventListener('click', () => {
        alert('Eu também te amo mais que tudo! ❤️');
    });

    // =============================================== //
    // ======== LÓGICA DO PLAYER DE MÚSICA ============= //
    // =============================================== //

    // --- TROQUE AQUI: Personalize sua playlist ---
    const playlist = [
        {
            title: 'Nossa Primeira Música',
            artist: 'Você & Ela',
            src: 'musica/nossa-musica.mp3', // Caminho para o arquivo de áudio
            art: 'imagens/capa-musica.jpg'      // Caminho para a imagem da capa
        },
        {
            title: 'Aquela da Viagem',
            artist: 'Momentos Incríveis',
            src: 'musica/musica_viagem.mp3',
            art: 'imagens/capa_viagem.jpg'
        },
        // Adicione mais músicas aqui
    ];

    // --- Não precisa mexer no código abaixo ---

    let currentTrackIndex = 0;
    let isPlaying = false;

    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    const playerAlbumArt = document.getElementById('playerAlbumArt');
    const playerSongTitle = document.getElementById('playerSongTitle');
    const playerSongArtist = document.getElementById('playerSongArtist');

    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const currentTimeEl = document.getElementById('currentTime');
    const totalDurationEl = document.getElementById('totalDuration');

    function loadTrack(trackIndex) {
        const track = playlist[trackIndex];
        playerAlbumArt.src = track.art;
        playerSongTitle.textContent = track.title;
        playerSongArtist.textContent = track.artist;
        audio.src = track.src;
        audio.load();
    }

    function playTrack() {
        isPlaying = true;
        playPauseBtn.classList.remove('fa-play');
        playPauseBtn.classList.add('fa-pause');
        audio.play();
    }

    function pauseTrack() {
        isPlaying = false;
        playPauseBtn.classList.remove('fa-pause');
        playPauseBtn.classList.add('fa-play');
        audio.pause();
    }

    function prevTrack() {
        currentTrackIndex--;
        if (currentTrackIndex < 0) {
            currentTrackIndex = playlist.length - 1;
        }
        loadTrack(currentTrackIndex);
        playTrack();
    }

    function nextTrack() {
        currentTrackIndex++;
        if (currentTrackIndex > playlist.length - 1) {
            currentTrackIndex = 0;
        }
        loadTrack(currentTrackIndex);
        playTrack();
    }

    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;

        // Atualizar tempo total (apenas uma vez)
        if (duration) {
            totalDurationEl.textContent = formatTime(duration);
        }
        // Atualizar tempo atual
        currentTimeEl.textContent = formatTime(currentTime);
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Event Listeners
    playPauseBtn.addEventListener('click', () => (isPlaying ? pauseTrack() : playTrack()));
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextTrack);
    progressContainer.addEventListener('click', setProgress);

    // Carregar a primeira música ao iniciar
    loadTrack(currentTrackIndex);
});