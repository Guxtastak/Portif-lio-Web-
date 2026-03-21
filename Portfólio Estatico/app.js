/* ========== DATA STORE ========== */
const DEFAULT_DATA = {
  perfil: {
    nome: 'Alexandre Costa',
    eyebrow: 'Desenvolvedor · Designer · Criador',
    titulo: 'Desenvolvedor Full Stack',
    typed: 'Desenvolvedor Frontend,UI/UX Designer,Arquiteto de Soluções,Entusiasta de Open Source',
    bio: 'Sou um desenvolvedor full stack apaixonado por criar soluções digitais elegantes e eficientes. Com mais de 5 anos de experiência, trabalho com tecnologias modernas para transformar ideias em produtos reais que encantam usuários e geram resultados.',
    exp: '5+',
    cv: '',
    github: '#',
    linkedin: '#',
    twitter: '#',
    instagram: '#',
    skills: ['React', 'Node.js', 'TypeScript', 'Next.js', 'PostgreSQL', 'Docker', 'AWS', 'Figma']
  },
  projetos: [
    { id: 1, titulo: 'Dashboard Analytics', cat: 'frontend', desc: 'Plataforma de analytics com visualizações interativas e relatórios em tempo real. Construído com React e D3.js para máxima performance.', demo: '#', repo: '#', img: '', techs: ['React', 'D3.js', 'TailwindCSS'] },
    { id: 2, titulo: 'API REST Escalável', cat: 'backend', desc: 'API RESTful com autenticação JWT, rate limiting, cache Redis e documentação Swagger. Suporta mais de 10.000 requisições/segundo.', demo: '#', repo: '#', img: '', techs: ['Node.js', 'Express', 'Redis', 'PostgreSQL'] },
    { id: 3, titulo: 'E-commerce Full Stack', cat: 'fullstack', desc: 'Plataforma completa de e-commerce com painel admin, integração de pagamentos Stripe e painel de analytics.', demo: '#', repo: '#', img: '', techs: ['Next.js', 'Stripe', 'Prisma', 'TailwindCSS'] },
    { id: 4, titulo: 'App de Finanças', cat: 'mobile', desc: 'Aplicativo mobile para controle financeiro pessoal com gráficos, categorias e relatórios mensais.', demo: '#', repo: '#', img: '', techs: ['React Native', 'Expo', 'SQLite'] }
  ],
  servicos: [
    { id: 1, titulo: 'Desenvolvimento Web', icon: 'fa-code', desc: 'Criação de sites e aplicações web modernas, responsivas e de alta performance utilizando as melhores tecnologias do mercado.' },
    { id: 2, titulo: 'UI/UX Design', icon: 'fa-paint-brush', desc: 'Design de interfaces intuitivas e esteticamente agradáveis, focadas na experiência do usuário e conversão.' },
    { id: 3, titulo: 'APIs & Backend', icon: 'fa-server', desc: 'Desenvolvimento de APIs robustas, escaláveis e seguras com documentação completa e boas práticas.' },
    { id: 4, titulo: 'Consultoria Tech', icon: 'fa-lightbulb', desc: 'Análise e consultoria técnica para escolha de stack, arquitetura de sistemas e boas práticas de desenvolvimento.' },
    { id: 5, titulo: 'DevOps & Deploy', icon: 'fa-cloud-upload-alt', desc: 'Configuração de CI/CD, containerização com Docker, deploy em cloud e monitoramento de aplicações.' },
    { id: 6, titulo: 'Mobile', icon: 'fa-mobile-alt', desc: 'Desenvolvimento de aplicativos móveis nativos e cross-platform para iOS e Android.' }
  ],
  depoimentos: [
    { id: 1, nome: 'Mariana Silva', cargo: 'CEO @ StartupBR', texto: 'Alexandre entregou um produto excepcional. A atenção aos detalhes e a qualidade do código foram impressionantes. Superou todas as expectativas do projeto.', foto: '' },
    { id: 2, nome: 'Carlos Mendes', cargo: 'CTO @ TechCorp', texto: 'Trabalhamos juntos em vários projetos e sempre fui surpreendido pela capacidade técnica e proatividade. Recomendo sem hesitação.', foto: '' },
    { id: 3, nome: 'Ana Rodrigues', cargo: 'Product Manager @ Fintech', texto: 'Profissional exemplar. Comunicação clara, prazos respeitados e código limpo. O dashboard que desenvolveu revolucionou nossos processos internos.', foto: '' }
  ],
  contato: { email: 'alexandre@email.com', phone: '+55 (11) 99999-9999', local: 'São Paulo, Brasil' },
  mensagens: []
};

function getData() {
  try {
    const data = localStorage.getItem('portfolio_data');
    return data ? JSON.parse(data) : JSON.parse(JSON.stringify(DEFAULT_DATA));
  } catch {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveData(data) {
  localStorage.setItem('portfolio_data', JSON.stringify(data));
}

let DB = getData();

/* ========== TYPED EFFECT ========== */
let typedIdx = 0;
let charIdx = 0;
let deleting = false;

function typeNext() {
  const titles = (DB.perfil.typed || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!titles.length) return;

  const el = document.getElementById('typed-text');
  if (!el) return;

  const cur = titles[typedIdx % titles.length];
  if (!deleting) {
    el.textContent = cur.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx >= cur.length) {
      deleting = true;
      setTimeout(typeNext, 2000);
      return;
    }
  } else {
    el.textContent = cur.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx <= 0) {
      deleting = false;
      typedIdx++;
      setTimeout(typeNext, 400);
      return;
    }
  }

  setTimeout(typeNext, deleting ? 60 : 100);
}

/* ========== RENDER HOME ========== */
function renderHome() {
  const perfil = DB.perfil;

  document.getElementById('nav-logo').textContent = perfil.nome;
  document.getElementById('hero-eyebrow').innerHTML = `<span style="content:'';width:2rem;height:1px;background:var(--accent);display:inline-block;vertical-align:middle;margin-right:.75rem"></span>${perfil.eyebrow}`;
  document.getElementById('hero-name').innerHTML = perfil.nome.replace(' ', '<br>');
  document.getElementById('footer-name').textContent = perfil.nome;
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  function makeSocialLinks(wrap) {
    if (!wrap) return;
    wrap.innerHTML = '';

    const map = {
      github: 'fab fa-github',
      linkedin: 'fab fa-linkedin',
      twitter: 'fab fa-twitter',
      instagram: 'fab fa-instagram'
    };

    Object.entries(map).forEach(([key, icon]) => {
      const a = document.createElement('a');
      a.href = perfil[key] && perfil[key] !== '#' ? perfil[key] : '#';
      a.innerHTML = `<i class="${icon}"></i>`;
      wrap.appendChild(a);
    });
  }

  makeSocialLinks(document.getElementById('hero-socials'));
  makeSocialLinks(document.getElementById('footer-socials'));

  document.getElementById('about-exp-num').textContent = perfil.exp;
  document.getElementById('about-text').textContent = perfil.bio;

  const skillsList = document.getElementById('skills-list');
  skillsList.innerHTML = perfil.skills.map((s) => `<span class="skill-tag">${s}</span>`).join('');

  const cvBtn = document.getElementById('cv-btn');
  if (perfil.cv) {
    cvBtn.onclick = () => window.open(perfil.cv, '_blank');
  }

  document.getElementById('contact-email').textContent = DB.contato.email;
  document.getElementById('contact-phone').textContent = DB.contato.phone;
  document.getElementById('contact-location').textContent = DB.contato.local;

  renderProjects('todos');
  renderServices();
  renderTestimonials();

  typedIdx = 0;
  charIdx = 0;
  deleting = false;
  typeNext();
}

function renderProjects(cat) {
  const grid = document.getElementById('projects-grid');
  const items = cat === 'todos' ? DB.projetos : DB.projetos.filter((p) => p.cat === cat);

  if (!items.length) {
    grid.innerHTML = '<p style="color:var(--text3);grid-column:1/-1">Nenhum projeto encontrado.</p>';
    return;
  }

  grid.innerHTML = items.map((p) => `
    <div class="project-card" onclick="openProjectModal(${p.id})">
      <div class="project-img">
        ${p.img ? `<img src="${p.img}" alt="${p.titulo}" onerror="this.style.display='none'">` : ''}
        <i class="fa fa-code" style="${p.img ? 'display:none' : ''}"></i>
        <div class="project-overlay">
          ${p.demo ? `<a class="project-link" href="${p.demo}" onclick="e=>(e.stopPropagation())" title="Demo"><i class="fa fa-external-link-alt"></i></a>` : ''}
          ${p.repo ? `<a class="project-link" href="${p.repo}" onclick="e=>(e.stopPropagation())" title="Repo"><i class="fab fa-github"></i></a>` : ''}
        </div>
      </div>
      <div class="project-info">
        <p class="project-cat">${p.cat}</p>
        <h3 class="project-title">${p.titulo}</h3>
        <p class="project-desc">${p.desc.substring(0, 100)}${p.desc.length > 100 ? '...' : ''}</p>
        <div class="project-techs">${(p.techs || []).map((t) => `<span class="tech-badge">${t}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');
}

function renderServices() {
  const grid = document.getElementById('services-grid');
  grid.innerHTML = DB.servicos.map((s) => `
    <div class="service-card">
      <div class="service-icon"><i class="fa ${s.icon}"></i></div>
      <h3 class="service-title">${s.titulo}</h3>
      <p class="service-desc">${s.desc}</p>
    </div>
  `).join('');
}

let testSlide = 0;

function renderTestimonials() {
  const track = document.getElementById('testimonials-track');
  const nav = document.getElementById('testimonials-nav');

  if (!DB.depoimentos.length) {
    track.innerHTML = '<p style="color:var(--text3)">Nenhum depoimento ainda.</p>';
    return;
  }

  track.innerHTML = DB.depoimentos.map((d) => `
    <div class="testimonial-card">
      <div class="testimonial-quote">"</div>
      <p class="testimonial-text">${d.texto}</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${d.foto ? `<img src="${d.foto}" alt="${d.nome}" onerror="this.parentElement.textContent='${d.nome[0]}'">` : d.nome[0]}</div>
        <div><div class="testimonial-name">${d.nome}</div><div class="testimonial-role">${d.cargo}</div></div>
      </div>
    </div>
  `).join('');

  nav.innerHTML = DB.depoimentos.map((_, i) => `<button class="nav-dot${i === 0 ? ' active' : ''}" onclick="goTestSlide(${i})"></button>`).join('');

  clearInterval(window._testInterval);
  if (DB.depoimentos.length > 1) {
    window._testInterval = setInterval(() => {
      testSlide = (testSlide + 1) % DB.depoimentos.length;
      updateTestimonialSlide();
    }, 4000);
  }
}

function goTestSlide(i) {
  testSlide = i;
  clearInterval(window._testInterval);
  updateTestimonialSlide();
}

function updateTestimonialSlide() {
  const cards = document.querySelectorAll('.testimonial-card');
  const perView = window.innerWidth > 700 ? 2 : 1;
  const maxSlide = Math.max(0, cards.length - perView);
  testSlide = Math.min(testSlide, maxSlide);

  const width = cards[0]?.offsetWidth || 0;
  document.getElementById('testimonials-track').style.transform = `translateX(-${testSlide * (width + 24)}px)`;
  document.querySelectorAll('.nav-dot').forEach((d, i) => d.classList.toggle('active', i === testSlide));
}

/* ========== PROJECT MODAL ========== */
function openProjectModal(id) {
  const p = DB.projetos.find((x) => x.id === id);
  if (!p) return;

  document.getElementById('modal-cat').textContent = p.cat;
  document.getElementById('modal-title').textContent = p.titulo;
  document.getElementById('modal-desc').textContent = p.desc;

  const modalImage = document.getElementById('modal-img');
  modalImage.innerHTML = p.img
    ? `<img src="${p.img}" alt="${p.titulo}" onerror="this.parentElement.innerHTML='<i class=\\'fa fa-code\\'></i>' " style="width:100%;height:100%;object-fit:cover">`
    : '<i class="fa fa-code"></i>';

  document.getElementById('modal-techs').innerHTML = (p.techs || []).map((t) => `<span class="tech-badge">${t}</span>`).join('');

  const modalLinks = document.getElementById('modal-links');
  modalLinks.innerHTML = '';
  if (p.demo) {
    modalLinks.innerHTML += `<a class="btn-primary" href="${p.demo}" target="_blank" style="text-decoration:none;font-size:.8rem;padding:.7rem 1.4rem">Demo <i class="fa fa-external-link-alt"></i></a>`;
  }
  if (p.repo) {
    modalLinks.innerHTML += `<a class="btn-secondary" href="${p.repo}" target="_blank" style="text-decoration:none;font-size:.8rem;padding:.7rem 1.4rem">GitHub <i class="fab fa-github"></i></a>`;
  }

  document.getElementById('project-modal').classList.add('active');
}

function closeModal() {
  document.getElementById('project-modal').classList.remove('active');
}

document.getElementById('project-modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});

/* ========== CONTACT FORM ========== */
function submitContact(e) {
  e.preventDefault();

  const f = e.target;
  const msg = {
    id: Date.now(),
    nome: f.nome.value,
    email: f.email.value,
    assunto: f.assunto.value,
    mensagem: f.mensagem.value,
    data: new Date().toLocaleDateString('pt-BR')
  };

  DB.mensagens.push(msg);
  saveData(DB);
  document.getElementById('contact-msg').className = 'form-msg success';
  document.getElementById('contact-msg').textContent = 'Mensagem enviada! Responderei em breve.';
  f.reset();
  updateStats();
}

/* ========== PROJECT FILTER ========== */
document.getElementById('projects-filter').addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  renderProjects(btn.dataset.cat);
});

/* ========== SCROLL REVEAL ========== */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

function initReveal() {
  document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));
}

/* ========== HELPERS ========== */
function scrollTo(sel) {
  document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' });
}

function toggleMenu() {
  document.getElementById('main-nav').classList.toggle('menu-open');
}

function toast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show';
  t.style.borderColor = type === 'error' ? 'rgba(220,50,50,.4)' : 'rgba(201,168,76,.3)';
  setTimeout(() => t.classList.remove('show'), 3000);
}

function updateStats() {
  document.getElementById('stat-projetos').textContent = DB.projetos.length;
  document.getElementById('stat-servicos').textContent = DB.servicos.length;
  document.getElementById('stat-deps').textContent = DB.depoimentos.length;
  document.getElementById('stat-msgs').textContent = DB.mensagens.length;

  const tbody = document.getElementById('dash-msgs-body');
  if (DB.mensagens.length) {
    tbody.innerHTML = DB.mensagens
      .slice(-5)
      .reverse()
      .map((m) => `<tr><td>${m.nome}</td><td>${m.assunto || '—'}</td><td>${m.data}</td></tr>`)
      .join('');
  }
}

/* ========== NAVIGATION ========== */
function goAdmin() {
  document.getElementById('main-site').style.display = 'none';
  document.getElementById('login-panel').classList.add('visible');
  document.getElementById('admin-panel').classList.remove('visible');
}

function goHome() {
  document.getElementById('main-site').style.display = '';
  document.getElementById('admin-panel').classList.remove('visible');
  document.getElementById('login-panel').classList.remove('visible');
  renderHome();
  setTimeout(initReveal, 100);
}

function doLogin() {
  const user = document.getElementById('login-user').value;
  const pass = document.getElementById('login-pass').value;

  if (user === 'admin' && pass === 'admin123') {
    document.getElementById('login-panel').classList.remove('visible');
    document.getElementById('admin-panel').classList.add('visible');
    loadAdminForms();
    updateStats();
  } else {
    document.getElementById('login-error').style.display = 'block';
  }
}

document.getElementById('login-pass').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') doLogin();
});

function doLogout() {
  document.getElementById('admin-panel').classList.remove('visible');
  document.getElementById('login-panel').classList.add('visible');
  document.getElementById('login-error').style.display = 'none';
}

/* ========== ADMIN SECTIONS ========== */
function showAdminSection(sec, el) {
  document.querySelectorAll('.admin-section').forEach((s) => s.classList.remove('active'));
  document.getElementById(`sec-${sec}`).classList.add('active');
  document.querySelectorAll('.admin-nav-item').forEach((i) => i.classList.remove('active'));

  if (el) {
    el.classList.add('active');
  } else {
    const found = document.querySelector(`.admin-nav-item[data-sec="${sec}"]`);
    if (found) {
      document.querySelectorAll('.admin-nav-item').forEach((i) => i.classList.remove('active'));
      found.classList.add('active');
    }
  }

  const titles = {
    dashboard: 'Dashboard',
    perfil: 'Perfil',
    projetos: 'Projetos',
    servicos: 'Serviços',
    depoimentos: 'Depoimentos',
    contato: 'Contato',
    mensagens: 'Mensagens'
  };
  document.getElementById('admin-section-title').textContent = titles[sec] || sec;
}

/* ========== ADMIN LOAD FORMS ========== */
function loadAdminForms() {
  const p = DB.perfil;
  document.getElementById('p-nome').value = p.nome || '';
  document.getElementById('p-titulo').value = p.titulo || '';
  document.getElementById('p-eyebrow').value = p.eyebrow || '';
  document.getElementById('p-typed').value = p.typed || '';
  document.getElementById('p-bio').value = p.bio || '';
  document.getElementById('p-exp').value = p.exp || '';
  document.getElementById('p-cv').value = p.cv || '';
  document.getElementById('p-github').value = p.github || '';
  document.getElementById('p-linkedin').value = p.linkedin || '';
  document.getElementById('p-twitter').value = p.twitter || '';
  document.getElementById('p-instagram').value = p.instagram || '';
  document.getElementById('ct-email').value = DB.contato.email || '';
  document.getElementById('ct-phone').value = DB.contato.phone || '';
  document.getElementById('ct-local').value = DB.contato.local || '';

  renderSkillTags();
  renderProjList();
  renderServList();
  renderDepList();
  renderMsgsList();
}

/* ========== SKILLS TAGS ========== */
function renderSkillTags() {
  const wrap = document.getElementById('skills-tags-wrap');
  const inp = document.getElementById('skill-input');
  [...wrap.querySelectorAll('.tag-pill')].forEach((e) => e.remove());

  DB.perfil.skills.forEach((skill) => {
    const pill = document.createElement('span');
    pill.className = 'tag-pill';
    pill.innerHTML = `${skill}<button onclick="removeSkill('${skill}')">×</button>`;
    wrap.insertBefore(pill, inp);
  });
}

function addSkillTag(e) {
  if (e.key !== 'Enter') return;
  e.preventDefault();

  const value = e.target.value.trim();
  if (value && !DB.perfil.skills.includes(value)) {
    DB.perfil.skills.push(value);
    saveData(DB);
    renderSkillTags();
  }
  e.target.value = '';
}

function removeSkill(s) {
  DB.perfil.skills = DB.perfil.skills.filter((x) => x !== s);
  saveData(DB);
  renderSkillTags();
}

let projTechs = [];

function renderProjTechTags() {
  const wrap = document.getElementById('pj-techs-wrap');
  const inp = document.getElementById('pj-tech-input');
  [...wrap.querySelectorAll('.tag-pill')].forEach((e) => e.remove());

  projTechs.forEach((tech) => {
    const pill = document.createElement('span');
    pill.className = 'tag-pill';
    pill.innerHTML = `${tech}<button onclick="removeProjTech('${tech}')">×</button>`;
    wrap.insertBefore(pill, inp);
  });
}

function addProjTech(e) {
  if (e.key !== 'Enter') return;
  e.preventDefault();

  const value = e.target.value.trim();
  if (value && !projTechs.includes(value)) {
    projTechs.push(value);
    renderProjTechTags();
  }
  e.target.value = '';
}

function removeProjTech(tech) {
  projTechs = projTechs.filter((x) => x !== tech);
  renderProjTechTags();
}

/* ========== SAVE PERFIL ========== */
function savePerfil() {
  DB.perfil = {
    ...DB.perfil,
    nome: document.getElementById('p-nome').value,
    titulo: document.getElementById('p-titulo').value,
    eyebrow: document.getElementById('p-eyebrow').value,
    typed: document.getElementById('p-typed').value,
    bio: document.getElementById('p-bio').value,
    exp: document.getElementById('p-exp').value,
    cv: document.getElementById('p-cv').value,
    github: document.getElementById('p-github').value,
    linkedin: document.getElementById('p-linkedin').value,
    twitter: document.getElementById('p-twitter').value,
    instagram: document.getElementById('p-instagram').value
  };

  saveData(DB);
  toast('Perfil salvo com sucesso!');
}

/* ========== PROJECTS CRUD ========== */
function renderProjList() {
  const tbody = document.getElementById('proj-list');
  tbody.innerHTML = DB.projetos.length
    ? DB.projetos.map((p) => `
      <tr><td>${p.titulo}</td><td><span class="tech-badge">${p.cat}</span></td>
      <td><div class="actions">
        <button class="admin-btn admin-btn-sm" onclick="editProject(${p.id})"><i class="fa fa-edit"></i></button>
        <button class="admin-btn admin-btn-sm admin-btn-danger" onclick="deleteProject(${p.id})"><i class="fa fa-trash"></i></button>
      </div></td></tr>
    `).join('')
    : '<tr><td colspan="3" style="color:var(--text3)">Nenhum projeto</td></tr>';
}

function saveProject() {
  const id = document.getElementById('edit-proj-id').value;
  const proj = {
    id: id ? parseInt(id, 10) : Date.now(),
    titulo: document.getElementById('pj-titulo').value,
    cat: document.getElementById('pj-cat').value,
    desc: document.getElementById('pj-desc').value,
    demo: document.getElementById('pj-demo').value,
    repo: document.getElementById('pj-repo').value,
    img: document.getElementById('pj-img').value,
    techs: [...projTechs]
  };

  if (!proj.titulo) {
    toast('Informe o título', 'error');
    return;
  }

  if (id) DB.projetos = DB.projetos.map((p) => (p.id === proj.id ? proj : p));
  else DB.projetos.push(proj);

  saveData(DB);
  renderProjList();
  clearProjectForm();
  updateStats();
  toast('Projeto salvo!');
}

function editProject(id) {
  const p = DB.projetos.find((x) => x.id === id);
  if (!p) return;

  document.getElementById('edit-proj-id').value = p.id;
  document.getElementById('pj-titulo').value = p.titulo;
  document.getElementById('pj-cat').value = p.cat;
  document.getElementById('pj-desc').value = p.desc;
  document.getElementById('pj-demo').value = p.demo || '';
  document.getElementById('pj-repo').value = p.repo || '';
  document.getElementById('pj-img').value = p.img || '';
  projTechs = [...p.techs];
  renderProjTechTags();
  document.getElementById('proj-form-title').textContent = 'Editar Projeto';
}

function deleteProject(id) {
  if (!confirm('Excluir este projeto?')) return;
  DB.projetos = DB.projetos.filter((p) => p.id !== id);
  saveData(DB);
  renderProjList();
  updateStats();
  toast('Projeto excluído');
}

function clearProjectForm() {
  document.getElementById('edit-proj-id').value = '';
  ['pj-titulo', 'pj-desc', 'pj-demo', 'pj-repo', 'pj-img'].forEach((id) => {
    document.getElementById(id).value = '';
  });
  document.getElementById('pj-cat').value = 'frontend';
  projTechs = [];
  renderProjTechTags();
  document.getElementById('proj-form-title').textContent = 'Novo Projeto';
}

/* ========== SERVICES CRUD ========== */
function renderServList() {
  const tbody = document.getElementById('serv-list');
  tbody.innerHTML = DB.servicos.length
    ? DB.servicos.map((s) => `
      <tr><td>${s.titulo}</td><td><i class="fa ${s.icon}" style="color:var(--accent)"></i></td>
      <td><div class="actions">
        <button class="admin-btn admin-btn-sm" onclick="editService(${s.id})"><i class="fa fa-edit"></i></button>
        <button class="admin-btn admin-btn-sm admin-btn-danger" onclick="deleteService(${s.id})"><i class="fa fa-trash"></i></button>
      </div></td></tr>
    `).join('')
    : '<tr><td colspan="3" style="color:var(--text3)">Nenhum serviço</td></tr>';
}

function saveService() {
  const id = document.getElementById('edit-serv-id').value;
  const s = {
    id: id ? parseInt(id, 10) : Date.now(),
    titulo: document.getElementById('sv-titulo').value,
    icon: document.getElementById('sv-icon').value || 'fa-star',
    desc: document.getElementById('sv-desc').value
  };

  if (!s.titulo) {
    toast('Informe o título', 'error');
    return;
  }

  if (id) DB.servicos = DB.servicos.map((x) => (x.id === s.id ? s : x));
  else DB.servicos.push(s);

  saveData(DB);
  renderServList();
  clearServiceForm();
  updateStats();
  toast('Serviço salvo!');
}

function editService(id) {
  const s = DB.servicos.find((x) => x.id === id);
  if (!s) return;
  document.getElementById('edit-serv-id').value = s.id;
  document.getElementById('sv-titulo').value = s.titulo;
  document.getElementById('sv-icon').value = s.icon;
  document.getElementById('sv-desc').value = s.desc;
  document.getElementById('serv-form-title').textContent = 'Editar Serviço';
}

function deleteService(id) {
  if (!confirm('Excluir este serviço?')) return;
  DB.servicos = DB.servicos.filter((s) => s.id !== id);
  saveData(DB);
  renderServList();
  updateStats();
  toast('Serviço excluído');
}

function clearServiceForm() {
  document.getElementById('edit-serv-id').value = '';
  ['sv-titulo', 'sv-icon', 'sv-desc'].forEach((id) => {
    document.getElementById(id).value = '';
  });
  document.getElementById('serv-form-title').textContent = 'Novo Serviço';
}

/* ========== TESTIMONIALS CRUD ========== */
function renderDepList() {
  const tbody = document.getElementById('dep-list');
  tbody.innerHTML = DB.depoimentos.length
    ? DB.depoimentos.map((d) => `
      <tr><td>${d.nome}</td><td style="color:var(--text3);font-size:.82rem">${d.cargo}</td>
      <td><div class="actions">
        <button class="admin-btn admin-btn-sm" onclick="editTestimonial(${d.id})"><i class="fa fa-edit"></i></button>
        <button class="admin-btn admin-btn-sm admin-btn-danger" onclick="deleteTestimonial(${d.id})"><i class="fa fa-trash"></i></button>
      </div></td></tr>
    `).join('')
    : '<tr><td colspan="3" style="color:var(--text3)">Nenhum depoimento</td></tr>';
}

function saveTestimonial() {
  const id = document.getElementById('edit-dep-id').value;
  const d = {
    id: id ? parseInt(id, 10) : Date.now(),
    nome: document.getElementById('dp-nome').value,
    cargo: document.getElementById('dp-cargo').value,
    texto: document.getElementById('dp-texto').value,
    foto: document.getElementById('dp-foto').value
  };

  if (!d.nome || !d.texto) {
    toast('Preencha nome e texto', 'error');
    return;
  }

  if (id) DB.depoimentos = DB.depoimentos.map((x) => (x.id === d.id ? d : x));
  else DB.depoimentos.push(d);

  saveData(DB);
  renderDepList();
  clearDepForm();
  updateStats();
  toast('Depoimento salvo!');
}

function editTestimonial(id) {
  const d = DB.depoimentos.find((x) => x.id === id);
  if (!d) return;
  document.getElementById('edit-dep-id').value = d.id;
  document.getElementById('dp-nome').value = d.nome;
  document.getElementById('dp-cargo').value = d.cargo;
  document.getElementById('dp-texto').value = d.texto;
  document.getElementById('dp-foto').value = d.foto || '';
  document.getElementById('dep-form-title').textContent = 'Editar Depoimento';
}

function deleteTestimonial(id) {
  if (!confirm('Excluir este depoimento?')) return;
  DB.depoimentos = DB.depoimentos.filter((d) => d.id !== id);
  saveData(DB);
  renderDepList();
  updateStats();
  toast('Depoimento excluído');
}

function clearDepForm() {
  document.getElementById('edit-dep-id').value = '';
  ['dp-nome', 'dp-cargo', 'dp-texto', 'dp-foto'].forEach((id) => {
    document.getElementById(id).value = '';
  });
  document.getElementById('dep-form-title').textContent = 'Novo Depoimento';
}

/* ========== CONTACT SAVE ========== */
function saveContato() {
  DB.contato = {
    email: document.getElementById('ct-email').value,
    phone: document.getElementById('ct-phone').value,
    local: document.getElementById('ct-local').value
  };
  saveData(DB);
  toast('Contato salvo!');
}

/* ========== MESSAGES ========== */
function renderMsgsList() {
  const tbody = document.getElementById('msgs-list');
  tbody.innerHTML = DB.mensagens.length
    ? [...DB.mensagens].reverse().map((m) => `
      <tr><td>${m.nome}</td><td style="color:var(--text3)">${m.email}</td><td>${m.assunto || '—'}</td>
      <td style="color:var(--text2);max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${m.mensagem}</td>
      <td style="color:var(--text3);white-space:nowrap">${m.data}</td>
      <td><button class="admin-btn admin-btn-sm admin-btn-danger" onclick="deleteMsg(${m.id})"><i class="fa fa-trash"></i></button></td></tr>
    `).join('')
    : '<tr><td colspan="6" style="color:var(--text3)">Nenhuma mensagem</td></tr>';
}

function deleteMsg(id) {
  if (!confirm('Excluir mensagem?')) return;
  DB.mensagens = DB.mensagens.filter((m) => m.id !== id);
  saveData(DB);
  renderMsgsList();
  updateStats();
  toast('Mensagem excluída');
}

/* ========== INIT ========== */
renderHome();
setTimeout(initReveal, 100);
