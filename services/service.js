(() => {
  'use strict';

  /*
   * GENERIC SERVICE PAGE
   * ---------------------------------------------------------------
   * Create an individual SEO page by copying service.html and changing:
   *   <body data-service="website-development">
   *
   * All service-specific copy, deliverables, tools and FAQs live below.
   * CSS and JavaScript stay identical across every service page.
   */

  const CONFIG = {
    email: 'support@designandeploy.in',
    whatsapp: '917289974410',
    formEndpoint: '../send-enquiry.php'
  };

  const SERVICES = {
    'website-development': {
      nav: 'Website Design & Development',
      slug: 'website-design-development',
      title: 'Website Design & Development in Noida',
      shortTitle: 'Website Design & Development',
      description: 'Conversion-focused websites designed and developed around your brand, audience, content and business goals — from strategy and UI/UX through development, testing and launch.',
      note: 'Web design · Development · Deployment',
      detailsIntro: 'We handle the full website lifecycle, so strategy, design, development, SEO foundations and deployment work together rather than as disconnected pieces.',
      deliverables: [
        ['01','Website strategy','A clear structure before visual design begins.',['Business and audience goals','Sitemap and information architecture','Page and content planning','Conversion journey planning']],
        ['02','UI/UX design','Interfaces that feel distinctive while staying easy to use.',['Responsive page layouts','Wireframes and visual direction','Mobile-first interaction design','CTA and conversion placement']],
        ['03','Front-end development','Fast, responsive implementation using modern web technologies.',['HTML, CSS and JavaScript','Responsive breakpoints','Animations and interactions','Semantic, accessible markup']],
        ['04','CMS & integrations','Flexible content management and business functionality.',['WordPress / WooCommerce','Headless CMS when appropriate','Forms and enquiry flows','Third-party integrations']],
        ['05','SEO-ready build','Technical foundations that make the site easier to crawl and understand.',['Metadata and heading structure','Schema-ready architecture','XML sitemap support','Performance and image optimisation']],
        ['06','Testing & deployment','A controlled route from finished build to live website.',['Cross-browser testing','Mobile QA','Analytics and Search Console setup','Hosting, DNS and deployment support']]
      ],
      tools: [
        ['Figma','UI/UX & prototypes','figma','https://www.figma.com/'],
        ['HTML5','Semantic structure','html5','https://html.spec.whatwg.org/'],
        ['CSS3','Responsive styling','css','https://www.w3.org/Style/CSS/'],
        ['JavaScript','Interactions & functionality','javascript','https://developer.mozilla.org/en-US/docs/Web/JavaScript'],
        ['WordPress','CMS development','wordpress','https://wordpress.org/'],
        ['WooCommerce','E-commerce functionality','woocommerce','https://woocommerce.com/'],
        ['GitHub','Version control','github','https://github.com/'],
        ['Hostinger','Hosting & deployment','hostinger','https://www.hostinger.com/']
      ],
      faqs: [
        ['How much does website design and development cost?','Pricing depends on the number of pages, functionality, integrations, CMS requirements, design complexity and timeline. We scope the project first and then recommend an approach.'],
        ['Do you build websites for businesses in Noida?','Yes. Design & Deploy is based in Noida and works with businesses across Delhi-NCR, India and international clients.'],
        ['Can you redesign an existing website instead of building from scratch?','Yes. We can audit an existing site and redesign its structure, UI/UX, visual system and technical implementation where appropriate.'],
        ['Do you work with WordPress and WooCommerce?','Yes. We use WordPress and WooCommerce where they are a good fit, alongside custom front-end development and headless approaches when required.'],
        ['Will the website be mobile responsive?','Yes. Responsive behaviour is considered throughout design and development rather than added as a separate final step.']
      ]
    },

    'meta-ads': {
      nav:'Meta Ads Creative & Design', slug:'meta-ads-creative-design', title:'Meta Ads Creative & Design Services in Noida',
      shortTitle:'Meta Ads Creative & Design',
      description:'High-impact Meta ad creatives designed for attention, clarity and campaign consistency across Facebook and Instagram.',
      note:'Creative strategy · Ad design · Variations',
      detailsIntro:'From the first hook to the final CTA, we create ad creatives that fit your brand while giving campaigns enough variation to learn and scale.',
      deliverables:[
        ['01','Creative direction','A visual system built around your audience and campaign objective.',['Campaign visual direction','Creative hooks and concepts','Audience-aware messaging','Brand consistency']],
        ['02','Static ad creatives','Scroll-stopping static assets for Facebook and Instagram.',['Single-image ads','Offer creatives','Product / service creatives','Testable variations']],
        ['03','Carousel creatives','Multi-frame storytelling for products, services and offers.',['Card-by-card concepts','Sequence and hierarchy','CTA framing','Multiple versions']],
        ['04','Ad copy support','Clear copy structures that complement the visual.',['Primary text options','Headline variations','CTA language','Hook testing']],
        ['05','Creative resizing','Assets adapted for common placements.',['Feed formats','Story formats','Reels placements','Safe-area considerations']],
        ['06','Creative testing system','A repeatable set of variants rather than one-off designs.',['Hook variants','Visual variants','Offer variants','Performance-led iteration']]
      ],
      tools:[
        ['Figma','Creative layouts','figma','https://www.figma.com/'],['Adobe Photoshop','Image editing','adobephotoshop','https://www.adobe.com/products/photoshop.html'],['Adobe Illustrator','Vector graphics','adobeillustrator','https://www.adobe.com/products/illustrator.html'],['Meta Ads Manager','Campaign platform','meta','https://www.facebook.com/business/tools/ads-manager'],['Canva','Rapid creative production','canva','https://www.canva.com/']
      ],
      faqs:[
        ['Do you manage Meta ad campaigns?','This service is focused on creative and design. Campaign management can be scoped separately when required.'],
        ['Can you create multiple ad variations?','Yes. We can build structured variations around hooks, offers, layouts, imagery and CTAs so your campaigns have more creative options to test.'],
        ['Can you work from existing brand guidelines?','Yes. We can work within an existing identity or help establish a stronger visual direction for the campaign.']
      ]
    },

    'landing-pages': {
      nav:'Landing Page Design & Development', slug:'landing-page-design-development', title:'Landing Page Design & Development in Noida',
      shortTitle:'Landing Page Design & Development',
      description:'Purpose-built landing pages designed around one offer, one audience and one conversion goal.',
      note:'Strategy · Landing page UX · Development',
      detailsIntro:'Landing pages should remove friction, explain the offer quickly and make the next action obvious.',
      deliverables:[
        ['01','Conversion strategy','A focused page structure built around a single objective.',['Offer positioning','Audience intent','CTA strategy','Content hierarchy']],
        ['02','Landing page UI/UX','A visual experience designed for clarity and action.',['Hero and value proposition','Trust sections','Social proof','Objection handling']],
        ['03','Responsive development','Pixel-accurate implementation across screen sizes.',['Desktop layouts','Mobile-first behaviour','Micro-interactions','Fast-loading assets']],
        ['04','Forms & integrations','Lead capture connected to the right workflow.',['Enquiry forms','Email notifications','CRM handoff','Analytics events']],
        ['05','SEO foundations','Technical and content structure that supports discoverability.',['Metadata','Semantic headings','Structured content','Image optimisation']],
        ['06','Testing & optimisation','Launch with a clean baseline for iteration.',['Cross-device QA','CTA testing','Analytics setup','Post-launch improvements']]
      ],
      tools:[
        ['Figma','Page design','figma','https://www.figma.com/'],['HTML5','Structure','html5','https://html.spec.whatwg.org/'],['CSS3','Styling','css3','https://www.w3.org/Style/CSS/'],['JavaScript','Interactions','javascript','https://developer.mozilla.org/en-US/docs/Web/JavaScript'],['Google Analytics','Measurement','googleanalytics','https://analytics.google.com/'],['Google Search Console','Search performance','googlesearchconsole','https://search.google.com/search-console/']
      ],
      faqs:[
        ['What makes a landing page different from a normal website?','A landing page is usually built around one campaign, audience, offer and primary conversion action, with less distraction than a general website.'],
        ['Can you connect the form to my CRM?','Yes. CRM and lead-routing integrations can be included depending on the platform and workflow.'],
        ['Can you build landing pages for Meta or Google Ads?','Yes. We can design landing pages around the messaging and intent of paid campaigns.']
      ]
    },

    'uiux-design': {
      nav:'UI/UX Design', slug:'ui-ux-design', title:'UI/UX Design Services in Noida',
      shortTitle:'UI/UX Design', description:'User-focused interfaces, flows and design systems for websites, applications and digital products.',
      note:'Research · UX · Interface systems',
      detailsIntro:'We turn complex requirements into interfaces that are clear, usable and visually aligned with the brand.',
      deliverables:[
        ['01','UX strategy','Understand the user journey before polishing the interface.',['User flows','Information architecture','Task mapping','Content hierarchy']],
        ['02','Wireframing','Fast structural exploration before visual detail.',['Low-fidelity wireframes','Page states','Responsive planning','Interaction mapping']],
        ['03','UI design','A distinctive visual system with practical components.',['High-fidelity screens','Typography','Colour systems','Component patterns']],
        ['04','Design systems','Reusable rules that keep the product consistent.',['Components','Variants and states','Spacing system','Usage guidance']],
        ['05','Prototyping','Clickable experiences for review and validation.',['Interactive prototypes','Transitions','User-flow demonstrations','Developer handoff']],
        ['06','Developer handoff','Design files prepared for efficient implementation.',['Specs and assets','Responsive behaviour','Component notes','Handoff support']]
      ],
      tools:[
        ['Figma','Primary design tool','figma','https://www.figma.com/'],['FigJam','Flows & workshops','figma','https://www.figma.com/figjam/'],['Adobe Photoshop','Image work','adobephotoshop','https://www.adobe.com/products/photoshop.html'],['Adobe Illustrator','Vector work','adobeillustrator','https://www.adobe.com/products/illustrator.html']
      ],
      faqs:[
        ['Do you design both websites and apps?','Yes. The same UX and interface principles can be applied to websites, dashboards, SaaS products and applications.'],
        ['Do you provide a design system?','Yes. For projects that need scale or ongoing development, reusable components and design rules can be included.'],
        ['Can you redesign an existing interface?','Yes. We can audit the current experience, identify friction and redesign the relevant flows and screens.']
      ]
    },

    'branding': {
      nav:'Branding & Graphic Design', slug:'branding-graphic-design', title:'Branding & Graphic Design Studio in Noida',
      shortTitle:'Branding & Graphic Design', description:'Brand identities and graphic systems that give businesses a consistent, recognisable visual presence.',
      note:'Identity · Brand systems · Creative',
      detailsIntro:'From the logo to everyday marketing assets, we build visual systems that can actually be used consistently.',
      deliverables:[
        ['01','Brand strategy','Define the visual and verbal direction before execution.',['Positioning inputs','Audience considerations','Creative direction','Brand personality']],
        ['02','Logo design','A flexible identity mark designed for real-world use.',['Primary logo','Secondary marks','Monogram / icon','Light and dark versions']],
        ['03','Visual identity','The wider system around the logo.',['Colour palette','Typography','Graphic elements','Image direction']],
        ['04','Brand guidelines','Practical rules for consistent implementation.',['Logo usage','Colour rules','Typography','Layout guidance']],
        ['05','Marketing creatives','Ready-to-use assets for day-to-day communication.',['Social media creatives','Ad creatives','Presentations','Promotional graphics']],
        ['06','Digital brand assets','A consistent identity across digital touchpoints.',['Website assets','Social profile assets','Templates','Export-ready files']]
      ],
      tools:[
        ['Adobe Illustrator','Logo & vectors','adobeillustrator','https://www.adobe.com/products/illustrator.html'],['Adobe Photoshop','Image editing','adobephotoshop','https://www.adobe.com/products/photoshop.html'],['Figma','Digital brand systems','figma','https://www.figma.com/'],['Canva','Editable templates','canva','https://www.canva.com/']
      ],
      faqs:[
        ['Do you create complete brand identities?','Yes. Branding can include the logo, colour, typography, graphic language, guidelines and supporting marketing assets.'],
        ['Can you refresh an existing logo instead of replacing it?','Yes. We can refine or evolve an existing identity when continuity is more valuable than a complete change.'],
        ['Do you provide editable source files?','Yes. Final deliverables and editable files can be included according to the project scope.']
      ]
    },

    'ecommerce': {
      nav:'E-Commerce Development', slug:'ecommerce-development', title:'E-Commerce Website Development in Noida',
      shortTitle:'E-Commerce Development', description:'E-commerce experiences built for product discovery, trust, checkout and scalable content management.',
      note:'Storefront · Commerce · Integrations',
      detailsIntro:'We combine storefront design, commerce functionality and technical implementation to create online stores that are easy to manage and easy to buy from.',
      deliverables:[
        ['01','Store strategy','Structure the store around products and customer intent.',['Category planning','Product architecture','Navigation','Conversion paths']],
        ['02','Storefront design','A branded shopping experience rather than a generic template.',['Homepage','Category pages','Product pages','Cart and checkout UX']],
        ['03','Commerce development','Build the core shopping functionality.',['WooCommerce setup','Product configuration','Cart and checkout','Order flows']],
        ['04','Payments & integrations','Connect the store to essential business services.',['Payment gateways','Shipping integrations','Email flows','Third-party services']],
        ['05','Performance & SEO','Build foundations for discoverability and speed.',['Structured data','Metadata','Image optimisation','Technical SEO']],
        ['06','Testing & launch','Validate the buying journey before launch.',['Checkout testing','Responsive QA','Browser testing','Deployment support']]
      ],
      tools:[
        ['WordPress','CMS','wordpress','https://wordpress.org/'],['WooCommerce','Commerce engine','woocommerce','https://woocommerce.com/'],['Razorpay','Payments','razorpay','https://razorpay.com/'],['Figma','Storefront UI','figma','https://www.figma.com/'],['GitHub','Version control','github','https://github.com/'],['Hostinger','Hosting','hostinger','https://www.hostinger.com/']
      ],
      faqs:[
        ['Can you build a WooCommerce store from scratch?','Yes. We can handle storefront design, WooCommerce configuration, product pages, cart, checkout and required integrations.'],
        ['Can you integrate Razorpay?','Yes. Payment gateway integration can be included where the chosen platform and account setup support it.'],
        ['Can you improve an existing online store?','Yes. We can redesign the storefront, simplify checkout and improve technical or SEO foundations.']
      ]
    },

    'crm-development': {
      nav:'CRM Development & Automation', slug:'crm-development-automation', title:'CRM Development & Automation Services in Noida',
      shortTitle:'CRM Development & Automation', description:'Custom CRM workflows and business automation designed around how your team actually handles leads, customers and operations.',
      note:'CRM · Automation · Integrations',
      detailsIntro:'We map the workflow first, then build the screens, data structures and automations that remove repetitive work.',
      deliverables:[
        ['01','Workflow mapping','Understand how information moves through the business.',['Lead lifecycle','Team responsibilities','Data requirements','Bottleneck mapping']],
        ['02','CRM architecture','Structure records and relationships for practical use.',['Lead records','Customer records','Pipeline stages','Custom fields']],
        ['03','CRM interface','Simple interfaces that teams can actually adopt.',['Dashboards','Forms','Pipeline views','Role-based screens']],
        ['04','Automation','Reduce repetitive manual work.',['Notifications','Lead assignment','Follow-ups','Status automation']],
        ['05','Integrations','Connect the CRM with the tools already in use.',['Website forms','Email','APIs','Third-party platforms']],
        ['06','Reporting & support','Make the system useful after launch.',['Reports','Performance views','Documentation','Ongoing improvements']]
      ],
      tools:[
        ['JavaScript','Custom logic','javascript','https://developer.mozilla.org/en-US/docs/Web/JavaScript'],['Next.js','Web applications','nextjs','https://nextjs.org/'],['WordPress','Content / forms','wordpress','https://wordpress.org/'],['GitHub','Version control','github','https://github.com/'],['Hostinger','Deployment','hostinger','https://www.hostinger.com/']
      ],
      faqs:[
        ['Can you build a CRM specifically for our workflow?','Yes. Custom CRM work starts with your process and data requirements rather than forcing your business into an unrelated template.'],
        ['Can the CRM connect to our website?','Yes. Website forms and other systems can be connected through APIs or suitable integrations.'],
        ['Do you provide ongoing improvements?','Yes. CRM projects can be extended after launch as your workflow and reporting requirements evolve.']
      ]
    },

    'website-redesign': {
      nav:'Website Redesign', slug:'website-redesign', title:'Website Redesign Services in Noida',
      shortTitle:'Website Redesign', description:'Strategic website redesigns that improve visual quality, usability, structure, performance and conversion without losing what already works.',
      note:'Audit · Redesign · Rebuild',
      detailsIntro:'A redesign should solve business and user problems, not just make the existing website look newer.',
      deliverables:[
        ['01','Website audit','Identify what should stay, change or be removed.',['UX review','Content review','SEO sanity check','Technical observations']],
        ['02','Information architecture','Restructure pages around user intent.',['Navigation','Sitemap','Page hierarchy','Content grouping']],
        ['03','Visual redesign','Bring the brand and interface up to a stronger standard.',['Typography','Colour system','Layouts','Responsive design']],
        ['04','Front-end rebuild','Implement the new experience cleanly.',['Semantic HTML','CSS','JavaScript','Responsive behaviour']],
        ['05','Performance & SEO','Improve the technical foundations alongside the redesign.',['Core Web Vitals focus','Metadata','Image optimisation','Internal linking']],
        ['06','Migration & launch','Move to the new experience without unnecessary disruption.',['Content migration','Redirect planning','QA','Deployment']]
      ],
      tools:[
        ['Figma','Redesign concepts','figma','https://www.figma.com/'],['HTML5','Structure','html5','https://html.spec.whatwg.org/'],['CSS3','Styling','css3','https://www.w3.org/Style/CSS/'],['JavaScript','Interactions','javascript','https://developer.mozilla.org/en-US/docs/Web/JavaScript'],['Google Search Console','SEO monitoring','googlesearchconsole','https://search.google.com/search-console/'],['Google Analytics','Analytics','googleanalytics','https://analytics.google.com/']
      ],
      faqs:[
        ['Will a redesign affect our SEO?','It can if handled poorly. We plan the redesign with URLs, metadata, internal linking, redirects and crawlability in mind.'],
        ['Can you redesign only selected pages?','Yes. A phased redesign can target the pages that have the biggest business or usability impact first.'],
        ['Can you work with our existing CMS?','Yes. We can redesign within the current stack where it makes sense or recommend a better implementation when necessary.']
      ]
    },

    'seo': {
      nav:'SEO Optimisation Services', slug:'seo-optimisation', title:'SEO Optimisation Services in Noida',
      shortTitle:'SEO Optimisation Services', description:'Technical and on-page SEO improvements designed to make your website easier to crawl, understand and rank for relevant searches.',
      note:'Technical SEO · On-page SEO · Search visibility',
      detailsIntro:'SEO is not one metadata field. We improve the technical, structural and content signals that help search engines understand your business and pages.',
      deliverables:[
        ['01','Technical SEO audit','Find crawl, indexing and performance issues.',['Indexing checks','Robots.txt review','XML sitemap','Canonical review']],
        ['02','On-page SEO','Align important pages with search intent.',['Title tags','Meta descriptions','H1/H2 structure','Internal linking']],
        ['03','Content optimisation','Build useful, original content around relevant queries.',['Keyword mapping','Service-page content','FAQ content','Search-intent alignment']],
        ['04','Structured data','Help search engines interpret page entities and content.',['Organization schema','Service schema','FAQ schema','Breadcrumb schema']],
        ['05','Performance','Improve the technical experience behind the page.',['Image optimisation','JavaScript review','Core Web Vitals focus','Mobile performance']],
        ['06','Search monitoring','Measure what happens after implementation.',['Search Console','Analytics','Index coverage','Query monitoring']]
      ],
      tools:[
        ['Google Search Console','Search visibility','googlesearchconsole','https://search.google.com/search-console/'],['Google Analytics','Traffic analytics','googleanalytics','https://analytics.google.com/'],['Google Lighthouse','Performance audit','lighthouse','https://developer.chrome.com/docs/lighthouse/'],['PageSpeed Insights','Core Web Vitals','pagespeed','https://pagespeed.web.dev/'],['GitHub','Code changes','github','https://github.com/']
      ],
      faqs:[
        ['How long does SEO take?','SEO improvements can produce different results depending on competition, site history, content quality and the changes implemented. We focus first on measurable technical and on-page improvements.'],
        ['Do you fix Search Console indexing issues?','Yes. Indexing and crawlability are part of technical SEO work where the underlying cause can be identified and addressed.'],
        ['Do you create SEO content?','Yes. We can create or optimise service-page and supporting content around relevant search intent.'],
        ['Can you optimise an existing website without rebuilding it?','Yes. Many technical and on-page SEO improvements can be made without a full redesign.']
      ]
    },

    'deployment-optimization': {
      nav:'Deployment & Optimization', slug:'deployment-optimization', title:'Website Deployment & Performance Optimisation in Noida',
      shortTitle:'Deployment & Optimization', description:'Reliable website deployment, hosting setup and performance optimisation for websites that are ready to go live.',
      note:'Deployment · Performance · Reliability',
      detailsIntro:'We take the finished build through the final technical steps needed to make it live, stable and easier to maintain.',
      deliverables:[
        ['01','Hosting setup','Prepare the hosting environment for the project.',['Hosting configuration','File structure','Environment setup','Domain connection']],
        ['02','DNS & SSL','Get the essential domain and security configuration right.',['DNS records','SSL setup','HTTPS checks','Redirect configuration']],
        ['03','Deployment','Move the project from development to production.',['Production upload','Build configuration','Environment variables','Launch checks']],
        ['04','Performance optimisation','Remove avoidable technical weight.',['Image compression','Asset optimisation','Caching review','Script loading']],
        ['05','Analytics & tracking','Make the live site measurable.',['Google Analytics','Search Console','Conversion tracking','Event setup']],
        ['06','Post-launch QA','Check the site after the real deployment.',['Forms','Mobile behaviour','Links','404s and redirects']]
      ],
      tools:[
        ['Hostinger','Hosting','hostinger','https://www.hostinger.com/'],['GitHub','Code repository','github','https://github.com/'],['Google Analytics','Analytics','googleanalytics','https://analytics.google.com/'],['Google Search Console','Search monitoring','googlesearchconsole','https://search.google.com/search-console/'],['PageSpeed Insights','Performance','pagespeedinsights','https://pagespeed.web.dev/']
      ],
      faqs:[
        ['Can you deploy a website built by someone else?','Yes. We can review the project, understand the stack and deploy it where the hosting environment supports it.'],
        ['Can you fix slow website performance?','We can identify common sources of front-end and asset-related performance issues and implement practical improvements.'],
        ['Do you provide post-launch support?','Yes. Support and maintenance can be scoped after launch depending on what the project requires.']
      ]
    }
  };

  const SERVICES_LIST = Object.entries(SERVICES).map(([key,s]) => ({key, name:s.nav}));
  const key = document.body.dataset.service || 'website-development';
  const service = SERVICES[key] || SERVICES['website-development'];
  const $ = (s,r=document) => r.querySelector(s);
  const $$ = (s,r=document) => [...r.querySelectorAll(s)];

  // ---------- SEO metadata ----------
// SEO title, description and Open Graph metadata are defined statically
// in each individual service page's <head>.

// Keep canonical aligned with the actual page URL.
const canonical = $('link[rel="canonical"]');
if (canonical) {
  canonical.href = new URL(location.pathname, location.origin).href;
}
  // ---------- Hero ----------
  $('#hero-title').textContent = service.title;
  $('#hero-sub').textContent = service.description;
  $('#hero-note').textContent = service.note;
  $('#details-intro').textContent = service.detailsIntro;
  $('#book-intro').textContent = `Tell us what you are trying to achieve with ${service.shortTitle.toLowerCase()}. We’ll review the requirement and come back with a practical next step.`;
  $('#form-service').value = service.nav;

  // ---------- Header / footer service menus ----------
  const serviceLinks = SERVICES_LIST.map(s =>
    `<a href="${s.key === key ? '#top' : `../services/${s.key}.html`}" ${s.key === key ? 'aria-current="page"' : ''}>${s.name}</a>`
  ).join('');
  $('#services-list').innerHTML = serviceLinks;

  $('#footer-services').innerHTML = SERVICES_LIST.slice(0,5).map(s =>
    `<li><a href="../services/${s.key}.html">${s.name}</a></li>`
  ).join('');

  // ---------- Deliverables ----------
  $('#deliverables').innerHTML = service.deliverables.map(([num,title,desc,items]) => `
    <article class="deliverable">
      <div class="deliverable__num">${num}</div>
      <div><h3>${title}</h3><p>${desc}</p></div>
      <ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>
    </article>
  `).join('');

  // ---------- Tools carousel ----------
  const toolTrack = $('#tools-track');
  toolTrack.innerHTML = service.tools.map(([name,desc,icon,url]) => `
    <a class="tool" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${name} official website">
      <img
  class="tool__logo"
  src="https://cdn.simpleicons.org/${icon}"
  alt="${name} logo"
  loading="lazy"
  onerror="this.style.display='none'"
>
      <div><h3>${name}</h3><p>${desc}</p></div>
    </a>
  `).join('');

  let toolIndex = 0;
  const visibleCount = () => window.innerWidth <= 600 ? 1 : window.innerWidth <= 960 ? 2 : 4;
  const maxToolIndex = () => Math.max(0, service.tools.length - visibleCount());
  const renderTools = () => {
    toolIndex = Math.min(toolIndex, maxToolIndex());
    const card = toolTrack.querySelector('.tool');
    const gap = 16;
    const width = card ? card.getBoundingClientRect().width + gap : 0;
    toolTrack.style.transform = `translate3d(${-toolIndex * width}px,0,0)`;
    $('#tools-count').textContent = `${String(Math.min(toolIndex+1,service.tools.length)).padStart(2,'0')} / ${String(service.tools.length).padStart(2,'0')}`;
  };
  $('#tools-prev').addEventListener('click', () => { toolIndex = Math.max(0, toolIndex-1); renderTools(); });
  $('#tools-next').addEventListener('click', () => { toolIndex = Math.min(maxToolIndex(), toolIndex+1); renderTools(); });
  window.addEventListener('resize', renderTools);
  renderTools();

  // ---------- FAQs + FAQ schema ----------
  $('#faq-list').innerHTML = service.faqs.map(([q,a]) =>
    `<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`
  ).join('');

  const faqSchema = {
    '@context':'https://schema.org',
    '@graph':[
      {
        '@type':'Service',
        '@id':`${location.origin}${location.pathname}#service`,
        'name':service.title,
        'provider':{'@type':'Organization','name':'Design & Deploy','url':'https://designandeploy.in/'},
        'areaServed':['Noida','Delhi-NCR','India'],
        'description':service.description,
        'url':`${location.origin}${location.pathname}`
      },
      {
        '@type':'FAQPage',
        'mainEntity':service.faqs.map(([q,a]) => ({
          '@type':'Question','name':q,'acceptedAnswer':{'@type':'Answer','text':a}
        }))
      }
    ]
  };
  const schema = document.createElement('script');
  schema.type = 'application/ld+json';
  schema.textContent = JSON.stringify(faqSchema);
  document.head.appendChild(schema);

  // ---------- Shared header behaviour ----------
  const menuItem = $('#services-menu');
  const menuBtn = $('.nav__btn', menuItem);
  const setMenu = open => {
    menuItem.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  };
  menuBtn.addEventListener('click', () => setMenu(!menuItem.classList.contains('is-open')));

  const burger = $('.burger'), mnav = $('#mobile-nav');
  function toggleMobile(force) {
    const open = typeof force === 'boolean' ? force : !mnav.classList.contains('is-open');
    mnav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  burger.addEventListener('click', () => toggleMobile());
  $$('a',mnav).forEach(a => a.addEventListener('click', () => toggleMobile(false)));
  document.addEventListener('click', e => { if (!menuItem.contains(e.target)) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { setMenu(false); toggleMobile(false); } });

  // ---------- WhatsApp ----------
  const waURL = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(`Hi Design & Deploy, I'd like to enquire about ${service.nav}.`)}`;
  $$('[data-whatsapp]').forEach(a => { a.href = waURL; a.target='_blank'; a.rel='noopener noreferrer'; });

  // ---------- Enquiry form ----------
  async function sendEnquiry(form,status){
    const data = Object.fromEntries(new FormData(form));
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true; status.textContent='Sending…';
    try{
      const res = await fetch(CONFIG.formEndpoint,{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data),cache:'no-store'
      });
      const body = await res.json().catch(()=>null);
      if(res.ok && body && body.ok === true){
        status.textContent='Enquiry sent. We will be in touch soon.';
        form.reset(); $('#form-service').value=service.nav; return;
      }
      if(body && body.message){ status.textContent=body.message; return; }
      throw new Error('Form endpoint did not return a successful response.');
    }catch(err){
      const subject=encodeURIComponent(`New service enquiry: ${service.nav}`);
      const body=encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\nCompany / Brand: ${data.company || '-'}\nService: ${service.nav}\nTimeline: ${data.timeline || '-'}\nBudget: ${data.budget || '-'}\n\n${data.message}`
      );
      status.textContent='Opening your email app as a fallback…';
      location.href=`mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
    }finally{btn.disabled=false}
  }
  $('#service-form').addEventListener('submit',e=>{e.preventDefault();sendEnquiry(e.target,$('#form-status'))});
  $('#year').textContent = new Date().getFullYear();
})();
