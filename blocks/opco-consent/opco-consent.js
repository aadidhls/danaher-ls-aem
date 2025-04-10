/* eslint-disable */
import { div, button, h2, span } from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/lib-franklin.js';

// Email Obfuscation Helpers (Reusable)
function obfuscateEmail(email) {
  return btoa(email.split('').reverse().join(''));
}

function deobfuscateEmail(obfuscated) {
  return atob(obfuscated).split('').reverse().join('');
}

window.addEventListener("load", function () {
  localStorage.removeItem("danaher_test_id");
  localStorage.removeItem("danaher_id");
});

(function () {
  window.semaphore = window.semaphore || [];
  window.ketch = function () {
    window.semaphore.push(arguments);
  };

  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = (window.location.host === 'lifesciences.danaher.com') ? "https://global.ketchcdn.com/web/v3/config/danaher/cross_opco_prod/boot.js" : "https://global.ketchcdn.com/web/v3/config/danaher/danaher_test/boot.js";
  script.defer = script.async = true;
  document.head.appendChild(script);
})();

ketch('showPreferences', {
  tab: 'subscriptionsTab',
  showOverviewTab: false,
  showConsentsTab: false,
  showSubscriptionsTab: true,
});

function modifyElements() {
  document.querySelectorAll('.ketch-flex.ketch-flex-col.ketch-gap-5:not([data-modified])').forEach(node => {
    let selectionList = node.querySelector('.ketch-flex.ketch-flex-wrap.ketch-gap-6');

    node.dataset.modified = "true";
    let img = document.createElement("img");
    let paraElement = node.querySelector('.ketch-m-0');

    const opCoMapping = {
      'Danaher Cross OpCo Test': 'danaher.png',
      'Abcam Test': 'abcam.png',
      'Aldevron Test': 'aldevron-4c.png',
      'Beckman Coulter Dignostics Test': 'beckmancoulter.png',
      'Beckman Coulter Test': 'beckmancoulter.png',
      'Beckman LS Test': 'beckmancoulterls.png',
      'Beckman Coulter Life Sciences Test': 'beckmancoulterls.png',
      'Cepheid Test': 'cepheid.png',
      'Cytiva Test': 'cytiva.png',
      'Danaher Life Sciences Test': 'danaher.png',
      'Genedata Test': 'genedata.png',
      'HemoCue Test': 'HemoCue.png',
      'IDBS Test': 'idbs-4c.png',
      'IDT Test': 'idt.png',
      'Leica Microsystems Test': 'leica-microsystems-4c.png',
      'Leica Biosystems Test': 'leica-biosystems.png',
      'Mammotome Test': 'mammotome.png',
      'Molecular Devices Test': 'molecular-devices-4c.png',
      'Pall Test': 'pall.png',
      'Phenomenex Test': 'phenomenex.png',
      'Radiometer Test': 'radiometer.png',
      'Sciex Test': 'sciex-4c.png',
      'Danaher Cross OpCo': 'danaher.png',
      'Abcam': 'abcam.png',
      'Aldevron': 'aldevron-4c.png',
      'Beckman Coulter Dignostics': 'beckmancoulter.png',
      'Beckman Coulter Life Sciences': 'beckmancoulterls.png',
      'Cepheid': 'cepheid.png',
      'Cytiva': 'cytiva.png',
      'Danaher Life Sciences': 'danaher.png',
      'Genedata': 'genedata.png',
      'HemoCue': 'HemoCue.png',
      'IDBS': 'idbs-4c.png',
      'IDT': 'idt.png',
      'Leica Microsystems': 'leica-microsystems-4c.png',
      'Leica Biosystems': 'leica-biosystems.png',
      'Mammotome': 'mammotome.png',
      'Molecular Devices': 'molecular-devices-4c.png',
      'Pall': 'pall.png',
      'Phenomenex': 'phenomenex.png',
      'Radiometer': 'radiometer.png',
      'Sciex': 'sciex-4c.png',
    };

    let opCo = paraElement?.textContent.trim() || "";
    if (selectionList) {
      selectionList.querySelectorAll(`label[aria-label="Subscribe to ${opCo} via Mail"]`).forEach(label => {
        label.parentNode.removeChild(label);
      });
    }

    /* const imageDiv = div({ class: "ketch-w-15" });
    const logoName = opCoMapping[opCo] || 'logo-danaherls';
    imageDiv.append(span({ class: `icon icon-${logoName}.png brand-left-logo`, style: 'width:100%;' }));
    decorateIcons(imageDiv); */
    const imageDiv = div({ class: "ketch-w-15" });
    const logoName = opCoMapping[opCo] || 'danaher.png';
    const logoUrl = `/icons/${logoName}`;
    const logoImg = document.createElement("img");
    logoImg.src = logoUrl;
    logoImg.alt = opCo;
    logoImg.className = "brand-left-logo";
    //logoImg.style.width = "100%";
    imageDiv.appendChild(logoImg);

    const buttonDiv = div({ class: "ketch-w-6" });

    const divEl = node.querySelector('div.ketch-flex.ketch-items-center.ketch-justify-between.ketch-gap-5');
    const labelEl = divEl.querySelector('label');
    labelEl?.classList.remove('ketch-w-[134px]')
    buttonDiv.appendChild(labelEl);

    const contentDiv = div({ class: "ketch-w-79" });
    contentDiv.append(divEl, node.querySelector('div.ketch-flex.ketch-flex-wrap.ketch-gap-6'))
    node.prepend(imageDiv);
    node.append(contentDiv);
    node.append(buttonDiv);
    node.classList.remove('ketch-flex-col');
    node.classList.add('product');
  });
}

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.addedNodes.length) {
      modifyElements();
    }
  });
});
observer.observe(document.documentElement, { childList: true, subtree: true });

async function hashEmail(email) {
  const encoder = new TextEncoder();
  const data = encoder.encode(email);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function saveModal(event) {
  // Check if modal already exists to prevent duplicates
  if (document.getElementById("customModal")) return;
  // Create modal container div
  let modal = document.createElement("div");
  modal.id = "customModal";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.zIndex = "1000";

  // Create modal content div
  let modalContent = document.createElement("div");
  modalContent.style.width = "300px";
  modalContent.style.padding = "20px";
  modalContent.style.backgroundColor = "white";
  modalContent.style.borderRadius = "8px";
  modalContent.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.3)";
  modalContent.style.textAlign = "center";

  // Create message inside modal
  let message = document.createElement("p");
  message.innerText = "Your new marketing choices have been saved";

  // Create close button
  let closeButton = document.createElement("button");
  closeButton.innerText = "Ok";
  closeButton.style.marginTop = "15px";
  closeButton.style.padding = "8px 15px";
  closeButton.style.backgroundColor = "#7523FF";
  closeButton.style.color = "white";
  closeButton.style.border = "none";
  closeButton.style.cursor = "pointer";
  const savedData = {
    testId: localStorage.getItem("danaher_test_id"),
    id: localStorage.getItem("danaher_id")
  };
  closeButton.onclick = function () {
    document.body.removeChild(modal);
    window.onload = function() {
      if (savedData.testId) localStorage.setItem("danaher_test_id", savedData.testId);
      if (savedData.id) localStorage.setItem("danaher_id", savedData.id);
    };
    window.location.reload();
  };

  // Append elements
  modalContent.appendChild(message);
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  event.preventDefault();
}

function closeModal(event) {
  // Check if modal already exists to prevent duplicates
  if (document.getElementById("close-Modal")) return;
  // Create modal container div
  let modal = document.createElement("div");
  modal.id = "close-Modal";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.zIndex = "1000";

  // Create modal content div
  let modalContent = document.createElement("div");
  modalContent.style.width = "300px";
  modalContent.style.padding = "20px";
  modalContent.style.backgroundColor = "white";
  modalContent.style.borderRadius = "8px";
  modalContent.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.3)";
  modalContent.style.textAlign = "center";

  // Create message inside modal
  let message = document.createElement("p");
  message.innerText = "You did not make any changes";

  // Create close button
  let closeBtn = document.createElement("button");
  closeBtn.innerText = "Ok";
  closeBtn.style.marginTop = "15px";
  closeBtn.style.padding = "8px 15px";
  closeBtn.style.backgroundColor = "#7523FF";
  closeBtn.style.color = "white";
  closeBtn.style.border = "none";
  closeBtn.style.cursor = "pointer";

  closeBtn.onclick = function () {
    document.body.removeChild(modal);
    window.location.reload();
  };

  // Append elements
  modalContent.appendChild(message);
  modalContent.appendChild(closeBtn);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  event.preventDefault();
}

function myKetchClosedEventHandler(reason) {
  if (reason === 'setSubscriptions') {
    const key = localStorage.getItem("danaher_test_id") ? "danaher_test_id" : "danaher_id";
    const data = localStorage.getItem(key);

    //const email = localStorage.getItem("user_email"); // Get email from localStorage
    const obfuscatedEmail = localStorage.getItem("reference1");
    const email = deobfuscateEmail(obfuscatedEmail);

    const body = JSON.stringify({
      "EMAIL": btoa(email),
      "HASH_ID": data
    });
    const token = (btoa('marketoIntegration@dhlifesciencesllc-LEAQ7O.WEO1AL:b3ecf78f-7dca-4c60-8843-aaaa015cb381'));

    fetch('https://dh-life-sciences-nonprod.boomi.cloud/ws/rest/AEM/UpdateConsentHashID/;boomi_user=marketoIntegration@dhlifesciencesllc-LEAQ7O.WEO1AL', {
      method: "POST",
      body: body,
      mode: 'cors',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + token
      },
    }).then(response => {
      if(!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(text => {
      try {
        // Only parse if text exists
        return text ? JSON.parse(text) : {};
      } catch (e) {
        console.warn('Failed to parse JSON:', e);
        return {}; // Return empty object if parsing fails
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      // Handle error appropriately
    });
    saveModal(null);
  } else if (reason === 'closeWithoutSettingConsent') {
    closeModal(null);
  }

  ketch('showPreferences', {
    tab: 'subscriptionsTab',
    showOverviewTab: false,
    showConsentsTab: false,
    showSubscriptionsTab: true
  });

}

export default async function decorate(block) {
  ketch('on', 'hideExperience', myKetchClosedEventHandler);

  const style = document.createElement("style");
  style.innerHTML = `
      #lanyard_root * .\\!ketch-bg-\\[--k-preference-header-background-color\\] {
        border-bottom: 1px solid #112233 !important;
      }
      body #lanyard_root * .\\!ketch-bg-\\[--k-preference-tabs-subscriptions-unsubscribeAll-background-color\\] {
          background-color: #FFFFFF !important;
      }
      html {
        --k-preference-tabs-subscriptions-unsubscribeAll-switchButton-on-background-color: var(--k-preference-tabs-subscriptions-footer-actionButton-background-color) !important;
      }
      #lanyard_root * .ketch-w-15 {
        width: 15%;
      }
      #lanyard_root * .ketch-w-79 {
        width: 79%;
      }
      #lanyard_root * .ketch-w-6 {
        width: 6%;
      }
      #lanyard_root * .ketch-font-semibold {
        font-weight: 600 !important;
      }
      #lanyard_root * .ketch-text-ketch-h3 {
        font-size: 18px !important;
        line-height: 22.5px !important;
      }
      #lanyard_root * .ketch-text-ketch-h1 {
        font-size: 28px !important;
        line-height: 39px !important;
      }

      #lanyard_root * .ketch-gap-5 {
        gap: 20px !important;
      }
      #lanyard_root * .\!ketch-p-0 {
        padding: 16px 0 !important;
      }

      #lanyard_root * .\!ketch-bg-\[--k-preference-header-background-color\] {
        border-bottom: 1px solid #112233 !important;
      }
      body #lanyard_root * .\!ketch-bg-\[--k-preference-tabs-subscriptions-unsubscribeAll-background-color\] {
        background-color: #FFFFFF !important;
      }
      html {
        --k-preference-tabs-subscriptions-unsubscribeAll-switchButton-on-background-color: var(--k-preference-tabs-subscriptions-footer-actionButton-background-color) !important;
      }

      label[aria-label*="via Mail"].ketch-relative.\!ketch-m-0.ketch-inline-flex.\!ketch-p-0 {
        display: none !important;
      }

  `;
  document.head.appendChild(style);

  let currentUrl = window.location.href;
  let url = new URL(currentUrl);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const email = urlParams.get('emailid');

  // Define allowed domains
  const allowedDomains = [
  'https://stage.lifesciences.danaher.com/',
  'https://lifesciences.danaher.com/'
  ];

  // Check if current URL starts with any of the allowed domains
  const isValidDomain = allowedDomains.some(domain =>
  currentUrl.startsWith(domain) ||
  currentUrl.includes('localhost') // for local development
  );

  if (email && isValidDomain) {
    const obfuscatedEmail = obfuscateEmail(email);
    localStorage.setItem("reference1", obfuscatedEmail);
  hashEmail(email).then((data) => {
    //localStorage.setItem("user_email", email);
    //localStorage.setItem(url.href.includes('stage') || url.href.includes('localhost') ? "danaher_test_id" : "danaher_id", data);
    const isStage = currentUrl.includes('stage.lifesciences.danaher.com') || currentUrl.includes('localhost');
    const isProd = currentUrl.includes('lifesciences.danaher.com') && !isStage;

    if (isProd) {
      localStorage.setItem("danaher_id", data);
    } else if (isStage) {
      localStorage.setItem("danaher_test_id", data);
    }
    // Remove emailid from URL **after** storing it
    url.searchParams.delete('emailid');
    window.history.replaceState({}, document.title, url.toString());

  });
  }
}