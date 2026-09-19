        const shareBtn = document.getElementById("shareBtn");
const overlay = document.getElementById("shareOverlay");
const closeBtn = document.getElementById("closeBtn");
const copyBtn = document.getElementById("copyBtn");
const shareLinkInput = document.getElementById("shareLink");

// Replace this with your actual URL or dynamically set it
let currentUrl = "http://mmssb.github.io/sugartrack.com ";

// Open menu
shareBtn.addEventListener("click", () => {
  overlay.classList.remove("hidden");
});

// Close menu
closeBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

// Copy link
copyBtn.addEventListener("click", () => {
  shareLinkInput.select();
  shareLinkInput.setSelectionRange(0, 99999); // For mobile
  navigator.clipboard.writeText(currentUrl).then(() => {
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 2000);
  });
});

// Social sharing logic
function shareTo(platform) {
  const url = encodeURIComponent(currentUrl);
  const title = encodeURIComponent(document.title);

  let shareUrl = "";

  switch (platform) {
    case "whatsapp":
      shareUrl = `https://wa.me/?text=${title} ${url}`;
      break;
    case "facebook":
      shareUrl = ` https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case "twitter":
      shareUrl = ` https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      break;
    case "email":
      shareUrl = `mailto:?subject=${title}&body=${title}: ${url}`;
      break;
    case "gmail":
       shareUrl = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${title}&body=${url}&ui=2&tf=1&pli=1&text=${title}`;
       
    //    https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Your+Subject+here&body='+msgbody+'&ui=2&tf=1&pli=1
       break;
    case "bluesky":
      shareUrl = `https://bsky.app/intent/compose?text=${title}+${url}`;
      break;
  }

  window.open(shareUrl, "_blank");
}