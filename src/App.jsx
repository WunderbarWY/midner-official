import { useEffect, useRef } from "react";
import { Routes, Route, NavLink, Link, useLocation } from "react-router-dom";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import {
  AcademicCapIcon,
  AdjustmentsHorizontalIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  RocketLaunchIcon
} from "@heroicons/react/24/solid";
import "react-vertical-timeline-component/style.min.css";
import anime from "animejs/lib/anime.es.js";
import logoUrl from "../水印.png";

const floatOrbs = () => {
  anime({
    targets: ".orb--red",
    translateY: [-10, 12],
    translateX: [-6, 10],
    duration: 5200,
    direction: "alternate",
    easing: "easeInOutSine",
    loop: true
  });

  anime({
    targets: ".orb--blue",
    translateY: [12, -14],
    translateX: [8, -6],
    duration: 5600,
    direction: "alternate",
    easing: "easeInOutSine",
    loop: true
  });
};

const heroReveal = () => {
  anime({
    targets: ".hero .reveal, .page-hero .reveal",
    opacity: [0, 1],
    translateY: [18, 0],
    delay: anime.stagger(120),
    duration: 800,
    easing: "easeOutCubic"
  });
};

const pulseCta = () => {
  anime({
    targets: ".btn-pulse",
    scale: [1, 1.02],
    duration: 1400,
    easing: "easeInOutSine",
    direction: "alternate",
    loop: true
  });
};

const initScrollReveal = () => {
  const targets = [...document.querySelectorAll("section .reveal, footer .reveal")];
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const element = entry.target;
        anime.remove(element);
        if (entry.isIntersecting) {
          element.dataset.animated = "true";
          anime({
            targets: element,
            opacity: [0, 1],
            translateY: [16, 0],
            duration: 700,
            easing: "easeOutCubic"
          });
        } else {
          element.dataset.animated = "false";
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.2 }
  );
  targets.forEach(target => observer.observe(target));
};

const hoverLift = () => {
  const cards = document.querySelectorAll(
    ".lift, .card, .result-card, .stat-card, .flow-card, .matrix-card, .contact-card, .link-card"
  );
  cards.forEach(card => {
    if (card.dataset.liftBound === "true") return;
    card.dataset.liftBound = "true";
    card.addEventListener("mouseenter", () => {
      anime.remove(card);
      anime({
        targets: card,
        translateY: -6,
        duration: 260,
        easing: "easeOutQuad"
      });
    });
    card.addEventListener("mouseleave", () => {
      anime.remove(card);
      anime({
        targets: card,
        translateY: 0,
        duration: 320,
        easing: "easeOutQuad"
      });
    });
  });
};

const initExpandCards = () => {
  const cards = [...document.querySelectorAll("[data-expand]")];
  if (!cards.length) return;
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        if (card.dataset.expanded === "true") return;
        const body = card.querySelector(".expand-body");
        if (!body) return;
        card.dataset.expanded = "true";
        const targetHeight = body.scrollHeight;
        anime({
          targets: body,
          height: [0, targetHeight],
          opacity: [0, 1],
          duration: 800,
          easing: "easeOutCubic",
          begin: () => {
            body.style.paddingTop = "12px";
          },
          complete: () => {
            body.style.height = "auto";
          }
        });
      });
    },
    { threshold: 0.35 }
  );
  cards.forEach(card => observer.observe(card));
};

const initMagnetic = () => {
  const items = document.querySelectorAll(".btn, .link-card");
  items.forEach(item => {
    if (item.dataset.magneticBound === "true") return;
    item.dataset.magneticBound = "true";
    item.addEventListener("mousemove", event => {
      const rect = item.getBoundingClientRect();
      const offsetX = event.clientX - rect.left - rect.width / 2;
      const offsetY = event.clientY - rect.top - rect.height / 2;
      anime.remove(item);
      anime({
        targets: item,
        translateX: offsetX * 0.08,
        translateY: offsetY * 0.08,
        duration: 200,
        easing: "easeOutQuad"
      });
    });
    item.addEventListener("mouseleave", () => {
      anime.remove(item);
      anime({
        targets: item,
        translateX: 0,
        translateY: 0,
        duration: 500,
        easing: "easeOutElastic(1, .6)"
      });
    });
  });
};

const timelineContentStyle = {
  background: "var(--surface)",
  color: "inherit",
  borderRadius: "18px",
  border: "1px solid rgba(16, 42, 107, 0.08)",
  boxShadow: "var(--shadow)"
};

const timelineArrowStyle = {
  borderRight: "7px solid rgba(16, 42, 107, 0.12)"
};

const timelineIconStyle = {
  background: "var(--surface)",
  color: "var(--blue)",
  boxShadow: "var(--shadow)"
};

const Layout = ({ children }) => (
  <div>
    <div className="orb orb--red"></div>
    <div className="orb orb--blue"></div>
    <div className="bg-watermark" style={{ backgroundImage: `url(${logoUrl})` }}></div>
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <img className="brand-logo" src={logoUrl} alt="美藤纳" />
          <span>美藤纳 Midner</span>
        </div>
        <nav className="nav">
          <NavLink to="/" end>
            首页
          </NavLink>
          <NavLink to="/services">服务</NavLink>
          <NavLink to="/method">方法论</NavLink>
          <NavLink to="/team">团队</NavLink>
          <NavLink to="/contact" className="nav-cta">
            预约咨询
          </NavLink>
        </nav>
      </div>
    </header>
    {children}
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>美藤纳留学工作室 Midner</div>
        <div>深圳市罗湖区鸿隆世纪广场 B座 23B室 · 广州市天河区黄埔大道中 汇金国际金融中心 1617</div>
      </div>
    </footer>
  </div>
);

const HomePage = () => (
  <main className="page-home">
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <p className="eyebrow reveal">北美留学高端定制申请</p>
          <h1 className="reveal">让每位学子以最匹配的路径进入理想院校</h1>
          <p className="lead reveal">
            美藤纳专注美国本科与北美研究生申请，整合资深顾问、前招生官与行业专家，为你提供精准、克制但极具成效的全流程服务。
          </p>
          <div className="hero-actions reveal">
            <Link className="btn btn-primary" to="/contact">
              获取专属方案
            </Link>
            <Link className="btn btn-ghost" to="/services">
              查看服务
            </Link>
          </div>
        </div>
        <div className="hero-panel">
          <div className="stat-card reveal">
            <span className="stat-value">100+</span>
            <span className="stat-label">成功案例</span>
          </div>
          <div className="stat-card reveal">
            <span className="stat-value">5000h+</span>
            <span className="stat-label">资深顾问经验</span>
          </div>
          <div className="stat-card reveal">
            <span className="stat-value">1:1</span>
            <span className="stat-label">全程定制陪伴</span>
          </div>
          <div className="page-links reveal">
            <Link className="link-card" to="/services">
              <span className="link-title">服务模块</span>
              <span className="link-sub">全流程方案</span>
            </Link>
            <Link className="link-card" to="/method">
              <span className="link-title">方法论</span>
              <span className="link-sub">择校与文书体系</span>
            </Link>
            <Link className="link-card" to="/team">
              <span className="link-title">核心团队</span>
              <span className="link-sub">专家协作支持</span>
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="section home-about">
      <div className="container about-split">
        <div className="about-copy">
          <div className="section-head">
            <p className="eyebrow reveal">About Midner</p>
            <h2 className="reveal">专注北美申请的高端定制团队</h2>
            <p className="section-desc reveal">美藤纳留学工作室于2024年10月正式成立，专注北美高端定制化申请支持。</p>
          </div>
          <div className="rich-text reveal">
            <p>我们深耕美国留学市场多年，凭借丰富的成功案例与对申请趋势的敏锐洞察，已成功助力近百名学生进入全球顶尖学府及特色项目。</p>
            <p>团队聚焦美国本科申请，同时覆盖加拿大本科、美加地区硕士与博士升学，提供从前期咨询到签证落地的全流程支持。</p>
          </div>
        </div>
        <div className="about-values">
          <div className="value-card lift reveal">
            <p className="eyebrow">Mission</p>
            <h3>愿景</h3>
            <p>以至诚之念，助力每一位学子踏足可堪匹配的最高学府。</p>
          </div>
          <div className="value-card lift reveal">
            <p className="eyebrow">Values</p>
            <h3>价值观</h3>
            <ul className="bullet-list">
              <li>专业先行</li>
              <li>务实诚信</li>
              <li>热心服务</li>
              <li>全力以赴</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section className="section home-services">
      <div className="container home-split">
        <div>
          <div className="section-head">
            <p className="eyebrow reveal">Services</p>
            <h2 className="reveal">全流程服务，精细化提升竞争力</h2>
            <p className="section-desc reveal">从择校定位到文书、面试与签证指导，层层拆解每个关键环节。</p>
          </div>
          <div className="home-list">
            <div className="home-item lift reveal">
              <div className="home-item-head">
                <span className="home-icon">
                  <ClipboardDocumentCheckIcon className="icon-svg" aria-hidden="true" />
                </span>
                <h3>申请协助</h3>
              </div>
              <p>选校评估、材料清单、文书写作与材料准备，全程把控节奏。</p>
            </div>
            <div className="home-item lift reveal">
              <div className="home-item-head">
                <span className="home-icon">
                  <RocketLaunchIcon className="icon-svg" aria-hidden="true" />
                </span>
                <h3>背景提升</h3>
              </div>
              <p>实习与科研提升、活动规划、作品集定制，突出个人竞争优势。</p>
            </div>
            <div className="home-item lift reveal">
              <div className="home-item-head">
                <span className="home-icon">
                  <ChatBubbleLeftRightIcon className="icon-svg" aria-hidden="true" />
                </span>
                <h3>面试与签证</h3>
              </div>
              <p>面试辅导、模拟演练与签证协助，稳定发挥，落地执行。</p>
            </div>
          </div>
          <div className="section-cta reveal">
            <Link className="btn btn-ghost" to="/services">
              进入服务页
            </Link>
          </div>
        </div>
        <div className="home-panel lift reveal">
          <p className="eyebrow">Service Focus</p>
          <h3>一张表看清全程节奏</h3>
          <div className="home-panel-grid">
            <div>
              <span className="stat-value">3</span>
              <span className="stat-label">核心模块</span>
            </div>
            <div>
              <span className="stat-value">12</span>
              <span className="stat-label">关键节点</span>
            </div>
            <div>
              <span className="stat-value">1:1</span>
              <span className="stat-label">深度定制</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section alt home-method">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow reveal">Methodology</p>
          <h2 className="reveal">择校规划决策体系与文书“方程式”</h2>
          <p className="section-desc reveal">通过能力矩阵与目标拆解，建立可量化的路径与高质量表达体系。</p>
        </div>
        <div className="home-timeline">
          <div className="timeline-step lift reveal">
            <span className="tag">01</span>
            <h3>深挖咨询，精准定位</h3>
            <p>形成能力画像与匹配路径。</p>
          </div>
          <div className="timeline-step lift reveal">
            <span className="tag">02</span>
            <h3>个性化申请方案定制</h3>
            <p>建立可量化节奏与时间表。</p>
          </div>
          <div className="timeline-step lift reveal">
            <span className="tag">03</span>
            <h3>文书创作方程式</h3>
            <p>结构清晰、材料有据可依。</p>
          </div>
        </div>
        <div className="section-cta reveal">
          <Link className="btn btn-ghost" to="/method">
            进入方法论页
          </Link>
        </div>
      </div>
    </section>

    <section className="section home-team">
      <div className="container home-team-inner">
        <div className="section-head">
          <p className="eyebrow reveal">Team</p>
          <h2 className="reveal">来自顶尖院校的专家团队</h2>
          <p className="section-desc reveal">顾问、前招生官、行业专家协作，为学生定制最匹配的路径。</p>
        </div>
        <div className="home-team-grid">
          <div className="team-highlight lift reveal">
            <h3>资深顾问</h3>
            <p>多年北美申请经验，提供全流程策略与节奏掌控。</p>
          </div>
          <div className="team-highlight lift reveal">
            <h3>文书导师</h3>
            <p>精准表达能力与故事结构设计，突出个人优势。</p>
          </div>
          <div className="team-highlight lift reveal">
            <h3>语言与面试导师</h3>
            <p>语言能力提升与模拟面试，强化沟通与临场表现。</p>
          </div>
        </div>
        <div className="section-cta reveal">
          <Link className="btn btn-ghost" to="/team">
            进入团队页
          </Link>
        </div>
      </div>
    </section>

    <section className="section alt home-results">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow reveal">Results</p>
          <h2 className="reveal">申请结果与口碑持续沉淀</h2>
        </div>
        <div className="results-strip">
          <div className="result-card reveal">
            <div className="result-head">
              <span className="result-icon">
                <AcademicCapIcon className="icon-svg" aria-hidden="true" />
              </span>
              <p className="result-title">顶尖名校录取</p>
            </div>
            <p className="result-text">常春藤、牛剑、名校特色项目均有案例覆盖。</p>
          </div>
          <div className="result-card reveal">
            <div className="result-head">
              <span className="result-icon">
                <ClockIcon className="icon-svg" aria-hidden="true" />
              </span>
              <p className="result-title">高效服务流程</p>
            </div>
            <p className="result-text">节点清晰、信息透明，保证申请效率与质量。</p>
          </div>
          <div className="result-card reveal">
            <div className="result-head">
              <span className="result-icon">
                <AdjustmentsHorizontalIcon className="icon-svg" aria-hidden="true" />
              </span>
              <p className="result-title">定制化提升</p>
            </div>
            <p className="result-text">对学生独特优势深度挖掘，形成差异化表达。</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section home-milestone">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow reveal">Milestone</p>
          <h2 className="reveal">发展历程与关键成果</h2>
          <p className="section-desc reveal">从文书写作起步，沉淀案例方法，2024 成立团队并持续壮大。</p>
        </div>
        <div className="milestone-list">
          <div className="milestone-item lift reveal">
            <span className="tag">2019</span>
            <p>为国际学校学生提供文书撰写与申请表达支持，积累优秀录取案例。</p>
          </div>
          <div className="milestone-item lift reveal">
            <span className="tag">2020</span>
            <p>建立文书方法论与案例库，流程与素材实现系统化沉淀。</p>
          </div>
          <div className="milestone-item lift reveal">
            <span className="tag">2021</span>
            <p>服务扩展到多项目与多学段，覆盖美本、美研等申请方向。</p>
          </div>
          <div className="milestone-item lift reveal">
            <span className="tag">2022</span>
            <p>形成多对一协作与质控机制，保障节点可追踪、交付更稳定。</p>
          </div>
          <div className="milestone-item lift reveal">
            <span className="tag">2023</span>
            <p>完善全流程节奏与服务体系，持续提升口碑与复购率。</p>
          </div>
          <div className="milestone-item lift reveal">
            <span className="tag">2024</span>
            <p>正式成立美藤纳团队，聚焦北美申请并持续壮大。</p>
          </div>
          <div className="milestone-item lift reveal">
            <span className="tag">2025</span>
            <p>进驻全新办公室，收获多封常春藤院校录取。</p>
          </div>
          <div className="milestone-item lift reveal">
            <span className="tag">2026</span>
            <p>启用全新质量监控体系，升级规划全链路交付标准。</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section contact">
      <div className="container contact-inner">
        <div className="contact-text reveal">
          <h2>开启你的北美申请方案</h2>
          <p>与资深顾问沟通，获取个性化规划路径。</p>
        </div>
        <div className="contact-actions reveal">
          <Link className="btn btn-primary btn-pulse" to="/contact">
            预约咨询
          </Link>
          <Link className="btn btn-ghost" to="/services">
            查看服务
          </Link>
        </div>
      </div>
    </section>
  </main>
);

const ServicesPage = () => {
  const flowSteps = [
    "留学规划专家咨询",
    "个性方案定制",
    "考试规划及协助",
    "语言专项辅导",
    "申请专业定向",
    "职业测评及就业分析",
    "背景提升与实习规划",
    "选校方案确认",
    "文书讨论及定制写作",
    "文书定稿",
    "申请基础材料审核",
    "申请递交及跟进",
    "面试模拟与辅导",
    "签证协助",
    "体检及疫苗接种协助",
    "行前培训及生活适应协助",
    "海外学业及生活指导",
    "毕业归国留学学位认证指导"
  ];

  const timelineIconPaths = [
    "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 5v5.2l3.4 2-1 1.6L11 13V7Z",
    "M6 3h12a1 1 0 0 1 1 1v16l-7-3-7 3V4a1 1 0 0 1 1-1Z",
    "M4 4h16v12H5.5L4 17.5V4Zm4 4h8v2H8V8Zm0 4h5v2H8v-2Z",
    "M12 3 2 8l10 5 10-5-10-5Zm0 8.5L4 8l8-4 8 4-8 3.5Zm0 3.5 8-4v5l-8 4-8-4v-5l8 4Z"
  ];

  return (
    <main className="page-services">
    <section className="page-hero service-hero">
      <div className="container service-hero-inner">
        <div className="service-hero-copy">
          <p className="eyebrow reveal">Services</p>
          <h1 className="reveal">精细化的全流程服务模块</h1>
          <p className="lead reveal">以申请目标为核心，把每个关键节点拆成可执行、可量化的动作。</p>
          <div className="service-badges reveal">
            <span className="tag">定位</span>
            <span className="tag">文书</span>
            <span className="tag">面试</span>
            <span className="tag">签证</span>
          </div>
          <div className="hero-actions reveal">
            <Link className="btn btn-primary" to="/contact">
              获取专属方案
            </Link>
            <Link className="btn btn-ghost" to="/method">
              查看方法论
            </Link>
          </div>
        </div>
        <div className="service-hero-panel">
          <div className="service-tiles">
            <div className="service-tile lift reveal">
              <h3>择校定位</h3>
              <p>院校层级、专业匹配与录取概率评估。</p>
            </div>
            <div className="service-tile lift reveal">
              <h3>文书策略</h3>
              <p>故事线规划、素材盘点与结构搭建。</p>
            </div>
            <div className="service-tile lift reveal">
              <h3>面试训练</h3>
              <p>题库预演、表达节奏与反馈迭代。</p>
            </div>
            <div className="service-tile lift reveal">
              <h3>签证支持</h3>
              <p>材料清单、模拟问答与风险预案。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section service-modules">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow reveal">Services Modules</p>
          <h2 className="reveal">覆盖多层次升学路径</h2>
          <p className="section-desc reveal">美国本科、硕士与博士申请，匹配不同阶段的升学目标。</p>
        </div>
        <div className="module-grid">
          <div className="module-card lift reveal">
            <div className="module-card-head">
              <span className="module-icon" aria-hidden="true">
                <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M0 0h24v24H0z" stroke="none" />
                  <path d="M6.436 8a8.6 8.6 0 0 0 -.436 2.727c0 4.017 2.686 7.273 6 7.273s6 -3.256 6 -7.273a8.6 8.6 0 0 0 -.436 -2.727" />
                  <path d="M14.5 21s-.682 -3 -2.5 -3s-2.5 3 -2.5 3" />
                  <path d="M18.52 5.23c.292 1.666 -1.02 2.77 -1.02 2.77s-1.603 -.563 -1.895 -2.23c-.292 -1.666 1.02 -2.77 1.02 -2.77s1.603 .563 1.895 2.23" />
                  <path d="M5.48 5.23c-.292 1.666 1.02 2.77 1.02 2.77s1.603 -.563 1.895 -2.23c.292 -1.666 -1.02 -2.77 -1.02 -2.77s-1.603 .563 -1.895 2.23" />
                  <path d="M20.936 9c.113 1.72 -1.239 2.606 -1.239 2.606s-1.673 -.503 -1.786 -2.22c-.113 -1.72 1.239 -2.606 1.239 -2.606s1.673 .503 1.786 2.22" />
                  <path d="M3.064 9c-.113 1.72 1.239 2.606 1.239 2.606s1.673 -.503 1.786 -2.22c.113 -1.72 -1.239 -2.606 -1.239 -2.606s-1.673 .503 -1.786 2.22" />
                  <path d="M20.565 13.23c.292 1.666 -1.02 2.77 -1.02 2.77s-1.603 -.563 -1.895 -2.23c-.292 -1.666 1.02 -2.77 1.02 -2.77s1.603 .563 1.895 2.23" />
                  <path d="M3.435 13.23c-.292 1.666 1.02 2.77 1.02 2.77s1.603 -.563 1.895 -2.23c.292 -1.666 -1.02 -2.77 -1.02 -2.77s-1.603 .563 -1.895 2.23" />
                </svg>
              </span>
              <h3>美国本科申请</h3>
            </div>
            <p>学术准备、活动与申请节奏整体规划。</p>
          </div>
          <div className="module-card lift reveal">
            <div className="module-card-head">
              <span className="module-icon" aria-hidden="true">
                <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M0 0h24v24H0z" stroke="none" />
                  <path d="M6.436 8a8.6 8.6 0 0 0 -.436 2.727c0 4.017 2.686 7.273 6 7.273s6 -3.256 6 -7.273a8.6 8.6 0 0 0 -.436 -2.727" />
                  <path d="M14.5 21s-.682 -3 -2.5 -3s-2.5 3 -2.5 3" />
                  <path d="M18.52 5.23c.292 1.666 -1.02 2.77 -1.02 2.77s-1.603 -.563 -1.895 -2.23c-.292 -1.666 1.02 -2.77 1.02 -2.77s1.603 .563 1.895 2.23" />
                  <path d="M5.48 5.23c-.292 1.666 1.02 2.77 1.02 2.77s1.603 -.563 1.895 -2.23c.292 -1.666 -1.02 -2.77 -1.02 -2.77s-1.603 .563 -1.895 2.23" />
                  <path d="M20.936 9c.113 1.72 -1.239 2.606 -1.239 2.606s-1.673 -.503 -1.786 -2.22c-.113 -1.72 1.239 -2.606 1.239 -2.606s1.673 .503 1.786 2.22" />
                  <path d="M3.064 9c-.113 1.72 1.239 2.606 1.239 2.606s1.673 -.503 1.786 -2.22c.113 -1.72 -1.239 -2.606 -1.239 -2.606s-1.673 .503 -1.786 2.22" />
                  <path d="M20.565 13.23c.292 1.666 -1.02 2.77 -1.02 2.77s-1.603 -.563 -1.895 -2.23c-.292 -1.666 1.02 -2.77 1.02 -2.77s1.603 .563 1.895 2.23" />
                  <path d="M3.435 13.23c-.292 1.666 1.02 2.77 1.02 2.77s1.603 -.563 1.895 -2.23c.292 -1.666 -1.02 -2.77 -1.02 -2.77s-1.603 .563 -1.895 2.23" />
                </svg>
              </span>
              <h3>美国硕士申请</h3>
            </div>
            <p>专业定位与材料策略同步推进。</p>
          </div>
          <div className="module-card lift reveal">
            <div className="module-card-head">
              <span className="module-icon" aria-hidden="true">
                <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M0 0h24v24H0z" stroke="none" />
                  <path d="M6.436 8a8.6 8.6 0 0 0 -.436 2.727c0 4.017 2.686 7.273 6 7.273s6 -3.256 6 -7.273a8.6 8.6 0 0 0 -.436 -2.727" />
                  <path d="M14.5 21s-.682 -3 -2.5 -3s-2.5 3 -2.5 3" />
                  <path d="M18.52 5.23c.292 1.666 -1.02 2.77 -1.02 2.77s-1.603 -.563 -1.895 -2.23c-.292 -1.666 1.02 -2.77 1.02 -2.77s1.603 .563 1.895 2.23" />
                  <path d="M5.48 5.23c-.292 1.666 1.02 2.77 1.02 2.77s1.603 -.563 1.895 -2.23c.292 -1.666 -1.02 -2.77 -1.02 -2.77s-1.603 .563 -1.895 2.23" />
                  <path d="M20.936 9c.113 1.72 -1.239 2.606 -1.239 2.606s-1.673 -.503 -1.786 -2.22c-.113 -1.72 1.239 -2.606 1.239 -2.606s1.673 .503 1.786 2.22" />
                  <path d="M3.064 9c-.113 1.72 1.239 2.606 1.239 2.606s1.673 -.503 1.786 -2.22c.113 -1.72 -1.239 -2.606 -1.239 -2.606s-1.673 .503 -1.786 2.22" />
                  <path d="M20.565 13.23c.292 1.666 -1.02 2.77 -1.02 2.77s-1.603 -.563 -1.895 -2.23c-.292 -1.666 1.02 -2.77 1.02 -2.77s1.603 .563 1.895 2.23" />
                  <path d="M3.435 13.23c-.292 1.666 1.02 2.77 1.02 2.77s1.603 -.563 1.895 -2.23c.292 -1.666 -1.02 -2.77 -1.02 -2.77s-1.603 .563 -1.895 2.23" />
                </svg>
              </span>
              <h3>美国博士申请</h3>
            </div>
            <p>科研能力与导师匹配策略支持。</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section service-journey">
      <div className="container service-journey-inner">
        <div className="journey-list">
          <div className="section-head">
            <p className="eyebrow reveal">Modules</p>
            <h2 className="reveal">模块化服务路径</h2>
            <p className="section-desc reveal">申请协助、背景提升、面试签证协作并行。</p>
          </div>
          <div className="journey-item lift reveal">
            <span className="tag">01</span>
            <div>
              <h3>选校评估与申请材料体系</h3>
              <p>材料清单、文书框架与节奏管理同步推进。</p>
            </div>
          </div>
          <div className="journey-item lift reveal">
            <span className="tag">02</span>
            <div>
              <h3>实习科研与活动规划</h3>
              <p>匹配目标院校的能力证据与差异化亮点。</p>
            </div>
          </div>
          <div className="journey-item lift reveal">
            <span className="tag">03</span>
            <div>
              <h3>面试模拟与签证协助</h3>
              <p>情景演练与材料审校，稳住临场表现。</p>
            </div>
          </div>
        </div>
        <div className="journey-panel lift reveal">
          <p className="eyebrow">Service Map</p>
          <h3>多对一协作排期</h3>
          <p>规划导师、文书导师、面试导师与质控负责人并行协作，确保每周可追踪的进度。</p>
          <div className="journey-metrics">
            <div>
              <span className="stat-value">4</span>
              <span className="stat-label">角色协作</span>
            </div>
            <div>
              <span className="stat-value">12</span>
              <span className="stat-label">关键节点</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section service-roadmap">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow reveal">Flow</p>
          <h2 className="reveal">多对一团队协作流程</h2>
          <p className="section-desc reveal">让每一个角色在合适的时间点介入，保障节奏与质量。</p>
        </div>
        <div className="timeline-wrap reveal">
          <VerticalTimeline className="midner-timeline">
            {flowSteps.map((title, index) => {
              const iconPath = timelineIconPaths[index % timelineIconPaths.length];
              return (
                <VerticalTimelineElement
                  key={title}
                  contentStyle={timelineContentStyle}
                  contentArrowStyle={timelineArrowStyle}
                  iconStyle={timelineIconStyle}
                  date={`步骤 ${String(index + 1).padStart(2, "0")}`}
                  icon={
                    <span className="timeline-icon">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d={iconPath} />
                      </svg>
                    </span>
                  }
                >
                  <h3>{title}</h3>
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
        </div>
      </div>
    </section>

    <section className="section alt service-full">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow reveal">All - round Services</p>
          <h2 className="reveal">全流程服务，全层次提升</h2>
          <p className="section-desc reveal">
            针对留学申请中专业认知、学校选择、地域了解与升学规划的复杂挑战，提供一体化解决方案。
          </p>
        </div>
        <div className="service-lists">
          <div className="info-card lift reveal">
            <h3>留学申请协助</h3>
            <ul className="bullet-list">
              <li>选校评估</li>
              <li>申请材料清单</li>
              <li>文书写作</li>
              <li>材料准备</li>
              <li>面试辅导</li>
              <li>行前准备</li>
              <li>签证协助</li>
            </ul>
          </div>
          <div className="info-card lift reveal">
            <h3>背景提升与竞争力</h3>
            <ul className="bullet-list">
              <li>实习背景提升</li>
              <li>科研背景提升</li>
              <li>赛事资讯同步</li>
              <li>社会性活动背景提升</li>
              <li>语言能力专项辅导</li>
              <li>作品集定制</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

  </main>
  );
};

const MethodPage = () => (
  <main className="page-method">
    <section className="page-hero method-hero">
      <div className="container method-hero-inner">
        <div className="method-hero-copy">
          <p className="eyebrow reveal">Methodology</p>
          <h1 className="reveal">择校规划决策体系</h1>
          <p className="lead reveal">围绕多元院校生态与录取偏好，建立科学评估与定制策略，帮助学生做出最匹配的选择。</p>
          <div className="hero-actions reveal">
            <Link className="btn btn-primary" to="/contact">
              获取评估
            </Link>
            <Link className="btn btn-ghost" to="/services">
              查看服务
            </Link>
          </div>
        </div>
        <div className="method-rail">
          <div className="method-rail-card lift reveal">
            <span className="tag">01</span>
            <h3>收集画像</h3>
            <p>拆解学术、科研、活动与个人特质。</p>
          </div>
          <div className="method-rail-card lift reveal">
            <span className="tag">02</span>
            <h3>匹配路径</h3>
            <p>确定院校层级、专业方向与申请节奏。</p>
          </div>
          <div className="method-rail-card lift reveal">
            <span className="tag">03</span>
            <h3>故事表达</h3>
            <p>建立叙事结构与核心材料支撑。</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section method-matrix">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow reveal">Decision</p>
          <h2 className="reveal">能力矩阵拆解</h2>
          <p className="section-desc reveal">
            通过前期深挖咨询，围绕学术成绩、课程结构、院校背景、实习科研与性格亮点等维度形成画像，匹配最优路径。
          </p>
        </div>
        <div className="method-matrix-grid">
          <div className="matrix-card lift reveal">
            <h3>学术成绩</h3>
            <p>GPA 与标准化考试体现学术能力与潜力。</p>
          </div>
          <div className="matrix-card lift reveal">
            <h3>成绩单结构</h3>
            <p>关注课程匹配度与专业基础的呈现。</p>
          </div>
          <div className="matrix-card lift reveal">
            <h3>院校背景</h3>
            <p>结合学校声誉与录取偏好制定策略。</p>
          </div>
          <div className="matrix-card lift reveal">
            <h3>实习经历</h3>
            <p>验证实践能力与职业潜力。</p>
          </div>
          <div className="matrix-card lift reveal">
            <h3>科研经历</h3>
            <p>支撑研究型项目申请的学术能力。</p>
          </div>
          <div className="matrix-card lift reveal">
            <h3>课外活动</h3>
            <p>体现批判思维与综合素养。</p>
          </div>
          <div className="matrix-card lift reveal">
            <h3>性格亮点</h3>
            <p>形成独特个人画像与适配度。</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section alt method-timeline">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow reveal">Timeline</p>
          <h2 className="reveal">申请时间轴</h2>
          <p className="section-desc reveal">以阶段化节奏推进，确保每个节点可追踪。</p>
        </div>
        <div className="path-timeline">
          <div className="path-node lift reveal">
            <div className="icon-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 5v5.2l3.4 2-1 1.6L11 13V7Z" />
              </svg>
            </div>
            <div>
              <h3>前期规划</h3>
              <p>能力画像、目标范围与资源盘点。</p>
            </div>
          </div>
          <div className="path-node lift reveal">
            <div className="icon-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 5h16v3H4V5Zm0 5h10v3H4v-3Zm0 5h16v3H4v-3Z" />
              </svg>
            </div>
            <div>
              <h3>材料准备</h3>
              <p>清单整理、文书框架与故事线打磨。</p>
            </div>
          </div>
          <div className="path-node lift reveal">
            <div className="icon-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3 3 7v10l9 4 9-4V7l-9-4Zm0 2.2 6.5 2.9L12 11 5.5 8.1 12 5.2ZM5 10.4l6 2.7v6.4l-6-2.7v-6.4Zm14 6.4-6 2.7v-6.4l6-2.7v6.4Z" />
              </svg>
            </div>
            <div>
              <h3>递交反馈</h3>
              <p>投递、面试准备与录取跟进。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section method-challenges">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow reveal">Challenges</p>
          <h2 className="reveal">文书难点聚焦</h2>
          <p className="section-desc reveal">围绕真实表达与高标准语言要求，系统化拆解文书痛点。</p>
        </div>
        <div className="challenge-grid">
          <div className="info-card lift reveal">
            <h3>语言标准挑战</h3>
            <p>避免中式表达，确保语法与措辞精准地道。</p>
          </div>
          <div className="info-card lift reveal">
            <h3>真实故事缺失</h3>
            <p>建立连贯叙事，避免套话与素材空洞。</p>
          </div>
          <div className="info-card lift reveal">
            <h3>细节与情感不足</h3>
            <p>强化细节描绘与情感共鸣的张力。</p>
          </div>
          <div className="info-card lift reveal">
            <h3>真实与亮点平衡</h3>
            <p>在真实基础上适度呈现优势与成就。</p>
          </div>
          <div className="info-card lift reveal">
            <h3>题目回应偏差</h3>
            <p>确保逻辑清晰、回应精准、结构完整。</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section alt method-formula">
      <div className="container method-formula-inner">
        <div className="section-head">
          <p className="eyebrow reveal">Formula</p>
          <h2 className="reveal">文书创作方程式</h2>
          <p className="section-desc reveal">围绕故事、情感、语言、结构与材料支撑五大关键因子构建高竞争力文书。</p>
        </div>
        <div className="steps">
          <div className="step lift reveal">
            <div className="step-index">01</div>
            <div>
              <h3>故事线设计</h3>
              <p>挖掘独特经历，构建引人入胜的叙事主线。</p>
            </div>
          </div>
          <div className="step lift reveal">
            <div className="step-index">02</div>
            <div>
              <h3>情感动机表达</h3>
              <p>以真实情感建立共鸣，强化个人动机。</p>
            </div>
          </div>
          <div className="step lift reveal">
            <div className="step-index">03</div>
            <div>
              <h3>语言流畅度</h3>
              <p>确保表达清晰、逻辑连贯、措辞准确。</p>
            </div>
          </div>
          <div className="step lift reveal">
            <div className="step-index">04</div>
            <div>
              <h3>结构清晰</h3>
              <p>构建明确开头、发展与结尾的节奏。</p>
            </div>
          </div>
          <div className="step lift reveal">
            <div className="step-index">05</div>
            <div>
              <h3>材料支撑</h3>
              <p>用有力证据支撑观点，增强可信度。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section method-pyramid">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow reveal">Pyramid</p>
          <h2 className="reveal">申请能力塔</h2>
          <p className="section-desc reveal">从基础能力到高阶表达逐层递进，形成完整竞争力。</p>
        </div>
        <div className="pyramid">
          <div className="pyramid-tier lift reveal">
            <div className="icon-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2 2 7l10 5 10-5-10-5Zm0 7.5L4 7l8-4 8 4-8 2.5Z" />
              </svg>
            </div>
            <div>
              <h3>基础学术</h3>
              <p>成绩、课程结构与专业基础。</p>
            </div>
          </div>
          <div className="pyramid-tier lift reveal">
            <div className="icon-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 4h18v4H3V4Zm0 6h12v4H3v-4Zm0 6h18v4H3v-4Z" />
              </svg>
            </div>
            <div>
              <h3>实践经历</h3>
              <p>实习、科研与项目成果支撑。</p>
            </div>
          </div>
          <div className="pyramid-tier lift reveal">
            <div className="icon-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 4h12v2H6V4Zm-2 4h16v12H4V8Zm4 3v6h2v-6H8Zm6 0v6h2v-6h-2Z" />
              </svg>
            </div>
            <div>
              <h3>个性画像</h3>
              <p>领导力、价值观与成长轨迹。</p>
            </div>
          </div>
          <div className="pyramid-tier lift reveal">
            <div className="icon-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2 1 7l11 5 9-4.1V17h2V7L12 2Zm-4 9.5V20l8-4v-8.5l-8 4Z" />
              </svg>
            </div>
            <div>
              <h3>高阶表达</h3>
              <p>文书叙事与面试呈现的闭环表达。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
);

const TeamPage = () => (
  <main className="page-team">
    <section className="page-hero team-hero">
      <div className="container team-hero-inner">
        <div className="team-hero-copy">
          <p className="eyebrow reveal">Team</p>
          <h1 className="reveal">多对一专家协作团队</h1>
          <p className="lead reveal">资深顾问、前招生官与行业专家协作，确保申请方案落地与节奏可控。</p>
          <div className="hero-actions reveal">
            <Link className="btn btn-primary" to="/contact">
              预约咨询
            </Link>
            <Link className="btn btn-ghost" to="/services">
              查看服务
            </Link>
          </div>
        </div>
        <div className="team-hero-panel">
          <div className="team-pill lift reveal">
            <span>规划顾问</span>
            <strong>规划与定位</strong>
          </div>
          <div className="team-pill lift reveal">
            <span>文书导师</span>
            <strong>材料与表达</strong>
          </div>
          <div className="team-pill lift reveal">
            <span>面试导师</span>
            <strong>模拟与复盘</strong>
          </div>
          <div className="team-pill lift reveal">
            <span>语言辅导</span>
            <strong>能力提升</strong>
          </div>
          <div className="team-pill lift reveal">
            <span>质控监管</span>
            <strong>节点与风险</strong>
          </div>
        </div>
      </div>
    </section>

    <section className="section founder-section">
      <div className="container founder-split">
        <div className="section-head">
          <p className="eyebrow reveal">Founder</p>
          <h2 className="reveal">创始人介绍</h2>
          <p className="section-desc reveal">美藤纳创始人，负责北美地区业务发展与运行。</p>
        </div>
        <div className="founder-card lift reveal">
          <p>毕业于香港中文大学英文专业，2018年起深耕留学申请领域，拥有多年的行业经验与一线咨询实践。</p>
          <p>累计授课超5000小时，协助超千名学生获得哈佛、剑桥、清华、北大、港大等海内外顶尖学府录取。</p>
          <p>擅长根据学生综合情况量身定制提升计划，并具备大型导师团队运营与质量管理经验。</p>
        </div>
      </div>
    </section>

    <section className="section team-core">
      <div className="container team-core-inner">
        <div className="section-head">
          <p className="eyebrow reveal">Core</p>
          <h2 className="reveal">核心团队</h2>
          <p className="section-desc reveal">每一位顾问都具备北美地区真实申请与实战经验。</p>
        </div>
        <div className="team-role-grid">
          <div className="team-role-card lift reveal">
            <h3>规划顾问</h3>
            <p>个性化留学规划与选校策略，全程陪伴。</p>
            <span className="role-meta">策略与节奏</span>
          </div>
          <div className="team-role-card lift reveal">
            <h3>文书导师</h3>
            <p>挖掘独特经历，打造高质量文书。</p>
            <span className="role-meta">故事与材料</span>
          </div>
          <div className="team-role-card lift reveal">
            <h3>面试导师</h3>
            <p>模拟练习与面试策略，提升表现。</p>
            <span className="role-meta">表达与复盘</span>
          </div>
          <div className="team-role-card lift reveal">
            <h3>语言辅导导师</h3>
            <p>托福雅思等考试与日常表达训练。</p>
            <span className="role-meta">语言提升</span>
          </div>
          <div className="team-role-card lift reveal">
            <h3>质控监管</h3>
            <p>严格审核材料，保障流程高效专业。</p>
            <span className="role-meta">质量与风险</span>
          </div>
        </div>
      </div>
    </section>

    <section className="section alt team-route">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow reveal">Route</p>
          <h2 className="reveal">协作路线图</h2>
          <p className="section-desc reveal">多角色并行协作，每个环节由对应专家接力完成。</p>
        </div>
        <div className="route-map">
          <div className="route-step lift reveal">
            <div className="icon-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3 4 6v6c0 4.4 3.1 8.4 8 9 4.9-.6 8-4.6 8-9V6l-8-3Zm0 6a2 2 0 1 1-2 2 2 2 0 0 1 2-2Zm0 8a5 5 0 0 1-4.1-2.2 3.6 3.6 0 0 1 8.2 0A5 5 0 0 1 12 17Z" />
              </svg>
            </div>
            <div>
              <h3>顾问定位</h3>
              <p>确定申请层级与策略主线。</p>
            </div>
          </div>
          <div className="route-step lift reveal">
            <div className="icon-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 4h9l5 5v11H5V4Zm9 1.5V9h3.5L14 5.5ZM7 12h10v2H7v-2Zm0 4h10v2H7v-2Z" />
              </svg>
            </div>
            <div>
              <h3>文书协作</h3>
              <p>素材挖掘、结构设计与语言打磨。</p>
            </div>
          </div>
          <div className="route-step lift reveal">
            <div className="icon-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 3h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H7l-4 4V4a1 1 0 0 1 1-1Z" />
              </svg>
            </div>
            <div>
              <h3>面试强化</h3>
              <p>情景问题演练与表达节奏优化。</p>
            </div>
          </div>
          <div className="route-step lift reveal">
            <div className="icon-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3 2 8l10 5 10-5-10-5Zm0 8.5L4 8l8-4 8 4-8 3.5Zm0 3.5 8-4v5l-8 4-8-4v-5l8 4Z" />
              </svg>
            </div>
            <div>
              <h3>结果落地</h3>
              <p>节点复盘、风险预警与录取跟进。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section alt mentor-scope">
      <div className="container mentor-scope-inner">
        <div className="section-head">
          <p className="eyebrow reveal">Mentor Group</p>
          <h2 className="reveal">导师团服务范围</h2>
        </div>
        <div className="mentor-scope-list">
          <div className="mentor-scope-item lift reveal">
            <h3>具体专业择校</h3>
            <p>结合背景与专业需求匹配目标院校。</p>
          </div>
          <div className="mentor-scope-item lift reveal">
            <h3>语言提升辅导</h3>
            <p>托福、雅思与日常沟通强化。</p>
          </div>
          <div className="mentor-scope-item lift reveal">
            <h3>作品集制作</h3>
            <p>作品集结构与表达优化。</p>
          </div>
          <div className="mentor-scope-item lift reveal">
            <h3>生涯路线规划</h3>
            <p>从升学到职业目标的路径设计。</p>
          </div>
          <div className="mentor-scope-item lift reveal">
            <h3>面试辅导</h3>
            <p>常见问题演练与表达节奏优化。</p>
          </div>
          <div className="mentor-scope-item lift reveal">
            <h3>实习背景提升</h3>
            <p>匹配目标专业的实践项目与实习规划。</p>
          </div>
          <div className="mentor-scope-item lift reveal">
            <h3>导师推荐信</h3>
            <p>推荐信撰写与材料呈现策略支持。</p>
          </div>
          <div className="mentor-scope-item lift reveal">
            <h3>更多支持</h3>
            <p>个性化需求对接，持续补齐申请短板。</p>
          </div>
        </div>
      </div>
    </section>
  </main>
);

const ContactPage = () => (
  <main className="page-contact">
    <section className="page-hero contact-hero">
      <div className="container contact-hero-inner">
        <div className="contact-hero-copy">
          <p className="eyebrow reveal">Contact</p>
          <h1 className="reveal">开启你的专属申请方案</h1>
          <p className="lead reveal">多对一顾问团队将基于你的背景进行评估，24小时内反馈申请策略建议。</p>
          <div className="contact-channels reveal">
            <div>
              <span className="tag">电话</span>
              <p>13714184987</p>
            </div>
            <div>
              <span className="tag">邮箱</span>
              <p>info@midner.com</p>
            </div>
            <div>
              <span className="tag">咨询号</span>
              <p>微信公众号专属咨询号</p>
            </div>
          </div>
        </div>
        <div className="contact-hero-panel">
          <div className="contact-location lift reveal">
            <h3>深圳办公室</h3>
            <p>罗湖区鸿隆世纪广场 B座 23B室</p>
          </div>
          <div className="contact-location lift reveal">
            <h3>广州办公室</h3>
            <p>黄埔大道中 汇金国际金融中心 1617</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section contact-main">
      <div className="container contact-split">
        <div className="contact-form-panel lift reveal">
          <h2>预约表单</h2>
          <form className="contact-form">
            <label>
              姓名
              <input type="text" placeholder="请输入姓名" />
            </label>
            <label>
              联系方式
              <input type="text" placeholder="手机号或微信" />
            </label>
            <label>
              申请方向
              <input type="text" placeholder="美国本科 / 硕士 / 博士" />
            </label>
            <label>
              需求简述
              <textarea rows="4" placeholder="例如：目标院校、当前背景等"></textarea>
            </label>
            <button className="btn btn-primary" type="button">
              提交预约
            </button>
          </form>
        </div>
        <div className="contact-info-panel lift reveal">
          <h2>快速联系</h2>
          <div className="contact-info-list">
            <div>
              <span className="tag">电话</span>
              <p>13714184987</p>
              <p>13902445473</p>
            </div>
            <div>
              <span className="tag">邮箱</span>
              <p>info@midner.com</p>
            </div>
            <div>
              <span className="tag">响应</span>
              <p>24小时内反馈专业建议</p>
            </div>
          </div>
          <div className="contact-actions">
            <a className="btn btn-primary btn-pulse" href="tel:13714184987">
              立即致电
            </a>
            <a className="btn btn-ghost" href="mailto:info@midner.com">
              邮件咨询
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
);

const NotFound = () => (
  <main className="page-home">
    <section className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">404</p>
          <h2>页面不存在</h2>
          <p className="section-desc">请返回首页继续浏览。</p>
        </div>
        <Link className="btn btn-primary" to="/">
          返回首页
        </Link>
      </div>
    </section>
  </main>
);

const App = () => {
  const location = useLocation();
  const animationReady = useRef(false);

  useEffect(() => {
    const iconLink = document.querySelector("link[rel='icon']") || document.createElement("link");
    iconLink.rel = "icon";
    iconLink.href = logoUrl;
    iconLink.type = "image/png";
    if (!iconLink.parentNode) {
      document.head.appendChild(iconLink);
    }
    if (!animationReady.current) {
      floatOrbs();
      pulseCta();
      animationReady.current = true;
    }
    heroReveal();
    initScrollReveal();
    hoverLift();
    initExpandCards();
    initMagnetic();
  }, [location.pathname]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/method" element={<MethodPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
