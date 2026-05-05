import { useState } from "react";
import Icon from "@/components/ui/icon";
import ArticlePage from "@/components/ArticlePage";
import CoursePage from "@/components/CoursePage";

const NAV_LINKS = ["Главная", "Обучение", "Статьи"];

const COURSES = [
  {
    tag: "Python",
    tagColor: "#4ade80",
    title: "Python с нуля до Pro",
    desc: "От переменных до async/await. Практика на реальных задачах.",
    lessons: 48,
    hours: 24,
    level: "Новичок",
    gradient: "from-[#4ade80]/10 to-[#22d3ee]/5",
    border: "border-[#4ade80]/20",
  },
  {
    tag: "JavaScript",
    tagColor: "#fbbf24",
    title: "Современный JS / TS",
    desc: "ES2024, TypeScript, паттерны. Готовься к работе в продакшне.",
    lessons: 62,
    hours: 31,
    level: "Средний",
    gradient: "from-[#fbbf24]/10 to-[#f472b6]/5",
    border: "border-[#fbbf24]/20",
  },
  {
    tag: "React",
    tagColor: "#22d3ee",
    title: "React + экосистема",
    desc: "Hooks, Context, React Query, анимации. Строим реальные SPA.",
    lessons: 55,
    hours: 28,
    level: "Средний",
    gradient: "from-[#22d3ee]/10 to-[#a855f7]/5",
    border: "border-[#22d3ee]/20",
  },
  {
    tag: "Алгоритмы",
    tagColor: "#f472b6",
    title: "Алгоритмы и структуры данных",
    desc: "LeetCode-задачи, системный дизайн, подготовка к собесам.",
    lessons: 40,
    hours: 20,
    level: "Продвинутый",
    gradient: "from-[#f472b6]/10 to-[#a855f7]/5",
    border: "border-[#f472b6]/20",
  },
];

const ARTICLES = [
  {
    category: "JavaScript",
    categoryColor: "#fbbf24",
    title: "Замыкания в JS: раз и навсегда",
    desc: "Разбираем одну из самых сложных тем на конкретных примерах кода.",
    readTime: "8 мин",
    date: "2 мая",
  },
  {
    category: "Python",
    categoryColor: "#4ade80",
    title: "Асинхронный Python: asyncio в деталях",
    desc: "Корутины, event loop, задачи — всё что нужно знать о async/await.",
    readTime: "12 мин",
    date: "28 апр",
  },
  {
    category: "DevOps",
    categoryColor: "#a855f7",
    title: "Docker для разработчика: практический гайд",
    desc: "От нуля до деплоя: контейнеры, compose, volumes и networking.",
    readTime: "15 мин",
    date: "25 апр",
  },
];

const CODE_EXAMPLES = [
  {
    lang: "Python",
    label: "Рекурсия",
    color: "#4ade80",
    code: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Запусти и посмотри результат!
for i in range(10):
    print(f"fib({i}) = {fibonacci(i)}")`,
    output: `fib(0) = 0\nfib(1) = 1\nfib(2) = 1\nfib(3) = 2\nfib(4) = 3\nfib(5) = 5\nfib(6) = 8\nfib(7) = 13\nfib(8) = 21\nfib(9) = 34`,
  },
  {
    lang: "JavaScript",
    label: "Async/Await",
    color: "#fbbf24",
    code: `async function fetchUser(id) {
  const res = await fetch(
    \`https://api.example.com/users/\${id}\`
  );
  const user = await res.json();
  return user;
}

// Вызов с обработкой ошибок
fetchUser(42)
  .then(u => console.log(u.name))
  .catch(err => console.error(err));`,
    output: `Загрузка...\n✓ Получен пользователь: Alex\n  Email: alex@dev.io\n  Роль: Senior Developer`,
  },
  {
    lang: "TypeScript",
    label: "Generic типы",
    color: "#22d3ee",
    code: `type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

interface User {
  id: number;
  name: string;
}

function unwrap<T>(
  response: ApiResponse<T>
): T {
  if (response.status !== 200) {
    throw new Error(response.message);
  }
  return response.data;
}`,
    output: `✓ TypeScript скомпилирован\n  Тип проверен: ApiResponse<User>\n  Generic параметр T = User\n  Без ошибок!`,
  },
];

const STATS = [
  { value: "12 000+", label: "Студентов", icon: "Users" },
  { value: "180+", label: "Уроков", icon: "BookOpen" },
  { value: "95%", label: "Доходят до конца", icon: "TrendingUp" },
  { value: "4.9★", label: "Средняя оценка", icon: "Star" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("Главная");
  const [activeExample, setActiveExample] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openArticle, setOpenArticle] = useState<string | null>(null);
  const [openCourse, setOpenCourse] = useState<string | null>(null);

  function handleOpenArticle(title: string) {
    setOpenArticle(title);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function handleCloseArticle() {
    setOpenArticle(null);
    setTimeout(() => document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  function handleOpenCourse(title: string) {
    setOpenCourse(title);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function handleCloseCourse() {
    setOpenCourse(null);
    setTimeout(() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  if (openArticle) {
    return <ArticlePage articleTitle={openArticle} onBack={handleCloseArticle} />;
  }

  if (openCourse) {
    return <CoursePage courseTitle={openCourse} onBack={handleCloseCourse} />;
  }

  function runCode() {
    setIsRunning(true);
    setOutput(null);
    setTimeout(() => {
      setOutput(CODE_EXAMPLES[activeExample].output);
      setIsRunning(false);
    }, 900);
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-golos overflow-x-hidden">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #22d3ee, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #f472b6, transparent 70%)" }}
        />
      </div>

      {/* NAV */}
      <nav className="relative z-50 sticky top-0 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg animated-gradient flex items-center justify-center">
              <Icon name="Code2" size={16} className="text-white" />
            </div>
            <span className="font-mono font-bold text-lg tracking-tight gradient-text">
              DevSpace
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => {
                  setActiveSection(link);
                  if (link === "Статьи") document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" });
                  if (link === "Обучение") document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === link
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {link}
              </button>
            ))}
          </div>

          <button
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 glow-purple"
            style={{ background: "linear-gradient(135deg, #a855f7, #22d3ee)" }}
          >
            <Icon name="Zap" size={14} />
            Начать учиться
          </button>

          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => {
                  setActiveSection(link);
                  setMobileMenuOpen(false);
                  if (link === "Статьи") setTimeout(() => document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" }), 100);
                  if (link === "Обучение") setTimeout(() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" }), 100);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium text-left transition-all ${
                  activeSection === link
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-up text-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" />
            <span className="text-muted-foreground">Новый курс: Rust для Go-разработчиков →</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black leading-[1.05] mb-6 animate-fade-up-delay-1">
            Код — это{" "}
            <span className="gradient-text">суперсила.</span>
            <br />
            <span className="text-foreground/90">Прокачай её здесь.</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up-delay-2">
            Интерактивные курсы, живые примеры кода и статьи от практикующих разработчиков.
            Учись делая — запускай код прямо в браузере.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delay-3">
            <button
              onClick={() => setActiveSection("Обучение")}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-lg transition-all hover:scale-105 glow-purple"
              style={{ background: "linear-gradient(135deg, #a855f7 0%, #22d3ee 100%)" }}
            >
              <Icon name="Play" size={18} />
              Начать бесплатно
            </button>
            <button
              onClick={() => {
                setActiveSection("Статьи");
                document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-foreground text-lg glass transition-all hover:bg-white/10"
            >
              <Icon name="FileText" size={18} />
              Читать статьи
            </button>
          </div>
        </div>


      </section>

      {/* INTERACTIVE CODE EDITOR */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-28">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold text-cyan-400 border border-cyan-400/30 bg-cyan-400/10 mb-4">
            ИНТЕРАКТИВНО
          </span>
          <h2 className="text-3xl sm:text-5xl font-black mb-4">
            Запусти код <span className="gradient-text">прямо сейчас</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Нажми «Запустить» и увидишь результат мгновенно. Никаких установок.
          </p>
        </div>

        <div className="glass rounded-3xl overflow-hidden border border-white/10">
          {/* Tab bar */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/8 overflow-x-auto">
            <div className="flex items-center gap-2 mr-4 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            {CODE_EXAMPLES.map((ex, i) => (
              <button
                key={i}
                onClick={() => { setActiveExample(i); setOutput(null); }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono transition-all shrink-0 ${
                  activeExample === i
                    ? "text-foreground bg-white/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: ex.color }}
                />
                {ex.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Code panel */}
            <div className="p-6 border-b md:border-b-0 md:border-r border-white/8 relative scanline">
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-mono font-bold px-2 py-1 rounded-md"
                  style={{
                    color: CODE_EXAMPLES[activeExample].color,
                    background: CODE_EXAMPLES[activeExample].color + "20",
                    border: `1px solid ${CODE_EXAMPLES[activeExample].color}30`,
                  }}
                >
                  {CODE_EXAMPLES[activeExample].lang}
                </span>
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-black transition-all hover:opacity-90 disabled:opacity-60"
                  style={{ background: CODE_EXAMPLES[activeExample].color }}
                >
                  {isRunning ? (
                    <>
                      <Icon name="Loader2" size={14} className="animate-spin" />
                      Запуск...
                    </>
                  ) : (
                    <>
                      <Icon name="Play" size={14} />
                      Запустить
                    </>
                  )}
                </button>
              </div>
              <pre className="font-mono text-sm leading-relaxed text-foreground/90 overflow-x-auto whitespace-pre-wrap">
                <code>{CODE_EXAMPLES[activeExample].code}</code>
              </pre>
            </div>

            {/* Output panel */}
            <div className="p-6 bg-black/20">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Terminal" size={14} className="text-muted-foreground" />
                <span className="text-xs font-mono text-muted-foreground">Вывод</span>
              </div>
              {output ? (
                <pre className="font-mono text-sm text-green-400 leading-relaxed whitespace-pre-wrap animate-fade-up">
                  {output}
                </pre>
              ) : isRunning ? (
                <div className="flex items-center gap-3 text-muted-foreground text-sm font-mono">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                  Выполняется...
                </div>
              ) : (
                <div className="text-muted-foreground text-sm font-mono flex items-center gap-2">
                  <span className="opacity-40">$</span>
                  <span className="opacity-40">Нажми «Запустить», чтобы увидеть результат</span>
                  <span className="cursor-blink text-primary">|</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section id="courses" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-28">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold text-purple-400 border border-purple-400/30 bg-purple-400/10 mb-4">
              ОБУЧЕНИЕ
            </span>
            <h2 className="text-3xl sm:text-5xl font-black">
              Популярные <span className="gradient-text">курсы</span>
            </h2>
          </div>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Все курсы <Icon name="ArrowRight" size={16} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COURSES.map((course) => (
            <div
              key={course.title}
              onClick={() => handleOpenCourse(course.title)}
              className={`glass rounded-2xl p-5 card-hover cursor-pointer border ${course.border} bg-gradient-to-br ${course.gradient}`}
            >
              <span
                className="inline-block text-xs font-mono font-bold px-2 py-1 rounded-md mb-4"
                style={{
                  color: course.tagColor,
                  background: course.tagColor + "20",
                  border: `1px solid ${course.tagColor}30`,
                }}
              >
                {course.tag}
              </span>
              <h3 className="font-bold text-base mb-2 leading-snug">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{course.desc}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto">
                <span className="flex items-center gap-1">
                  <Icon name="BookOpen" size={12} />
                  {course.lessons} уроков
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Clock" size={12} />
                  {course.hours}ч
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-white/8 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{course.level}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleOpenCourse(course.title); }}
                  className="text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                  style={{ color: course.tagColor }}
                >
                  Начать <Icon name="ArrowRight" size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ARTICLES SECTION */}
      <section id="articles" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-28">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold text-pink-400 border border-pink-400/30 bg-pink-400/10 mb-4">
              СТАТЬИ
            </span>
            <h2 className="text-3xl sm:text-5xl font-black">
              Свежие <span className="gradient-text-warm">материалы</span>
            </h2>
          </div>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Все статьи <Icon name="ArrowRight" size={16} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <article
              key={article.title}
              onClick={() => handleOpenArticle(article.title)}
              className="glass rounded-2xl p-6 card-hover cursor-pointer border border-white/6 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-mono font-bold px-2 py-1 rounded-md"
                  style={{
                    color: article.categoryColor,
                    background: article.categoryColor + "20",
                    border: `1px solid ${article.categoryColor}30`,
                  }}
                >
                  {article.category}
                </span>
                <span className="text-xs text-muted-foreground">{article.date}</span>
              </div>
              <h3 className="font-bold text-lg mb-3 leading-snug">{article.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{article.desc}</p>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  {article.readTime} чтения
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleOpenArticle(article.title); }}
                  className="text-xs font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Читать <Icon name="ArrowRight" size={12} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div
          className="rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(34,211,238,0.15) 50%, rgba(244,114,182,0.2) 100%)",
            border: "1px solid rgba(168,85,247,0.2)",
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(168,85,247,0.3) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-6xl font-black mb-6">
              Готов стать <span className="gradient-text">разработчиком?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Первые 3 урока бесплатно. Без кредитной карты. Начни сегодня.
            </p>
            <button
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-xl text-white transition-all hover:scale-105 glow-purple"
              style={{ background: "linear-gradient(135deg, #a855f7 0%, #f472b6 100%)" }}
            >
              <Icon name="Rocket" size={22} />
              Поехали!
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold gradient-text">DevSpace</span>
            <span className="text-muted-foreground text-sm">© 2026</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <button className="hover:text-foreground transition-colors">Контакты</button>
            <button className="hover:text-foreground transition-colors">Telegram</button>
            <button className="hover:text-foreground transition-colors">GitHub</button>
          </div>
        </div>
      </footer>
    </div>
  );
}