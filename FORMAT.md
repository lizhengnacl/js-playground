# 代码格式化说明

## 工具介绍

本项目使用以下工具进行代码格式化和检查：

- **Prettier** - 代码格式化工具
- **ESLint** - 代码质量检查工具

## 安装依赖

```bash
npm install
```

## NPM 脚本

| 命令                   | 说明                                   |
| ---------------------- | -------------------------------------- |
| `npm run format`       | 格式化所有支持格式的文件               |
| `npm run format:check` | 检查格式是否符合规范（不修改文件）     |
| `npm run format:js`    | 仅格式化 JavaScript 文件               |
| `npm run format:html`  | 仅格式化 HTML 文件                     |
| `npm run lint`         | 检查 JavaScript 代码问题               |
| `npm run lint:fix`     | 自动修复 ESLint 发现的问题             |
| `npm run lint:check`   | 检查是否有代码警告                     |
| `npm run fix`          | 同时运行 ESLint 修复和 Prettier 格式化 |
| `npm run check`        | 同时运行 ESLint 检查和 Prettier 检查   |

## Prettier 配置

配置文件：`.prettierrc`

| 选项          | 值    | 说明                               |
| ------------- | ----- | ---------------------------------- |
| semi          | false | 不使用分号                         |
| singleQuote   | true  | 使用单引号                         |
| tabWidth      | 2     | 缩进为 2 个空格                    |
| useTabs       | false | 使用空格而非 Tab                   |
| trailingComma | none  | 不使用尾随逗号                     |
| printWidth    | 100   | 每行最大 100 字符                  |
| arrowParens   | avoid | 箭头函数参数不加括号（单个参数时） |
| endOfLine     | lf    | 使用 Unix 换行符                   |

## ESLint 配置

配置文件：`.eslintrc.json`

主要规则：

- 缩进：2 个空格
- 引号：单引号
- 分号：不使用
- 严格模式：开启
- 未使用变量：警告（以下划线开头的参数忽略）

## VS Code 集成

项目已配置 `.vscode/settings.json`，在 VS Code 中会：

1. 保存时自动格式化
2. 保存时自动修复 ESLint 问题
3. 使用 Prettier 作为默认格式化工具

### 推荐扩展

打开 `.vscode/extensions.json` 查看推荐的 VS Code 扩展。

## 忽略文件

某些文件不会被格式化或检查，详见：

- `.prettierignore` - Prettier 忽略的文件
- `.eslintignore` - ESLint 忽略的文件

## Git Hook（可选）

建议使用 Husky 和 lint-staged 在提交前自动检查代码：

```bash
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

在 `package.json` 中添加：

```json
{
  "lint-staged": {
    "*.{js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{html,css,scss,json,md}": ["prettier --write"]
  }
}
```
