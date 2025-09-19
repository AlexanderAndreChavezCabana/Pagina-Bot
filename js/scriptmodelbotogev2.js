// ===== Utilidades para estilos con fallback =====
function supportsConstructableStylesheets(targetShadowRoot) {
  try {
    return !!targetShadowRoot && "adoptedStyleSheets" in targetShadowRoot;
  } catch (e) {
    return false;
  }
}

function makeSheet(cssText) {
  // Crea un CSSStyleSheet (constructable) o devuelve null si no es soportado
  try {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(cssText);
    return sheet;
  } catch {
    return null;
  }
}

function applyStyles(shadowRoot, cssTexts) {
  if (!shadowRoot) return;

  const canAdopt = supportsConstructableStylesheets(shadowRoot);
  if (canAdopt) {
    const newsheets = cssTexts
      .map(txt => makeSheet(txt))
      .filter(Boolean);
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, ...newsheets];
  } else {
    // Fallback: inyectar <style>
    const style = document.createElement("style");
    style.textContent = cssTexts.join("\n");
    shadowRoot.appendChild(style);
  }
}

// ===== Lógica principal tras carga del DF Messenger =====
window.addEventListener("dfMessengerLoaded", function () {
  console.log("Dialogflow Messenger cargado ✅");

  const r1 = document.querySelector("df-messenger");
  if (!r1 || !r1.shadowRoot) return;

  const r2 = r1.shadowRoot.querySelector("df-messenger-chat");
  if (!r2 || !r2.shadowRoot) return;

  const r3 = r2.shadowRoot.querySelector("df-messenger-titlebar");
  const r4 = r2.shadowRoot.querySelector("df-messenger-user-input");
  const r5 = r2.shadowRoot.querySelector("df-message-list");

  if (!r3 || !r3.shadowRoot || !r4 || !r4.shadowRoot || !r5 || !r5.shadowRoot) {
    console.warn("Elementos internos no disponibles todavía.");
    return;
  }

  const r6 = r3.shadowRoot.querySelector("#dfTitlebar");
  const r7 = r4.shadowRoot.querySelector(".input-container");
  const r8 = r4.shadowRoot.querySelector(".input-container .input-box-wrapper");
  const r9 = r4.shadowRoot.querySelector(".input-container .input-box-wrapper input");

  // ===== Altura / responsive del chat-wrapper =====
  {
    const style = document.createElement("style");
    const nonMobileMinWidth = 501;
    style.textContent =
      `@media screen and (min-width:${nonMobileMinWidth}px){ .chat-wrapper { max-height:80% !important; } }`;
    r2.shadowRoot.appendChild(style);
  }

  // ===== Estilos: Titlebar (r3), sendIcon (r4), message list (r5) =====
  applyStyles(
    r3.shadowRoot,
    [`
      .title-wrapper {
        background: linear-gradient(135deg, rgb(28, 68, 100) 0%, rgb(38, 78, 110) 100%) !important;
        background-size: 200% 200%;
        box-shadow: rgba(0, 0, 0, 0.5) 0 0 10px;
        color: #fff !important;
        font-size: 22px !important;
        font-weight: bold;
        text-align: center;
        text-shadow: rgba(0,0,0,0.5) 2px 2px;
      }
    `]
  );

  applyStyles(
    r4.shadowRoot,
    [
      `#sendIcon { background: linear-gradient(135deg, rgb(37,71,106) 0%, rgb(20,105,126) 100%); border-radius: 3px; box-shadow: .5px .5px 1.5px 1.5px #ddd; }`,
      `#sendIcon:hover { fill: white; }`,
      `#sendIcon:hover { box-shadow: 1px 1px 2px 2px #ddd; transition: 400ms; border: .8px solid transparent; }`
    ]
  );

  applyStyles(
    r5.shadowRoot,
    [
      `#messageList { background: white; }`,
      `#messageList .message.user-message { color: white; background: linear-gradient(135deg, rgb(37,71,106), rgb(20,105,126)) !important; }`,
      `#messageList .message.bot-message { color: rgb(6,19,43); background: rgb(240,242,247); }`
    ]
  );

  // ===== Logo animado en el titlebar (antes del título) =====
  if (r6) {
    const imagen_bot = document.createElement("img");
    imagen_bot.src = "https://firebasestorage.googleapis.com/v0/b/chatbotoge.appspot.com/o/ogechatbot.png?alt=media&token=d3846f07-18d8-49f6-a29b-0a84ba64674d";
    imagen_bot.width = 40;
    imagen_bot.height = 40;
    imagen_bot.style.transition = "all .5s ease";
    r6.insertAdjacentElement("beforebegin", imagen_bot);

    let angle = 0;
    let direction = 1;

    function rotateImage() {
      angle += direction * 0.01;
      if (angle > 0.2 || angle < -0.2) direction *= -1;
      imagen_bot.style.transform = `rotate(${angle}rad)`;
      requestAnimationFrame(rotateImage);
    }
    rotateImage();

    imagen_bot.addEventListener("mouseover", () => {
      imagen_bot.style.transform = `scale(1.2) rotate(${angle}rad)`;
    });
    imagen_bot.addEventListener("mouseout", () => {
      imagen_bot.style.transform = `scale(1) rotate(${angle}rad)`;
    });
  }

  // ===== Animaciones del widgetIcon (burbuja) en el root (r1) =====
  applyStyles(
    r1.shadowRoot,
    [`
      @keyframes blink {
        0% { box-shadow: rgba(28,68,100, .35) 0 0 9px, rgba(28,68,100,.40) 0 0 10px, rgba(28,68,100,.45) 0 0 9px; }
        50% { box-shadow: rgba(28,68,100, .20) 0 0 3px, rgba(28,68,100,.20) 0 0 3px, rgba(28,68,100,.20) 0 0 3px; }
        100% { box-shadow: rgba(28,68,100, .35) 0 0 9px, rgba(28,68,100,.40) 0 0 9px, rgba(28,68,100,.45) 0 0 9px; }
      }
      @keyframes rotateY {
        0%, 40% { transform: rotateY(0deg); }
        60%, 100% { transform: rotateY(180deg); }
      }
      button#widgetIcon {
        background: linear-gradient(135deg, rgb(28,68,100) 0%, rgb(38,78,110) 100%) 0% 0% / 200% 200%;
        border: none;
        box-shadow: rgba(28,68,100,.35) 0 0 9px, rgba(28,68,100,.4) 0 0 9px, rgba(28,68,100,.45) 0 0 9px;
        animation: blink 5s linear infinite, rotateY 50s linear infinite;
      }
    `]
  );

  // ===== Zona inferior: "Chat online" + enlace + botón micrófono =====
  if (r7 && r8 && r9) {
    const div_microphone = document.createElement("div");
    div_microphone.style = "background: rgb(240,242,247); margin: 0 auto; display:flex; justify-content:center; align-items:center; gap:8px;";
    r7.insertAdjacentElement("afterend", div_microphone);

    const span_text_bot = document.createElement("span");
    span_text_bot.textContent = "Chat online";

    const enlace_oge = document.createElement("a");
    enlace_oge.href = "https://www.facebook.com/ogeunasamoficial/";
    enlace_oge.textContent = "OGE-UNASAM";
    enlace_oge.style = "text-decoration:none";

    const btn_microphone = document.createElement("button");
    btn_microphone.style = "display:block; height: 40px; width: 40px; border-radius: 50px; background: white; border: 0; margin:5px; cursor:pointer;";

    const imagen_microphone = document.createElement("img");
    imagen_microphone.src = "https://firebasestorage.googleapis.com/v0/b/chatbotoge.appspot.com/o/microphone.png?alt=media&token=0992cc33-0b7e-4b53-8bf8-8d53fad0157a";
    imagen_microphone.width = 26;
    imagen_microphone.height = 26;
    imagen_microphone.style = "padding-top:0px";
    btn_microphone.appendChild(imagen_microphone);

    div_microphone.appendChild(span_text_bot);
    div_microphone.appendChild(enlace_oge);
    div_microphone.appendChild(btn_microphone);

    // Reconocimiento de voz
    btn_microphone.addEventListener("click", function () {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Tu navegador no soporta reconocimiento de voz.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "es-PE";
      recognition.interimResults = true;

      recognition.addEventListener("result", e => {
        const transcript = Array.from(e.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join("");

        r9.value = transcript;
        r8.className = "input-box-wrapper valid";
        r9.focus();
        // console.log("voz:", transcript);
      });

      recognition.start();
      btn_microphone.style = "display:block; height: 40px; width: 40px; border-radius: 50px; border:0; margin:5px; background: linear-gradient(135deg, rgba(37,71,106,.7) 0%, rgba(20,105,126,.7) 100%);";

      recognition.onend = () => {
        btn_microphone.style = "display:block; height: 40px; width: 40px; border-radius: 50px; background: white; border: 0; margin:5px;";

        // Simular Enter para enviar
        const ev = new KeyboardEvent("keydown", {
          bubbles: true,
          cancelable: true,
          key: "Enter",
          code: "Enter",
          keyCode: 13,
          which: 13
        });
        r9.dispatchEvent(ev);
      };
    });
  }

  // ===== TTS: Ícono de audio por cada mensaje del bot =====
  (function attachTTSForBotMessages() {
    const sr = r5.shadowRoot;
    if (!sr) return;

    function addIconToMessage(msgEl) {
      if (!msgEl || !msgEl.classList || !msgEl.classList.contains("bot-message")) return;
      if (msgEl.dataset.ttsAttached === "1") return; // evitar duplicados

      const audioIcon = document.createElement("img");
      audioIcon.src = "https://firebasestorage.googleapis.com/v0/b/chatbotoge.appspot.com/o/voz%2Fbot_voz.png?alt=media&token=80f770a9-3bc5-4a45-814e-f1d3a0b42463";
      audioIcon.style.cssText = "cursor:pointer; margin-left:6px; vertical-align:middle;";
      audioIcon.title = "Escuchar mensaje";

      audioIcon.addEventListener("click", () => {
        const messageText = (msgEl.textContent || "").trim();
        if (!messageText) return;
        const utter = new SpeechSynthesisUtterance(messageText);
        utter.lang = "es-PE";
        window.speechSynthesis.cancel(); // cortar cualquier lectura previa
        window.speechSynthesis.speak(utter);
      });

      // Insertar al final del contenido del mensaje
      msgEl.appendChild(audioIcon);
      msgEl.dataset.ttsAttached = "1";
    }

    // Procesar existentes
    sr.querySelectorAll(".message.bot-message").forEach(addIconToMessage);

    // Observar nuevos mensajes
    const observer = new MutationObserver(muts => {
      for (const m of muts) {
        m.addedNodes.forEach(node => {
          if (!(node instanceof Element)) return;

          // si agregan directamente un .bot-message
          if (node.classList && node.classList.contains("bot-message")) {
            addIconToMessage(node);
          }

          // si agregan contenedores, buscar dentro
          node.querySelectorAll && node.querySelectorAll(".message.bot-message").forEach(addIconToMessage);
        });
      }
    });

    observer.observe(sr, { childList: true, subtree: true });
  })();
});
