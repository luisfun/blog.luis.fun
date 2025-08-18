---
emoji: twemoji:left-arrow
title: 【WP-MathJax】数式を左寄せにする方法
description: WordPressのMathJaxで書いた数式を左に寄せるショートコード
created: 2021-01-22
---

やりたいこと
- WordPressのMathJaxで書いた数式を左に寄せたい
- 簡略化するためにショートコードで実装したい

## 作ったショートコード
functions.php
```php
function mathjaxLeftFunc() {
  $code = '
  <script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    displayAlign: "left",
    displayIndent: "2em"
  });
  </script>
  '; return $code;
} add_shortcode('mathjaxLeft', 'mathjaxLeftFunc');
```

### 使い方
```:title=投稿記事
[mathjax][mathjaxLeft]
```

基本的にMathJaxのプラグインと同じく、記事の最初に一緒に書いておけばOK。

参考：[MathJax - 数式を左寄せにする方法](https://medemanabu.net/latex/mathjax-alignment-left/)
