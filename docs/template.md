# Happy Lab 静态站内容维护说明

## 目录约定
- `index.html`、`research.html`、`team.html`、`join.html`、`contact.html`：中文页面入口
- `en/`：英文页面入口，与中文页面一一对应
- `content/site.zh.js`、`content/site.en.js`：站点基础文案、导航、团队与联系信息
- `content/papers.zh.js`、`content/papers.en.js`：研究动态卡片数据
- `styles/main.css`：全站共享样式
- `scripts/app.js`：导航、语言切换、页面渲染和滚动动效

## 新增研究动态
在 `content/papers.zh.js` 与 `content/papers.en.js` 中各新增一条对象，字段保持一致：

```js
{
  year: 2026,
  title: "标题",
  source: "期刊或来源",
  tag: "关键词",
  summary: "一句话摘要",
  url: "外链地址"
}
```

要求：
- `year` 使用数字，页面会按年份倒序展示
- 中英文数组尽量保持条目数量和顺序一致
- `summary` 控制在 1 到 2 句，避免卡片过长

## 更新负责人或团队信息
- 负责人、团队概况、研究方向、招生信息、联系方式都在 `content/site.zh.js` 与 `content/site.en.js`
- 若要替换负责人图片，请更新 `faculty.image`，并将图片放在 `image/` 目录
- 若团队规模变化，请同步修改 `heroStats` 和 `teamSnapshot.metrics`

## 新增页面
- 建议复制现有 HTML 文件作为模板，只修改 `body` 上的 `data-lang` 与 `data-page`
- 如需新增新页面类型，需要在 `scripts/app.js` 中增加对应 `render...` 方法
- 保持中英文页面成对出现，避免语言切换断链

## GitHub Pages 部署建议
- 仓库根目录直接作为 Pages 发布源即可
- 所有静态资源都使用根路径引用，例如 `/styles/main.css`
- 若仓库以后改为项目页而不是用户主页，需要把根路径改成相对路径或增加构建步骤
