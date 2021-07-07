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
  return `<div style="background-color: white;">
  <title>Firma Ant</title>
  <div
    style="
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 1rem;
      padding: 1rem;
      border-bottom: rgb(70, 127, 58) 2px solid;
    "
  >
    <div style="margin-right: 1rem; max-height: 8rem; max-width: 35%;">
      <img 
        alt="" 
        src="https://ant-signature-generator.netlify.app/asset/${logo.value}" 
        style="height: auto; max-height: 8rem; max-width: 100%;" 
      />
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
          word-break: break-word;
        "
      >
        <span style="margin-right: 0.5rem">👤</span> ${nome.value}
      </p>
      <p style="padding: 0; margin: 0; font-weight: bolder; word-break: break-word;">
        <span style="margin-right: 0.5rem">💼</span> ${professione.value}
      </p>
      <p style="padding: 0; margin: 0; word-break: break-word;">
        <span style="margin-right: 0.5rem;">📧</span> ${email.value}
      </p>
      ${
        showTelefono()
          ? `
      <p style="padding: 0; margin: 0; word-break: break-word;">
        <span style="margin-right: 0.5rem">📱</span> ${telefono.value}
      </p>
      `
          : ''
      }
      <p style="padding: 0; margin: 0; word-break: break-word;">
        <span style="margin-right: 0.5rem">🏠</span> ${indirizzo.value}
      </p>
      <p style="padding: 0; margin: 0; word-break: break-word;">
        <span style="margin-right: 0.5rem">🌍</span> ${sito.value}
      </p>
    </div>
  </div>
  <p style="color: rgba(85, 83, 83, 0.8); padding: 0.5rem;">
    Le informazioni, i dati e le notizie contenute nella presente comunicazione
    e i relativi allegati sono di natura privata e come tali possono essere
    riservate e sono, comunque, destinate esclusivamente ai destinatari indicati
    in epigrafe. La diffusione, distribuzione e/o la copiatura del documento
    trasmesso da parte di qualsiasi soggetto diverso dal destinatario è
    proibita, ai sensi dell’art. 616 c.p., ai sensi del D.Lgs. n. 196/2003 e del
    regolamento UE 2016/679. Se avete ricevuto questo messaggio per errore, vi
    preghiamo di distruggerlo e di darcene immediata comunicazione anche
    inviando un messaggio di ritorno all’indirizzo e-mail del mittente.
  </p>
</div>`;
}

renderPreview();
