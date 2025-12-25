Отлично! Вот **полная расшифровка цветов для темы "Минимализм Pro"** с привязкой к вашим исходным переменным из `.app_default_theme`, но **адаптированным под профессиональный минимализм**.

Я сопоставлю каждую визуальную часть интерфейса с конкретной CSS-переменной, а затем дам обновлённый блок `:root` с финальными значениями.

---

## 🎨 Карта цветов: Минимализм Pro

| Элемент интерфейса                      | Роль                               | Переменная                 | Значение (HEX) | Комментарий                                                  |
| --------------------------------------- | ---------------------------------- | -------------------------- | -------------- | ------------------------------------------------------------ |
| **Фон всего приложения**                | Основной фон за пределами карточки | `--app-bg`                 | `#f0f2f8`      | Светло-серый с синим подтоном                                |
| **Фон карточки (контейнера)**           | Белый фон интерфейса               | `--primary-bg-color`       | `#ffffff`      | Ваша оригинальная переменная                                 |
| **Фон надстройки и заголовков таблицы** | Единый фон для управления          | `--header-bg`              | `#f0f2f8`      | ← **одинаковый для обоих!**                                  |
| **Акцентный цвет (активные элементы)**  | Активные вкладки, кнопки, ссылки   | `--extra-bg-color`         | `#4a4fc9`      | Глубокий, профессиональный (ваш `--extra-bg-color` обновлён) |
| **Цвет выделенной строки**              | При выборе чекбокса                | `--selected-row-bg`        | `#e8eaf6`      | Мягкий, но различимый                                        |
| **Цвет ховера на строку**               | При наведении                      | `--primary-hover`          | `#f5f7fd`      | Ваша переменная обновлена                                    |
| **Основной текст**                      | Заголовки, данные                  | `--primary-text-color`     | `#0a0a12`      | Почти чёрный (обновлён)                                      |
| **Вторичный текст**                     | Мета-информация, подсказки         | `--secondary-text-color`   | `#5a5a6e`      | Обновлён                                                     |
| **Границы**                             | Разделители, рамки                 | `--secondary-border-color` | `#d8dbe4`      | Обновлена                                                    |
| **Фон пагинации (активной)**            | Текущая страница                   | `--extra-bg-color`         | `#4a4fc9`      | Используется та же переменная                                |
| **Цвет текста на акценте**              | Белый текст на кнопках             | `--button-text-color`      | `#ffffff`      | Без изменений                                                |

---

## 🔧 Обновлённый блок `:root` для Минимализма Pro

Вставьте этот блок в вашу тему — он **полностью совместим** с вашей структурой, но с улучшенными значениями:

```css
:root {
  /* === Фон === */
  --primary-bg-color: #ffffff; /* белый фон карточки */
  --hider-table-color: #ffffff; /* фон строк таблицы (без чередования) */
  --extra-bg-color: #4a4fc9; /* акцент: активные элементы, кнопки */

  /* === Цвета состояния === */
  --error-color: #e53e3e;
  --success-color: #38a169;
  --warning-color: #d69e2e;

  /* === Текст === */
  --primary-text-color: #0a0a12; /* основной текст */
  --secondary-text-color: #5a5a6e; /* вторичный текст */
  --small-text-color: #5a5a6e;
  --button-text-color: #ffffff; /* текст на кнопках */
  --input-text-color: #0a0a12;

  /* === Ховеры === */
  --primary-hover: #f5f7fd; /* ховер на строку */
  --extra-hover: #f5f7fd; /* можно использовать для кнопок */
  --primary-icon-hover: #3730a3; /* тёмный акцент при ховере */
  --primary-border-hover: #4a4fc9;

  /* === Тени === */
  --box-shadow-color: #e5e5e5;
  --box-shadow-color-second: #d4d6e7;

  /* === Иконки === */
  --primary-icon-color: #4a4fc9; /* основные иконки */
  --secondary-icon-color: #ffffff;
  --extra-icon-color: #a0aec0; /* второстепенные иконки */
  --success-icon-color: #38a169;
  --cancel-icon-color: #e53e3e;
  --additional-icon-color: #a0aec0;
  --icon-color-yellow: #d69e2e;
  --icon-color-blue: #4a4fc9;
  --icon-color-red: #e53e3e;
  --icon-color-gray: #5a5a6e;

  --link-color: #4a4fc9; /* ссылки */
  --line-color: #4a4fc9; /* линия под активной вкладкой */

  /* === Скелетон === */
  --skeleton-start: #f0f2f8;
  --skeleton-fifty: #f5f7fd;
  --skeleton-end: #e8eaf6;

  /* === Бордеры === */
  --primary-border-color: #d8dbe4; /* не используется, но для полноты */
  --secondary-border-color: #d8dbe4; /* основные границы */
  --extra-border-color: #4a4fc9;

  /* === UI Kit === */
  --primary-placeholder-text-color: #a0aec0;
  --focused-placeholder-text-color: #5a5a6e;
  --input-border-color: #d8dbe4;
  --extra-bg-component: #ffffff;
  --modal-overlay-bg: rgba(0, 0, 0, 0.3);
  --disabled-input-color: #f7fafc;

  /* === Вкладки === */
  --primary-tab-color: #f5f7fd;
  --secondary-tab-color: #f0f2f8;

  /* === ДОПОЛНИТЕЛЬНО: выделенная строка === */
  --selected-row-bg: #e8eaf6; /* ← добавьте эту переменную */
  --header-bg: #f0f2f8; /* ← фон надстройки и заголовков */
}
```

---

## 📌 Как применять в компонентах:

### 1. **Надстройка ("Всего записей") и заголовки таблицы**

```css
.status-bar,
thead {
  background-color: var(--header-bg); /* #f0f2f8 */
  border-bottom: 1px solid var(--secondary-border-color);
}
```

### 2. **Активная вкладка (верхняя навигация)**

```css
.nav-item.active::after {
  background-color: var(--extra-bg-color); /* #4a4fc9 */
}
```

### 3. **Выделенная строка таблицы**

```css
tbody tr.selected {
  background-color: var(--selected-row-bg) !important; /* #e8eaf6 */
}
```

### 4. **Ховер на строку**

```css
tbody tr:hover:not(.selected) {
  background-color: var(--primary-hover) !important; /* #f5f7fd */
}
```

### 5. **Ссылки в ячейках ("→ в претензии")**

```css
.cell-link {
  color: var(--link-color); /* #4a4fc9 */
}
.cell-link:hover {
  color: var(--primary-icon-hover); /* #3730a3 */
}
```

### 6. **Пагинация (активная страница)**

```css
.pagination-btn.active {
  background-color: var(--extra-bg-color); /* #4a4fc9 */
  color: var(--button-text-color); /* #ffffff */
}
```

---

## ✅ Итог:

- Все цвета **привязаны к вашей системе переменных**.
- Добавлены **две новые переменные**: `--selected-row-bg` и `--header-bg`.
- Цвета **согласованы**, **не конфликтуют** и создают **профессиональный, спокойный интерфейс**.
- Вы можете **менять `--extra-bg-color`**, и всё обновится автоматически.

Хотите — могу дать **полный CSS-файл таблицы** с этими переменными или **React-компонент**.
