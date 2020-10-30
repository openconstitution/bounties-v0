package org.muellners.bounties.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Bounties.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {
  private final Listeners listeners = new Listeners();

  public Listeners getListeners() { return listeners; }

  private static class Listeners {
    private String url;

    public String getUrl() { return url; }

    public void setUrl(String url) { this.url = url; }

    public String getPath() { return path; }

    public void setPath(String path) { this.path = path; }

    private String path;
  }
}
