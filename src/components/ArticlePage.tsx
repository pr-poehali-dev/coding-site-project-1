import Icon from "@/components/ui/icon";

interface ArticleContent {
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  intro: string;
  sections: { heading: string; body: string; code?: string; codeLang?: string }[];
  tags: string[];
}

const ARTICLE_CONTENTS: Record<string, ArticleContent> = {
  "Замыкания в JS: раз и навсегда": {
    title: "Замыкания в JS: раз и навсегда",
    category: "JavaScript",
    categoryColor: "#fbbf24",
    date: "2 мая 2026",
    readTime: "8 мин",
    author: "Алексей Громов",
    authorRole: "Senior Frontend Developer",
    intro:
      "Замыкания — одна из самых мощных и одновременно запутанных концепций JavaScript. Многие разработчики годами пишут код, не до конца понимая, что происходит «под капотом». Давай разберём это раз и навсегда.",
    sections: [
      {
        heading: "Что такое замыкание?",
        body: 'Замыкание — это функция, которая "помнит" переменные из своего лексического окружения даже после того, как это окружение перестало существовать. Проще говоря: функция внутри функции имеет доступ к переменным родителя.',
        code: `function counter() {
  let count = 0; // эта переменная "замкнута"

  return function() {
    count++;
    return count;
  };
}

const inc = counter();
console.log(inc()); // 1
console.log(inc()); // 2
console.log(inc()); // 3`,
        codeLang: "JavaScript",
      },
      {
        heading: "Практический пример: приватные данные",
        body: "Замыкания позволяют создавать «приватные» переменные — к ним нельзя обратиться снаружи напрямую. Это мощный паттерн для инкапсуляции:",
        code: `function createUser(name) {
  let _balance = 0; // приватная переменная

  return {
    getName: () => name,
    deposit: (amount) => { _balance += amount; },
    getBalance: () => _balance,
  };
}

const user = createUser("Саша");
user.deposit(500);
console.log(user.getBalance()); // 500
console.log(user._balance);     // undefined — не доступно!`,
        codeLang: "JavaScript",
      },
      {
        heading: "Частая ошибка: замыкание в цикле",
        body: "Классическая ловушка — создание функций в цикле с var. Все функции замыкаются на одну и ту же переменную i, которая к моменту вызова уже равна финальному значению:",
        code: `// ❌ Неправильно — все выведут 3
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}

// ✅ Правильно — используй let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Выведет: 0, 1, 2`,
        codeLang: "JavaScript",
      },
      {
        heading: "Мемоизация через замыкание",
        body: "Ещё один мощный паттерн — кэширование результатов «дорогих» функций. Замыкание хранит кэш между вызовами:",
        code: `function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key); // возвращаем из кэша
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const slowSquare = memoize((n) => {
  // имитация долгого вычисления
  return n * n;
});

slowSquare(5); // считает
slowSquare(5); // из кэша — мгновенно!`,
        codeLang: "JavaScript",
      },
    ],
    tags: ["JavaScript", "Замыкания", "Паттерны", "Основы"],
  },
  "Асинхронный Python: asyncio в деталях": {
    title: "Асинхронный Python: asyncio в деталях",
    category: "Python",
    categoryColor: "#4ade80",
    date: "28 апреля 2026",
    readTime: "12 мин",
    author: "Марина Соколова",
    authorRole: "Backend Engineer",
    intro:
      "asyncio — это стандартная библиотека Python для написания конкурентного кода с помощью синтаксиса async/await. Разберём как работает event loop, чем отличаются корутины от задач и как правильно организовать асинхронный код.",
    sections: [
      {
        heading: "Корутины: основа asyncio",
        body: "Корутина — функция, объявленная через async def. Сама по себе она не выполняется при вызове — она возвращает объект корутины. Чтобы запустить её, нужен event loop:",
        code: `import asyncio

async def greet(name: str) -> str:
    await asyncio.sleep(1)  # имитация I/O
    return f"Привет, {name}!"

async def main():
    result = await greet("Мир")
    print(result)  # Привет, Мир!

asyncio.run(main())`,
        codeLang: "Python",
      },
      {
        heading: "Tasks: параллельный запуск",
        body: "asyncio.Task позволяет запускать несколько корутин параллельно. Используй asyncio.gather() для одновременного выполнения:",
        code: `import asyncio
import time

async def fetch_data(source: str, delay: float):
    print(f"Начинаю загрузку: {source}")
    await asyncio.sleep(delay)
    print(f"Готово: {source}")
    return f"данные из {source}"

async def main():
    start = time.time()

    # Запускаем все три задачи ПАРАЛЛЕЛЬНО
    results = await asyncio.gather(
        fetch_data("API 1", 1.0),
        fetch_data("API 2", 0.5),
        fetch_data("API 3", 1.5),
    )

    elapsed = time.time() - start
    print(f"Время: {elapsed:.1f}с")  # ~1.5с вместо 3с!

asyncio.run(main())`,
        codeLang: "Python",
      },
      {
        heading: "Обработка ошибок в async коде",
        body: "Ошибки в корутинах ловятся обычным try/except. Но при использовании gather важно понимать: по умолчанию одна ошибка отменяет все задачи:",
        code: `import asyncio

async def risky_operation(n: int):
    await asyncio.sleep(0.1)
    if n == 2:
        raise ValueError(f"Ошибка в задаче {n}")
    return f"Результат {n}"

async def main():
    # return_exceptions=True — не прерывает остальные задачи
    results = await asyncio.gather(
        risky_operation(1),
        risky_operation(2),
        risky_operation(3),
        return_exceptions=True
    )

    for i, result in enumerate(results):
        if isinstance(result, Exception):
            print(f"Задача {i+1} упала: {result}")
        else:
            print(f"Задача {i+1}: {result}")

asyncio.run(main())`,
        codeLang: "Python",
      },
    ],
    tags: ["Python", "asyncio", "Async/Await", "Конкурентность"],
  },
  "Docker для разработчика: практический гайд": {
    title: "Docker для разработчика: практический гайд",
    category: "DevOps",
    categoryColor: "#a855f7",
    date: "25 апреля 2026",
    readTime: "15 мин",
    author: "Дмитрий Орлов",
    authorRole: "DevOps Engineer",
    intro:
      "Docker изменил способ разработки и деплоя приложений. Больше не нужно думать «у меня работает, а на сервере нет» — контейнеры гарантируют одинаковое окружение везде. Разберём всё с нуля до реального деплоя.",
    sections: [
      {
        heading: "Первый Dockerfile",
        body: "Dockerfile — это инструкция по сборке образа. Каждая строка создаёт новый слой. Вот минимальный Dockerfile для Node.js приложения:",
        code: `# Базовый образ
FROM node:20-alpine

# Рабочая директория внутри контейнера
WORKDIR /app

# Копируем зависимости и устанавливаем
COPY package*.json ./
RUN npm ci --only=production

# Копируем исходный код
COPY . .

# Порт, который слушает приложение
EXPOSE 3000

# Команда запуска
CMD ["node", "server.js"]`,
        codeLang: "Dockerfile",
      },
      {
        heading: "Docker Compose: несколько сервисов",
        body: "Реальные приложения состоят из нескольких сервисов: бэкенд, база данных, кэш. Docker Compose позволяет описать их все в одном файле:",
        code: `version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
      - REDIS_URL=redis://cache:6379
    depends_on:
      - db
      - cache

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

  cache:
    image: redis:7-alpine

volumes:
  postgres_data:`,
        codeLang: "YAML",
      },
      {
        heading: "Полезные команды",
        body: "Вот шпаргалка по основным командам Docker, которые нужны каждый день:",
        code: `# Собрать образ
docker build -t myapp:latest .

# Запустить контейнер
docker run -p 3000:3000 myapp:latest

# Docker Compose
docker compose up -d        # запустить в фоне
docker compose logs -f app  # следить за логами
docker compose down         # остановить всё

# Зайти внутрь контейнера
docker exec -it <container_id> sh

# Посмотреть запущенные контейнеры
docker ps

# Очистить неиспользуемые ресурсы
docker system prune -af`,
        codeLang: "Bash",
      },
    ],
    tags: ["Docker", "DevOps", "Контейнеры", "Deploy"],
  },
};

interface Props {
  articleTitle: string;
  onBack: () => void;
}

export default function ArticlePage({ articleTitle, onBack }: Props) {
  const article = ARTICLE_CONTENTS[articleTitle];

  if (!article) return null;

  return (
    <div className="min-h-screen bg-background text-foreground font-golos">
      {/* Fixed background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #22d3ee, transparent 70%)" }}
        />
      </div>

      {/* Top bar */}
      <div className="relative z-10 sticky top-0 glass border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
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
              color: article.categoryColor,
              background: article.categoryColor + "20",
              border: `1px solid ${article.categoryColor}30`,
            }}
          >
            {article.category}
          </span>
        </div>
      </div>

      {/* Article content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <header className="mb-12 animate-fade-up">
          <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-1.5">
              <Icon name="User" size={14} />
              {article.author}
            </span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-1.5">
              <Icon name="Briefcase" size={14} />
              {article.authorRole}
            </span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-1.5">
              <Icon name="Calendar" size={14} />
              {article.date}
            </span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-1.5">
              <Icon name="Clock" size={14} />
              {article.readTime} чтения
            </span>
          </div>

          {/* Intro */}
          <p
            className="text-lg sm:text-xl leading-relaxed text-muted-foreground border-l-2 pl-5"
            style={{ borderColor: article.categoryColor }}
          >
            {article.intro}
          </p>
        </header>

        {/* Sections */}
        <div className="space-y-12">
          {article.sections.map((section, idx) => (
            <section key={idx} className="animate-fade-up-delay-1">
              <h2 className="text-xl sm:text-2xl font-black mb-4">
                {section.heading}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {section.body}
              </p>

              {section.code && (
                <div className="glass rounded-2xl overflow-hidden border border-white/10">
                  {/* Code header */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-white/8">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                      </div>
                      <span
                        className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                        style={{
                          color: article.categoryColor,
                          background: article.categoryColor + "15",
                        }}
                      >
                        {section.codeLang}
                      </span>
                    </div>
                    <Icon name="Code2" size={14} className="text-muted-foreground" />
                  </div>
                  <pre className="p-5 overflow-x-auto">
                    <code className="font-mono text-sm leading-relaxed text-foreground/90 whitespace-pre">
                      {section.code}
                    </code>
                  </pre>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-14 pt-8 border-t border-white/8">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-3 py-1.5 rounded-full glass border border-white/10 text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Back button bottom */}
        <div className="mt-12 text-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105 glow-purple"
            style={{ background: "linear-gradient(135deg, #a855f7, #22d3ee)" }}
          >
            <Icon name="ArrowLeft" size={16} />
            Вернуться к статьям
          </button>
        </div>
      </div>
    </div>
  );
}
