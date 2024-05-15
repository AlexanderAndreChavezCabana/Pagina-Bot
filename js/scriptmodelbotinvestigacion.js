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
            
            // Image Bot
            if (!$r6.querySelector('.bot-image')) {
                const imagen_bot = document.createElement('img');
                imagen_bot.src = 'https://firebasestorage.googleapis.com/v0/b/chatbotinvestigacion.appspot.com/o/pom-bot.gif?alt=media&token=b3bd2e67-243f-4de5-8657-37442939ee5c';
                imagen_bot.width = 40;
                imagen_bot.height = 40;
                imagen_bot.style.transition = 'all 0.5s ease';
                
                $r6.insertAdjacentElement("beforebegin", imagen_bot);
                
                let angle = 0;
                let direction = 1;
                /*
                function rotateImage() {
                    angle = angle + direction * 0.01;
                    if (angle > 0.2 || angle < -0.2) {
                        direction = -direction; // Cambia la dirección cuando se alcanza cierto ángulo.
                    }
                    imagen_bot.style.transform = `rotate(${angle}rad)`;
                    requestAnimationFrame(rotateImage);
                } */
    
                // Añade un efecto de "hover" que hace que la imagen parezca que se levanta cuando se pasa el ratón sobre ella.
                imagen_bot.addEventListener('mouseover', function() {
                    imagen_bot.style.transform = 'scale(1.2) rotate(' + angle + 'rad)';
                });
    
                imagen_bot.addEventListener('mouseout', function() {
                    imagen_bot.style.transform = 'scale(1) rotate(' + angle + 'rad)';
                });
    
                // rotateImage();
                // console.log("Se cargo la imagen del bot");
            }
            else
            {
                // console.log("Ya existe");
            }

            // Verifica si ya existe el div para el micrófono
            if (!$r7.querySelector('.div-microphone')) {
                const div_microphone = document.createElement('div');
                div_microphone.className = 'div-microphone'; 
                div_microphone.style = "border-top-color: black;background: linear-gradient(135deg, rgb(37 99 235) 0%, rgb(29 78 216) 100%) 0% 0% / 200% 200%;margin: 0 auto; display: flex; justify-content: center; align-items: center;font-size: 15px;font-weight: bold; text-shadow: rgba(0, 0, 0, 0.5) 2px 2px;box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px;";
                
                $r7.insertAdjacentElement("afterend", div_microphone);
                
                const btn_microphone = document.createElement('button');
                btn_microphone.className = 'btn-microphone'; 
                btn_microphone.style = "display: block; height: 40px; width: 40px; border-radius: 50%; background: white; border: none; margin-top: 5px; margin-bottom: 5px;";
                
                const imagen_microphone = document.createElement('img');
                imagen_microphone.src = 'https://firebasestorage.googleapis.com/v0/b/chatbotsaludmental.appspot.com/o/voz-de-google.png?alt=media&token=ec2eb92c-be71-4d62-86cd-2d3580d9d0e7';
                imagen_microphone.width = 26;
                imagen_microphone.height = 26;
                imagen_microphone.style = "padding-top: 0px;";
                
                btn_microphone.appendChild(imagen_microphone);
                div_microphone.insertAdjacentElement("beforeend", btn_microphone);
                // console.log("Se creo la división del micrófono");

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
                        height: 70px; /* Nuevo tamaño */
                        width: 70px; /* Nuevo tamaño */
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        }`;
    
                // Estilos para centrar .df-chat-icon dentro de #widgetIcon
                const chatIconStyle = `
                    button#widgetIcon .df-chat-icon {
                        position: absolute;    /* Posicionamiento absoluto respecto a su contenedor relativo */
                        top: 50%;             /* Posicionamiento del 50% desde la parte superior del contenedor */
                        left: 50%;            /* Posicionamiento del 50% desde el lado izquierdo del contenedor */
                        transform: translate(-50%, -50%); /* Desplazamiento hacia atrás en X y Y en un 50% para centrar el elemento */
                        height: 45px;
                        width: 45px;
                        transition: opacity 0.5s;
                        padding-bottom: 6px;
                    }
                `;
    
                const closeSvgStyle = `
                    button#widgetIcon div #closeSvg {
                        position: static;
                    }
                `;
    
    
                // Agregar la animación y los estilos al stylesheet
                // sheet4.replaceSync(animationDefinition + buttonStyle);
                // Definir la animación de giro
                /*
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
                }`; */
    
                // Agregar la nueva animación y los estilos al stylesheet
                // sheet4.replaceSync(animationDefinition + buttonStyle + chatIconStyle + rotateAnimationDefinition + buttonRotateStyle + closeSvgStyle);
                sheet4.replaceSync(animationDefinition + buttonStyle + chatIconStyle + closeSvgStyle);
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
                        // console.log(transcript);
                    });
                    
                    if (speech == true) {
                        recognition.start();
                        imagen_microphone.src = 'https://firebasestorage.googleapis.com/v0/b/chatbotsaludmental.appspot.com/o/google_voz_active.gif?alt=media&token=4adc07df-3ad2-4260-88d4-1d6303c353b5';
                    }
    
                    recognition.onend = () => {
                        imagen_microphone.src = 'https://firebasestorage.googleapis.com/v0/b/chatbotsaludmental.appspot.com/o/voz-de-google.png?alt=media&token=ec2eb92c-be71-4d62-86cd-2d3580d9d0e7';
                        var ev = document.createEvent('Event');
                        ev.initEvent('keypress');
                        ev.which = ev.keyCode = 13;
                        $r9.dispatchEvent(ev);
                    
                    };
                })
            }
            else{
                // console.log("Ya existe el micrófono.");
            }
            
            // Adding the new cloud div inside the widgetIcon button
            const widgetIcon = dfMessenger.shadowRoot.querySelector('#widgetIcon');
            if (widgetIcon) {
                const cloudDiv = document.createElement('div');
                cloudDiv.className = 'cloud';
                cloudDiv.style = 'position: absolute; top:-80px; transform: translateX(-50%); z-index: 100;';
    
                const cloudImage = document.createElement('img');
                cloudImage.src = 'https://firebasestorage.googleapis.com/v0/b/chatbotsaludmental.appspot.com/o/giphy.gif?alt=media&token=2d8e15a6-dc9f-4ccd-a0f7-99fb0dc7ab93';
                cloudImage.alt = 'Nube flotante';
                cloudImage.className = 'cloud-image';
                cloudImage.style = 'width: 100px; height: auto;';
    
                cloudDiv.appendChild(cloudImage);
                widgetIcon.insertAdjacentElement('afterbegin', cloudDiv);

                // Toggle cloud visibility on button click
                widgetIcon.addEventListener('click', function() {
                    cloudDiv.hidden = !cloudDiv.hidden;
                });

                // Añadir el sonido de notificación
                const audio = new Audio('https://firebasestorage.googleapis.com/v0/b/chatbotsaludmental.appspot.com/o/livechat-129007.mp3?alt=media&token=fb4fc225-df38-4120-a85c-3805b62a6e4b'); // Reemplaza con la URL de tu sonido de notificación
    
                // Alternar visibilidad de la nube y reproducir/detener el sonido al hacer clic en el botón
                widgetIcon.addEventListener('click', function() {
                    cloudDiv.hidden = !cloudDiv.hidden;
                    if (!cloudDiv.hidden) {
                        audio.loop = true; // Reproducir en bucle
                        audio.play();
                    } else {
                        audio.pause();
                        audio.currentTime = 0; // Reiniciar el sonido
                    }
                });
            }


        });

    });
