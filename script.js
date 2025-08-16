onload = () =>{
    document.body.classList.remove("container");
};

// Müzik kontrol fonksiyonu
let isMusicPlaying = false;

function toggleMusic() {
  console.log('Normal müzik fonksiyonu kaldırıldı - sadece YouTube müziği kullanılıyor');
}

// Sayfa yüklendiğinde YouTube müziği hazırla
document.addEventListener('DOMContentLoaded', function() {
  console.log('Sayfa yüklendi! YouTube müziği hazırlanıyor...');
});

// YouTube Müzik kontrol fonksiyonu
let isYouTubePlaying = false;
let player;

// YouTube API yüklendiğinde
function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  console.log('YouTube Player hazır! Otomatik başlatılıyor...');
  // Ses seviyesini düşük tut (0-100 arası, 30 = %30 ses)
  player.setVolume(30);
  // YouTube müziği otomatik başlat
  player.playVideo();
}

function onPlayerStateChange(event) {
  const button = document.querySelector('.youtube-toggle');
  
  if (event.data == YT.PlayerState.PLAYING) {
    button.classList.add('playing');
    button.querySelector('.youtube-text').textContent = 'Durdur';
    isYouTubePlaying = true;
  } else if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.STOPPED) {
    button.classList.remove('playing');
    button.querySelector('.youtube-text').textContent = 'YouTube Müzik';
    isYouTubePlaying = false;
  }
}

function toggleYouTubeMusic() {
  if (!player) {
    alert('YouTube Player henüz hazır değil. Lütfen bekleyin.');
    return;
  }
  
  if (isYouTubePlaying) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
}

// YouTube API'yi yükle
if (!window.YT) {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;