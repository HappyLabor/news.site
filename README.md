# Happy Lab 网站开发指引手册

欢迎加入 Happy Lab 网站项目！本手册将帮助新手开发者快速了解项目结构，顺利开始开发工作。

## 目录

- [项目概览](#项目概览)
- [快速开始](#快速开始)
- [目录结构详解](#目录结构详解)
- [内容维护指南](#内容维护指南)
- [开发工作流程](#开发工作流程)
- [常见问题 FAQ](#常见问题-faq)

---

## 项目概览

**Happy Lab** 是一个展示赵存友课题组研究进展的静态官网。

### 网站主要功能

| 功能模块 | 说明 |
|---------|------|
| 首页 | 实验室介绍、最新动态、数据统计 |
| 研究动态 | 发表的论文、研究成果展示 |
| 团队介绍 | 课题组成员、研究方向 |
| 加入我们 | 招生信息、招聘启事 |
| 联系方式 | 地址、邮箱、电话 |

### 技术栈

- **纯静态网站**：HTML + CSS + JavaScript
- **无构建工具**：直接在浏览器中运行
- **双语支持**：中文(zh) / 英文(en) 一键切换
- **数据与视图分离**：内容存储在 JS 文件中，便于维护

---

## 快速开始

### 1. 克隆仓库

```bash
git clone <仓库地址>
cd Dev_web
```

### 2. 本地预览

由于这是纯静态网站，你有多种方式预览：

**方式一：直接用浏览器打开**
```bash
# 双击 index.html 文件
# 或者
start index.html  # Windows
open index.html    # macOS
```

**方式二：使用简单的 HTTP 服务器（推荐）**
```bash
# Python 3
python -m http.server 8000

# 或者用 Node.js 的 http-server
npx http-server -p 8000
```

然后访问 `http://localhost:8000`

### 3. 目录结构速览

```
Dev_web/
├── index.html          # 首页（中文）
├── research.html       # 研究动态页
├── team.html           # 团队介绍页
├── join.html           # 招生招聘页
├── contact.html        # 联系方式页
├── en/                 # 英文版页面
│   ├── index.html
│   ├── research.html
│   └── ...
├── content/            # 数据内容文件
│   ├── site.zh.js    # 中文站点数据
│   ├── site.en.js    # 英文站点数据
│   ├── papers.zh.js  # 中文论文数据
│   └── papers.en.js  # 英文论文数据
├── styles/
│   └── main.css        # 全局样式
├── scripts/
│   └── app.js          # 核心 JavaScript
├── image/              # 图片资源
└── docs/               # 开发文档
    └── template.md     # 维护说明模板
```

---

## 目录结构详解

### HTML 页面

| 文件 | 说明 |
|-----|------|
| `index.html` | 首页，展示实验室概况、最新动态 |
| `research.html` | 研究动态，展示发表论文和成果 |
| `team.html` | 团队介绍，成员信息和研究方向 |
| `join.html` | 招生招聘，加入实验室的信息 |
| `contact.html` | 联系方式，地址、邮箱、电话 |
| `en/*.html` | 英文版页面，结构与中文对应 |

**HTML 结构特点**：
```html
<body data-lang="zh" data-page="home">
  <header id="site-header"></header>
  <main id="app"></main>
  <footer id="site-footer"></footer>
</body>
```

- `data-lang`: 当前语言 (zh/en)
- `data-page`: 当前页面标识 (home/research/team/join/contact)

### Content 数据文件

这是**内容维护的核心**，所有可编辑内容都在这几个 JS 文件中。

#### site.zh.js / site.en.js

站点基础数据，包括：
- 品牌信息（实验室名称、标语）
- 导航菜单
- 负责人信息
- 团队统计
- 联系方式
- 页脚信息

示例结构：
```javascript
window.SITE_ZH = {
  brand: {
    title: "Happy Lab",
    subtitle: "研究实验室",
    kicker: "欢迎",
    mission: "致力于...",
    ctaPrimary: { label: "了解研究", href: "/research.html" },
    ctaSecondary: { label: "联系我们", href: "/contact.html" }
  },
  nav: [
    { key: "home", label: "首页", href: "/index.html" },
    // ...
  ],
  // ...
};
```

#### papers.zh.js / papers.en.js

论文/研究动态数据数组：

```javascript
window.PAPERS_ZH = [
  {
    year: 2026,
    journal: "期刊名",
    mechanism: "机制关键词",
    keywords: ["关键词1", "关键词2"],
    title: "论文标题",
    source: "来源",
    tag: "标签",
    summary: "一句话摘要",
    url: "链接地址"
  },
  // ...
];
```

### Styles 样式

`styles/main.css`：全局样式文件，包含：
- CSS 变量（颜色、字体、间距）
- 基础样式重置
- 布局系统
- 组件样式（按钮、卡片、导航等）
- 动画效果
- 响应式设计

### Scripts 脚本

`scripts/app.js`：核心 JavaScript，包含：
- 页面路由和渲染
- 导航生成
- 语言切换逻辑
- 数据绑定
- 滚动动画
- 响应式交互

**注意**：一般不需要修改此文件，除非要添加新页面类型或功能。

---

## 内容维护指南

### 新增研究动态（论文）

1. 打开 `content/papers.zh.js` 和 `content/papers.en.js`
2. 在数组开头新增一个对象（最新的放最前面）
3. 按照模板填写字段：

```javascript
{
  year: 2025,
  journal: "Nature Neuroscience",
  mechanism: "RNA编辑机制",
  keywords: ["RNA编辑", "神经发育"],
  title: "新型RNA编辑技术在神经疾病中的应用",
  source: "实验室",
  tag: "创新研究",
  summary: "本研究首次证明了新型RNA编辑技术在模式生物中的高效性和安全性。",
  url: "https://example.com/paper-link"
}
```

**注意事项**：
- `year` 用数字格式
- `keywords` 用于筛选功能，选择有代表性的词
- 中英文条目数量和顺序要保持一致
- `url` 可以是论文 DOI 链接或新闻稿链接

### 更新团队信息

编辑 `content/site.zh.js` 和 `content/site.en.js`：

1. **负责人信息**：修改 `faculty` 对象
2. **统计数据**：更新 `heroStats` 和 `teamSnapshot.metrics`
3. **团队列表**：修改 `teamSnapshot.members`
4. **联系方式**：更新 `contact` 对象

### 更新导航或页脚

同样在 `site.zh.js` / `site.en.js` 中：
- `nav` 数组控制主导航菜单
- `footer` 对象控制页脚内容

### 添加新页面

1. **复制现有 HTML 文件**作为模板（如复制 `research.html`）
2. **修改 `data-page` 属性**为新页面标识
3. **在 `app.js` 中添加渲染函数**（如果需要新布局）
4. **在 `site.zh.js` 和 `site.en.js` 的 `nav` 中添加导航链接**

---

## 开发工作流程

### 日常开发步骤

1. **拉取最新代码**
   ```bash
   git pull origin main
   ```

2. **创建功能分支**（推荐）
   ```bash
   git checkout -b feature/更新研究动态
   ```

3. **本地预览修改**
   ```bash
   python -m http.server 8000
   # 访问 http://localhost:8000
   ```

4. **提交修改**
   ```bash
   git add content/papers.zh.js content/papers.en.js
   git commit -m "添加2025年Nature Neuroscience论文"
   git push -u origin feature/更新研究动态
   ```

5. **合并到主分支**（通过 Pull Request 或直接合并）

### 部署流程

本项目使用 **GitHub Pages** 部署：

1. 代码推送到 `main` 分支
2. GitHub 自动构建并部署
3. 访问 `https://sleepinlava.github.io/` 查看最新版本

---

## 常见问题 FAQ

### Q1: 如何修改网站标题或标语？

**A**: 编辑 `content/site.zh.js` 和 `site.en.js` 中的 `brand` 对象：

```javascript
brand: {
  title: "Happy Lab",           // 主标题
  subtitle: "研究实验室",        // 副标题
  kicker: "欢迎",               // 小标签
  mission: "致力于..."           // 使命宣言
}
```

### Q2: 添加新论文后筛选功能不生效？

**A**: 检查以下几点：
1. `keywords` 字段是否填写？用于筛选功能
2. `year` 是否为数字格式？
3. 中英文两个文件是否都添加了？
4. 浏览器缓存？按 `Ctrl+F5` 强制刷新

### Q3: 如何修改网站颜色主题？

**A**: 编辑 `styles/main.css` 文件开头的 CSS 变量：

```css
:root {
  --primary: #e04e2c;      /* 主色调 */
  --secondary: #4a7c59;   /* 次色调 */
  --accent: #f6f1e5;      /* 强调色 */
  /* ... */
}
```

### Q4: 本地预览时图片不显示？

**A**: 必须使用 HTTP 服务器访问，不能直接用 `file://` 协议打开 HTML 文件：

```bash
# 在项目根目录运行
python -m http.server 8000

# 然后访问 http://localhost:8000
```

### Q5: 如何添加新的页面类型（如"新闻动态"页）？

**A**: 需要修改以下几个地方：

1. **创建新 HTML 文件**（复制现有页面修改）
2. **在 `app.js` 中添加渲染函数**：
   ```javascript
   function renderNews(container, site, papers, lang) {
     // 渲染新闻列表
   }
   ```
3. **在 `switch` 语句中添加新分支**：
   ```javascript
   case "news":
     renderNews(app, site, papers, currentLang);
     break;
   ```
4. **在 `site.zh.js` 和 `site.en.js` 的 `nav` 中添加导航链接**

### Q6: 中英文内容如何保持同步？

**A**: 建议遵循以下流程：

1. **先完成中文内容**，确保无误
2. **再翻译英文版本**，保持数据结构一致
3. **检查字段对应**：
   - 数组长度相同
   - 对象字段一致
   - 特殊字段（如 `year`）格式相同

### Q7: 部署到 GitHub Pages 后样式丢失？

**A**: 检查以下几点：

1. **路径问题**：确保使用绝对路径 `/styles/main.css` 而非相对路径 `styles/main.css`
2. **大小写敏感**：GitHub Pages 对路径大小写敏感，确保文件名大小写一致
3. **根目录配置**：在仓库 Settings > Pages 中检查发布源设置

---

## 附录

### 文件命名规范

| 类型 | 命名方式 | 示例 |
|-----|---------|------|
| HTML 页面 | 小写，连字符分隔 | `index.html`, `research.html` |
| JavaScript 数据 | 小写，点分隔语言和类型 | `site.zh.js`, `papers.en.js` |
| CSS 样式 | 小写 | `main.css` |
| 图片 | 小写，描述性命名 | `lab-logo.png`, `team-photo.jpg` |

### 推荐的开发工具

| 工具 | 用途 |
|-----|------|
| VS Code | 代码编辑器（推荐插件：Live Server, Prettier） |
| Chrome/Firefox | 浏览器调试 |
| Python | 本地 HTTP 服务器 |
| Git | 版本控制 |

### 学习资源

- **HTML/CSS**: [MDN Web Docs](https://developer.mozilla.org/zh-CN/docs/Web)
- **JavaScript**: [JavaScript.info](https://zh.javascript.info/)
- **Git 教程**: [廖雪峰 Git 教程](https://www.liaoxuefeng.com/wiki/896043488029600)

---

**最后更新**: 2026/04/18

如果本手册未能解决你的问题，欢迎查阅 `docs/template.md` 或直接询问项目维护者！
