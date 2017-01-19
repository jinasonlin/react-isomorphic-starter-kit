
export const loadJS = (src, callback) => {
  const script = document.createElement('script');
  const head = document.getElementsByTagName('head')[0];
  let loaded;

  script.src = src;

  if (typeof callback === 'function') {
    script.onload = script.onreadystatechange = () => {
      if (!loaded && (!script.readyState || /loaded|complete/.test(script.readyState))) {
        script.onload = script.onreadystatechange = null;
        loaded = true;
        callback();
      }
    };
  }

  head.appendChild(script);
};
