// id card
window.addEventListener("scroll", () => {
  // 檢查視窗寬度是否大於等於 992px
  if (window.innerWidth >= 992) {
    const nav = document.querySelector(".fixedPart");
    const scrollPosition = window.scrollY || window.pageYOffset;
    const scrollThreshold = 100;

    if (scrollPosition > scrollThreshold) {
      nav.classList.add("fixed-nav");
    } else {
      nav.classList.remove("fixed-nav");
    }
  }
});

// menu active
document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".mainContent > div");
  const menuIcons = document.querySelectorAll(".menuIcon");

  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute("id");
    }
  });

  // 檢查滾輪是否到頁面底部
  const isBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

  menuIcons.forEach((icon) => {
    icon.classList.remove("active"); // 移除所有圖示的啟動狀態
  });

  if (isBottom) {
    // 如果捲動到頁面底部，只為最後一個圖示新增active狀態
    menuIcons[menuIcons.length - 1].classList.add("active");
  } else {
    // 如果沒有捲動到底部，根據當前區塊為圖示新增active狀態
    menuIcons.forEach((icon) => {
      if (icon.classList.contains(currentSection)) {
        icon.classList.add("active");
      }
    });
  }
});

//打字機特效
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

//下載CV
document.addEventListener("DOMContentLoaded", function () {
  const downloadLinks = document.querySelectorAll(".downloadBtn");
  downloadLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // 阻止默認行為，即在新頁面中打開
      const url = this.getAttribute("href");
      const filename = url.substring(url.lastIndexOf("/") + 1);
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob"; // 設置為二進制數據
      xhr.onload = function () {
        if (this.status === 200) {
          const blob = this.response;
          if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, filename); // 兼容IE
          } else {
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click(); // 模擬點擊
          }
        }
      };
      xhr.send();
    });
  });
});

//to top
$(document).ready(function () {
  const options = {
    size: 50,
    lineWidth: 2,
    rotate: 270,
    colorCircleBackground: "gainsboro",
    colorCircle: "#005d7e",
  };

  const canvas = document.createElement("canvas");
  $(".to-top").append(canvas);
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.height = options.size;
  ctx.translate(options.size / 2, options.size / 2);
  ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);

  const refreshCanvas = () => {
    const top = $(window).scrollTop();
    const docH = $(document).height();
    const winH = $(window).height();
    const percent = (top / (docH - winH)) * 100;

    ctx.clearRect(-options.size / 2, -options.size / 2, options.size, options.size);
    ctx.lineWidth = options.lineWidth;
    ctx.lineCap = "butt";
    ctx.beginPath();
    ctx.arc(0, 0, (options.size - options.lineWidth) / 2, 0, Math.PI * 2 * 1, false);
    ctx.strokeStyle = options.colorCircleBackground;
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(0, 0, (options.size - options.lineWidth) / 2, 0, Math.PI * 2 * (percent / 100), false);
    ctx.strokeStyle = options.colorCircle;
    ctx.stroke();
    ctx.closePath();
  };

  refreshCanvas();

  $(".to-top").on("click", () => $("html, body").animate({ scrollTop: 0 }, "slow"));

  $(document).on("scroll", refreshCanvas);
});

//portfolio web
const filterButtons = document.querySelectorAll("#filter-buttons button");
const filterableCards = document.querySelectorAll("#filterable-cards .card");

// Function to filter cards based on filter buttons
const filterCards = (e) => {
  document.querySelector("#filter-buttons .active").classList.remove("active");
  e.target.classList.add("active");

  filterableCards.forEach((card) => {
    // show the card if it matches the clicked filter or show all cards if "all" filter is clicked
    if (card.dataset.name === e.target.dataset.filter || e.target.dataset.filter === "all") {
      return card.classList.replace("hide", "show");
    }
    card.classList.add("hide");
  });
};

// Set the default filter to "webService" and apply it
const defaultFilter = "webService";
document.querySelector(`button[data-filter="${defaultFilter}"]`).classList.add("active");
filterableCards.forEach((card) => {
  if (card.classList.contains(defaultFilter)) {
    card.classList.add("show");
  } else {
    card.classList.add("hide");
  }
});

// Add event listener to filter buttons
filterButtons.forEach((button) => button.addEventListener("click", filterCards));







// portfolio design
const filterButtonsDesign = document.querySelectorAll("#filter-buttons-design button");
const filterableCardsDesign = document.querySelectorAll("#filterable-cards-design .card");

// Function to filter cards based on filter buttons
const filterCardsDesiign = (e) => {
  document.querySelector("#filter-buttons-design .active").classList.remove("active");
  e.target.classList.add("active");

  filterableCardsDesign.forEach((card) => {
    // show the card if it matches the clicked filter or show all cards if "all" filter is clicked
    if (card.dataset.name === e.target.dataset.filter || e.target.dataset.filter === "all") {
      return card.classList.replace("hide", "show");
    }
    card.classList.add("hide");
  });
};

// Set the default filter to "webService" and apply it
const defaultFilterDesign = "light";
document.querySelector(`button[data-filter="${defaultFilterDesign}"]`).classList.add("active");
filterableCardsDesign.forEach((card) => {
  if (card.classList.contains(defaultFilterDesign)) {
    card.classList.add("show");
  } else {
    card.classList.add("hide");
  }
});

// Add event listener to filter buttons
filterButtonsDesign.forEach((button) => button.addEventListener("click", filterCardsDesiign));























// 行動版menu

$(document).ready(() => {
  // 獲取所有菜單連結
  const menuLinks = document.querySelectorAll(".menu-link");

  // 監聽每個菜單連結的點擊事件
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // 找到 toggle input 元素
      const toggleCheckbox = document.querySelector(".toggler");

      // 關閉菜單
      toggleCheckbox.checked = false;

      // 讓漢堡菜單恢復為三條線
      const hamburgerIcon = document.querySelector(".hamburger > div");
      hamburgerIcon.style.transform = "none";
    });
  });
});
