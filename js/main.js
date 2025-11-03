$(document).ready(function () {
  // ===== PRELOAD & INTRO =====
  setTimeout(function () {
    firstQuestion();
    $(".spinner").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({ overflow: "visible" });
  }, 600);

  // ===== INIT BUTTON TEXT =====
  function init() {
    $("#title").text(CONFIG.title);
    $("#desc").text(CONFIG.desc);
    $("#yes").text(CONFIG.btnYes);
    $("#no").text(CONFIG.btnNo);
  }

  // ===== INTRO POPUP =====
  function firstQuestion() {
    $(".content").hide();
    Swal.fire({
      title: CONFIG.introTitle,
      html: CONFIG.introDesc.replace(/\n/g, "<br>"),
      imageUrl: "img/lookMe.jpg",
      imageWidth: 300,
      imageHeight: 300,
      background: '#fff url("img/iput-bg.jpg")',
      imageAlt: "Custom image",
      confirmButtonText: CONFIG.btnIntro,
    }).then(function () {
      $(".content").show(200);
    });
  }

  init();

  // ===== SWITCH & MOVE BUTTON "NO" =====
  function switchButton() {
    var audio = new Audio("sound/duck.mp3");
    audio.play();
    var leftNo = $("#no").css("left");
    var topNo = $("#no").css("top");
    var leftYes = $("#yes").css("left");
    var topYes = $("#yes").css("top");
    $("#no").css({ left: leftYes, top: topYes });
    $("#yes").css({ left: leftNo, top: topNo });
  }

  function moveButton() {
    var audio = new Audio("sound/Swish1.mp3");
    audio.play();
    var x = Math.random() * ($(window).width() - $("#no").width()) * 0.9;
    var y = Math.random() * ($(window).height() - $("#no").height()) * 0.9;
    $("#no").css({ left: x + "px", top: y + "px" });
  }

  var n = 0;
  $("#no").mousemove(function () {
    if (n < 1) switchButton();
    if (n > 1) moveButton();
    n++;
  });

  $("#no").click(() => {
    if (screen.width >= 900) switchButton();
  });

  // ===== AUTO TEXT GENERATE =====
  function textGenerate() {
    var n = "";
    var text = " " + CONFIG.reply;
    var a = Array.from(text);
    var textVal = $("#txtReason").val() ? $("#txtReason").val() : "";
    var count = textVal.length;
    if (count > 0) {
      for (let i = 1; i <= count; i++) {
        n = n + a[i];
        if (i == text.length + 1) {
          $("#txtReason").val("");
          n = "";
          break;
        }
      }
    }
    $("#txtReason").val(n);
    setTimeout("textGenerate()", 1);
  }

  // ===== POPUP "YES" =====
  $("#yes").click(function () {
    var audio = new Audio("sound/tick.mp3");
    audio.play();
    Swal.fire({
      title: CONFIG.question,
      width: 900,
      padding: "3em",
      html: "<input type='text' class='form-control' id='txtReason' placeholder='Whyyy'>",
      background: '#fff url("img/iput-bg.jpg")',
      backdrop: `
          rgba(0,0,123,0.4)
          url("img/giphy2.gif")
          left top
          no-repeat
        `,
      confirmButtonColor: "#fe8a71",
      confirmButtonText: CONFIG.btnReply,
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          width: 900,
          confirmButtonText: CONFIG.btnAccept,
          background: '#fff url("img/iput-bg.jpg")',
          title: CONFIG.mess,
          text: CONFIG.messDesc,
          confirmButtonColor: "#83d0c9",
          onClose: () => {
            window.location = CONFIG.messLink;
          },
        });
      }
    });
  });

  // ===== GÕ ĐẾN ĐÂU GỢI Ý ĐẾN ĐÓ (auto typing lock) =====
  $(document).on("input", "#txtReason", function () {
    let target = CONFIG.reply; // dùng CONFIG.reply cho đồng bộ
    let currentLength = $(this).val().length;

    // Ghi đè ký tự người dùng bằng ký tự tương ứng trong target
    $(this).val(target.substring(0, currentLength));

    // Nếu đã gõ hết câu -> khóa input
    if (currentLength >= target.length) {
      $(this).val(target);
      $(this).prop("disabled", true);
    }
  });
});
