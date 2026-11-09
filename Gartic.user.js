// ==UserScript==
// @name         Gartic Image Overlay (Decalque)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Coloca uma imagem transparente sobre a tela do Gartic para desenhar por cima
// @match        *://gartic.com.br/*
// @match        *://gartic.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Cria o painel de controle
    const panel = document.createElement('div');
    panel.style.cssText = 'position:fixed; top:10px; right:10px; z-index:99999; background:#222; color:#fff; padding:10px; border-radius:6px; font-family:sans-serif; font-size:12px; box-shadow: 0 2px 10px rgba(0,0,0,0.5);';
    panel.innerHTML = `
        <div style="margin-bottom:6px; font-weight:bold;">Gartic Decalque</div>
        <input id="gt-img-url" type="text" placeholder="URL da imagem..." style="width:160px; margin-bottom:6px; color:#000; padding:2px;"><br>
        <label>Opacidade: </label>
        <input id="gt-opacity" type="range" min="0" max="1" step="0.05" value="0.4" style="vertical-align:middle; width:90px;"><br>
        <button id="gt-apply" style="margin-top:6px; cursor:pointer;">Aplicar no Canvas</button>
        <button id="gt-clear" style="margin-top:6px; cursor:pointer;">Remover</button>
    `;
    document.body.appendChild(panel);

    let overlayImg = null;

    document.getElementById('gt-apply').addEventListener('click', () => {
        const canvas = document.querySelector('canvas');
        if (!canvas) {
            alert('Tela de desenho (canvas) não encontrada! Entre em uma sala primeiro.');
            return;
        }

        const url = document.getElementById('gt-img-url').value;
        const rect = canvas.getBoundingClientRect();

        if (!overlayImg) {
            overlayImg = document.createElement('img');
            // pointer-events: none é essencial para o clique atravessar a imagem e desenhar no canvas
            overlayImg.style.cssText = 'position:fixed; pointer-events:none; z-index:9998; object-fit:contain;';
            document.body.appendChild(overlayImg);
        }

        overlayImg.src = url;
        overlayImg.style.top = rect.top + 'px';
        overlayImg.style.left = rect.left + 'px';
        overlayImg.style.width = rect.width + 'px';
        overlayImg.style.height = rect.height + 'px';
        overlayImg.style.opacity = document.getElementById('gt-opacity').value;
    });

    document.getElementById('gt-opacity').addEventListener('input', (e) => {
        if (overlayImg) overlayImg.style.opacity = e.target.value;
    });

    document.getElementById('gt-clear').addEventListener('click', () => {
        if (overlayImg) {
            overlayImg.remove();
            overlayImg = null;
        }
    }
                                                        );
})();
