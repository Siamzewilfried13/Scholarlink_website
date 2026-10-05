const menu=document.querySelector('.menu');
const links=document.querySelector('.links');
menu?.addEventListener('click',()=>{
  links.classList.toggle('open');
  menu.setAttribute('aria-expanded', links.classList.contains('open'));
});
document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();
// France / Türkiye tabs (WAI-ARIA tabs pattern: arrow keys move between countries)
const countryTabs=[...document.querySelectorAll('.country-tabs [role="tab"]')];
function selectCountry(tab,focus){
  countryTabs.forEach(other=>{
    const selected=other===tab;
    other.setAttribute('aria-selected',selected);
    other.tabIndex=selected?0:-1;
    document.getElementById(other.getAttribute('aria-controls')).hidden=!selected;
  });
  if(focus)tab.focus();
}
countryTabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>selectCountry(tab));
  tab.addEventListener('keydown',e=>{
    const step={ArrowRight:1,ArrowLeft:-1}[e.key];
    if(step){e.preventDefault();selectCountry(countryTabs[(i+step+countryTabs.length)%countryTabs.length],true)}
  });
});
if(countryTabs.length)selectCountry(countryTabs[0]);
// Links such as the footer ones open the tab of the country they point to
document.querySelectorAll('[data-country]').forEach(link=>link.addEventListener('click',()=>{
  const tab=document.getElementById(`tab-${link.dataset.country}`);
  if(tab)selectCountry(tab);
}));
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
// "Start my application" buttons pre-select the matching service in the form
document.querySelectorAll('[data-project]').forEach(link=>link.addEventListener('click',()=>{
 if(form)form.elements.project.value=link.dataset.project;
}));
form?.addEventListener('submit',e=>{
 e.preventDefault();
 const data=new FormData(form);
 const submit=form.querySelector('[type="submit"]');
 // WhatsApp gets the service name as the visitor reads it; the saved lead keeps the stable French value
 const projectLabel=form.elements.project.selectedOptions[0].textContent;
 const message=`${t('wa.greeting')}\n\n${t('wa.name')}: ${data.get('name')}\n${t('wa.phone')}: ${data.get('phone')}\n${t('wa.project')}: ${projectLabel}\nMessage: ${data.get('message')||''}`;
 const lead=new URLSearchParams({
  'Nom':data.get('name'),
  'WhatsApp / Téléphone':data.get('phone'),
  'Projet':data.get('project'),
  'Message':data.get('message')||'',
  'Langue':currentLang.toUpperCase(),
  _subject:`Nouvelle demande Scholar Link : ${data.get('project')}`,
  _template:'table'
 });
 submit.disabled=true;
 formNote.textContent=t('form.saving');
 // Form-encoded body avoids a CORS preflight; keepalive lets the save finish if the page navigates to WhatsApp
 const saved=fetch(LEADS_ENDPOINT,{method:'POST',headers:{Accept:'application/json'},body:lead,keepalive:true})
  .then(res=>res.ok?res.json():Promise.reject(res))
  .then(res=>{if(String(res.success)!=='true')throw res});
 // Open WhatsApp synchronously: browsers only allow the new tab during the submit event itself
 const waUrl=`https://wa.me/${WHATSAPP_NUMBER}?text=`+encodeURIComponent(message);
 if(!window.open(waUrl,'_blank'))location.href=waUrl;
 saved
  .then(()=>{formNote.textContent=t('form.saved')})
  .catch(()=>{formNote.textContent=t('form.notSaved')})
  .finally(()=>{submit.disabled=false});
});

