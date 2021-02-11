export const getLoginUrl = () => {
  const port = location.port ? `:${location.port}` : '';

  // If you have configured multiple OIDC providers, then, you can update this URL to /login.
  // It will show a Spring Security generated login page with links to configured OIDC providers.
  return `//${location.hostname}${port}${location.pathname}oauth2/authorization/oidc`;
};

export const isValidUrl = string => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i' // fragment locator
  );
  return !!pattern.test(string);
};
