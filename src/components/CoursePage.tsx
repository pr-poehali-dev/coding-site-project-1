import { useState } from "react";
import Icon from "@/components/ui/icon";
import LessonPage from "@/components/LessonPage";

interface Lesson {
  title: string;
  duration: string;
  type: "video" | "practice" | "theory";
  free?: boolean;
}

interface Module {
  title: string;
  lessons: Lesson[];
}

interface CourseData {
  title: string;
  tag: string;
  tagColor: string;
  level: string;
  hours: number;
  desc: string;
  what: string[];
  modules: Module[];
}

const COURSES_DATA: Record<string, CourseData> = {
  "Python с нуля до Pro": {
    title: "Python с нуля до Pro",
    tag: "Python",
    tagColor: "#4ade80",
    level: "Новичок",
    hours: 24,
    desc: "От переменных до async/await. Практика на реальных задачах.",
    what: [
      "Основы синтаксиса и типы данных",
      "ООП: классы, наследование, полиморфизм",
      "Работа с файлами, API, базами данных",
      "Асинхронный Python с asyncio",
    ],
    modules: [
      {
        title: "Модуль 1 — Основы Python",
        lessons: [
          { title: "Установка и первая программа", duration: "12 мин", type: "video", free: true },
          { title: "Переменные и типы данных", duration: "18 мин", type: "theory", free: true },
          { title: "Условия: if / elif / else", duration: "15 мин", type: "video" },
          { title: "Практика: калькулятор", duration: "20 мин", type: "practice" },
        ],
      },
      {
        title: "Модуль 2 — Структуры данных",
        lessons: [
          { title: "Списки и операции над ними", duration: "22 мин", type: "video" },
          { title: "Словари и множества", duration: "19 мин", type: "theory" },
          { title: "Циклы for и while", duration: "16 мин", type: "video" },
          { title: "Практика: работа с данными", duration: "30 мин", type: "practice" },
        ],
      },
      {
        title: "Модуль 3 — Функции и ООП",
        lessons: [
          { title: "Функции, аргументы, возврат", duration: "25 мин", type: "video" },
          { title: "Lambda и функции высшего порядка", duration: "20 мин", type: "theory" },
          { title: "Классы и объекты", duration: "28 мин", type: "video" },
          { title: "Наследование и полиморфизм", duration: "24 мин", type: "video" },
          { title: "Практика: система задач", duration: "40 мин", type: "practice" },
        ],
      },
      {
        title: "Модуль 4 — Async / Продвинутые темы",
        lessons: [
          { title: "Работа с файлами и исключениями", duration: "18 мин", type: "video" },
          { title: "Запросы к API через requests", duration: "22 мин", type: "video" },
          { title: "asyncio: корутины и задачи", duration: "30 мин", type: "theory" },
          { title: "Финальный проект: парсер данных", duration: "60 мин", type: "practice" },
        ],
      },
    ],
  },
  "Современный JS / TS": {
    title: "Современный JS / TS",
    tag: "JavaScript",
    tagColor: "#fbbf24",
    level: "Средний",
    hours: 31,
    desc: "ES2024, TypeScript, паттерны. Готовься к работе в продакшне.",
    what: [
      "Современный синтаксис ES2024",
      "TypeScript с нуля до дженериков",
      "Асинхронность: Promise, async/await",
      "Паттерны проектирования на JS",
    ],
    modules: [
      {
        title: "Модуль 1 — Современный JavaScript",
        lessons: [
          { title: "let, const, стрелочные функции", duration: "15 мин", type: "video", free: true },
          { title: "Деструктуризация и spread/rest", duration: "18 мин", type: "theory", free: true },
          { title: "Модули: import / export", duration: "14 мин", type: "video" },
          { title: "Практика: рефакторинг старого кода", duration: "25 мин", type: "practice" },
        ],
      },
      {
        title: "Модуль 2 — Асинхронность",
        lessons: [
          { title: "Event Loop и стек вызовов", duration: "20 мин", type: "video" },
          { title: "Promise: цепочки и обработка ошибок", duration: "22 мин", type: "theory" },
          { title: "async / await на практике", duration: "18 мин", type: "video" },
          { title: "Параллельные запросы с Promise.all", duration: "16 мин", type: "practice" },
        ],
      },
      {
        title: "Модуль 3 — TypeScript",
        lessons: [
          { title: "Типы, интерфейсы, union/intersection", duration: "24 мин", type: "video" },
          { title: "Generics: пишем универсальный код", duration: "26 мин", type: "theory" },
          { title: "Utility Types: Partial, Pick, Omit", duration: "20 мин", type: "video" },
          { title: "Практика: типизируем REST API", duration: "45 мин", type: "practice" },
        ],
      },
      {
        title: "Модуль 4 — Паттерны и архитектура",
        lessons: [
          { title: "Замыкания и фабричные функции", duration: "22 мин", type: "video" },
          { title: "Observer, Singleton, Strategy", duration: "28 мин", type: "theory" },
          { title: "Финальный проект: SDK библиотека", duration: "60 мин", type: "practice" },
        ],
      },
    ],
  },
  "React + экосистема": {
    title: "React + экосистема",
    tag: "React",
    tagColor: "#22d3ee",
    level: "Средний",
    hours: 28,
    desc: "Hooks, Context, React Query, анимации. Строим реальные SPA.",
    what: [
      "Все хуки React + собственные хуки",
      "Глобальное состояние: Context, Zustand",
      "Серверные данные с React Query",
      "Анимации с Framer Motion",
    ],
    modules: [
      {
        title: "Модуль 1 — Основы React",
        lessons: [
          { title: "Компоненты, JSX, пропсы", duration: "18 мин", type: "video", free: true },
          { title: "useState и useEffect", duration: "22 мин", type: "theory", free: true },
          { title: "Условный рендер и списки", duration: "15 мин", type: "video" },
          { title: "Практика: карточки товаров", duration: "30 мин", type: "practice" },
        ],
      },
      {
        title: "Модуль 2 — Продвинутые хуки",
        lessons: [
          { title: "useRef, useMemo, useCallback", duration: "25 мин", type: "video" },
          { title: "useReducer: управление состоянием", duration: "20 мин", type: "theory" },
          { title: "Собственные хуки на практике", duration: "28 мин", type: "video" },
          { title: "Практика: форма с валидацией", duration: "35 мин", type: "practice" },
        ],
      },
      {
        title: "Модуль 3 — Данные и состояние",
        lessons: [
          { title: "Context API: глобальное состояние", duration: "22 мин", type: "video" },
          { title: "Zustand: простой стейт-менеджер", duration: "18 мин", type: "theory" },
          { title: "React Query: кэш и синхронизация", duration: "30 мин", type: "video" },
          { title: "Практика: дашборд с данными", duration: "50 мин", type: "practice" },
        ],
      },
      {
        title: "Модуль 4 — Анимации и финал",
        lessons: [
          { title: "CSS анимации в React", duration: "16 мин", type: "video" },
          { title: "Framer Motion: базовые анимации", duration: "24 мин", type: "theory" },
          { title: "Финальный проект: полноценное SPA", duration: "90 мин", type: "practice" },
        ],
      },
    ],
  },
  "Алгоритмы и структуры данных": {
    title: "Алгоритмы и структуры данных",
    tag: "Алгоритмы",
    tagColor: "#f472b6",
    level: "Продвинутый",
    hours: 20,
    desc: "LeetCode-задачи, системный дизайн, подготовка к собесам.",
    what: [
      "Сортировки, поиск, рекурсия",
      "Деревья, графы, хэш-таблицы",
      "Динамическое программирование",
      "Разбор реальных задач с собесов",
    ],
    modules: [
      {
        title: "Модуль 1 — Базовые алгоритмы",
        lessons: [
          { title: "Big O: оценка сложности", duration: "20 мин", type: "theory", free: true },
          { title: "Сортировки: bubble, merge, quick", duration: "28 мин", type: "video", free: true },
          { title: "Бинарный поиск", duration: "18 мин", type: "video" },
          { title: "Практика: 5 задач на сортировку", duration: "40 мин", type: "practice" },
        ],
      },
      {
        title: "Модуль 2 — Структуры данных",
        lessons: [
          { title: "Стек, очередь, связный список", duration: "24 мин", type: "video" },
          { title: "Хэш-таблицы и коллизии", duration: "22 мин", type: "theory" },
          { title: "Деревья: BST, обходы", duration: "30 мин", type: "video" },
          { title: "Практика: задачи с деревьями", duration: "45 мин", type: "practice" },
        ],
      },
      {
        title: "Модуль 3 — Графы и ДП",
        lessons: [
          { title: "Графы: BFS и DFS", duration: "28 мин", type: "video" },
          { title: "Динамическое программирование", duration: "35 мин", type: "theory" },
          { title: "Классические DP задачи", duration: "30 мин", type: "practice" },
          { title: "Финал: разбор 10 задач с собесов", duration: "60 мин", type: "practice" },
        ],
      },
    ],
  },
};

const TYPE_CONFIG = {
  video: { label: "Видео", icon: "Play", color: "#a855f7" },
  theory: { label: "Теория", icon: "FileText", color: "#22d3ee" },
  practice: { label: "Практика", icon: "Code2", color: "#f472b6" },
};

interface Props {
  courseTitle: string;
  onBack: () => void;
}

export default function CoursePage({ courseTitle, onBack }: Props) {
  const course = COURSES_DATA[courseTitle];
  const [openModules, setOpenModules] = useState<number[]>([0]);
  const [openLesson, setOpenLesson] = useState<string | null>(null);

  function handleOpenLesson(title: string) {
    setOpenLesson(title);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function handleCloseLesson() {
    setOpenLesson(null);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function toggleModule(idx: number) {
    setOpenModules((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  }

  if (!course) return null;

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  if (openLesson) {
    return (
      <LessonPage
        lessonTitle={openLesson}
        courseTitle={courseTitle}
        tagColor={course.tagColor}
        onBack={handleCloseLesson}
        onNext={(title) => { setOpenLesson(title); window.scrollTo({ top: 0, behavior: "instant" }); }}
        onPrev={(title) => { setOpenLesson(title); window.scrollTo({ top: 0, behavior: "instant" }); }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-golos">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
          style={{ background: `radial-gradient(circle, ${course.tagColor}, transparent 70%)` }}
        />
        <div
          className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }}
        />
      </div>

      {/* Top bar */}
      <div className="relative z-10 sticky top-0 glass border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="ArrowLeft" size={16} />
            Назад
          </button>
          <div className="h-4 w-px bg-white/10" />
          <span
            className="text-xs font-mono font-bold px-2 py-1 rounded-md"
            style={{
              color: course.tagColor,
              background: course.tagColor + "20",
              border: `1px solid ${course.tagColor}30`,
            }}
          >
            {course.tag}
          </span>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero */}
        <header className="mb-12 animate-fade-up">
          <h1 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">{course.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{course.desc}</p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-1.5">
              <Icon name="BarChart2" size={14} />
              {course.level}
            </span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-1.5">
              <Icon name="BookOpen" size={14} />
              {totalLessons} уроков
            </span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-1.5">
              <Icon name="Clock" size={14} />
              {course.hours} часов
            </span>
          </div>

          {/* What you'll learn */}
          <div
            className="glass rounded-2xl p-6 border"
            style={{ borderColor: course.tagColor + "30" }}
          >
            <h2 className="font-bold text-base mb-4 flex items-center gap-2">
              <Icon name="Zap" size={16} style={{ color: course.tagColor }} />
              Что ты изучишь
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {course.what.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-0.5 shrink-0" style={{ color: course.tagColor }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Modules */}
        <section className="animate-fade-up-delay-1">
          <h2 className="text-2xl font-black mb-6">Программа курса</h2>
          <div className="space-y-3">
            {course.modules.map((module, mIdx) => {
              const isOpen = openModules.includes(mIdx);
              return (
                <div
                  key={mIdx}
                  className="glass rounded-2xl border border-white/8 overflow-hidden"
                >
                  {/* Module header */}
                  <button
                    onClick={() => toggleModule(mIdx)}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/4 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
                        style={{ background: course.tagColor + "25", color: course.tagColor }}
                      >
                        {mIdx + 1}
                      </span>
                      <span className="font-semibold text-sm sm:text-base">{module.title}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-muted-foreground hidden sm:block">
                        {module.lessons.length} уроков
                      </span>
                      <Icon
                        name="ChevronDown"
                        size={16}
                        className="text-muted-foreground transition-transform duration-200"
                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </div>
                  </button>

                  {/* Lessons list */}
                  {isOpen && (
                    <div className="border-t border-white/6">
                      {module.lessons.map((lesson, lIdx) => {
                        const typeConf = TYPE_CONFIG[lesson.type];
                        return (
                          <div
                            key={lIdx}
                            className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/4 transition-colors border-b border-white/4 last:border-0 cursor-pointer"
                          >
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: typeConf.color + "20" }}
                            >
                              <Icon name={typeConf.icon as never} size={13} style={{ color: typeConf.color }} />
                            </div>
                            <span className="flex-1 text-sm text-foreground/90">{lesson.title}</span>
                            <div className="flex items-center gap-3 shrink-0">
                              {lesson.free && (
                                <span className="text-xs px-2 py-0.5 rounded-full font-mono font-bold"
                                  style={{ background: course.tagColor + "20", color: course.tagColor }}>
                                  free
                                </span>
                              )}
                              <span className="text-xs text-muted-foreground font-mono">{lesson.duration}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              const firstFree = course.modules.flatMap(m => m.lessons).find(l => l.free);
              if (firstFree) handleOpenLesson(firstFree.title);
            }}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-lg text-black transition-all hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${course.tagColor}, #a855f7)` }}
          >
            <Icon name="Rocket" size={20} />
            Начать курс бесплатно
          </button>
          <p className="text-xs text-muted-foreground mt-3">Первые 2 урока — бесплатно</p>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="ArrowLeft" size={14} />
            Вернуться к курсам
          </button>
        </div>
      </div>
    </div>
  );
}