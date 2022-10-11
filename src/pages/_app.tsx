require('../styles/index.css');

function MyApp(props: any) {
  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
}

export default MyApp;
