import { useState } from "react";
import Icon from "@/components/ui/icon";

interface LessonBlock {
  type: "text" | "code" | "tip" | "task";
  content: string;
  lang?: string;
  taskCode?: string;
  taskAnswer?: string;
}

interface LessonData {
  title: string;
  type: "video" | "theory" | "practice";
  duration: string;
  courseTitle: string;
  tagColor: string;
  blocks: LessonBlock[];
  prevLesson?: string;
  nextLesson?: string;
}

const LESSONS_DATA: Record<string, LessonData> = {
  "Установка и первая программа": {
    title: "Установка и первая программа",
    type: "video",
    duration: "12 мин",
    courseTitle: "Python с нуля до Pro",
    tagColor: "#4ade80",
    nextLesson: "Переменные и типы данных",
    blocks: [
      { type: "text", content: "Python — один из самых популярных языков мира. Он читается почти как обычный текст и подходит для веб-разработки, анализа данных, автоматизации и машинного обучения." },
      { type: "tip", content: "Скачай Python с официального сайта python.org. Выбери версию 3.12 или новее. При установке на Windows обязательно отметь галочку «Add Python to PATH»." },
      { type: "text", content: "После установки открой терминал и проверь версию:" },
      { type: "code", lang: "Bash", content: `python --version\n# Python 3.12.0` },
      { type: "text", content: "Теперь напишем первую программу. Создай файл hello.py и добавь в него следующий код:" },
      { type: "code", lang: "Python", content: `# Моя первая программа на Python\nprint("Привет, мир!")\nprint("Я учусь программировать")\n\n# print() выводит текст в консоль\n# Текст берётся в кавычки` },
      { type: "text", content: "Запусти файл командой в терминале:" },
      { type: "code", lang: "Bash", content: `python hello.py\n# Привет, мир!\n# Я учусь программировать` },
      { type: "tip", content: "Можешь также использовать VS Code или PyCharm — это удобные редакторы с подсветкой кода и автодополнением." },
      { type: "task", content: "Напиши программу, которая выводит твоё имя и любимый язык программирования.", taskCode: `# Выведи своё имя и любимый язык\nprint("Имя: ...")\nprint("Язык: ...")`, taskAnswer: `print("Имя: Александр")\nprint("Язык: Python")` },
    ],
  },
  "Переменные и типы данных": {
    title: "Переменные и типы данных",
    type: "theory",
    duration: "18 мин",
    courseTitle: "Python с нуля до Pro",
    tagColor: "#4ade80",
    prevLesson: "Установка и первая программа",
    nextLesson: "Условия: if / elif / else",
    blocks: [
      { type: "text", content: "Переменная — это «ящик» с именем, в котором хранится значение. В Python не нужно заранее указывать тип — он определяется автоматически." },
      { type: "code", lang: "Python", content: `name = "Алексей"      # str — строка\nage = 25              # int — целое число\nheight = 1.82         # float — дробное\nis_student = True     # bool — логическое\n\nprint(name, age)      # Алексей 25\nprint(type(age))      # <class 'int'>` },
      { type: "tip", content: "Имена переменных пишутся в snake_case: my_variable, user_name, total_price. Не начинай с цифры и не используй зарезервированные слова (if, for, while...)." },
      { type: "text", content: "Python умеет автоматически преобразовывать типы при операциях. Но иногда нужно делать это явно:" },
      { type: "code", lang: "Python", content: `# Явное преобразование типов\nage_str = "25"\nage_int = int(age_str)      # str → int\nprice = float("19.99")     # str → float\nresult = str(42)           # int → str\n\n# Конкатенация строк только со строками!\nprint("Мне " + str(age_int) + " лет")\n# или f-строка (удобнее):\nprint(f"Мне {age_int} лет")` },
      { type: "text", content: "F-строки — самый удобный способ вставить переменную в текст. Просто пиши {переменная} внутри строки с префиксом f:" },
      { type: "code", lang: "Python", content: `name = "Мария"\nage = 28\ncity = "Москва"\n\ninfo = f"{name}, {age} лет, живёт в {city}"\nprint(info)\n# Мария, 28 лет, живёт в Москве\n\n# Можно делать вычисления прямо внутри\nprint(f"Через 5 лет мне будет {age + 5} лет")` },
      { type: "task", content: "Создай переменные: своё имя, возраст и город. Выведи их в одну строку через f-строку.", taskCode: `# Создай переменные и выведи одной строкой\nname = "..."\nage = ...\ncity = "..."\n\nprint(f"...")`, taskAnswer: `name = "Иван"\nage = 22\ncity = "Санкт-Петербург"\n\nprint(f"Меня зовут {name}, мне {age} лет, я из {city}")` },
    ],
  },
  "let, const, стрелочные функции": {
    title: "let, const, стрелочные функции",
    type: "video",
    duration: "15 мин",
    courseTitle: "Современный JS / TS",
    tagColor: "#fbbf24",
    nextLesson: "Деструктуризация и spread/rest",
    blocks: [
      { type: "text", content: "В современном JavaScript есть три способа объявить переменную: var (устарел), let и const. Разберём, когда что использовать." },
      { type: "code", lang: "JavaScript", content: `// var — НЕ используй, есть проблемы с областью видимости\nvar old = "старый способ";\n\n// let — для переменных, которые будут изменяться\nlet count = 0;\ncount = 1;  // ✓ можно\n\n// const — для констант (использоваться чаще!)\nconst MAX = 100;\n// MAX = 200;  // ✗ ошибка — нельзя переприсвоить` },
      { type: "tip", content: "Правило: всегда используй const. Если нужно переприсвоить — используй let. var не трогай совсем." },
      { type: "text", content: "Стрелочные функции — компактный синтаксис для функций. Они также иначе работают с this, что важно в классах и колбэках." },
      { type: "code", lang: "JavaScript", content: `// Обычная функция\nfunction add(a, b) {\n  return a + b;\n}\n\n// Стрелочная функция — то же самое\nconst add = (a, b) => {\n  return a + b;\n};\n\n// Если одна строка — return и скобки не нужны\nconst add = (a, b) => a + b;\n\n// Один параметр — скобки вокруг него не нужны\nconst double = n => n * 2;\n\nconsole.log(add(3, 4));    // 7\nconsole.log(double(5));    // 10` },
      { type: "code", lang: "JavaScript", content: `// Стрелочные функции отлично работают с массивами\nconst numbers = [1, 2, 3, 4, 5];\n\nconst doubled = numbers.map(n => n * 2);\nconsole.log(doubled); // [2, 4, 6, 8, 10]\n\nconst evens = numbers.filter(n => n % 2 === 0);\nconsole.log(evens);   // [2, 4]\n\nconst sum = numbers.reduce((acc, n) => acc + n, 0);\nconsole.log(sum);     // 15` },
      { type: "task", content: "Напиши функцию square через стрелочный синтаксис, которая возвращает квадрат числа. Используй её с .map() для массива [1,2,3,4,5].", taskCode: `// Напиши стрелочную функцию square\nconst square = ...;\n\nconst numbers = [1, 2, 3, 4, 5];\nconst squares = numbers.map(...);\nconsole.log(squares); // [1, 4, 9, 16, 25]`, taskAnswer: `const square = n => n * n;\n\nconst numbers = [1, 2, 3, 4, 5];\nconst squares = numbers.map(square);\nconsole.log(squares); // [1, 4, 9, 16, 25]` },
    ],
  },
  "Компоненты, JSX, пропсы": {
    title: "Компоненты, JSX, пропсы",
    type: "video",
    duration: "18 мин",
    courseTitle: "React + экосистема",
    tagColor: "#22d3ee",
    nextLesson: "useState и useEffect",
    blocks: [
      { type: "text", content: "React-приложение состоит из компонентов — небольших, переиспользуемых кусочков интерфейса. Каждый компонент — это функция, которая возвращает JSX." },
      { type: "code", lang: "TypeScript", content: `// Простейший компонент\nfunction Hello() {\n  return <h1>Привет, мир!</h1>;\n}\n\n// Современный стиль — стрелочная функция\nconst Hello = () => {\n  return <h1>Привет, мир!</h1>;\n};\n\n// Использование в другом компоненте\nconst App = () => (\n  <div>\n    <Hello />\n    <Hello />\n  </div>\n);` },
      { type: "tip", content: "JSX выглядит как HTML, но это JavaScript. Выражения вставляются в фигурных скобках {}, атрибуты пишутся в camelCase (className вместо class, onClick вместо onclick)." },
      { type: "text", content: "Пропсы (props) — это параметры компонента. Через них передаются данные от родителя к ребёнку:" },
      { type: "code", lang: "TypeScript", content: `// Типизируем пропсы через interface\ninterface CardProps {\n  title: string;\n  description: string;\n  color?: string; // ? — необязательный\n}\n\nconst Card = ({ title, description, color = "#fff" }: CardProps) => (\n  <div style={{ borderColor: color }} className="card">\n    <h2>{title}</h2>\n    <p>{description}</p>\n  </div>\n);\n\n// Использование\nconst App = () => (\n  <div>\n    <Card\n      title="Python"\n      description="Лучший язык для начинающих"\n      color="#4ade80"\n    />\n    <Card\n      title="JavaScript"\n      description="Язык веба"\n    />\n  </div>\n);` },
      { type: "text", content: "Компоненты можно вкладывать друг в друга как угодно. children — специальный пропс для вложенного содержимого:" },
      { type: "code", lang: "TypeScript", content: `interface BoxProps {\n  children: React.ReactNode;\n  className?: string;\n}\n\nconst Box = ({ children, className }: BoxProps) => (\n  <div className={\`box \${className}\`}>\n    {children}\n  </div>\n);\n\n// Использование\n<Box className="highlight">\n  <h1>Заголовок</h1>\n  <p>Любой контент внутри</p>\n</Box>` },
      { type: "task", content: "Создай компонент Badge, который принимает text и color. Выводит текст в цветном бейдже. Используй его три раза с разными значениями.", taskCode: `interface BadgeProps {\n  text: string;\n  color: string;\n}\n\nconst Badge = ({ text, color }: BadgeProps) => (\n  // напиши JSX здесь\n);\n\nconst App = () => (\n  <div>\n    {/* используй Badge три раза */}\n  </div>\n);`, taskAnswer: `const Badge = ({ text, color }: BadgeProps) => (\n  <span style={{ background: color, padding: "4px 12px", borderRadius: "999px", color: "#000" }}>\n    {text}\n  </span>\n);\n\nconst App = () => (\n  <div>\n    <Badge text="Python" color="#4ade80" />\n    <Badge text="React" color="#22d3ee" />\n    <Badge text="TypeScript" color="#a855f7" />\n  </div>\n);` },
    ],
  },
  "Big O: оценка сложности": {
    title: "Big O: оценка сложности",
    type: "theory",
    duration: "20 мин",
    courseTitle: "Алгоритмы и структуры данных",
    tagColor: "#f472b6",
    nextLesson: "Сортировки: bubble, merge, quick",
    blocks: [
      { type: "text", content: "Big O — это способ описать, как растёт время выполнения алгоритма при увеличении входных данных. Это не точное время в секундах, а порядок роста." },
      { type: "code", lang: "Python", content: `# O(1) — константное время, не зависит от размера\ndef get_first(arr):\n    return arr[0]  # всегда одна операция\n\n# O(n) — линейное, растёт пропорционально\ndef find_max(arr):\n    max_val = arr[0]\n    for item in arr:  # проходим все элементы\n        if item > max_val:\n            max_val = item\n    return max_val\n\n# O(n²) — квадратичное, вложенные циклы\ndef has_duplicates(arr):\n    for i in range(len(arr)):\n        for j in range(i + 1, len(arr)):  # вложенный цикл!\n            if arr[i] == arr[j]:\n                return True\n    return False` },
      { type: "tip", content: "Порядок от лучшего к худшему: O(1) → O(log n) → O(n) → O(n log n) → O(n²) → O(2ⁿ). Стремись к O(n) или лучше." },
      { type: "text", content: "O(log n) — логарифмическое время. Типичный пример — бинарный поиск. С каждым шагом задача уменьшается вдвое:" },
      { type: "code", lang: "Python", content: `# O(log n) — бинарный поиск\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid          # нашли!\n        elif arr[mid] < target:\n            left = mid + 1      # ищем в правой половине\n        else:\n            right = mid - 1     # ищем в левой половине\n\n    return -1  # не найдено\n\nnumbers = [1, 3, 5, 7, 9, 11, 13]\nprint(binary_search(numbers, 7))   # 3 (индекс)\nprint(binary_search(numbers, 4))   # -1 (нет в массиве)` },
      { type: "task", content: "Определи Big O сложность функции ниже и объясни почему.", taskCode: `def count_pairs(arr):\n    count = 0\n    for i in range(len(arr)):\n        for j in range(len(arr)):\n            if arr[i] + arr[j] == 10:\n                count += 1\n    return count\n\n# Какая сложность? O(?) — напиши в комментарии\n# Почему?`, taskAnswer: `# O(n²) — квадратичная сложность\n# Потому что два вложенных цикла,\n# каждый проходит все n элементов.\n# Итого n * n = n² операций.\n\n# Для массива из 100 элементов — 10 000 операций\n# Для 1000 элементов — 1 000 000 операций` },
    ],
  },
};

const TYPE_LABEL: Record<string, { label: string; icon: string; color: string }> = {
  video: { label: "Видео-урок", icon: "Play", color: "#a855f7" },
  theory: { label: "Теория", icon: "FileText", color: "#22d3ee" },
  practice: { label: "Практика", icon: "Code2", color: "#f472b6" },
};

interface Props {
  lessonTitle: string;
  courseTitle: string;
  tagColor: string;
  onBack: () => void;
  onNext?: (title: string) => void;
  onPrev?: (title: string) => void;
}

export default function LessonPage({ lessonTitle, courseTitle, tagColor, onBack, onNext, onPrev }: Props) {
  const lesson = LESSONS_DATA[lessonTitle];
  const [taskCode, setTaskCode] = useState<Record<number, string>>({});
  const [taskOutput, setTaskOutput] = useState<Record<number, string>>({});
  const [showAnswer, setShowAnswer] = useState<Record<number, boolean>>({});
  const [running, setRunning] = useState<Record<number, boolean>>({});

  function runTask(idx: number, answer: string) {
    setRunning((p) => ({ ...p, [idx]: true }));
    setTaskOutput((p) => ({ ...p, [idx]: "" }));
    setTimeout(() => {
      setTaskOutput((p) => ({ ...p, [idx]: "✓ Отлично! Код выполнен успешно.\n\nТвоё решение работает правильно." }));
      setRunning((p) => ({ ...p, [idx]: false }));
    }, 800);
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background text-foreground font-golos flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Содержимое урока в разработке</p>
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-primary mx-auto">
            <Icon name="ArrowLeft" size={16} /> Назад к курсу
          </button>
        </div>
      </div>
    );
  }

  const typeConf = TYPE_LABEL[lesson.type];

  return (
    <div className="min-h-screen bg-background text-foreground font-golos">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-60 left-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl -translate-x-1/2"
          style={{ background: `radial-gradient(circle, ${lesson.tagColor}, transparent 70%)` }}
        />
      </div>

      {/* Top bar */}
      <div className="relative z-10 sticky top-0 glass border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <Icon name="ArrowLeft" size={16} />
            <span className="hidden sm:inline">{courseTitle}</span>
            <span className="sm:hidden">Назад</span>
          </button>
          <span
            className="text-xs font-mono font-bold px-2 py-1 rounded-md shrink-0"
            style={{ color: typeConf.color, background: typeConf.color + "18", border: `1px solid ${typeConf.color}30` }}
          >
            <span className="hidden sm:inline">{typeConf.label}</span>
            <span className="sm:hidden">{lesson.duration}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <header className="mb-10 animate-fade-up">
          <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
            <Icon name={typeConf.icon as never} size={14} style={{ color: typeConf.color }} />
            <span>{typeConf.label}</span>
            <span className="text-white/20">·</span>
            <Icon name="Clock" size={14} />
            <span>{lesson.duration}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black leading-tight mb-2">{lesson.title}</h1>
        </header>

        {/* Blocks */}
        <div className="space-y-6 animate-fade-up-delay-1">
          {lesson.blocks.map((block, idx) => {
            if (block.type === "text") {
              return (
                <p key={idx} className="text-foreground/85 leading-relaxed text-base sm:text-lg">
                  {block.content}
                </p>
              );
            }

            if (block.type === "tip") {
              return (
                <div
                  key={idx}
                  className="flex gap-4 p-5 rounded-2xl border"
                  style={{ background: lesson.tagColor + "10", borderColor: lesson.tagColor + "30" }}
                >
                  <Icon name="Lightbulb" size={18} className="shrink-0 mt-0.5" style={{ color: lesson.tagColor }} />
                  <p className="text-sm leading-relaxed text-foreground/80">{block.content}</p>
                </div>
              );
            }

            if (block.type === "code") {
              return (
                <div key={idx} className="glass rounded-2xl overflow-hidden border border-white/10">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-white/8">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                      </div>
                      <span
                        className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                        style={{ color: lesson.tagColor, background: lesson.tagColor + "15" }}
                      >
                        {block.lang}
                      </span>
                    </div>
                    <Icon name="Code2" size={14} className="text-muted-foreground" />
                  </div>
                  <pre className="p-5 overflow-x-auto">
                    <code className="font-mono text-sm leading-relaxed text-foreground/90 whitespace-pre">
                      {block.content}
                    </code>
                  </pre>
                </div>
              );
            }

            if (block.type === "task") {
              const code = taskCode[idx] ?? (block.taskCode || "");
              return (
                <div key={idx} className="glass rounded-2xl overflow-hidden border border-[#f472b6]/20">
                  {/* Task header */}
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8 bg-[#f472b6]/5">
                    <div className="w-7 h-7 rounded-lg bg-[#f472b6]/20 flex items-center justify-center shrink-0">
                      <Icon name="Code2" size={14} className="text-[#f472b6]" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-[#f472b6] mb-0.5">ЗАДАНИЕ</div>
                      <p className="text-sm text-foreground/80">{block.content}</p>
                    </div>
                  </div>

                  {/* Editor */}
                  <div className="p-4">
                    <textarea
                      value={code}
                      onChange={(e) => setTaskCode((p) => ({ ...p, [idx]: e.target.value }))}
                      className="w-full bg-black/30 rounded-xl p-4 font-mono text-sm text-foreground/90 leading-relaxed resize-none border border-white/8 focus:outline-none focus:border-[#f472b6]/40 transition-colors"
                      rows={code.split("\n").length + 1}
                      spellCheck={false}
                    />
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-3 px-4 pb-4">
                    <button
                      onClick={() => runTask(idx, code)}
                      disabled={running[idx]}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-black transition-all hover:opacity-90 disabled:opacity-60"
                      style={{ background: "#f472b6" }}
                    >
                      {running[idx] ? (
                        <><Icon name="Loader2" size={14} className="animate-spin" />Проверка...</>
                      ) : (
                        <><Icon name="Play" size={14} />Запустить</>
                      )}
                    </button>
                    <button
                      onClick={() => setShowAnswer((p) => ({ ...p, [idx]: !p[idx] }))}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground glass hover:text-foreground transition-colors"
                    >
                      <Icon name={showAnswer[idx] ? "EyeOff" : "Eye"} size={14} />
                      {showAnswer[idx] ? "Скрыть" : "Показать ответ"}
                    </button>
                  </div>

                  {/* Output */}
                  {taskOutput[idx] && (
                    <div className="mx-4 mb-4 p-4 bg-black/30 rounded-xl border border-green-500/20">
                      <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">{taskOutput[idx]}</pre>
                    </div>
                  )}

                  {/* Answer */}
                  {showAnswer[idx] && block.taskAnswer && (
                    <div className="mx-4 mb-4 rounded-xl overflow-hidden border border-[#f472b6]/20">
                      <div className="px-4 py-2 bg-[#f472b6]/10 text-xs font-mono font-bold text-[#f472b6]">ОТВЕТ</div>
                      <pre className="p-4 bg-black/20 font-mono text-sm text-foreground/80 whitespace-pre overflow-x-auto">
                        {block.taskAnswer}
                      </pre>
                    </div>
                  )}
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Navigation */}
        <div className="mt-14 flex items-center justify-between gap-4">
          {lesson.prevLesson ? (
            <button
              onClick={() => onPrev?.(lesson.prevLesson!)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl glass text-sm font-semibold hover:bg-white/8 transition-colors"
            >
              <Icon name="ArrowLeft" size={16} />
              <span className="hidden sm:inline">Предыдущий</span>
            </button>
          ) : <div />}

          <button
            onClick={onBack}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            К программе курса
          </button>

          {lesson.nextLesson ? (
            <button
              onClick={() => onNext?.(lesson.nextLesson!)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-black transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${lesson.tagColor}, #a855f7)` }}
            >
              <span className="hidden sm:inline">Следующий</span>
              <Icon name="ArrowRight" size={16} />
            </button>
          ) : (
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-black transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${lesson.tagColor}, #a855f7)` }}
            >
              <Icon name="CheckCircle" size={16} />
              <span className="hidden sm:inline">Завершить</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
