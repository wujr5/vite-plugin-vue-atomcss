if (import.meta.hot) {
  import.meta.hot.on('atomcss:update-style', (data) => {
    let styles = document.querySelectorAll(
      `head > style[data-vite-dev-id*="${data.key}"]`
    );

    // 原子类未发生改变时无需更新
    if (
      styles.length > 0 &&
      styles[styles.length - 1].innerHTML != data.value
    ) {
      styles[styles.length - 1].innerHTML =
        styles[styles.length - 1].innerHTML + data.value;

      setTimeout(() => {
        styles[styles.length - 1].innerHTML = data.value;
      }, 500);
    }
  });
}
