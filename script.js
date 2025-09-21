/* data: categories and items (from your list) */
const categories = [
  { id:'hot', title:'نوشیدنی گرم بر پایه قهوه', items:[
    'اسپرسو','اسپرسو ماکیاتو','کورتادو','فلت وایت','لاته','فلیور لاته','اسپانیش لاته','موکا','آمریکانو','آفوگاتو','آتزور کافی (ویژه)'
  ]},
  { id:'cold', title:'نوشیدنی سرد بر پایه قهوه', items:[
    'آیس اسپرسو','آیس آمریکانو','آیس کورتادو','آیس لاته','آیس موکا','آیس کارامل ماکیاتو','آیس آتزورو کافی (ویژه)','کوکونات فراپاچینو','هازلنات فراپاچینو','موکا فراپاچینو'
  ]},
  { id:'maq', title:'قهوه های دمی', items:[
    'V60','آیروپرس','سایفون','کلدبرو'
  ]},
  { id:'special', title:'گرم های ویژه', items:[
    'چای','موکاتزو','ماسالا','هات‌چاکلت','ایتلین چاکلت'
  ]},
  { id:'mocktail', title:'موکتل ها', items:[
    'آتزورو لیموناد','آتزورو موهیتو','سونیوبلو','گراناتو','روبینو روسو','ورداویوو','ماچاتزو','پرلارزا','آئورا'
  ]},
  { id:'shake', title:'شیک ها', items:[
    'آروتزو','چوکومنتا','سانگریاکس','اپلزا','چوکوناتس'
  ]},
  { id:'smoothie', title:'اسموتی ها', items:[
    'ملوگرانو','انکافتو','فیاما','اسپرو ویوا','فریس وردا'
  ]}
];

const slidesEl = document.getElementById('slides');
const catBar = document.getElementById('categoryBar');
const categoriesGrid = document.getElementById('categoriesGrid');
let currentSlide = null;

/* helper: image list for placeholders (you can replace images in /images) */
const placeholderImgs = [
  'hot1.jpg','hot2.jpg','hot3.jpg',
  'cold1.jpg','cold2.jpg','cold3.jpg',
  'maq1.jpg','maq2.jpg','maq3.jpg'
];

/* create categories grid (covers categories page) */
function buildCategoriesGrid(){
  categories.forEach((c, idx)=>{
    const card = document.createElement('div');
    card.className = 'cat-card';
    // pick image cyclically
    const img = document.createElement('img');
    img.src = 'images/' + (placeholderImgs[idx%placeholderImgs.length]);
    img.alt = c.title;
    const title = document.createElement('div');
    title.className = 'cat-title';
    title.textContent = c.title;
    card.appendChild(img);
    card.appendChild(title);
    card.onclick = ()=> {
      // go to menu and show category
      document.getElementById('menu').scrollIntoView({behavior:'smooth', block:'start'});
      showCategory(c.id);
    };
    categoriesGrid.appendChild(card);
  });
}

/* build slides and category bar */
function buildSlides(){
  categories.forEach((c, idx)=>{
    // category bar button
    const btn = document.createElement('button');
    btn.textContent = c.title;
    btn.onclick = ()=> showCategory(c.id);
    if(idx===0) btn.classList.add('active');
    catBar.appendChild(btn);

    // slide container
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.id = 'slide-' + c.id;

    const heading = document.createElement('h3');
    heading.textContent = c.title;
    heading.style.textAlign='center';
    slide.appendChild(heading);

    const itemsWrap = document.createElement('div');
    itemsWrap.className = 'items';

    // create item cards
    for(let i=0; i<Math.min(c.items.length, 20); i++){
      const it = document.createElement('div');
      it.className = 'item';

      const img = document.createElement('img');
      img.src = 'images/' + (placeholderImgs[i%placeholderImgs.length]);
      img.alt = c.items[i];
      img.onclick = ()=> openModal(img.src);

      const meta = document.createElement('div');
      meta.className = 'meta';
      const title = document.createElement('div');
      title.className = 'title'; title.textContent = c.items[i];
      const desc = document.createElement('div');
      desc.className = 'desc';
      // optional: put a short description or ingredients here
      desc.textContent = '';
      const price = document.createElement('div');
      price.className = 'price';
      price.textContent = '— تومان';

      meta.appendChild(title);
      meta.appendChild(desc);
      meta.appendChild(price);

      it.appendChild(img);
      it.appendChild(meta);
      itemsWrap.appendChild(it);
    }

    slide.appendChild(itemsWrap);
    slidesEl.appendChild(slide);
  });
}

/* show category with slide animation */
/* show category with slide animation */
function showCategory(id){
  const newSlide = document.getElementById('slide-' + id);
  if(!newSlide) return;

  // اگر اسلاید فعال داریم، اول همه رو ریست کن
  document.querySelectorAll('.slide').forEach(slide => {
    slide.classList.remove('active', 'prev');
  });

  // همه‌ی دکمه‌ها رو ریست کن
  Array.from(catBar.children).forEach(b => b.classList.remove('active'));

  // ست کردن اسلاید جدید
  newSlide.classList.add('active');
  currentSlide = newSlide;

  // فعال کردن دکمه‌ی درست
  Array.from(catBar.children).forEach(b => {
    if(b.textContent === newSlide.querySelector('h3').textContent){
      b.classList.add('active');
    }
  });

  // اسکرول خودکار به بالای دسته
  newSlide.scrollTop = 0;
}

/* modal for image zoom */
function openModal(src){
  const m = document.getElementById('modal');
  const im = document.getElementById('modalImg');
  im.src = src;
  m.style.display = 'flex';
}
function closeModal(){
  const m = document.getElementById('modal');
  m.style.display = 'none';
}

/* helpers for navigation */
function goMenu(){ document.getElementById('categories').scrollIntoView({behavior:'smooth', block:'start'}); showCategory(categories[0].id); }
function goHome(){ document.getElementById('home').scrollIntoView({behavior:'smooth', block:'start'}); }

/* init */
window.addEventListener('load', ()=>{
  buildCategoriesGrid();
  buildSlides();
  // show first category by default
  showCategory(categories[0].id);
  // make sure slides container has enough height
  // nothing else required; items area is scrollable
});
