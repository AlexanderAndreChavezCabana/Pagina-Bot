    $(document).ready(function() {
        window.addEventListener('dfMessengerLoaded', function (event) {
            const dfMessenger = document.querySelector('df-messenger'); 
            const style = document.createElement('style');
            $r1 = document.querySelector("df-messenger");
            $r2 = $r1.shadowRoot.querySelector("df-messenger-chat");
            $r3 = $r2.shadowRoot.querySelector("df-messenger-titlebar");
            $r4 = $r2.shadowRoot.querySelector("df-messenger-user-input");
            $r5 = $r2.shadowRoot.querySelector("df-message-list");
            $r6 = $r3.shadowRoot.querySelector("#dfTitlebar");
            $r7 = $r4.shadowRoot.querySelector(".input-container");
            $r8 = $r4.shadowRoot.querySelector(".input-container .input-box-wrapper");
            $r9 = $r4.shadowRoot.querySelector(".input-container .input-box-wrapper input");
            
            // SCROLL
            // -------------------------------------------------
            let lastVisibleMessage = null;
            
            const messageListShadowRoot = $r5.shadowRoot;
            const chatScrollContainer = messageListShadowRoot.querySelector('#messageList');
            chatScrollContainer.addEventListener('scroll', function() {
                const messages = chatScrollContainer.querySelectorAll('.message');
                for (let i = messages.length - 1; i >= 0; i--) {
                    const message = messages[i];
                    const messageRect = message.getBoundingClientRect();
                    const containerRect = chatScrollContainer.getBoundingClientRect();
                    if (messageRect.bottom <= containerRect.bottom) {
                        lastVisibleMessage = message;
                        break;
                    }
                }
            });
    
            const observer = new MutationObserver((mutationsList) => {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'childList' && lastVisibleMessage) {
                        const newScrollTop = lastVisibleMessage.offsetTop + lastVisibleMessage.clientHeight - chatScrollContainer.clientHeight;
                        chatScrollContainer.scrollTop = newScrollTop;
                    }
                }
            });
    
            const config = { attributes: false, childList: true, subtree: true };
            observer.observe(chatScrollContainer, config);
            // -------------------------------------------------


            // Height
            const nonMobileMinWidth = 501; // Breakpoint where DF Messenger switches between mobile/non-mobile styles
            style.textContent = '@media screen and (min-width: ' + nonMobileMinWidth + 'px) { .chat-wrapper { max-height: 80%; }';
            dfMessenger.shadowRoot.querySelector('df-messenger-chat').shadowRoot.appendChild(style);

            // Color title
            var sheet = new CSSStyleSheet;
            sheet.replaceSync(`.title-wrapper {
                    background: linear-gradient(135deg, rgb(37 99 235) 0%, rgb(29 78 216) 100%);
                    background-size: 200% 200%;
                    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px;
                    color: rgb(255, 255, 255);
                    font-size: 22px;
                    font-weight: bold;
                    text-align: center;
                    text-shadow: rgba(0, 0, 0, 0.5) 2px 2px
                }`);
            
            $r3.shadowRoot.adoptedStyleSheets = [sheet];
            
            
            // OTRO APARTADO

            const imagen_bot = document.createElement('img');
            imagen_bot.src = 'https://firebasestorage.googleapis.com/v0/b/chatbotpostgradounasam.appspot.com/o/ChatbotPostgrado%2Fbuhosgapg.png?alt=media&token=26a4f45f-086b-46a3-b7e0-85d4889166f0';
            imagen_bot.width = 40;
            imagen_bot.height = 40;
            imagen_bot.style.transition = 'all 0.5s ease';
            
            $r6.insertAdjacentElement("beforebegin", imagen_bot);
            
            let angle = 0;
            let direction = 1;

            function rotateImage() {
                angle = angle + direction * 0.01;
                if (angle > 0.2 || angle < -0.2) {
                    direction = -direction; // Cambia la dirección cuando se alcanza cierto ángulo.
                }
                imagen_bot.style.transform = `rotate(${angle}rad)`;
                requestAnimationFrame(rotateImage);
            }

            // Añade un efecto de "hover" que hace que la imagen parezca que se levanta cuando se pasa el ratón sobre ella.
            imagen_bot.addEventListener('mouseover', function() {
                imagen_bot.style.transform = 'scale(1.2) rotate(' + angle + 'rad)';
            });

            imagen_bot.addEventListener('mouseout', function() {
                imagen_bot.style.transform = 'scale(1) rotate(' + angle + 'rad)';
            });

            rotateImage();

            // Div for microphone
            const div_microphone = document.createElement('div');
           //  div_microphone.textContent = "Ejemplo"; 
            div_microphone.style="border-top-color: black;background: linear-gradient(135deg, rgb(37 99 235) 0%, rgb(29 78 216) 100%) 0% 0% / 200% 200%;margin: 0 auto; display: flex; justify-content: center; align-items: center;font-size: 15px;font-weight: bold;    text-shadow: rgba(0, 0, 0, 0.5) 2px 2px;box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px;"
            
            $r7.insertAdjacentElement("afterend", div_microphone);
            
            // Span for microphone
            const span_text_bot = document.createElement('span');
            // span_text_bot.textContent = "Chatear en facebook";
            // span_text_bot.innerHTML += "&nbsp;";

            const enlace_sgapg = document.createElement('a');
            enlace_sgapg.href = "https://www.facebook.com/epgunasam2019/";
            enlace_sgapg.textContent = "Chatear con Postgrado";  
            enlace_sgapg.style = "text-decoration:none; color: white; text-font:bold;";
            enlace_sgapg.target = "_blank";
            enlace_sgapg.innerHTML += "&nbsp;";

            // Imagen de Facebook
            const img_fb = document.createElement('img');
            img_fb.src = "https://firebasestorage.googleapis.com/v0/b/chatbotpostgradounasam.appspot.com/o/ChatbotPostgrado%2Ffacebook.png?alt=media&token=ceda8a36-d780-444b-aff5-3c5e098e3ce4";
            img_fb.alt = "Fb";
            img_fb.style.width = 20;
            img_fb.style.height = 20;
            img_fb.style = "margin-right: 5px;"; 
            img_fb.innerHTML += "&nbsp;";

            const btn_microphone = document.createElement('button');
            btn_microphone.style = "display:block; height: 40px; width: 40px; border-radius: 50px; background: white; border: 0; margin-top: 5px; margin-bottom: 5px";

            div_microphone.insertAdjacentElement("beforeend", span_text_bot);
            div_microphone.insertAdjacentElement("beforeend", img_fb);
            div_microphone.insertAdjacentElement("beforeend", enlace_sgapg);
            div_microphone.insertAdjacentElement("beforeend", btn_microphone);

            const imagen_microphone = document.createElement('img');
            imagen_microphone.src = 'https://firebasestorage.googleapis.com/v0/b/chatbotpostgradounasam.appspot.com/o/ChatbotPostgrado%2Fmicrophone.png?alt=media&token=f2fe19fe-5883-4649-a963-0ebee46e40ab';
            imagen_microphone.width = 26;
            imagen_microphone.height = 26;
            imagen_microphone.style = "padding-top: 0px";

            btn_microphone.appendChild(imagen_microphone);

            // color sendIcon replace
            var sheet1 = new CSSStyleSheet;
            sheet1.replaceSync(`#sendIcon:hover { fill: white; }`);

            // color sendIcon insert
            var sheet3 = new CSSStyleSheet;
            sheet3.insertRule(`#sendIcon:hover { box-shadow: 1px 1px 2px 2px #ddd; transition: 400ms; border: 0.8px}`);

            // background user message insert
            var sheet5 = new CSSStyleSheet;
            sheet5.insertRule(`#messageList .message.user-message { color: white; background: linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(37, 99, 235) 100%) } `);
            
            // background chat
            var sheet6 = new CSSStyleSheet;
            sheet6.insertRule(`#messageList { background: white; } `);
            
            // background bot message
            var sheet7 = new CSSStyleSheet;
            sheet7.insertRule(`#messageList .message.bot-message { color: rgb(6, 19, 43); background: rgb(239, 246, 255); } `);
            $r5.shadowRoot.adoptedStyleSheets = [sheet5, sheet6, sheet7];

            
            // color sendIcon insert
            var sheet2 = new CSSStyleSheet;
            sheet2.insertRule(`#sendIcon { background: linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(37, 99, 235) 100%); border-radius: 3px; box-shadow: 0.5px 0.5px 1.5px 1.5px #ddd;}`);
            $r4.shadowRoot.adoptedStyleSheets = [sheet1, sheet2, sheet3];
            
            
            
            /*
            var sheet4 = new CSSStyleSheet;
            sheet4.replaceSync(`button#widgetIcon { box-shadow: rgb(0 77 255 / 50%) 0px 4px 24px; }`);
            $r1.shadowRoot.adoptedStyleSheets = [sheet4];*/
            
            var sheet4 = new CSSStyleSheet;

            // Definir la animación y los estilos del botón
            const animationName = 'blink';
            const animationDefinition = `
                @keyframes ${animationName} {
                0% { box-shadow: rgb(28, 68, 100, 0.35) 0px 0px 9px, rgb(28, 68, 100, 0.40) 0px 0px 10px, rgb(28, 68, 100, 0.45) 0px 0px 9px; }
                50% { box-shadow: rgb(28, 68, 100, 0.20) 0px 0px 3px, rgb(28, 68, 100, 0.20) 0px 0px 3px, rgb(28, 68, 100, 0.20) 0px 0px 3px; }
                100% { box-shadow: rgb(28, 68, 100, 0.35) 0px 0px 9px, rgb(28, 68, 100, 0.40) 0px 0px 9px, rgb(28, 68, 100, 0.45) 0px 0px 9px; }
            }`;
            const buttonStyle = `
                button#widgetIcon {
                    background: linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(30, 64, 175) 100%);
                    border: none;
                    box-shadow: rgb(28, 68, 100, 0.35) 0px 0px 9px, rgb(28, 68, 100, 0.4) 0px 0px 9px, rgb(28, 68, 100, 0.45) 0px 0px 9px;
                    animation: ${animationName} 4s linear infinite;
            }`;

            // Agregar la animación y los estilos al stylesheet
            // sheet4.replaceSync(animationDefinition + buttonStyle);
            // Definir la animación de giro
            const rotateAnimationName = 'rotateY';
            const rotateAnimationDefinition = `
                @keyframes ${rotateAnimationName} {
                    0%, 40% { transform: rotateY(0deg); }
                    60%, 100% { transform: rotateY(180deg); }
                }`;

            // Agregar la animación al botón
            const buttonRotateStyle = `
                button#widgetIcon {
                    animation: ${animationName} 5s linear infinite, ${rotateAnimationName} 50s linear infinite;
            }`;

            // Agregar la nueva animación y los estilos al stylesheet
            sheet4.replaceSync(animationDefinition + buttonStyle + rotateAnimationDefinition + buttonRotateStyle);

            $r1.shadowRoot.adoptedStyleSheets = [sheet4];
           
            //btn micro
            btn_microphone.addEventListener('click',function(){
                var speech = true;
                window.SpeechRecognition = window.webkitSpeechRecognition;

                const recognition = new SpeechRecognition();
                recognition.lang = "es-PE"
                recognition.interimResults = true;
                
                recognition.addEventListener('result', e => {
                    const transcript = Array.from(e.results)
                        .map(result => result[0])
                        .map(result => result.transcript)
                        .join('')

                   
                    $r9.value = transcript;
                    $r8.className = "input-box-wrapper valid";
                    $r9.focus();
                    console.log(transcript);
                });
                
                if (speech == true) {
                    recognition.start();
                    btn_microphone.style = "display:block; height: 40px; width: 40px; border-radius: 50px; border: 0; margin-top: 5px; margin-bottom: 5px; background: linear-gradient(135deg, rgb(127, 0, 0, 0.7) 0%, rgb(170, 0, 48, 0.7) 100%); ";
                }

                recognition.onend = () => {
                    btn_microphone.style = "display:block; height: 40px; width: 40px; border-radius: 50px; background: white; border: 0; margin-top: 5px; margin-bottom: 5px";
                    var ev = document.createEvent('Event');
                    ev.initEvent('keypress');
                    ev.which = ev.keyCode = 13;
                    $r9.dispatchEvent(ev);
                
                };
            })

        });

    });
