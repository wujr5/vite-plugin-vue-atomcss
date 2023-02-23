if (import.meta.hot) {
  import.meta.hot.on('atomcss:update-style', (data) => {
    let styles = document.querySelectorAll(
      `head > style[data-vite-dev-id*="${data.key}"]`
    );
    styles[styles.length - 1].innerHTML =
      styles[styles.length - 1].innerHTML + data.value;

    setTimeout(() => {
      styles[styles.length - 1].innerHTML = data.value;
    }, 500);
  });
}
