(() => {
const PHONE = '529987695158';
const EMAIL = 'Shorelinerealestatemanagement@protonmail.com';

/* ---------- data (same numbers as the original site) ---------- */
const ZONES = [
  {id:'club', n:1, x:88, y:26, en:{label:'Clubhouse', note:'Communal pool, gym, and the office. Three more pools are private to the community.'}, es:{label:'Casa club', note:'Alberca comunitaria, gimnasio y la oficina. Otras tres albercas son privadas de la comunidad.'}},
  {id:'towers', n:2, x:58, y:34, en:{label:'Canal towers', note:'Apartment towers with planted roofs, and the lagoons between them.'}, es:{label:'Torres del canal', note:'Torres de departamentos con azoteas verdes y las lagunas entre ellas.'}},
  {id:'jungle', n:3, x:14, y:12, en:{label:'Jungle edge', note:'The tree line outside the ring road. That is the reserve, not a hotel lawn.'}, es:{label:'Borde de selva', note:'La línea de árboles fuera del circuito vial. Es la reserva, no un jardín de hotel.'}},
  {id:'villas', n:4, x:36, y:82, en:{label:'Villas', note:'The lower houses on the water. Fewer of them than the towers.'}, es:{label:'Villas', note:'Las casas bajas junto al agua. Hay menos que departamentos en torre.'}}
];
const HOMES = [
  {id:'torre', name:'Torre F', kind:'condo', zone:'club', beds:1, baths:1, area:56, price:120000, nightly:95, monthly:850, occupancy:.58, hoaMonthly:120,
   images:['tower','canal-towers','pool'],
   en:'A one-bedroom in the tower nearest the clubhouse. Lock the door and leave. The pool, the gym, and the kayaks are a short walk.',
   es:'Un departamento de una recámara en la torre más cercana a la casa club. Cierra la puerta y viaja tranquilo. La alberca, el gimnasio y los kayaks están a unos pasos.'},
  {id:'norte', name:'Canal 2-bed', es_name:'Canal 2 recámaras', kind:'condo', zone:'towers', beds:2, baths:2, area:98, price:180000, nightly:130, monthly:1200, occupancy:.55, hoaMonthly:160,
   images:['canal-towers','canal','kayak'],
   en:'The apartment most buyers ask for first. Two bedrooms, a balcony on the canal, and a size that rents without needing a staff.',
   es:'El departamento que más piden nuestros compradores. Dos recámaras, balcón al canal y un tamaño que se renta sin necesitar personal.'},
  {id:'esquina', name:'Corner 2-bed', es_name:'Esquina 2 recámaras', kind:'condo', zone:'towers', beds:2, baths:2, area:98, price:180000, nightly:140, monthly:1300, occupancy:.54, hoaMonthly:165,
   images:['canal-bend','tower','pool'],
   en:'An upper corner. More sky, a longer view over the water and the jungle, and the same building life as the floor below.',
   es:'Una esquina en piso alto. Más cielo, una vista más larga sobre el agua y la selva, y la misma vida de edificio que el piso de abajo.'},
  {id:'villa', name:'Canal Villa', es_name:'Villa del Canal', kind:'villa', zone:'villas', beds:3, baths:3.5, area:186, price:250000, nightly:180, monthly:1600, occupancy:.48, hoaMonthly:220,
   images:['hero','canal','paddle'],
   en:'One of the low houses on the water, not a tower.',
   es:'Una de las casas bajas junto al agua, no una torre.'}
];
const PHOTOS = {
  'hero':{w:1230,h:960,en:'Townhouses beside the lagoon',es:'Casas junto a la laguna'},
  'tower':{w:572,h:380,en:'An apartment tower beside the lagoon',es:'Torre de departamentos junto a la laguna'},
  'canal-towers':{w:474,h:632,en:'The canal between the towers',es:'El canal entre las torres'},
  'pool':{w:854,h:612,en:'The clubhouse pool under the pergola',es:'La alberca de la casa club bajo la pérgola'},
  'canal':{w:476,h:634,en:'A stone-edged lagoon curving through Lagunas',es:'Una laguna con bordes de piedra en Lagunas'},
  'kayak':{w:1506,h:1314,en:'An afternoon on the lagoon',es:'Una tarde en la laguna'},
  'canal-bend':{w:632,h:482,en:'Villas and a tower on a bend of the canal',es:'Villas y una torre en una curva del canal'},
  'paddle':{w:946,h:596,en:'Looking down the lagoon between towers and villas',es:'La laguna entre torres y villas'},
  'entrance':{w:472,h:634,en:'The Lagunas entrance',es:'La entrada de Lagunas'},
  'gate':{w:660,h:624,en:'Arrival at Ciudad Mayakoba',es:'Llegada a Ciudad Mayakoba'},
  'sign':{w:742,h:506,en:'Ciudad Mayakoba',es:'Ciudad Mayakoba'}
};
const GALLERY = ['paddle','canal-towers','canal','tower','pool','canal-bend','kayak','entrance','gate'];

/* ---------- same model as the original site ---------- */
function model(h, plan, yearOne){
  const predial = h.price*.002, hoa = h.hoaMonthly*12;
  if(plan==='airbnb'){
    const gross=h.nightly*365*h.occupancy, operating=gross*.12, rate=yearOne?0:.2, mgmt=gross*rate, net=gross-operating-hoa-predial-mgmt;
    return {gross,operating,hoa,predial,mgmt,rate,net,y:net/h.price};
  }
  const gross=h.monthly*12*.92, operating=2400, rate=yearOne?0:.1, mgmt=gross*rate, net=gross-operating-hoa-predial-mgmt;
  return {gross,operating,hoa,predial,mgmt,rate,net,y:net/h.price};
}

/* ---------- i18n ---------- */
const T = {
 es:{
  'skip':'Ir al contenido','nav.homes':'Residencias','nav.estate':'El desarrollo','nav.mgmt':'Administración','nav.contact':'Contacto',
  'cta.whatsappShort':'WhatsApp','cta.see':'Ver las residencias','cta.whatsapp':'Escríbenos por WhatsApp','cta.fab':'Escríbenos',
  'hero.eyebrow':'Playa del Carmen · Lagunas, Ciudad Mayakoba','hero.title':'Residencias sobre las lagunas, dentro de Ciudad Mayakoba.',
  'hero.lede':'Departamentos desde $120,000 USD y villas en el canal a $250,000 USD. Te ayudamos a comprar desde donde vivas y después administramos tu propiedad — en Airbnb o con un inquilino de largo plazo.',
  'fact.range':'Casas de 1 a 3 recámaras','fact.beachV':'~10 min','fact.beach':'a la playa','fact.airportV':'~30 min','fact.airport':'al aeropuerto de Cancún','fact.gatesV':'2 accesos','fact.gates':'Seguridad de Lagunas + ID en Mayakoba',
  'trust.1t':'Vivimos aquí','trust.1':'Operadores que viven en Lagunas y conocen la comunidad y los edificios.','trust.2t':'Ayuda 24/7','trust.2':'Para propietarios en el extranjero y para tus huéspedes o inquilinos.','trust.3t':'Compra desde el extranjero','trust.3':'Facilitamos el proceso de compra para compradores internacionales.','trust.4t':'Airbnb o contrato','trust.4':'Estancias cortas o un inquilino con contrato formal — tú eliges.',
  'res.eyebrow':'Residencias','res.title':'Cuatro formas de ser dueño en Lagunas','res.lede':'Departamentos en torre junto a la casa club y en los canales, y villas bajas junto al agua. Cada tarjeta muestra un estimado ilustrativo de renta para el primer año — abre una propiedad para ver todos los supuestos.',
  'f.all':'Todas','f.condo':'Departamentos','f.villa':'Villas','f.airbnb':'Estimado Airbnb','f.longterm':'Estimado largo plazo','f.sort':'Ordenar','s.default':'Destacadas','s.price':'Precio: menor a mayor','s.yield':'Rendimiento neto estimado','f.clear':'Ver todas las zonas ×',
  'disc.short':'* Solo estimados ilustrativos — no son un pronóstico ni una garantía de ingresos. El año uno supone cero comisión de administración por nuestra oferta del primer año; a partir del año dos se incluye nuestra comisión. No incluye financiamiento, impuestos sobre la renta, amueblado, gastos de cierre ni variaciones del tipo de cambio. Precios y disponibilidad sujetos a cambio.',
  'offer.months':'meses','offer.eyebrow':'Nuestra oferta para compradores','offer.title':'Compra con Shoreline y tu primer año de administración es gratis.','offer.body':'Durante los primeros 12 meses después de tu compra administramos tu propiedad sin comisión de administración — ya sea que la rentes a huéspedes de Airbnb o a un inquilino de largo plazo.','offer.fine':'Las cuotas de mantenimiento (HOA), el predial y los gastos de operación siguen siendo del propietario. Pídenos los términos completos.','offer.cta':'Pregunta por la oferta',
  'estate.eyebrow':'El desarrollo','estate.lede':'Lagunas es el barrio de canales dentro de Ciudad Mayakoba, sobre la carretera federal en el km 298. Torres de departamentos y villas bajas rodean las lagunas. En el conjunto: tres albercas privadas, una alberca comunitaria, gimnasio y espacio de oficina. Seguridad privada en la entrada de Lagunas, y Mayakoba tiene su propio acceso donde se verifica una identificación antes de entrar. La playa está a unos diez minutos; el aeropuerto de Cancún, a una media hora.',
  'map.eyebrow':'Explora el mapa','map.all':'Todo Lagunas','map.hint':'Toca un número en el mapa para ver esa parte del desarrollo y las propiedades en venta ahí.',
  'amen.1t':'En el conjunto','amen.1':'Tres albercas privadas, una alberca comunitaria, gimnasio y espacio de oficina para trabajar.','amen.2t':'Seguridad','amen.2':'Seguridad privada en el acceso de Lagunas. Mayakoba verifica una identificación en su propia entrada.','amen.3t':'El agua','amen.3':'Canales con bordes de piedra, no una laguna de hotel. Las torres y las villas los comparten.',
  'mgmt.eyebrow':'Después de las llaves','mgmt.title':'Sé dueño en el paraíso, genera ingresos y vacaciona cuando quieras.','mgmt.body':'Shoreline administra departamentos y villas para propietarios que viven en otro lugar. Estancias cortas en Airbnb o un inquilino con contrato formal. Compra con nosotros y no cobramos administración el primer año.',
  'step.1t':'Elige','step.1':'Cuéntanos tu presupuesto y tus planes; te mostramos las propiedades que encajan.','step.2t':'Compra','step.2':'Facilitamos la compra para compradores internacionales.','step.3t':'Gana y disfruta','step.3':'La operamos en Airbnb o con un inquilino de largo plazo — y tú te quedas cuando quieras.',
  'c.eyebrow':'Contacto','c.title':'Habla con alguien que vive en Lagunas.','c.lede':'Pregunta por una residencia, agenda una visita o pide los números para tu plan. WhatsApp es lo más rápido.','c.email':'Correo','c.where':'Dónde estamos',
  'form.title':'Cuéntanos qué buscas','form.name':'Tu nombre','form.interest':'Me interesa','form.plan':'Tu plan','plan.airbnb':'Airbnb','plan.longterm':'Renta largo plazo','plan.own':'Vivir / vacacionar','plan.unsure':'Aún no sé','form.when':'¿Cuándo te gustaría comprar?','when.soon':'En los próximos 3 meses','when.year':'Este año','when.look':'Solo estoy explorando','form.msg':'¿Algo más? (opcional)','form.err':'Por favor escribe tu nombre.','form.send':'Enviar por WhatsApp','form.sendMail':'Enviar por correo','form.note':'Esto abre WhatsApp o tu correo con tu mensaje listo para enviar. Esta página no guarda nada.',
  'foot.1':'Bienes raíces y administración de propiedades para inversionistas y compradores internacionales. Facilitamos todo lo que necesites.','foot.2':'Somos operadores que vivimos en Lagunas, con experiencia práctica y conocimiento de la comunidad y las propiedades, y podemos ayudarte 24/7. Disfruta, gana y vacaciona en el paraíso.',
  'disc.long':'Las cifras de renta en este sitio son estimados ilustrativos construidos con los supuestos que se muestran para cada propiedad (tarifa por noche, ocupación, renta mensual, desocupación, cuota de mantenimiento, predial y gastos de operación). No son un pronóstico, una oferta ni una garantía de ingresos o rendimiento, ni constituyen asesoría financiera, fiscal o legal. Los resultados reales varían. Precios en dólares estadounidenses; precios y disponibilidad sujetos a cambio sin previo aviso. Las fotos muestran Lagunas y sus amenidades y pueden no corresponder a la unidad específica.'
 }
};
const UI = {
 en:{apt:'Apartment',villa:'Villa',bd:'bd',ba:'ba',look:'Look inside',ask:'Ask about this home',y1:'illustrative net, year one*',y2:'From year two (with management fee):',airbnbYr:'Airbnb',ltYr:'Long-term',noHomes:'No residences listed in this area right now — ask us what is coming up.',showing:'Showing',homesHere:n=>n===1?'See the 1 home here':`See the ${n} homes here`,noneHere:'No homes listed here — see all',beds:'Bedrooms',baths:'Bathrooms',area:'Area',
   bdTitle:p=>`Illustrative year, ${p==='airbnb'?'Airbnb':'long-term lease'}`,yr1:'Year 1',yr2:'Year 2+',gross:'Gross rent',op:p=>p==='airbnb'?'Running costs (12% of rent)':'Running costs',hoa:'HOA',pred:'Property tax (predial)',mg:'Management fee',net:'Net',yld:'Net yield on price',
   ass:(h,p)=>p==='airbnb'?`Assumes $${h.nightly}/night at ${Math.round(h.occupancy*100)}% occupancy, HOA $${h.hoaMonthly}/month, property tax 0.2% of price. Management 20% of rent from year two.`:`Assumes $${h.monthly.toLocaleString('en-US')}/month rent with 8% vacancy, $2,400/year running costs, HOA $${h.hoaMonthly}/month, property tax 0.2% of price. Management 10% of rent from year two.`,
   disc:'Illustrative only — not a forecast or guarantee. Excludes financing, income tax, furnishing, closing costs and exchange-rate changes.',
   waHello:"Hello Shoreline, I'm interested in Lagunas de Ciudad Mayakoba.",waHome:h=>`Hello Shoreline, I'm interested in ${h.name} ($${h.price.toLocaleString('en-US')}) in Lagunas. Is it still available?`,waOffer:"Hello Shoreline, I'd like to know more about the free first year of management.",
   notSure:'Not sure yet',allTypes:'Any residence',form:(d)=>`Hello Shoreline, I'm ${d.name}.\nInterested in: ${d.interest}\nPlan: ${d.plan}\nTimeline: ${d.when}${d.msg?`\n${d.msg}`:''}`,subj:'Lagunas inquiry',photo:i=>`Photo ${i}`,close:'Close'},
 es:{apt:'Departamento',villa:'Villa',bd:'rec',ba:'baños',look:'Ver por dentro',ask:'Preguntar por esta',y1:'neto ilustrativo, año uno*',y2:'Desde el año dos (con administración):',airbnbYr:'Airbnb',ltYr:'Largo plazo',noHomes:'No hay residencias publicadas en esta zona por ahora — pregúntanos qué viene.',showing:'Mostrando',homesHere:n=>n===1?'Ver la propiedad de aquí':`Ver las ${n} propiedades de aquí`,noneHere:'Sin propiedades aquí — ver todas',beds:'Recámaras',baths:'Baños',area:'Superficie',
   bdTitle:p=>`Año ilustrativo, ${p==='airbnb'?'Airbnb':'renta de largo plazo'}`,yr1:'Año 1',yr2:'Año 2+',gross:'Renta bruta',op:p=>p==='airbnb'?'Gastos de operación (12% de la renta)':'Gastos de operación',hoa:'Cuota de mantenimiento',pred:'Predial',mg:'Comisión de administración',net:'Neto',yld:'Rendimiento neto sobre precio',
   ass:(h,p)=>p==='airbnb'?`Supone $${h.nightly} USD/noche con ${Math.round(h.occupancy*100)}% de ocupación, mantenimiento $${h.hoaMonthly} USD/mes, predial 0.2% del precio. Administración 20% de la renta desde el año dos.`:`Supone renta de $${h.monthly.toLocaleString('en-US')} USD/mes con 8% de desocupación, $2,400 USD/año de gastos, mantenimiento $${h.hoaMonthly} USD/mes, predial 0.2% del precio. Administración 10% de la renta desde el año dos.`,
   disc:'Solo ilustrativo — no es un pronóstico ni una garantía. No incluye financiamiento, impuestos sobre la renta, amueblado, gastos de cierre ni tipo de cambio.',
   waHello:'Hola Shoreline, me interesa Lagunas de Ciudad Mayakoba.',waHome:h=>`Hola Shoreline, me interesa ${hName(h)} ($${h.price.toLocaleString('en-US')} USD) en Lagunas. ¿Sigue disponible?`,waOffer:'Hola Shoreline, quiero saber más sobre el primer año de administración gratis.',
   notSure:'Aún no sé',allTypes:'Cualquier residencia',form:(d)=>`Hola Shoreline, soy ${d.name}.\nMe interesa: ${d.interest}\nPlan: ${d.plan}\nCuándo: ${d.when}${d.msg?`\n${d.msg}`:''}`,subj:'Consulta Lagunas',photo:i=>`Foto ${i}`,close:'Cerrar'}
};
const EN = {}; document.querySelectorAll('[data-i18n]').forEach(el=>EN[el.dataset.i18n]=el.innerHTML);
let lang = (new URLSearchParams(location.search).get('lang')) || localStorage.getItem('sl-lang') || ((navigator.language||'').toLowerCase().startsWith('es')?'es':'en');
if(!['en','es'].includes(lang)) lang='en';
const u = () => UI[lang];
const hName = h => lang==='es' && h.es_name ? h.es_name : h.name;
const usd = n => '$'+Math.round(n).toLocaleString('en-US');
const pct = n => (n*100).toFixed(1)+'%';
const wa = t => `https://wa.me/${PHONE}?text=${encodeURIComponent(t)}`;
const mail = (s,b) => `mailto:${EMAIL}?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(b||'')}`;
const pic = (k,alt,cls='',lazy=true) => `<picture><source srcset="media/${k}.webp" type="image/webp"><img src="media/${k}.jpg" width="${PHOTOS[k].w}" height="${PHOTOS[k].h}" alt="${alt}" ${lazy?'loading="lazy" decoding="async"':''} class="${cls}"></picture>`;
const esc = s => String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

const state = {kind:'all', plan:'airbnb', sort:'default', zone:null};

function applyLang(){
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n; el.innerHTML = lang==='es' && T.es[k]!=null ? T.es[k] : EN[k];});
  document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed', b.dataset.lang===lang));
  document.querySelectorAll('.js-wa').forEach(a=>a.href = wa(a.dataset.ctx==='offer'?u().waOffer:u().waHello));
  document.querySelectorAll('.js-mail').forEach(a=>a.href = mail(u().subj));
  document.getElementById('dlg-x').setAttribute('aria-label',u().close);
  renderCards(); renderZones(); renderGallery(); renderInterest();
}

function renderCards(){
  let list = HOMES.filter(h=>(state.kind==='all'||h.kind===state.kind)&&(!state.zone||h.zone===state.zone));
  if(state.sort==='price') list=[...list].sort((a,b)=>a.price-b.price);
  if(state.sort==='yield') list=[...list].sort((a,b)=>model(b,state.plan,false).y-model(a,state.plan,false).y);
  const el=document.getElementById('cards');
  if(!list.length){el.innerHTML=`<p class="empty">${u().noHomes}</p>`;return;}
  el.innerHTML = list.map(h=>{
    const m1=model(h,state.plan,true), m2=model(h,state.plan,false), z=ZONES.find(z=>z.id===h.zone)[lang].label;
    return `<article class="card">
      <button type="button" class="card-img" data-open="${h.id}" aria-label="${u().look}: ${esc(hName(h))}">${pic(h.images[0],'')}<span class="tag">${h.kind==='villa'?u().villa:u().apt}</span></button>
      <div class="card-body">
        <p class="kicker">${h.kind==='villa'?u().villa:u().apt} · ${z}</p>
        <h3>${esc(hName(h))}</h3>
        <p class="sum">${esc(h[lang])}</p>
        <p class="price">${usd(h.price)} <small style="font:400 .8rem var(--fb);color:var(--mist)">USD</small></p>
        <ul class="specs"><li><svg class="ico" aria-hidden="true"><use href="#i-bed"/></svg>${h.beds} ${u().bd}</li><li><svg class="ico" aria-hidden="true"><use href="#i-bath"/></svg>${h.baths} ${u().ba}</li><li><svg class="ico" aria-hidden="true"><use href="#i-area"/></svg>${h.area} m²</li></ul>
        <p class="yield"><b>${pct(m1.y)}</b> ${u().y1} · ${usd(m1.net)}<span class="y2">${u().y2} ${pct(m2.y)} · ${usd(m2.net)}</span></p>
        <div class="card-actions"><button type="button" class="btn btn-ink" data-open="${h.id}">${u().look}</button><a class="btn btn-ghost" href="${wa(u().waHome(h))}" target="_blank" rel="noopener">${u().ask}</a></div>
      </div></article>`;
  }).join('');
  const chip=document.getElementById('zone-chip');
  if(state.zone){chip.hidden=false; chip.querySelector('span').textContent=`${u().showing}: ${ZONES.find(z=>z.id===state.zone)[lang].label}`;} else chip.hidden=true;
}

function renderZones(){
  const pins=document.getElementById('pins'), listEl=document.getElementById('zone-list');
  pins.innerHTML = ZONES.map(z=>`<button type="button" class="pin" style="left:${z.x}%;top:${z.y}%" data-zone="${z.id}" aria-pressed="${state.zone===z.id}" aria-label="${z.n}. ${z[lang].label}">${z.n}<span class="lbl">${z[lang].label}</span></button>`).join('');
  listEl.innerHTML = `<li><button type="button" data-zone="" aria-pressed="${!state.zone}"><span class="n">•</span>${lang==='es'?'Todo el desarrollo':'All of the estate'}<span class="c">${HOMES.length}</span></button></li>` +
    ZONES.map(z=>{const c=HOMES.filter(h=>h.zone===z.id).length;return `<li><button type="button" data-zone="${z.id}" aria-pressed="${state.zone===z.id}"><span class="n">${z.n}</span>${z[lang].label}<span class="c">${c}</span></button></li>`}).join('');
  const z=ZONES.find(z=>z.id===state.zone), t=document.getElementById('zone-title'), n=document.getElementById('zone-note'), go=document.getElementById('zone-go');
  if(z){ t.textContent=z[lang].label; n.textContent=z[lang].note; const c=HOMES.filter(h=>h.zone===z.id).length; go.hidden=false; go.textContent=c?u().homesHere(c):u().noneHere; go.dataset.none=c?'':'1'; }
  else { t.innerHTML = lang==='es'?T.es['map.all']:EN['map.all']; n.innerHTML = lang==='es'?T.es['map.hint']:EN['map.hint']; go.hidden=true; }
}

function renderGallery(){
  document.getElementById('gallery').innerHTML = GALLERY.map((k,i)=>`<button type="button" data-photo="${k}" aria-label="${esc(PHOTOS[k][lang])}">${pic(k,'')}<span>${esc(PHOTOS[k][lang])}</span></button>`).join('');
}
function renderInterest(){
  const s=document.getElementById('interest'), v=s.value;
  s.innerHTML = `<option value="">${u().allTypes}</option>` + HOMES.map(h=>`<option value="${h.id}">${esc(hName(h))} — ${usd(h.price)}</option>`).join('');
  s.value=v;
}

/* home dialog */
const dlg=document.getElementById('home-dlg');
function openHome(id){
  const h=HOMES.find(x=>x.id===id), p=state.plan, a=model(h,p,true), b=model(h,p,false), U=u();
  const setImg=i=>{const k=h.images[i], im=document.getElementById('dlg-img'); im.src=`media/${k}.webp`; im.alt=PHOTOS[k][lang]; document.querySelectorAll('#dlg-thumbs button').forEach((t,j)=>t.setAttribute('aria-pressed',j===i));};
  document.getElementById('dlg-thumbs').innerHTML = h.images.map((k,i)=>`<button type="button" aria-label="${U.photo(i+1)}" data-i="${i}">${pic(k,'')}</button>`).join('');
  document.getElementById('dlg-thumbs').onclick=e=>{const t=e.target.closest('button'); if(t) setImg(+t.dataset.i);};
  const row=(l,x,y,neg=true)=>`<tr><td>${l}</td><td>${neg&&x?'−':''}${usd(x)}</td><td>${neg&&y?'−':''}${usd(y)}</td></tr>`;
  document.getElementById('dlg-body').innerHTML = `
    <p class="eyebrow">${h.kind==='villa'?U.villa:U.apt} · ${ZONES.find(z=>z.id===h.zone)[lang].label}</p>
    <h2 id="dlg-title">${esc(hName(h))}</h2>
    <p class="price">${usd(h.price)} <small style="font:400 .85rem var(--fb);color:var(--mist)">USD</small></p>
    <p class="muted">${esc(h[lang])}</p>
    <dl class="dl-specs"><div><dt>${U.beds}</dt><dd>${h.beds}</dd></div><div><dt>${U.baths}</dt><dd>${h.baths}</dd></div><div><dt>${U.area}</dt><dd>${h.area} m²</dd></div></dl>
    <div class="seg" role="group" aria-label="Rental plan" id="dlg-plan"><button type="button" data-plan="airbnb" aria-pressed="${p==='airbnb'}">${U.airbnbYr}</button><button type="button" data-plan="longterm" aria-pressed="${p==='longterm'}">${U.ltYr}</button></div>
    <table class="bd"><caption class="eyebrow" style="text-align:left;margin:12px 0 0">${U.bdTitle(p)}</caption>
      <thead><tr><th></th><th>${U.yr1}</th><th>${U.yr2}</th></tr></thead><tbody>
      ${row(U.gross,a.gross,b.gross,false)}${row(U.op(p),a.operating,b.operating)}${row(U.hoa,a.hoa,b.hoa)}${row(U.pred,a.predial,b.predial)}${row(U.mg,a.mgmt,b.mgmt)}
      <tr class="tot"><td>${U.net}</td><td>${usd(a.net)}</td><td>${usd(b.net)}</td></tr>
      <tr class="tot"><td>${U.yld}</td><td>${pct(a.y)}</td><td>${pct(b.y)}</td></tr></tbody></table>
    <p class="assump">${U.ass(h,p)} ${U.disc}</p>
    <div class="card-actions"><a class="btn btn-wa" href="${wa(U.waHome(h))}" target="_blank" rel="noopener"><svg class="ico" aria-hidden="true"><use href="#i-wa"/></svg>${U.ask}</a><a class="btn btn-ghost" href="${mail(U.subj+': '+hName(h),U.waHome(h))}">${lang==='es'?'Correo':'Email'}</a></div>`;
  document.getElementById('dlg-plan').onclick=e=>{const t=e.target.closest('[data-plan]'); if(!t)return; setPlan(t.dataset.plan); openHome(id);};
  setImg(0);
  if(!dlg.open) dlg.showModal();
  history.replaceState(null,'','#home-'+id);
}
document.getElementById('dlg-x').onclick=()=>dlg.close();
dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close();});
dlg.addEventListener('close',()=>{ if(location.hash.startsWith('#home-')) history.replaceState(null,'',location.pathname+location.search+'#residences'); });
const pdlg=document.getElementById('photo-dlg'); pdlg.addEventListener('click',e=>{if(e.target===pdlg)pdlg.close();});

function setPlan(p){state.plan=p; document.querySelectorAll('#f-plan [data-plan]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.plan===p)); renderCards();}
function setZone(z){state.zone=z||null; renderZones(); renderCards();}

document.addEventListener('click',e=>{
  const o=e.target.closest('[data-open]'); if(o){openHome(o.dataset.open);return;}
  const ph=e.target.closest('[data-photo]'); if(ph){const k=ph.dataset.photo; const im=document.getElementById('photo-img'); im.src=`media/${k}.webp`; im.alt=PHOTOS[k][lang]; document.getElementById('photo-cap').textContent=PHOTOS[k][lang]; pdlg.showModal(); return;}
  const zb=e.target.closest('[data-zone]'); if(zb){setZone(zb.dataset.zone); return;}
  const lb=e.target.closest('[data-lang]'); if(lb){lang=lb.dataset.lang; localStorage.setItem('sl-lang',lang); applyLang(); return;}
  const kb=e.target.closest('#f-kind [data-kind]'); if(kb){state.kind=kb.dataset.kind; document.querySelectorAll('#f-kind button').forEach(b=>b.setAttribute('aria-pressed',b===kb)); renderCards(); return;}
  const pb=e.target.closest('#f-plan [data-plan]'); if(pb){setPlan(pb.dataset.plan); return;}
});
document.getElementById('zone-go').addEventListener('click',e=>{ if(e.currentTarget.dataset.none){ setZone(null);} });
document.getElementById('zone-clear').onclick=()=>setZone(null);
document.getElementById('f-sort').onchange=e=>{state.sort=e.target.value; renderCards();};

/* lead form -> WhatsApp / email */
const form=document.getElementById('lead');
function leadText(){
  const f=new FormData(form), name=(f.get('name')||'').trim();
  if(!name){document.getElementById('lead-err').hidden=false; form.name.focus(); return null;}
  document.getElementById('lead-err').hidden=true;
  const sel=form.interest, plan=form.querySelector('input[name=plan]:checked'), when=form.when;
  return u().form({name, interest: sel.value?sel.options[sel.selectedIndex].text:u().allTypes, plan: plan.nextElementSibling.textContent, when: when.options[when.selectedIndex].text, msg:(f.get('msg')||'').trim()});
}
form.addEventListener('submit',e=>{e.preventDefault(); const t=leadText(); if(t) window.open(wa(t),'_blank','noopener');});
document.getElementById('lead-mail').onclick=()=>{const t=leadText(); if(t) location.href=mail(u().subj,t);};

/* header + fab */
const header=document.getElementById('header'), fab=document.querySelector('.fab'), contact=document.getElementById('contact');
const onScroll=()=>{header.classList.toggle('solid',scrollY>40); const r=contact.getBoundingClientRect(); fab.classList.toggle('hide', scrollY<300 || (r.top<innerHeight && r.bottom>0));};
addEventListener('scroll',onScroll,{passive:true});
document.getElementById('yr').textContent=new Date().getFullYear();

applyLang(); onScroll();
const m=location.hash.match(/^#home-(\w+)/); if(m && HOMES.some(h=>h.id===m[1])) openHome(m[1]);
})();
