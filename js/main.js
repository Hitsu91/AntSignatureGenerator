const myForm = document.forms.dati;
const { nome, professione, telefono, email, indirizzo, sito, logo } = myForm;

const copia = document.querySelector('#copia');
const code = document.querySelector('#code');
const preview = document.querySelector('#preview');
const snackbar = document.querySelector('#snackbar');

const renderPreview = () => {
  const generatedTemplate = generateTemplate();
  code.textContent = generatedTemplate;
  preview.innerHTML = generatedTemplate;
};

myForm.onsubmit = (event) => {
  event.preventDefault();
};

myForm.onpaste = renderPreview;

myForm.onkeyup = renderPreview;

myForm.onchange = renderPreview;

copia.onclick = async () => {
  try {
    await navigator.clipboard.writeText(generateTemplate());
    showSnackbar();
  } catch (error) {
    console.log(error);
    showSnackbar('Ops, non è stato possibile copiare. Prova manualmente');
  }
};

const showSnackbar = (message = 'Copiato') => {
  snackbar.textContent = message;
  snackbar.className = 'show';
  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    snackbar.className = snackbar.className.replace('show', '');
  }, 3000);
};

const showTelefono = () => {
  return telefono.value != '';
};

function generateTemplate() {
  return `<div class="xam_msg_class">
  <title>Firma Ant</title>

  <div
    style="
      display: flex;
      flex-direction: row;
      height: min-content;
      align-items: center;
      margin-top: 1rem;
      padding: 0 1rem;
    "
  >
    <div style="padding-right: 1rem; height: 8rem">
      <img alt="" src="${logo.value}" style="height: 100%" />
    </div>
    <div
      style="
        border-left: rgb(70, 127, 58) 2px solid;
        padding-left: 1rem;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
        flex-grow: 1;
      "
    >
      <p
        style="
          padding: 0;
          margin: 0;
          font-weight: bold;
          color: rgb(70, 127, 58);
        "
      >
        👤 ${nome.value}
      </p>
      <p style="padding: 0; margin: 0; font-weight: bolder">
        💼 ${professione.value}
      </p>
      <p style="padding: 0; margin: 0">📧 ${email.value}</p>
      ${
        showTelefono()
          ? `
      <p style="padding: 0; margin: 0">📱 ${telefono.value}</p>
      `
          : ''
      }
      <p style="padding: 0; margin: 0">🏠 ${indirizzo.value}</p>
      <p style="padding: 0; margin: 0">🌍 ${sito.value}</p>
    </div>
  </div>
  <hr
    style="
      color: rgb(70, 127, 58);
      background-color: rgb(70, 127, 58);
      height: 2px;
    "
  />
  <small style="color: rgba(85, 83, 83, 0.8)">
    Le informazioni, i dati e le notizie contenute nella presente comunicazione
    e i relativi allegati sono di natura privata e come tali possono essere
    riservate e sono, comunque, destinate esclusivamente ai destinatari indicati
    in epigrafe. La diffusione, distribuzione e/o la copiatura del documento
    trasmesso da parte di qualsiasi soggetto diverso dal destinatario è
    proibita, ai sensi dell’art. 616 c.p., ai sensi del D.Lgs. n. 196/2003 e del
    regolamento UE 2016/679. Se avete ricevuto questo messaggio per errore, vi
    preghiamo di distruggerlo e di darcene immediata comunicazione anche
    inviando un messaggio di ritorno all’indirizzo e-mail del mittente.
  </small>
</div>`;
}

renderPreview();
