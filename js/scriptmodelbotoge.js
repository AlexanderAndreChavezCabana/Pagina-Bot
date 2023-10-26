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
            
                
            // Scroll
            const messageListShadowRoot = $r5.shadowRoot;
            const chatScrollContainer = messageListShadowRoot.querySelector('#messageList');
            const observer = new MutationObserver((mutationsList) => {
                for(let mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        chatScrollContainer.scrollTop = chatScrollContainer.scrollTop;
                    }
                }
            });
            const config = { attributes: false, childList: true, subtree: true };
            observer.observe(chatScrollContainer, config);


            // Height
            const nonMobileMinWidth = 501; // Breakpoint where DF Messenger switches between mobile/non-mobile styles
            style.textContent = '@media screen and (min-width: ' + nonMobileMinWidth + 'px) { .chat-wrapper { max-height: 80%; }';
            dfMessenger.shadowRoot.querySelector('df-messenger-chat').shadowRoot.appendChild(style);

            // Color title
            var sheet = new CSSStyleSheet;
            sheet.replaceSync(`.title-wrapper { color: rgb(255, 255, 255); background: linear-gradient(135deg, rgb(37, 71, 106) 0%, rgb(20, 105, 126) 100%) }`);
            $r3.shadowRoot.adoptedStyleSheets = [sheet];


            const imagen_bot = document.createElement('img');
            imagen_bot.src = 'https://firebasestorage.googleapis.com/v0/b/chatbotoge.appspot.com/o/ogechatbot.png?alt=media&token=d3846f07-18d8-49f6-a29b-0a84ba64674d';
            // imagen_bot.src = 'https://firebasestorage.googleapis.com/v0/b/chatbotoge.appspot.com/o/astrobot.gif?alt=media&token=56609aa7-1187-4a9c-a660-4e0201402768'
            imagen_bot.width = 36;
            imagen_bot.height = 36;

            $r6.insertAdjacentElement("beforebegin", imagen_bot);

            // Div for microphone
            const div_microphone = document.createElement('div');
           //  div_microphone.textContent = "Ejemplo"; 
            div_microphone.style="border-top-color: black;background: rgb(240, 242, 247);margin: 0 auto; display: flex; justify-content: center; align-items: center;"
            
            $r7.insertAdjacentElement("afterend", div_microphone);
            
            // Span for microphone
            const span_text_bot = document.createElement('span');
            span_text_bot.textContent = "Chat online";
            span_text_bot.innerHTML += "&nbsp;";

            const enlace_oge = document.createElement('a');
            enlace_oge.href = "https://www.facebook.com/ogeunasamoficial/";
            enlace_oge.textContent = "OGE-UNASAM";  
            enlace_oge.style = "text-decoration:none";   
            enlace_oge.innerHTML += "&nbsp;";


            const btn_microphone = document.createElement('button');
            btn_microphone.style = "display:block; height: 40px; width: 40px; border-radius: 50px; background: white; border: 0; margin-top: 5px; margin-bottom: 5px";

            div_microphone.insertAdjacentElement("beforeend", span_text_bot);
            div_microphone.insertAdjacentElement("beforeend", enlace_oge);
            div_microphone.insertAdjacentElement("beforeend", btn_microphone);

            const imagen_microphone = document.createElement('img');
            imagen_microphone.src = 'https://firebasestorage.googleapis.com/v0/b/chatbotoge.appspot.com/o/microphone.png?alt=media&token=0992cc33-0b7e-4b53-8bf8-8d53fad0157a';
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
            sheet5.insertRule(`#messageList .message.user-message { color: white; background: linear-gradient(135deg, rgb(37, 71, 106), rgb(20, 105, 126)) } `);
            
            // background chat
            var sheet6 = new CSSStyleSheet;
            sheet6.insertRule(`#messageList { background: white; } `);
            
            // background bot message
            var sheet7 = new CSSStyleSheet;
            sheet7.insertRule(`#messageList .message.bot-message { color: rgb(6, 19, 43); background: rgb(240, 242, 247); } `);
            $r5.shadowRoot.adoptedStyleSheets = [sheet5, sheet6, sheet7];

            
            // color sendIcon insert
            var sheet2 = new CSSStyleSheet;
            sheet2.insertRule(`#sendIcon { background: linear-gradient(135deg, rgb(37, 71, 106) 0%, rgb(20, 105, 126) 100%); border-radius: 3px; box-shadow: 0.5px 0.5px 1.5px 1.5px #ddd;}`);
            $r4.shadowRoot.adoptedStyleSheets = [sheet1, sheet2, sheet3];
            
            
            

            var sheet4 = new CSSStyleSheet;
            sheet4.replaceSync(`button#widgetIcon { box-shadow: rgb(0 77 255 / 50%) 0px 4px 24px; }`);
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
                    btn_microphone.style = "display:block; height: 40px; width: 40px; border-radius: 50px; border: 0; margin-top: 5px; margin-bottom: 5px; background: linear-gradient(135deg, rgb(37, 71, 106, 0.7) 0%, rgb(20, 105, 126, 0.7) 100%); ";
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
