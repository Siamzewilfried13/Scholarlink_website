const menu=document.querySelector('.menu');
const links=document.querySelector('.links');
menu?.addEventListener('click',()=>{
  links.classList.toggle('open');
  menu.setAttribute('aria-expanded', links.classList.contains('open'));
});
document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();
// Only hide content for the reveal animation if the browser can reveal it again
if('IntersectionObserver' in window){
  const revealElements=document.querySelectorAll('.section,.card,.scholar,.visa-card,.side-photo,.uni-grid article,.dest,.steps>div,.testgrid article,.eligibility,.business-banner');
  revealElements.forEach(el=>el.classList.add('reveal'));
  // threshold 0 + margin: very tall sections on small screens can never reach a 10% ratio and would stay invisible
  const observer=new IntersectionObserver((entries,obs)=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show');obs.unobserve(entry.target)}})
  },{threshold:0,rootMargin:'0px 0px -10% 0px'});
  revealElements.forEach(el=>observer.observe(el));
}
const WHATSAPP_NUMBER='237697363210';
// Every request is also emailed to this inbox (via FormSubmit) so the lead is kept even if the WhatsApp message is never sent
const LEADS_ENDPOINT='https://formsubmit.co/ajax/scholarlinkconsulting720@gmail.com';
const form=document.getElementById('contactForm');
const formNote=document.getElementById('formNote');
form?.addEventListener('submit',e=>{
 e.preventDefault();
 const data=new FormData(form);
 const submit=form.querySelector('[type="submit"]');
 const message=`Bonjour Scholar Link,\n\nNom: ${data.get('name')}\nTéléphone: ${data.get('phone')}\nProjet: ${data.get('project')}\nMessage: ${data.get('message')||''}`;
 const lead=new URLSearchParams({
  'Nom':data.get('name'),
  'WhatsApp / Téléphone':data.get('phone'),
  'Projet':data.get('project'),
  'Message':data.get('message')||'',
  _subject:`Nouvelle demande Scholar Link : ${data.get('project')}`,
  _template:'table'
 });
 submit.disabled=true;
 formNote.textContent='Enregistrement de votre demande…';
 // Form-encoded body avoids a CORS preflight; keepalive lets the save finish if the page navigates to WhatsApp
 const saved=fetch(LEADS_ENDPOINT,{method:'POST',headers:{Accept:'application/json'},body:lead,keepalive:true})
  .then(res=>res.ok?res.json():Promise.reject(res))
  .then(res=>{if(String(res.success)!=='true')throw res});
 // Open WhatsApp synchronously: browsers only allow the new tab during the submit event itself
 const waUrl=`https://wa.me/${WHATSAPP_NUMBER}?text=`+encodeURIComponent(message);
 if(!window.open(waUrl,'_blank'))location.href=waUrl;
 saved
  .then(()=>{formNote.textContent='Votre demande a été enregistrée et préparée pour WhatsApp.'})
  .catch(()=>{formNote.textContent='Votre demande a été préparée pour WhatsApp. Envoyez le message pour que nous la recevions.'})
  .finally(()=>{submit.disabled=false});
});

