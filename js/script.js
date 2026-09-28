const menu=document.querySelector('.menu');
const links=document.querySelector('.links');
menu?.addEventListener('click',()=>{
  links.classList.toggle('open');
  menu.setAttribute('aria-expanded', links.classList.contains('open'));
});
document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();
const revealElements=document.querySelectorAll('.section,.card,.scholar,.visa-card,.side-photo,.uni-grid article,.dest,.steps>div,.testgrid article,.eligibility,.business-banner');
revealElements.forEach(el=>el.classList.add('reveal'));
const observer=new IntersectionObserver((entries,obs)=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show');obs.unobserve(entry.target)}})
},{threshold:.1});
revealElements.forEach(el=>observer.observe(el));
const form=document.getElementById('contactForm');
form?.addEventListener('submit',e=>{
 e.preventDefault();
 const data=new FormData(form);
 const message=`Bonjour Scholar Link,\n\nNom: ${data.get('name')}\nTéléphone: ${data.get('phone')}\nProjet: ${data.get('project')}\nMessage: ${data.get('message')||''}`;
 window.open('https://wa.me/237600000000?text='+encodeURIComponent(message),'_blank');
 document.getElementById('formNote').textContent='Votre demande a été préparée pour WhatsApp.';
});

